import { NextRequest, NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth/session';
import { db } from '@/lib/db';
import { sendRegistrationApprovedEmail } from '@/lib/email/resend';
import { logAudit, logPermissionChange } from '@/lib/auth/audit';
import { grantResourcePermission } from '@/lib/auth/permissions';

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

    // Parse request body
    const body = await request.json();
    const {
      resourcePermissions = [],
      expiresAt = null,
    } = body;

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

    // Validate resourcePermissions
    if (!Array.isArray(resourcePermissions) || resourcePermissions.length === 0) {
      return NextResponse.json(
        { error: 'At least one resource permission is required' },
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

    // Grant resource permissions
    for (const resourceId of resourcePermissions) {
      await grantResourcePermission(
        id,
        'SECTION',
        resourceId,
        session.user_id,
        expiresAt
      );

      // Log permission grant
      await logPermissionChange(
        session.user_id,
        id,
        'PERMISSION_CREATED',
        'SECTION',
        resourceId,
        expiresAt
      );
    }

    // Send approval email
    await sendRegistrationApprovedEmail(user.email, user.name || user.email);

    // Log audit
    await logAudit({
      userId: session.user_id,
      action: 'REGISTRATION_APPROVED',
      metadata: {
        approvedUserId: id,
        email: user.email,
        permissions_granted: resourcePermissions.length,
        expires_at: expiresAt,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'User approved successfully',
      permissions_granted: resourcePermissions.length,
    });
  } catch (error) {
    console.error('Approve user error:', error);
    return NextResponse.json(
      { error: 'Failed to approve user' },
      { status: 500 }
    );
  }
}
