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
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id) as any;

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (user.status === 'APPROVED') {
      return NextResponse.json(
        { error: 'User already approved' },
        { status: 400 }
      );
    }

    // Update user status
    const now = Math.floor(Date.now() / 1000);
    db.prepare(`
      UPDATE users
      SET status = 'APPROVED', approved_at = ?, approved_by = ?, updated_at = ?
      WHERE id = ?
    `).run(now, session.user_id, now, id);

    // Send approval email
    await sendRegistrationApprovedEmail(user.email, user.name || user.email);

    // Log audit
    logAudit({
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
