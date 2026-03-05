import { NextRequest, NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth/session';
import { checkAccess } from '@/lib/auth/permissions';
import type { ResourceType } from '@/lib/auth/permissions';
import { logAccessAttempt } from '@/lib/auth/audit';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resourceType, resourceId, shareToken } = body;

    if (!resourceType || !resourceId) {
      return NextResponse.json(
        { hasAccess: false, reason: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Get current session
    const session = await getCurrentSession();
    const userId = session?.user_id || null;
    const userRole = session?.role || null;

    // Get IP and user agent for audit logging
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || undefined;

    // Check access
    const accessCheck = await checkAccess(
      userId,
      userRole,
      shareToken || null,
      resourceType as ResourceType,
      resourceId
    );

    // Log access attempt
    await logAccessAttempt(
      userId,
      accessCheck.hasAccess,
      resourceType,
      resourceId,
      accessCheck.reason,
      ipAddress,
      userAgent
    );

    return NextResponse.json({
      hasAccess: accessCheck.hasAccess,
      reason: accessCheck.reason,
      method: accessCheck.method,
    });
  } catch (error) {
    console.error('Access check error:', error);
    return NextResponse.json(
      { hasAccess: false, reason: 'Internal server error' },
      { status: 500 }
    );
  }
}
