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
export function getProtectedResource(
  resourceType: ResourceType,
  resourceId: string
): ProtectedResource | null {
  const result = db.prepare(`
    SELECT * FROM protected_resources
    WHERE resource_type = ? AND resource_id = ?
  `).get(resourceType, resourceId) as any;

  return result || null;
}

/**
 * Check if user has access to a resource
 */
export function checkResourceAccess(
  userRole: Role | null,
  resourceType: ResourceType,
  resourceId: string
): { hasAccess: boolean; reason?: string } {
  const resource = getProtectedResource(resourceType, resourceId);

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
export function checkShareLinkAccess(
  shareToken: string,
  resourceType: ResourceType,
  resourceId: string
): { hasAccess: boolean; reason?: string } {
  const now = Math.floor(Date.now() / 1000);

  const shareLink = db.prepare(`
    SELECT * FROM share_links
    WHERE token = ? AND expires_at > ?
  `).get(shareToken, now) as any;

  if (!shareLink) {
    return { hasAccess: false, reason: 'Invalid or expired share link' };
  }

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
export function checkAccess(
  userRole: Role | null,
  shareToken: string | null,
  resourceType: ResourceType,
  resourceId: string
): { hasAccess: boolean; reason?: string; method?: 'user' | 'share' } {
  // Try user role first
  if (userRole) {
    const userAccess = checkResourceAccess(userRole, resourceType, resourceId);
    if (userAccess.hasAccess) {
      return { ...userAccess, method: 'user' };
    }
  }

  // Try share link
  if (shareToken) {
    const shareAccess = checkShareLinkAccess(shareToken, resourceType, resourceId);
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
export function getAllProtectedResources(): ProtectedResource[] {
  return db.prepare('SELECT * FROM protected_resources ORDER BY resource_type, resource_id').all() as ProtectedResource[];
}

/**
 * Add or update a protected resource
 */
export function protectResource(
  resourceType: ResourceType,
  resourceId: string,
  minRole: Role
): void {
  const now = Math.floor(Date.now() / 1000);
  const existing = getProtectedResource(resourceType, resourceId);

  if (existing) {
    db.prepare(`
      UPDATE protected_resources
      SET min_role = ?, updated_at = ?
      WHERE resource_type = ? AND resource_id = ?
    `).run(minRole, now, resourceType, resourceId);
  } else {
    const { nanoid } = require('nanoid');
    db.prepare(`
      INSERT INTO protected_resources (id, resource_type, resource_id, min_role, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(nanoid(), resourceType, resourceId, minRole, now, now);
  }
}

/**
 * Remove protection from a resource
 */
export function unprotectResource(
  resourceType: ResourceType,
  resourceId: string
): void {
  db.prepare(`
    DELETE FROM protected_resources
    WHERE resource_type = ? AND resource_id = ?
  `).run(resourceType, resourceId);
}
