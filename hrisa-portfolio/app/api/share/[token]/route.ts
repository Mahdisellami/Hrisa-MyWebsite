import { NextRequest, NextResponse } from 'next/server';
import { validateShareLink } from '@/lib/auth/sharelink';
import { logAudit } from '@/lib/auth/audit';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    const validation = validateShareLink(token);

    if (!validation.valid) {
      return NextResponse.json({
        valid: false,
        error: validation.error,
      });
    }

    // Log usage
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    logAudit({
      action: 'SHARE_LINK_USED',
      resourceType: validation.shareLink?.resource_type as any,
      resourceId: validation.shareLink?.resource_id || undefined,
      ipAddress,
      userAgent: request.headers.get('user-agent'),
      metadata: { shareToken: token },
    });

    return NextResponse.json({
      valid: true,
      resource: {
        resource_type: validation.shareLink?.resource_type,
        resource_id: validation.shareLink?.resource_id,
      },
      expiresAt: validation.shareLink?.expires_at,
      usesRemaining: validation.shareLink?.max_uses
        ? validation.shareLink.max_uses - validation.shareLink.use_count
        : null,
    });
  } catch (error) {
    console.error('Share link validation error:', error);
    return NextResponse.json({
      valid: false,
      error: 'Failed to validate share link',
    }, { status: 500 });
  }
}
