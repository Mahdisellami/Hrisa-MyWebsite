#!/usr/bin/env tsx

import { db } from '../lib/db/index.js';
import { nanoid } from 'nanoid';

const email = process.argv[2] || 'test@hrisa.tech';
const role = process.argv[3] || 'EDITOR';

async function createTestUser(emailAddress: string, userRole: string) {
  try {
    console.log(`🔐 Creating test user: ${emailAddress} (${userRole})\n`);

    // Check if user already exists
    const existingResult = await db.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [emailAddress.toLowerCase()]
    });

    if (existingResult.rows.length > 0) {
      console.log('⚠️  User already exists. Updating role...');

      const now = Math.floor(Date.now() / 1000);
      await db.execute({
        sql: `UPDATE users
              SET role = ?, status = 'APPROVED', updated_at = ?, approved_at = ?
              WHERE email = ?`,
        args: [userRole, now, now, emailAddress.toLowerCase()]
      });

      console.log('✅ User updated successfully!');
    } else {
      // Create new user
      const id = nanoid();
      const now = Math.floor(Date.now() / 1000);

      await db.execute({
        sql: `INSERT INTO users (id, email, name, role, status, created_at, updated_at, approved_at)
              VALUES (?, ?, ?, ?, 'APPROVED', ?, ?, ?)`,
        args: [id, emailAddress.toLowerCase(), 'Test User', userRole, now, now, now]
      });

      console.log('✅ Test user created successfully!');
    }

    console.log('\n📧 Details:');
    console.log(`   Email: ${emailAddress}`);
    console.log(`   Role: ${userRole}`);
    console.log(`   Status: APPROVED`);
    console.log('\n💡 Generate magic link: npx tsx scripts/create-magic-link.ts ' + emailAddress);

  } catch (error) {
    console.error('❌ Failed to create test user:', error);
    process.exit(1);
  }
}

createTestUser(email, role);
