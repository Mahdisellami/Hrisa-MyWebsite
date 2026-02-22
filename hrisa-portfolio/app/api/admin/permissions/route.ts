import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth/session';
import { getAllProtectedResources } from '@/lib/auth/permissions';

export async function GET() {
  try {
    const session = await getCurrentSession();

    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const resources = await getAllProtectedResources();
    return NextResponse.json({ resources });
  } catch (error) {
    console.error('Get permissions error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch permissions' },
      { status: 500 }
    );
  }
}
