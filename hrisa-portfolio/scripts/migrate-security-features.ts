#!/usr/bin/env tsx

/**
 * Migration script for adding security features
 * - Adds user_resource_permissions table
 * - Updates sessions table with security columns
 * - Creates necessary indexes
 */

import { db } from '../lib/db/index.js';

async function checkTableExists(tableName: string): Promise<boolean> {
  const result = await db.execute({
    sql: `SELECT name FROM sqlite_master WHERE type='table' AND name=?`,
    args: [tableName]
  });
  return result.rows.length > 0;
}

async function checkColumnExists(tableName: string, columnName: string): Promise<boolean> {
  const result = await db.execute({
    sql: `PRAGMA table_info(${tableName})`
  });
  return result.rows.some((row: any) => row.name === columnName);
}

async function migrateSecurity() {
  console.log('🔐 Starting security features migration...\n');

  try {
    // 1. Create user_resource_permissions table if it doesn't exist
    console.log('📦 Creating user_resource_permissions table...');
    const hasPermissionsTable = await checkTableExists('user_resource_permissions');

    if (!hasPermissionsTable) {
      await db.execute(`
        CREATE TABLE user_resource_permissions (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          resource_type TEXT NOT NULL,
          resource_id TEXT NOT NULL,
          granted_by TEXT NOT NULL,
          granted_at INTEGER NOT NULL,
          expires_at INTEGER,
          created_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (granted_by) REFERENCES users(id),
          UNIQUE(user_id, resource_type, resource_id)
        )
      `);

      await db.execute(`CREATE INDEX idx_user_permissions_user ON user_resource_permissions(user_id)`);
      await db.execute(`CREATE INDEX idx_user_permissions_resource ON user_resource_permissions(resource_type, resource_id)`);
      await db.execute(`CREATE INDEX idx_user_permissions_lookup ON user_resource_permissions(user_id, resource_type, resource_id)`);
      await db.execute(`CREATE INDEX idx_user_permissions_expires ON user_resource_permissions(expires_at)`);

      console.log('✅ user_resource_permissions table created');
    } else {
      console.log('⏭️  user_resource_permissions table already exists');
    }

    // 2. Migrate sessions table (SQLite requires recreating the table)
    console.log('\n📦 Updating sessions table with security columns...');
    const hasLastActivity = await checkColumnExists('sessions', 'last_activity_at');

    if (!hasLastActivity) {
      // SQLite doesn't support ADD COLUMN for multiple columns with constraints
      // So we need to recreate the table
      console.log('   Creating backup of sessions...');
      await db.execute(`
        CREATE TABLE sessions_backup AS SELECT * FROM sessions
      `);

      console.log('   Dropping old sessions table...');
      await db.execute(`DROP TABLE sessions`);

      console.log('   Creating new sessions table with security columns...');
      await db.execute(`
        CREATE TABLE sessions (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          token TEXT UNIQUE NOT NULL,
          expires_at INTEGER NOT NULL,
          created_at INTEGER NOT NULL,
          last_activity_at INTEGER NOT NULL,
          user_agent TEXT,
          ip_address TEXT,
          is_suspicious INTEGER DEFAULT 0,
          invalidated_at INTEGER,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);

      console.log('   Restoring sessions data...');
      await db.execute(`
        INSERT INTO sessions (id, user_id, token, expires_at, created_at, last_activity_at, user_agent, ip_address, is_suspicious, invalidated_at)
        SELECT id, user_id, token, expires_at, created_at, created_at, user_agent, ip_address, 0, NULL
        FROM sessions_backup
      `);

      console.log('   Dropping backup table...');
      await db.execute(`DROP TABLE sessions_backup`);

      console.log('   Creating indexes...');
      await db.execute(`CREATE INDEX idx_sessions_token ON sessions(token)`);
      await db.execute(`CREATE INDEX idx_sessions_user_id ON sessions(user_id)`);
      await db.execute(`CREATE INDEX idx_sessions_expires_at ON sessions(expires_at)`);
      await db.execute(`CREATE INDEX idx_sessions_last_activity ON sessions(last_activity_at)`);

      console.log('✅ sessions table updated with security columns');
    } else {
      console.log('⏭️  sessions table already has security columns');
    }

    console.log('\n✅ Security features migration completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Run: npm run migrate:existing-users (to grant existing users access to all sections)');
    console.log('2. Run: npm run create:admin (if you haven\'t created an admin user yet)');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

migrateSecurity()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
