import { NextRequest, NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth/session';
import { checkAccess } from '@/lib/auth/permissions';
import type { ResourceType } from '@/lib/auth/permissions';

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
    const userRole = session?.role || null;

    // Check access
    const accessCheck = checkAccess(
      userRole,
      shareToken || null,
      resourceType as ResourceType,
      resourceId
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
