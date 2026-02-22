import { createClient } from '@libsql/client';
import type { Client } from '@libsql/client';
import path from 'path';
import fs from 'fs';

// Database client
let db: Client;

// Initialize database connection
if (process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN) {
  // Production: Use Turso
  db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
} else {
  // Local development: Use local SQLite file
  const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'hrisa-portfolio.db');
  db = createClient({
    url: `file:${dbPath}`,
  });
}

export { db };

/**
 * Initialize database schema
 */
export async function initializeSchema() {
  const schemaPath = path.join(process.cwd(), 'lib', 'db', 'schema.sql');

  if (!fs.existsSync(schemaPath)) {
    throw new Error(`Schema file not found at ${schemaPath}`);
  }

  const schema = fs.readFileSync(schemaPath, 'utf-8');

  // Split by semicolons and execute each statement
  const statements = schema
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  for (const statement of statements) {
    await db.execute(statement);
  }

  console.log('✅ Database schema initialized');
}

/**
 * Cleanup expired records
 * Run this periodically (e.g., daily cron job)
 */
export async function cleanupExpired() {
  const now = Math.floor(Date.now() / 1000);

  const deletedSessions = await db.execute({
    sql: 'DELETE FROM sessions WHERE expires_at < ?',
    args: [now]
  });

  const deletedMagicLinks = await db.execute({
    sql: 'DELETE FROM magic_links WHERE expires_at < ? AND consumed_at IS NULL',
    args: [now]
  });

  const deletedShareLinks = await db.execute({
    sql: 'DELETE FROM share_links WHERE expires_at < ?',
    args: [now]
  });

  console.log(`🧹 Cleanup complete:
    - Expired sessions: ${deletedSessions.rowsAffected}
    - Expired magic links: ${deletedMagicLinks.rowsAffected}
    - Expired share links: ${deletedShareLinks.rowsAffected}
  `);

  return {
    sessions: deletedSessions.rowsAffected,
    magicLinks: deletedMagicLinks.rowsAffected,
    shareLinks: deletedShareLinks.rowsAffected,
  };
}

/**
 * Get database statistics
 */
export async function getDatabaseStats() {
  const usersResult = await db.execute('SELECT COUNT(*) as count FROM users');
  const pendingUsersResult = await db.execute({
    sql: 'SELECT COUNT(*) as count FROM users WHERE status = ?',
    args: ['PENDING']
  });
  const activeSessionsResult = await db.execute({
    sql: 'SELECT COUNT(*) as count FROM sessions WHERE expires_at > ?',
    args: [Math.floor(Date.now() / 1000)]
  });
  const protectedResourcesResult = await db.execute('SELECT COUNT(*) as count FROM protected_resources');
  const activeShareLinksResult = await db.execute({
    sql: 'SELECT COUNT(*) as count FROM share_links WHERE expires_at > ?',
    args: [Math.floor(Date.now() / 1000)]
  });

  const stats = {
    users: usersResult.rows[0] as unknown as { count: number },
    pendingUsers: pendingUsersResult.rows[0] as unknown as { count: number },
    activeSessions: activeSessionsResult.rows[0] as unknown as { count: number },
    protectedResources: protectedResourcesResult.rows[0] as unknown as { count: number },
    activeShareLinks: activeShareLinksResult.rows[0] as unknown as { count: number },
  };

  return stats;
}

export default db;
