import { db } from '@/lib/db';

export type Role = 'PUBLIC' | 'EDITOR' | 'ADMIN';
export type ResourceType = 'PAGE' | 'SECTION' | 'PROJECT';

interface ProtectedResource {
  id: string;
  resource_type: ResourceType;
  resource_id: string;
  min_role: Role;
}

const roleHierarchy: Record<Role, number> = {
  PUBLIC: 0,
  EDITOR: 1,
  ADMIN: 2,
};

/**
 * Check if a role has sufficient permissions
 */
export function hasPermission(userRole: Role, requiredRole: Role): boolean {
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

/**
 * Check if a resource is protected
 */
export async function getProtectedResource(
  resourceType: ResourceType,
  resourceId: string
): Promise<ProtectedResource | null> {
  const result = await db.execute({
    sql: `SELECT * FROM protected_resources
          WHERE resource_type = ? AND resource_id = ?`,
    args: [resourceType, resourceId]
  });

  return result.rows.length > 0 ? (result.rows[0] as unknown as ProtectedResource) : null;
}

/**
 * Check if user has access to a resource
 */
export async function checkResourceAccess(
  userRole: Role | null,
  resourceType: ResourceType,
  resourceId: string
): Promise<{ hasAccess: boolean; reason?: string }> {
  const resource = await getProtectedResource(resourceType, resourceId);

  // If resource is not protected, allow access
  if (!resource) {
    return { hasAccess: true };
  }

  // If no user role (not logged in), deny access
  if (!userRole) {
    return { hasAccess: false, reason: 'Authentication required' };
  }

  // Check if user role meets minimum requirement
  const hasAccess = hasPermission(userRole, resource.min_role as Role);

  return {
    hasAccess,
    reason: hasAccess ? undefined : `Requires ${resource.min_role} role or higher`,
  };
}

/**
 * Check if share link grants access to a resource
 */
export async function checkShareLinkAccess(
  shareToken: string,
  resourceType: ResourceType,
  resourceId: string
): Promise<{ hasAccess: boolean; reason?: string }> {
  const now = Math.floor(Date.now() / 1000);

  const result = await db.execute({
    sql: `SELECT * FROM share_links
          WHERE token = ? AND expires_at > ?`,
    args: [shareToken, now]
  });

  if (result.rows.length === 0) {
    return { hasAccess: false, reason: 'Invalid or expired share link' };
  }

  const shareLink = result.rows[0] as any;

  // Check if max uses exceeded
  if (shareLink.max_uses !== null && shareLink.use_count >= shareLink.max_uses) {
    return { hasAccess: false, reason: 'Share link has reached maximum uses' };
  }

  // Check if share link grants access to this specific resource
  if (shareLink.resource_type === 'ALL') {
    // ALL grants access to everything
    return { hasAccess: true };
  }

  if (shareLink.resource_type === resourceType && shareLink.resource_id === resourceId) {
    // Exact match
    return { hasAccess: true };
  }

  return { hasAccess: false, reason: 'Share link does not grant access to this resource' };
}

/**
 * Combined access check (user role OR share link)
 */
export async function checkAccess(
  userRole: Role | null,
  shareToken: string | null,
  resourceType: ResourceType,
  resourceId: string
): Promise<{ hasAccess: boolean; reason?: string; method?: 'user' | 'share' }> {
  // Try user role first
  if (userRole) {
    const userAccess = await checkResourceAccess(userRole, resourceType, resourceId);
    if (userAccess.hasAccess) {
      return { ...userAccess, method: 'user' };
    }
  }

  // Try share link
  if (shareToken) {
    const shareAccess = await checkShareLinkAccess(shareToken, resourceType, resourceId);
    if (shareAccess.hasAccess) {
      return { ...shareAccess, method: 'share' };
    }
  }

  // Both failed
  return { hasAccess: false, reason: 'Access denied' };
}

/**
 * Get all protected resources
 */
export async function getAllProtectedResources(): Promise<ProtectedResource[]> {
  const result = await db.execute('SELECT * FROM protected_resources ORDER BY resource_type, resource_id');
  return result.rows as unknown as ProtectedResource[];
}

/**
 * Add or update a protected resource
 */
export async function protectResource(
  resourceType: ResourceType,
  resourceId: string,
  minRole: Role
): Promise<void> {
  const now = Math.floor(Date.now() / 1000);
  const existing = await getProtectedResource(resourceType, resourceId);

  if (existing) {
    await db.execute({
      sql: `UPDATE protected_resources
            SET min_role = ?, updated_at = ?
            WHERE resource_type = ? AND resource_id = ?`,
      args: [minRole, now, resourceType, resourceId]
    });
  } else {
    const { nanoid } = require('nanoid');
    await db.execute({
      sql: `INSERT INTO protected_resources (id, resource_type, resource_id, min_role, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [nanoid(), resourceType, resourceId, minRole, now, now]
    });
  }
}

/**
 * Remove protection from a resource
 */
export async function unprotectResource(
  resourceType: ResourceType,
  resourceId: string
): Promise<void> {
  await db.execute({
    sql: `DELETE FROM protected_resources
          WHERE resource_type = ? AND resource_id = ?`,
    args: [resourceType, resourceId]
  });
}
