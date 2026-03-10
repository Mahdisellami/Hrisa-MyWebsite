import { NextRequest, NextResponse } from 'next/server';
import { verifyMagicLink } from '@/lib/auth/magiclink';
import { createSession } from '@/lib/auth/session';
import { logAudit } from '@/lib/auth/audit';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    console.log('[Verify] Starting verification, token present:', !!token);

    if (!token) {
      return NextResponse.redirect(new URL('/login?error=missing_token', request.url));
    }

    // Verify magic link
    console.log('[Verify] Verifying magic link...');
    const verification = await verifyMagicLink(token);
    console.log('[Verify] Verification result:', verification);

    if (!verification.valid || !verification.email) {
      console.error('[Verify] Verification failed:', verification.error);
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
    console.log('[Verify] Creating session for user:', user.id);
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent');
    const session = await createSession(user.id, userAgent || undefined, ipAddress);
    console.log('[Verify] Session created:', session.id);

    // Update last login
    const now = Math.floor(Date.now() / 1000);
    await db.execute({
      sql: 'UPDATE users SET last_login_at = ?, updated_at = ? WHERE id = ?',
      args: [now, now, user.id]
    });

    // Log audit event
    await logAudit({
      userId: user.id,
      action: 'LOGIN',
      ipAddress,
      userAgent,
    });

    // Redirect to dashboard or return URL
    const redirectUrl = searchParams.get('redirect') || '/dashboard';
    const response = NextResponse.redirect(new URL(redirectUrl, request.url));

    // Set session cookie on the redirect response
    console.log('[Verify] Setting session cookie on redirect...');
    response.cookies.set('hrisa_session', session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    });
    console.log('[Verify] Session cookie set successfully');

    return response;
  } catch (error) {
    console.error('[Verify] Error occurred:', error);
    console.error('[Verify] Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      error: JSON.stringify(error, null, 2)
    });
    return NextResponse.redirect(new URL('/login?error=verification_failed', request.url));
  }
}
