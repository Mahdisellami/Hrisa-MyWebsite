import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validation/schemas';
import { generateMagicLink, checkMagicLinkRateLimit } from '@/lib/auth/magiclink';
import { sendMagicLinkEmail } from '@/lib/email/resend';
import { checkRateLimit, RateLimits } from '@/lib/auth/rateLimit';
import { logAudit } from '@/lib/auth/audit';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      );
    }

    const { email } = validation.data;

    // Rate limiting
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rateLimit = checkRateLimit(email, RateLimits.LOGIN);

    if (!rateLimit.allowed) {
      const resetIn = Math.ceil((rateLimit.resetAt - Date.now()) / 1000 / 60);
      return NextResponse.json(
        { success: false, message: `Too many attempts. Try again in ${resetIn} minutes.` },
        { status: 429 }
      );
    }

    // Check if user exists and is approved
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;

    if (!user) {
      // Don't reveal if user doesn't exist
      return NextResponse.json({
        success: true,
        message: 'If this email is registered, you will receive a magic link shortly.',
      });
    }

    if (user.status === 'PENDING') {
      return NextResponse.json({
        success: false,
        message: 'Your registration is pending approval. You will be notified once approved.',
      });
    }

    if (user.status === 'REJECTED') {
      return NextResponse.json({
        success: false,
        message: 'Your access request was not approved. Please contact support if you believe this is an error.',
      });
    }

    // Check magic link rate limit
    if (!checkMagicLinkRateLimit(email)) {
      return NextResponse.json({
        success: false,
        message: 'Too many magic links requested. Please try again later.',
      });
    }

    // Generate magic link
    const magicLink = generateMagicLink(email, ipAddress);
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const magicLinkUrl = `${baseUrl}/verify?token=${magicLink.token}`;

    // Send email
    const emailResult = await sendMagicLinkEmail(email, magicLinkUrl);

    if (!emailResult.success) {
      console.error('Failed to send magic link email:', emailResult.error);
      return NextResponse.json({
        success: false,
        message: 'Failed to send email. Please try again later.',
      }, { status: 500 });
    }

    // Log audit event
    logAudit({
      userId: user.id,
      action: 'LOGIN',
      ipAddress,
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({
      success: true,
      message: 'Check your email for the magic link!',
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({
      success: false,
      message: 'An error occurred. Please try again.',
    }, { status: 500 });
  }
}
