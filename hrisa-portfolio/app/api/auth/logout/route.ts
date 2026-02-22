import { NextRequest, NextResponse } from 'next/server';
import { getSessionToken, deleteSession, clearSessionCookie } from '@/lib/auth/session';
import { logAudit } from '@/lib/auth/audit';

export async function POST(request: NextRequest) {
  try {
    const token = await getSessionToken();

    if (token) {
      // Get session to find user ID for audit log
      const { db } = await import('@/lib/db');
      const sessionResult = await db.execute({
        sql: 'SELECT user_id FROM sessions WHERE token = ?',
        args: [token]
      });

      if (sessionResult.rows.length > 0) {
        const session = sessionResult.rows[0] as any;
        // Log audit event
        const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
        await logAudit({
          userId: session.user_id,
          action: 'LOGOUT',
          ipAddress,
          userAgent: request.headers.get('user-agent'),
        });
      }

      // Delete session
      await deleteSession(token);
    }

    // Clear cookie
    await clearSessionCookie();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during logout' },
      { status: 500 }
    );
  }
}
