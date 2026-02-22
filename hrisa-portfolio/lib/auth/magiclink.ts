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
export function generateMagicLink(email: string, ipAddress?: string): MagicLink {
  const id = nanoid();
  const token = crypto.randomBytes(32).toString('hex');
  const now = Math.floor(Date.now() / 1000);
  const expiresAt = now + MAGIC_LINK_DURATION;

  db.prepare(`
    INSERT INTO magic_links (id, email, token, expires_at, created_at, ip_address)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(id, email.toLowerCase(), token, expiresAt, now, ipAddress || null);

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
export function verifyMagicLink(token: string): { valid: boolean; email?: string; error?: string } {
  const now = Math.floor(Date.now() / 1000);

  const link = db.prepare(`
    SELECT * FROM magic_links
    WHERE token = ?
  `).get(token) as any;

  if (!link) {
    return { valid: false, error: 'Invalid token' };
  }

  if (link.consumed_at) {
    return { valid: false, error: 'Token already used' };
  }

  if (link.expires_at < now) {
    return { valid: false, error: 'Token expired' };
  }

  // Mark as consumed
  db.prepare('UPDATE magic_links SET consumed_at = ? WHERE id = ?').run(now, link.id);

  return { valid: true, email: link.email };
}

/**
 * Check if user has requested too many magic links recently
 */
export function checkMagicLinkRateLimit(email: string, windowMinutes: number = 15, maxAttempts: number = 3): boolean {
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - (windowMinutes * 60);

  const count = db.prepare(`
    SELECT COUNT(*) as count
    FROM magic_links
    WHERE email = ? AND created_at > ?
  `).get(email.toLowerCase(), windowStart) as { count: number };

  return count.count < maxAttempts;
}

/**
 * Get magic link statistics for debugging
 */
export function getMagicLinkStats(email?: string) {
  const now = Math.floor(Date.now() / 1000);

  if (email) {
    return {
      total: db.prepare('SELECT COUNT(*) as count FROM magic_links WHERE email = ?').get(email.toLowerCase()) as { count: number },
      active: db.prepare('SELECT COUNT(*) as count FROM magic_links WHERE email = ? AND expires_at > ? AND consumed_at IS NULL').get(email.toLowerCase(), now) as { count: number },
      consumed: db.prepare('SELECT COUNT(*) as count FROM magic_links WHERE email = ? AND consumed_at IS NOT NULL').get(email.toLowerCase()) as { count: number },
    };
  }

  return {
    total: db.prepare('SELECT COUNT(*) as count FROM magic_links').get() as { count: number },
    active: db.prepare('SELECT COUNT(*) as count FROM magic_links WHERE expires_at > ? AND consumed_at IS NULL').get(now) as { count: number },
    consumed: db.prepare('SELECT COUNT(*) as count FROM magic_links WHERE consumed_at IS NOT NULL').get() as { count: number },
  };
}
