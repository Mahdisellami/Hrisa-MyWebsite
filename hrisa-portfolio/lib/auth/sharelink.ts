import crypto from 'crypto';
import { db } from '@/lib/db';
import { nanoid } from 'nanoid';
import type { ResourceType } from './permissions';

export interface ShareLink {
  id: string;
  token: string;
  created_by: string;
  resource_type: ResourceType | 'ALL';
  resource_id: string | null;
  expires_at: number;
  max_uses: number | null;
  use_count: number;
  created_at: number;
}

/**
 * Generate a shareable access link
 */
export function generateShareLink(
  createdBy: string,
  resourceType: ResourceType | 'ALL',
  resourceId: string | null,
  expiresInHours: number = 24,
  maxUses: number | null = null
): ShareLink {
  const id = nanoid();
  const token = crypto.randomBytes(32).toString('hex');
  const now = Math.floor(Date.now() / 1000);
  const expiresAt = now + (expiresInHours * 60 * 60);

  db.prepare(`
    INSERT INTO share_links (id, token, created_by, resource_type, resource_id, expires_at, max_uses, use_count, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?)
  `).run(id, token, createdBy, resourceType, resourceId, expiresAt, maxUses, now);

  return {
    id,
    token,
    created_by: createdBy,
    resource_type: resourceType,
    resource_id: resourceId,
    expires_at: expiresAt,
    max_uses: maxUses,
    use_count: 0,
    created_at: now,
  };
}

/**
 * Validate and increment usage of a share link
 */
export function validateShareLink(token: string): {
  valid: boolean;
  shareLink?: ShareLink;
  error?: string;
} {
  const now = Math.floor(Date.now() / 1000);

  const link = db.prepare(`
    SELECT * FROM share_links
    WHERE token = ?
  `).get(token) as any;

  if (!link) {
    return { valid: false, error: 'Invalid share link' };
  }

  if (link.expires_at < now) {
    return { valid: false, error: 'Share link has expired' };
  }

  if (link.max_uses !== null && link.use_count >= link.max_uses) {
    return { valid: false, error: 'Share link has reached maximum uses' };
  }

  // Increment use count
  db.prepare('UPDATE share_links SET use_count = use_count + 1 WHERE id = ?').run(link.id);

  return {
    valid: true,
    shareLink: {
      ...link,
      use_count: link.use_count + 1,
    },
  };
}

/**
 * Get share link by token (without incrementing usage)
 */
export function getShareLink(token: string): ShareLink | null {
  const link = db.prepare('SELECT * FROM share_links WHERE token = ?').get(token) as any;
  return link || null;
}

/**
 * Get all share links created by a user
 */
export function getUserShareLinks(userId: string): ShareLink[] {
  return db.prepare(`
    SELECT * FROM share_links
    WHERE created_by = ?
    ORDER BY created_at DESC
  `).all(userId) as ShareLink[];
}

/**
 * Get all active share links
 */
export function getActiveShareLinks(): ShareLink[] {
  const now = Math.floor(Date.now() / 1000);

  return db.prepare(`
    SELECT * FROM share_links
    WHERE expires_at > ?
    ORDER BY created_at DESC
  `).all(now) as ShareLink[];
}

/**
 * Revoke a share link
 */
export function revokeShareLink(id: string): boolean {
  const result = db.prepare('DELETE FROM share_links WHERE id = ?').run(id);
  return result.changes > 0;
}

/**
 * Revoke all share links for a resource
 */
export function revokeResourceShareLinks(resourceType: ResourceType, resourceId: string): number {
  const result = db.prepare(`
    DELETE FROM share_links
    WHERE resource_type = ? AND resource_id = ?
  `).run(resourceType, resourceId);
  return result.changes;
}

/**
 * Get share link statistics
 */
export function getShareLinkStats() {
  const now = Math.floor(Date.now() / 1000);

  return {
    total: db.prepare('SELECT COUNT(*) as count FROM share_links').get() as { count: number },
    active: db.prepare('SELECT COUNT(*) as count FROM share_links WHERE expires_at > ?').get(now) as { count: number },
    expired: db.prepare('SELECT COUNT(*) as count FROM share_links WHERE expires_at <= ?').get(now) as { count: number },
    totalUses: db.prepare('SELECT SUM(use_count) as total FROM share_links').get() as { total: number | null },
  };
}
