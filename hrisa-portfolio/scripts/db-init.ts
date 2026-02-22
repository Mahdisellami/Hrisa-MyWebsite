#!/usr/bin/env tsx

import { initializeSchema, getDatabaseStats } from '../lib/db/index.js';

console.log('🚀 Initializing Hrisa Portfolio Database...\n');

try {
  // Initialize schema
  initializeSchema();

  // Show stats
  const stats = getDatabaseStats();
  console.log('\n📊 Database Statistics:');
  console.log(`  - Total users: ${stats.users.count}`);
  console.log(`  - Pending users: ${stats.pendingUsers.count}`);
  console.log(`  - Active sessions: ${stats.activeSessions.count}`);
  console.log(`  - Protected resources: ${stats.protectedResources.count}`);
  console.log(`  - Active share links: ${stats.activeShareLinks.count}`);

  console.log('\n✅ Database initialization complete!');
  console.log('\nNext steps:');
  console.log('  1. Run: npm run create:admin -- --email your@email.com');
  console.log('  2. Run: npm run seed:protections');
  console.log('  3. Set up your .env.local file with RESEND_API_KEY');
} catch (error) {
  console.error('❌ Database initialization failed:', error);
  process.exit(1);
}
