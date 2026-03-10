#!/usr/bin/env tsx
/**
 * Add missing columns to sessions table
 */
import { db } from '../lib/db/index.js';

async function addColumn(columnName: string, columnDef: string, defaultValue?: any) {
  try {
    console.log(`🔧 Adding ${columnName} column...`);
    await db.execute(`ALTER TABLE sessions ADD COLUMN ${columnName} ${columnDef}`);
    console.log(`✅ ${columnName} added!`);

    if (defaultValue !== undefined) {
      console.log(`🔄 Setting default values for ${columnName}...`);
      await db.execute(`UPDATE sessions SET ${columnName} = ${defaultValue} WHERE ${columnName} IS NULL`);
      console.log(`✅ Default values set!`);
    }
  } catch (error: any) {
    if (error.message.includes('duplicate column name')) {
      console.log(`ℹ️  ${columnName} already exists, skipping...`);
    } else {
      throw error;
    }
  }
}

async function fixSessionsTable() {
  try {
    console.log('🔧 Migrating sessions table schema...\n');

    // Add all missing columns
    await addColumn('last_activity_at', 'INTEGER');
    await addColumn('is_suspicious', 'INTEGER DEFAULT 0', 0);
    await addColumn('invalidated_at', 'INTEGER');

    // Update last_activity_at for existing sessions
    console.log('\n🔄 Updating last_activity_at for existing sessions...');
    await db.execute('UPDATE sessions SET last_activity_at = created_at WHERE last_activity_at IS NULL');
    console.log('✅ Existing sessions updated!');

    console.log('\n🎉 Migration complete!');

  } catch (error: any) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixSessionsTable();
