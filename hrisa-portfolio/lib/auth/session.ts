import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { nanoid } from 'nanoid';
import crypto from 'crypto';
import { logSuspiciousSession, logAudit } from './audit';

export interface Session {
  id: string;
  user_id: string;
  token: string;
  expires_at: number;
  created_at: number;
  last_activity_at: number;
  is_suspicious: number;
  user_agent?: string | null;
  ip_address?: string | null;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  role: 'PUBLIC' | 'EDITOR' | 'ADMIN' | 'GUEST' | 'VISITOR';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

const SESSION_COOKIE_NAME = 'hrisa_session';
const SESSION_DURATION = 24 * 60 * 60; // 24 hours in seconds (reduced from 7 days)
const SESSION_INACTIVITY_TIMEOUT = 2 * 60 * 60; // 2 hours inactivity timeout

/**
 * Create a new session for a user
 */
export async function createSession(userId: string, userAgent?: string, ipAddress?: string): Promise<Session> {
  const id = nanoid();
  const token = crypto.randomBytes(32).toString('hex');
  const now = Math.floor(Date.now() / 1000);
  const expiresAt = now + SESSION_DURATION;

  await db.execute({
    sql: `INSERT INTO sessions (id, user_id, token, expires_at, created_at, last_activity_at, user_agent, ip_address, is_suspicious, invalidated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, NULL)`,
    args: [id, userId, token, expiresAt, now, now, userAgent || null, ipAddress || null]
  });

  return {
    id,
    user_id: userId,
    token,
    expires_at: expiresAt,
    created_at: now,
    last_activity_at: now,
    is_suspicious: 0,
    user_agent: userAgent || null,
    ip_address: ipAddress || null,
  };
}

/**
 * Get session by token
 */
export async function getSessionByToken(token: string, userAgent?: string, ipAddress?: string): Promise<(Session & SessionUser) | null> {
  const now = Math.floor(Date.now() / 1000);

  const result = await db.execute({
    sql: `SELECT
            s.id as session_id,
            s.user_id,
            s.token,
            s.expires_at,
            s.created_at as session_created_at,
            s.last_activity_at,
            s.is_suspicious,
            s.invalidated_at,
            s.user_agent as session_user_agent,
            s.ip_address as session_ip_address,
            u.id,
            u.email,
            u.name,
            u.role,
            u.status
          FROM sessions s
          INNER JOIN users u ON s.user_id = u.id
          WHERE s.token = ? AND s.expires_at > ?`,
    args: [token, now]
  });

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0] as any;

  // Check if session is invalidated
  if (row.invalidated_at !== null) {
    return null;
  }

  // Check for inactivity timeout (2 hours)
  const lastActivity = row.last_activity_at;
  if (now - lastActivity > SESSION_INACTIVITY_TIMEOUT) {
    // Session expired due to inactivity
    await deleteSession(token);
    return null;
  }

  // Detect suspicious activity (IP or user agent change)
  let isSuspicious = row.is_suspicious === 1;
  if (!isSuspicious && (row.session_user_agent || row.session_ip_address)) {
    if (
      (userAgent && row.session_user_agent && userAgent !== row.session_user_agent) ||
      (ipAddress && row.session_ip_address && ipAddress !== row.session_ip_address)
    ) {
      // Mark session as suspicious
      isSuspicious = true;
      await db.execute({
        sql: 'UPDATE sessions SET is_suspicious = 1 WHERE token = ?',
        args: [token]
      });

      // Log security alert
      const reason = [];
      if (userAgent && row.session_user_agent && userAgent !== row.session_user_agent) {
        reason.push('User-Agent changed');
      }
      if (ipAddress && row.session_ip_address && ipAddress !== row.session_ip_address) {
        reason.push('IP address changed');
      }

      await logSuspiciousSession(
        row.user_id,
        row.session_id,
        reason.join(', '),
        ipAddress,
        userAgent
      );
    }
  }

  // Update last activity timestamp
  await db.execute({
    sql: 'UPDATE sessions SET last_activity_at = ? WHERE token = ?',
    args: [now, token]
  });

  return {
    id: row.session_id,
    user_id: row.user_id,
    token: row.token,
    expires_at: row.expires_at,
    created_at: row.session_created_at,
    last_activity_at: now, // Updated timestamp
    is_suspicious: isSuspicious ? 1 : 0,
    user_agent: row.session_user_agent,
    ip_address: row.session_ip_address,
    email: row.email,
    name: row.name,
    role: row.role,
    status: row.status,
  };
}

/**
 * Delete a session
 */
export async function deleteSession(token: string): Promise<void> {
  await db.execute({
    sql: 'DELETE FROM sessions WHERE token = ?',
    args: [token]
  });
}

/**
 * Delete all sessions for a user
 */
export async function deleteUserSessions(userId: string): Promise<void> {
  await db.execute({
    sql: 'DELETE FROM sessions WHERE user_id = ?',
    args: [userId]
  });
}

/**
 * Invalidate a session (soft delete - keeps record for audit)
 */
export async function invalidateSession(token: string): Promise<void> {
  const now = Math.floor(Date.now() / 1000);
  await db.execute({
    sql: 'UPDATE sessions SET invalidated_at = ? WHERE token = ?',
    args: [now, token]
  });
}

/**
 * Invalidate all sessions for a user
 */
export async function invalidateUserSessions(userId: string): Promise<void> {
  const now = Math.floor(Date.now() / 1000);
  await db.execute({
    sql: 'UPDATE sessions SET invalidated_at = ? WHERE user_id = ? AND invalidated_at IS NULL',
    args: [now, userId]
  });
}

/**
 * Set session cookie
 */
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION,
    path: '/',
  });
}

/**
 * Get session token from cookie
 */
export async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SESSION_COOKIE_NAME);
  return cookie?.value || null;
}

/**
 * Clear session cookie
 */
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Get current session from cookie
 */
export async function getCurrentSession(): Promise<(Session & SessionUser) | null> {
  const token = await getSessionToken();
  if (!token) {
    return null;
  }

  return await getSessionByToken(token);
}
