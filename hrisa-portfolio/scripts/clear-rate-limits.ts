#!/usr/bin/env tsx
/**
 * Clear magic link rate limits for a user
 */
import { db } from '../lib/db/index.js';

const email = process.argv[2] || 'mahdi.sellami.95@gmail.com';

async function clearRateLimits() {
  try {
    console.log('🧹 Clearing rate limits for:', email);

    // Delete old magic links for this email
    const result = await db.execute({
      sql: 'DELETE FROM magic_links WHERE email = ?',
      args: [email.toLowerCase()]
    });

    console.log(`✅ Cleared ${result.rowsAffected} magic link(s)`);
    console.log('\n💡 You can now request a new magic link!');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

clearRateLimits();
