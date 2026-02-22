import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Database file path
const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'hrisa-portfolio.db');

// Ensure data directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Create database connection
export const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Performance optimizations
db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');

/**
 * Initialize database schema
 */
export function initializeSchema() {
  const schemaPath = path.join(process.cwd(), 'lib', 'db', 'schema.sql');

  if (!fs.existsSync(schemaPath)) {
    throw new Error(`Schema file not found at ${schemaPath}`);
  }

  const schema = fs.readFileSync(schemaPath, 'utf-8');
  db.exec(schema);

  console.log('✅ Database schema initialized');
}

/**
 * Cleanup expired records
 * Run this periodically (e.g., daily cron job)
 */
export function cleanupExpired() {
  const now = Math.floor(Date.now() / 1000);

  const deletedSessions = db.prepare('DELETE FROM sessions WHERE expires_at < ?').run(now);
  const deletedMagicLinks = db.prepare('DELETE FROM magic_links WHERE expires_at < ? AND consumed_at IS NULL').run(now);
  const deletedShareLinks = db.prepare('DELETE FROM share_links WHERE expires_at < ?').run(now);

  console.log(`🧹 Cleanup complete:
    - Expired sessions: ${deletedSessions.changes}
    - Expired magic links: ${deletedMagicLinks.changes}
    - Expired share links: ${deletedShareLinks.changes}
  `);

  return {
    sessions: deletedSessions.changes,
    magicLinks: deletedMagicLinks.changes,
    shareLinks: deletedShareLinks.changes,
  };
}

/**
 * Get database statistics
 */
export function getDatabaseStats() {
  const stats = {
    users: db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number },
    pendingUsers: db.prepare('SELECT COUNT(*) as count FROM users WHERE status = ?').get('PENDING') as { count: number },
    activeSessions: db.prepare('SELECT COUNT(*) as count FROM sessions WHERE expires_at > ?').get(Math.floor(Date.now() / 1000)) as { count: number },
    protectedResources: db.prepare('SELECT COUNT(*) as count FROM protected_resources').get() as { count: number },
    activeShareLinks: db.prepare('SELECT COUNT(*) as count FROM share_links WHERE expires_at > ?').get(Math.floor(Date.now() / 1000)) as { count: number },
  };

  return stats;
}

// Initialize schema on first import
if (!fs.existsSync(dbPath)) {
  console.log('📦 Database not found. Initializing...');
  initializeSchema();
}

export default db;
