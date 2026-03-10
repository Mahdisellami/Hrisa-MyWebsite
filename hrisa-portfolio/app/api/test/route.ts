import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Resend } from 'resend';

export async function GET() {
  const results: any = {
    timestamp: new Date().toISOString(),
    tests: {}
  };

  // Test 1: Environment variables
  results.tests.env = {
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    RESEND_API_KEY_PREFIX: process.env.RESEND_API_KEY?.slice(0, 5),
    TURSO_DATABASE_URL: !!process.env.TURSO_DATABASE_URL,
    BASE_URL: process.env.BASE_URL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  };

  // Test 2: Database connection
  try {
    const userCount = await db.execute('SELECT COUNT(*) as count FROM users');
    results.tests.database = {
      success: true,
      userCount: userCount.rows[0]
    };
  } catch (error: any) {
    results.tests.database = {
      success: false,
      error: error.message
    };
  }

  // Test 3: Resend API
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not set');
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    results.tests.resend = {
      success: true,
      apiKeyValid: process.env.RESEND_API_KEY.startsWith('re_')
    };
  } catch (error: any) {
    results.tests.resend = {
      success: false,
      error: error.message
    };
  }

  return NextResponse.json(results, { status: 200 });
}
