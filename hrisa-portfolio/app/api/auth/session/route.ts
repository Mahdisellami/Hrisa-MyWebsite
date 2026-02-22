import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth/session';

export async function GET() {
  try {
    const session = await getCurrentSession();

    if (!session) {
      return NextResponse.json({
        authenticated: false,
        user: null,
      });
    }

    // Return safe user data (exclude sensitive fields)
    return NextResponse.json({
      authenticated: true,
      user: {
        id: session.id,
        email: session.email,
        name: session.name,
        role: session.role,
      },
    });
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json({
      authenticated: false,
      user: null,
    });
  }
}
