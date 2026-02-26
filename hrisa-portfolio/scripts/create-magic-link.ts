#!/usr/bin/env tsx

import { db } from '../lib/db/index.js';
import { nanoid } from 'nanoid';

const email = process.argv[2] || process.env.ADMIN_EMAIL;

if (!email) {
  console.error('❌ Error: Email is required');
  console.log('Usage: tsx scripts/create-magic-link.ts your@email.com');
  process.exit(1);
}

async function createMagicLink(emailAddress: string) {
  try {
    console.log(`🔗 Creating magic link for: ${emailAddress}\n`);

    // Check if user exists
    const userResult = await db.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [emailAddress.toLowerCase()]
    });

    if (userResult.rows.length === 0) {
      console.error('❌ User not found. Create user first with: npm run create:admin');
      process.exit(1);
    }

    const user = userResult.rows[0] as any;

    if (user.status !== 'APPROVED') {
      console.error(`❌ User status is ${user.status}. Must be APPROVED.`);
      process.exit(1);
    }

    // Generate magic link
    const token = nanoid(32);
    const now = Math.floor(Date.now() / 1000);
    const expiresAt = now + (15 * 60); // 15 minutes

    await db.execute({
      sql: `INSERT INTO magic_links (id, email, token, expires_at, created_at, ip_address)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [nanoid(), emailAddress.toLowerCase(), token, expiresAt, now, 'manual-script']
    });

    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const magicLinkUrl = `${baseUrl}/verify?token=${token}`;

    console.log('✅ Magic link created successfully!\n');
    console.log('🔗 Click this link to login:\n');
    console.log(`   ${magicLinkUrl}\n`);
    console.log('⏰ Link expires in 15 minutes\n');
    console.log('💡 Copy the link and paste it in your browser to login!');

  } catch (error) {
    console.error('❌ Failed to create magic link:', error);
    process.exit(1);
  }
}

createMagicLink(email);
