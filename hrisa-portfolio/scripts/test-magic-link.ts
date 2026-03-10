#!/usr/bin/env tsx
/**
 * Test magic link generation and verification
 */
import { db } from '../lib/db/index.js';
import { generateMagicLink, verifyMagicLink } from '../lib/auth/magiclink.js';

const email = process.argv[2] || 'mahdi.sellami.95@gmail.com';

async function testMagicLink() {
  try {
    console.log('🔍 Testing magic link for:', email);
    console.log('\n1. Checking user exists...');

    const userResult = await db.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [email.toLowerCase()]
    });

    if (userResult.rows.length === 0) {
      console.error('❌ User not found!');
      process.exit(1);
    }

    const user = userResult.rows[0] as any;
    console.log('✅ User found:', user.email, '-', user.status);

    console.log('\n2. Generating magic link...');
    const magicLink = await generateMagicLink(email, 'test-ip');
    console.log('✅ Magic link generated!');
    console.log('   Token:', magicLink.token);
    console.log('   Expires:', new Date(magicLink.expires_at * 1000).toLocaleString());

    console.log('\n3. Verifying magic link immediately...');
    const verification = await verifyMagicLink(magicLink.token);
    console.log('   Result:', verification);

    if (verification.valid) {
      console.log('✅ Verification successful!');
      console.log('   Email:', verification.email);
    } else {
      console.error('❌ Verification failed:', verification.error);
    }

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

testMagicLink();
