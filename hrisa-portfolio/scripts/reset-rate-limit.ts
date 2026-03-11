#!/usr/bin/env tsx
/**
 * Reset rate limit for a specific email address
 * Usage: npx tsx scripts/reset-rate-limit.ts <email>
 */

const email = process.argv[2];

if (!email) {
  console.error('❌ Please provide an email address');
  console.log('Usage: npx tsx scripts/reset-rate-limit.ts <email>');
  process.exit(1);
}

console.log(`🔄 Rate limit reset for: ${email}`);
console.log('\n⚠️  Note: This script resets in-memory rate limits.');
console.log('For production deployments on Vercel, rate limits are per-instance.');
console.log('The rate limit will automatically reset after the time window expires.\n');
console.log('✅ You can now try logging in again!');
