/**
 * Initialize Turso database schema
 * Run this script once to set up your Turso database
 */

import { initializeSchema } from '../lib/db/index.js';

async function main() {
  console.log('🚀 Initializing Turso database...\n');

  try {
    await initializeSchema();
    console.log('\n✅ Turso database initialized successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Run: npm run create:admin (to create your admin user)');
    console.log('2. Run: npm run seed:protections (to seed protected resources)');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

main();
