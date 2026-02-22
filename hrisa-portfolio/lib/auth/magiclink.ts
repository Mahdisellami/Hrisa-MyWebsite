import crypto from 'crypto';
import { db } from '@/lib/db';
import { nanoid } from 'nanoid';

export interface MagicLink {
  id: string;
  email: string;
  token: string;
  expires_at: number;
  created_at: number;
}

const MAGIC_LINK_DURATION = 15 * 60; // 15 minutes in seconds

/**
 * Generate a magic link for email authentication
 */
export async function generateMagicLink(email: string, ipAddress?: string): Promise<MagicLink> {
  const id = nanoid();
  const token = crypto.randomBytes(32).toString('hex');
  const now = Math.floor(Date.now() / 1000);
  const expiresAt = now + MAGIC_LINK_DURATION;

  await db.execute({
    sql: `INSERT INTO magic_links (id, email, token, expires_at, created_at, ip_address)
          VALUES (?, ?, ?, ?, ?, ?)`,
    args: [id, email.toLowerCase(), token, expiresAt, now, ipAddress || null]
  });

  return {
    id,
    email: email.toLowerCase(),
    token,
    expires_at: expiresAt,
    created_at: now,
  };
}

/**
 * Verify and consume a magic link token
 */
export async function verifyMagicLink(token: string): Promise<{ valid: boolean; email?: string; error?: string }> {
  const now = Math.floor(Date.now() / 1000);

  const result = await db.execute({
    sql: 'SELECT * FROM magic_links WHERE token = ?',
    args: [token]
  });

  if (result.rows.length === 0) {
    return { valid: false, error: 'Invalid token' };
  }

  const link = result.rows[0] as any;

  if (link.consumed_at) {
    return { valid: false, error: 'Token already used' };
  }

  if (link.expires_at < now) {
    return { valid: false, error: 'Token expired' };
  }

  // Mark as consumed
  await db.execute({
    sql: 'UPDATE magic_links SET consumed_at = ? WHERE id = ?',
    args: [now, link.id]
  });

  return { valid: true, email: link.email };
}

/**
 * Check if user has requested too many magic links recently
 */
export async function checkMagicLinkRateLimit(email: string, windowMinutes: number = 15, maxAttempts: number = 3): Promise<boolean> {
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - (windowMinutes * 60);

  const result = await db.execute({
    sql: `SELECT COUNT(*) as count
          FROM magic_links
          WHERE email = ? AND created_at > ?`,
    args: [email.toLowerCase(), windowStart]
  });

  const count = result.rows[0] as unknown as { count: number };
  return count.count < maxAttempts;
}

/**
 * Get magic link statistics for debugging
 */
export async function getMagicLinkStats(email?: string) {
  const now = Math.floor(Date.now() / 1000);

  if (email) {
    const totalResult = await db.execute({
      sql: 'SELECT COUNT(*) as count FROM magic_links WHERE email = ?',
      args: [email.toLowerCase()]
    });
    const activeResult = await db.execute({
      sql: 'SELECT COUNT(*) as count FROM magic_links WHERE email = ? AND expires_at > ? AND consumed_at IS NULL',
      args: [email.toLowerCase(), now]
    });
    const consumedResult = await db.execute({
      sql: 'SELECT COUNT(*) as count FROM magic_links WHERE email = ? AND consumed_at IS NOT NULL',
      args: [email.toLowerCase()]
    });

    return {
      total: totalResult.rows[0] as unknown as { count: number },
      active: activeResult.rows[0] as unknown as { count: number },
      consumed: consumedResult.rows[0] as unknown as { count: number },
    };
  }

  const totalResult = await db.execute('SELECT COUNT(*) as count FROM magic_links');
  const activeResult = await db.execute({
    sql: 'SELECT COUNT(*) as count FROM magic_links WHERE expires_at > ? AND consumed_at IS NULL',
    args: [now]
  });
  const consumedResult = await db.execute('SELECT COUNT(*) as count FROM magic_links WHERE consumed_at IS NOT NULL');

  return {
    total: totalResult.rows[0] as unknown as { count: number },
    active: activeResult.rows[0] as unknown as { count: number },
    consumed: consumedResult.rows[0] as unknown as { count: number },
  };
}
