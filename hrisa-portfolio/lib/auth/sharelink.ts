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
export async function generateShareLink(
  createdBy: string,
  resourceType: ResourceType | 'ALL',
  resourceId: string | null,
  expiresInHours: number = 24,
  maxUses: number | null = null
): Promise<ShareLink> {
  const id = nanoid();
  const token = crypto.randomBytes(32).toString('hex');
  const now = Math.floor(Date.now() / 1000);
  const expiresAt = now + (expiresInHours * 60 * 60);

  await db.execute({
    sql: `INSERT INTO share_links (id, token, created_by, resource_type, resource_id, expires_at, max_uses, use_count, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?)`,
    args: [id, token, createdBy, resourceType, resourceId, expiresAt, maxUses, now]
  });

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
export async function validateShareLink(token: string): Promise<{
  valid: boolean;
  shareLink?: ShareLink;
  error?: string;
}> {
  const now = Math.floor(Date.now() / 1000);

  const result = await db.execute({
    sql: 'SELECT * FROM share_links WHERE token = ?',
    args: [token]
  });

  if (result.rows.length === 0) {
    return { valid: false, error: 'Invalid share link' };
  }

  const link = result.rows[0] as any;

  if (link.expires_at < now) {
    return { valid: false, error: 'Share link has expired' };
  }

  if (link.max_uses !== null && link.use_count >= link.max_uses) {
    return { valid: false, error: 'Share link has reached maximum uses' };
  }

  // Increment use count
  await db.execute({
    sql: 'UPDATE share_links SET use_count = use_count + 1 WHERE id = ?',
    args: [link.id]
  });

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
export async function getShareLink(token: string): Promise<ShareLink | null> {
  const result = await db.execute({
    sql: 'SELECT * FROM share_links WHERE token = ?',
    args: [token]
  });
  return result.rows.length > 0 ? (result.rows[0] as unknown as ShareLink) : null;
}

/**
 * Get all share links created by a user
 */
export async function getUserShareLinks(userId: string): Promise<ShareLink[]> {
  const result = await db.execute({
    sql: `SELECT * FROM share_links
          WHERE created_by = ?
          ORDER BY created_at DESC`,
    args: [userId]
  });
  return result.rows as unknown as ShareLink[];
}

/**
 * Get all active share links
 */
export async function getActiveShareLinks(): Promise<ShareLink[]> {
  const now = Math.floor(Date.now() / 1000);

  const result = await db.execute({
    sql: `SELECT * FROM share_links
          WHERE expires_at > ?
          ORDER BY created_at DESC`,
    args: [now]
  });
  return result.rows as unknown as ShareLink[];
}

/**
 * Revoke a share link
 */
export async function revokeShareLink(id: string): Promise<boolean> {
  const result = await db.execute({
    sql: 'DELETE FROM share_links WHERE id = ?',
    args: [id]
  });
  return result.rowsAffected > 0;
}

/**
 * Revoke all share links for a resource
 */
export async function revokeResourceShareLinks(resourceType: ResourceType, resourceId: string): Promise<number> {
  const result = await db.execute({
    sql: `DELETE FROM share_links
          WHERE resource_type = ? AND resource_id = ?`,
    args: [resourceType, resourceId]
  });
  return result.rowsAffected;
}

/**
 * Get share link statistics
 */
export async function getShareLinkStats() {
  const now = Math.floor(Date.now() / 1000);

  const totalResult = await db.execute('SELECT COUNT(*) as count FROM share_links');
  const activeResult = await db.execute({
    sql: 'SELECT COUNT(*) as count FROM share_links WHERE expires_at > ?',
    args: [now]
  });
  const expiredResult = await db.execute({
    sql: 'SELECT COUNT(*) as count FROM share_links WHERE expires_at <= ?',
    args: [now]
  });
  const totalUsesResult = await db.execute('SELECT SUM(use_count) as total FROM share_links');

  return {
    total: totalResult.rows[0] as unknown as { count: number },
    active: activeResult.rows[0] as unknown as { count: number },
    expired: expiredResult.rows[0] as unknown as { count: number },
    totalUses: totalUsesResult.rows[0] as unknown as { total: number | null },
  };
}
