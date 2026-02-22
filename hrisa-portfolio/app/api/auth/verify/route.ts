import { NextRequest, NextResponse } from 'next/server';
import { verifyMagicLink } from '@/lib/auth/magiclink';
import { createSession, setSessionCookie } from '@/lib/auth/session';
import { logAudit } from '@/lib/auth/audit';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(new URL('/login?error=missing_token', request.url));
    }

    // Verify magic link
    const verification = await verifyMagicLink(token);

    if (!verification.valid || !verification.email) {
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(verification.error || 'invalid_token')}`, request.url)
      );
    }

    // Get user
    const userResult = await db.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [verification.email]
    });
    const user = userResult.rows.length > 0 ? userResult.rows[0] as any : null;

    if (!user) {
      return NextResponse.redirect(new URL('/login?error=user_not_found', request.url));
    }

    if (user.status !== 'APPROVED') {
      return NextResponse.redirect(new URL('/login?error=not_approved', request.url));
    }

    // Create session
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent');
    const session = await createSession(user.id, userAgent || undefined, ipAddress);

    // Update last login
    const now = Math.floor(Date.now() / 1000);
    await db.execute({
      sql: 'UPDATE users SET last_login_at = ?, updated_at = ? WHERE id = ?',
      args: [now, now, user.id]
    });

    // Set session cookie
    await setSessionCookie(session.token);

    // Log audit event
    await logAudit({
      userId: user.id,
      action: 'LOGIN',
      ipAddress,
      userAgent,
    });

    // Redirect to dashboard or return URL
    const redirectUrl = searchParams.get('redirect') || '/dashboard';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.redirect(new URL('/login?error=verification_failed', request.url));
  }
}
