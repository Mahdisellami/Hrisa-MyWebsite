import { db } from '@/lib/db';
import { nanoid } from 'nanoid';
import type { ResourceType } from './permissions';

export type AuditAction =
  | 'LOGIN'
  | 'LOGOUT'
  | 'REGISTRATION_REQUEST'
  | 'REGISTRATION_APPROVED'
  | 'REGISTRATION_REJECTED'
  | 'ACCESS_GRANTED'
  | 'ACCESS_DENIED'
  | 'SHARE_LINK_CREATED'
  | 'SHARE_LINK_USED'
  | 'SHARE_LINK_REVOKED'
  | 'PERMISSION_CREATED'
  | 'PERMISSION_UPDATED'
  | 'PERMISSION_DELETED'
  | 'USER_CREATED'
  | 'USER_UPDATED'
  | 'USER_DELETED';

export interface AuditLogOptions {
  userId?: string | null;
  action: AuditAction;
  resourceType?: ResourceType | 'ALL' | null;
  resourceId?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  metadata?: Record<string, any>;
}

/**
 * Log an audit event
 */
export async function logAudit(options: AuditLogOptions): Promise<void> {
  const id = nanoid();
  const now = Math.floor(Date.now() / 1000);
  const metadata = options.metadata ? JSON.stringify(options.metadata) : null;

  try {
    await db.execute({
      sql: `INSERT INTO audit_log (id, user_id, action, resource_type, resource_id, ip_address, user_agent, metadata, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id,
        options.userId || null,
        options.action,
        options.resourceType || null,
        options.resourceId || null,
        options.ipAddress || null,
        options.userAgent || null,
        metadata,
        now
      ]
    });
  } catch (error) {
    console.error('Failed to log audit event:', error);
    // Don't throw - audit logging should not break the main flow
  }
}

/**
 * Get audit logs with optional filters
 */
export async function getAuditLogs(options: {
  userId?: string;
  action?: AuditAction;
  limit?: number;
  offset?: number;
}) {
  let query = 'SELECT * FROM audit_log WHERE 1=1';
  const params: any[] = [];

  if (options.userId) {
    query += ' AND user_id = ?';
    params.push(options.userId);
  }

  if (options.action) {
    query += ' AND action = ?';
    params.push(options.action);
  }

  query += ' ORDER BY created_at DESC';

  if (options.limit) {
    query += ' LIMIT ?';
    params.push(options.limit);

    if (options.offset) {
      query += ' OFFSET ?';
      params.push(options.offset);
    }
  }

  const result = await db.execute({ sql: query, args: params });
  return result.rows;
}

/**
 * Get audit statistics
 */
export async function getAuditStats() {
  const now = Math.floor(Date.now() / 1000);
  const last24h = now - (24 * 60 * 60);
  const last7d = now - (7 * 24 * 60 * 60);

  const totalResult = await db.execute('SELECT COUNT(*) as count FROM audit_log');
  const last24hResult = await db.execute({
    sql: 'SELECT COUNT(*) as count FROM audit_log WHERE created_at > ?',
    args: [last24h]
  });
  const last7dResult = await db.execute({
    sql: 'SELECT COUNT(*) as count FROM audit_log WHERE created_at > ?',
    args: [last7d]
  });
  const byActionResult = await db.execute(`
    SELECT action, COUNT(*) as count
    FROM audit_log
    GROUP BY action
    ORDER BY count DESC
  `);

  return {
    total: totalResult.rows[0] as unknown as { count: number },
    last24h: last24hResult.rows[0] as unknown as { count: number },
    last7d: last7dResult.rows[0] as unknown as { count: number },
    byAction: byActionResult.rows as unknown as Array<{ action: string; count: number }>,
  };
}
