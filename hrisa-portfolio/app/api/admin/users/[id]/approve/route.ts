import { NextRequest, NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth/session';
import { db } from '@/lib/db';
import { sendRegistrationApprovedEmail } from '@/lib/email/resend';
import { logAudit } from '@/lib/auth/audit';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getCurrentSession();

    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const { id } = await params;

    // Get user
    const userResult = await db.execute({
      sql: 'SELECT * FROM users WHERE id = ?',
      args: [id]
    });

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const user = userResult.rows[0] as any;

    if (user.status === 'APPROVED') {
      return NextResponse.json(
        { error: 'User already approved' },
        { status: 400 }
      );
    }

    // Update user status
    const now = Math.floor(Date.now() / 1000);
    await db.execute({
      sql: `UPDATE users
            SET status = 'APPROVED', approved_at = ?, approved_by = ?, updated_at = ?
            WHERE id = ?`,
      args: [now, session.user_id, now, id]
    });

    // Send approval email
    await sendRegistrationApprovedEmail(user.email, user.name || user.email);

    // Log audit
    await logAudit({
      userId: session.user_id,
      action: 'REGISTRATION_APPROVED',
      metadata: { approvedUserId: id, email: user.email },
    });

    return NextResponse.json({
      success: true,
      message: 'User approved successfully',
    });
  } catch (error) {
    console.error('Approve user error:', error);
    return NextResponse.json(
      { error: 'Failed to approve user' },
      { status: 500 }
    );
  }
}
