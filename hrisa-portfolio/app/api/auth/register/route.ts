import { NextRequest, NextResponse } from 'next/server';
import { registerSchema } from '@/lib/validation/schemas';
import { checkRateLimit, RateLimits } from '@/lib/auth/rateLimit';
import { sendRegistrationRequestEmail } from '@/lib/email/resend';
import { logAudit } from '@/lib/auth/audit';
import { db } from '@/lib/db';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid input. Please provide a valid email and name.' },
        { status: 400 }
      );
    }

    const { email, name } = validation.data;

    // Rate limiting
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rateLimit = checkRateLimit(email, RateLimits.REGISTER);

    if (!rateLimit.allowed) {
      const resetIn = Math.ceil((rateLimit.resetAt - Date.now()) / 1000 / 60);
      return NextResponse.json(
        { success: false, message: `Please wait ${resetIn} minutes before requesting access again.` },
        { status: 429 }
      );
    }

    // Check if user already exists
    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;

    if (existingUser) {
      if (existingUser.status === 'APPROVED') {
        return NextResponse.json({
          success: false,
          message: 'You already have access. Please use the login page.',
        });
      }

      if (existingUser.status === 'PENDING') {
        return NextResponse.json({
          success: false,
          message: 'Your request is already pending approval. You will be notified once reviewed.',
        });
      }

      if (existingUser.status === 'REJECTED') {
        return NextResponse.json({
          success: false,
          message: 'Your previous request was not approved. Please contact support.',
        });
      }
    }

    // Create new user with PENDING status
    const userId = nanoid();
    const now = Math.floor(Date.now() / 1000);

    db.prepare(`
      INSERT INTO users (id, email, name, role, status, created_at, updated_at)
      VALUES (?, ?, ?, 'EDITOR', 'PENDING', ?, ?)
    `).run(userId, email, name, now, now);

    // Log audit event
    logAudit({
      userId,
      action: 'REGISTRATION_REQUEST',
      ipAddress,
      userAgent: request.headers.get('user-agent'),
      metadata: { email, name },
    });

    // Send notification to admin
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      await sendRegistrationRequestEmail(adminEmail, email, name);
    }

    return NextResponse.json({
      success: true,
      message: 'Access request submitted! You will receive an email once approved.',
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({
      success: false,
      message: 'An error occurred. Please try again.',
    }, { status: 500 });
  }
}
