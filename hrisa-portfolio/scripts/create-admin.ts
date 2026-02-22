#!/usr/bin/env tsx

import { db } from '../lib/db/index.js';
import { nanoid } from 'nanoid';

// Get email from command line args
const args = process.argv.slice(2);
const emailArg = args.find(arg => arg.startsWith('--email='));
const email = emailArg ? emailArg.split('=')[1] : process.env.ADMIN_EMAIL;

if (!email) {
  console.error('❌ Error: Email is required');
  console.log('Usage: npm run create:admin -- --email=your@email.com');
  console.log('Or set ADMIN_EMAIL in .env.local');
  process.exit(1);
}

// Validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  console.error('❌ Error: Invalid email format');
  process.exit(1);
}

console.log(`🔐 Creating admin user: ${email}\n`);

async function createAdmin(emailAddress: string) {
  try {
    // Check if user already exists
    const existingResult = await db.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [emailAddress.toLowerCase()]
    });

    if (existingResult.rows.length > 0) {
      console.log('⚠️  User already exists. Updating to ADMIN role...');

      const now = Math.floor(Date.now() / 1000);
      await db.execute({
        sql: `UPDATE users
              SET role = 'ADMIN', status = 'APPROVED', updated_at = ?, approved_at = ?
              WHERE email = ?`,
        args: [now, now, emailAddress.toLowerCase()]
      });

      console.log('✅ User updated to ADMIN successfully!');
    } else {
      // Create new admin user
      const id = nanoid();
      const now = Math.floor(Date.now() / 1000);

      await db.execute({
        sql: `INSERT INTO users (id, email, name, role, status, created_at, updated_at, approved_at)
              VALUES (?, ?, ?, 'ADMIN', 'APPROVED', ?, ?, ?)`,
        args: [id, emailAddress.toLowerCase(), 'Admin', now, now, now]
      });

      console.log('✅ Admin user created successfully!');
    }

    console.log('\n📧 To log in:');
    console.log(`  1. Visit: http://localhost:3000/login`);
    console.log(`  2. Enter email: ${emailAddress}`);
    console.log(`  3. Check your email for the magic link`);
    console.log('\n⚠️  Make sure RESEND_API_KEY is set in .env.local');

  } catch (error) {
    console.error('❌ Failed to create admin user:', error);
    process.exit(1);
  }
}

createAdmin(email);
