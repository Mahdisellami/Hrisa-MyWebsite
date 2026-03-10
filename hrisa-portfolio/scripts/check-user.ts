#!/usr/bin/env tsx
/**
 * Check if a user exists in the database
 */
import { db } from '../lib/db/index.js';

const email = process.argv[2] || 'mahdi.sellami.95@gmail.com';

async function checkUser() {
  try {
    console.log(`🔍 Checking user: ${email}\n`);

    const result = await db.execute({
      sql: 'SELECT id, email, name, role, status, created_at, approved_at FROM users WHERE email = ?',
      args: [email.toLowerCase()]
    });

    if (result.rows.length === 0) {
      console.log('❌ User not found in database');
      console.log('\n💡 Create admin user with:');
      console.log('   npm run create:admin');
      process.exit(1);
    }

    const user = result.rows[0] as any;
    console.log('✅ User found!');
    console.log('\n📋 User Details:');
    console.log(`   ID: ${user.id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Name: ${user.name}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Status: ${user.status}`);
    console.log(`   Created: ${new Date(user.created_at * 1000).toLocaleString()}`);

    if (user.approved_at) {
      console.log(`   Approved: ${new Date(user.approved_at * 1000).toLocaleString()}`);
    }

    if (user.status !== 'APPROVED') {
      console.log('\n⚠️  User is not approved yet!');
    }

  } catch (error) {
    console.error('❌ Error checking user:', error);
    process.exit(1);
  }
}

checkUser();
