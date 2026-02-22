import { NextRequest, NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth/session';
import { db } from '@/lib/db';
import { nanoid } from 'nanoid';
import { createUserSchema } from '@/lib/validation/schemas';
import { logAudit } from '@/lib/auth/audit';

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
    const status = searchParams.get('status');

    let query = 'SELECT * FROM users';
    const params: any[] = [];

    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC';

    const result = await db.execute({ sql: query, args: params });
    const users = result.rows;

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
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
    const validation = createUserSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error },
        { status: 400 }
      );
    }

    const { email, name, role } = validation.data;

    // Check if user exists
    const existingResult = await db.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [email]
    });
    if (existingResult.rows.length > 0) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create user
    const userId = nanoid();
    const now = Math.floor(Date.now() / 1000);

    await db.execute({
      sql: `INSERT INTO users (id, email, name, role, status, created_at, updated_at, approved_at, approved_by)
            VALUES (?, ?, ?, ?, 'APPROVED', ?, ?, ?, ?)`,
      args: [userId, email, name, role, now, now, now, session.user_id]
    });

    // Log audit
    await logAudit({
      userId: session.user_id,
      action: 'USER_CREATED',
      metadata: { createdUserId: userId, email, role },
    });

    return NextResponse.json({
      success: true,
      user: { id: userId, email, name, role },
    });
  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
