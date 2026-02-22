import { NextRequest, NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth/session';
import { getAuditLogs } from '@/lib/auth/audit';

export async function GET(request: NextRequest) {
  try {
    const session = await getCurrentSession();

    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const { searchParams } = request.nextUrl;
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    const logs = getAuditLogs({ limit, offset });

    return NextResponse.json({ logs });
  } catch (error) {
    console.error('Get audit logs error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audit logs' },
      { status: 500 }
    );
  }
}
