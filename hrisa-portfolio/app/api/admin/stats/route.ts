import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth/session';
import { getDatabaseStats } from '@/lib/db';

export async function GET() {
  try {
    const session = await getCurrentSession();

    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const stats = getDatabaseStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
