import { NextRequest, NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth/session';
import { generateShareLink, getActiveShareLinks } from '@/lib/auth/sharelink';
import { createShareLinkSchema } from '@/lib/validation/schemas';
import { logAudit } from '@/lib/auth/audit';

export async function GET() {
  try {
    const session = await getCurrentSession();

    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const links = getActiveShareLinks();
    return NextResponse.json({ links });
  } catch (error) {
    console.error('Get share links error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch share links' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getCurrentSession();

    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validation = createShareLinkSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error },
        { status: 400 }
      );
    }

    const { resourceType, resourceId, expiresInHours, maxUses } = validation.data;

    const shareLink = generateShareLink(
      session.user_id,
      resourceType as any,
      resourceId,
      expiresInHours,
      maxUses || null
    );

    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const url = `${baseUrl}/share/${shareLink.token}`;

    // Log audit
    logAudit({
      userId: session.user_id,
      action: 'SHARE_LINK_CREATED',
      resourceType: resourceType as any,
      resourceId: resourceId || undefined,
      metadata: { expiresInHours, maxUses },
    });

    return NextResponse.json({
      success: true,
      shareLink: {
        ...shareLink,
        url,
      },
    });
  } catch (error) {
    console.error('Create share link error:', error);
    return NextResponse.json(
      { error: 'Failed to create share link' },
      { status: 500 }
    );
  }
}
