import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { nanoid } from 'nanoid';
import crypto from 'crypto';

export interface Session {
  id: string;
  user_id: string;
  token: string;
  expires_at: number;
  created_at: number;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  role: 'PUBLIC' | 'EDITOR' | 'ADMIN';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

const SESSION_COOKIE_NAME = 'hrisa_session';
const SESSION_DURATION = 7 * 24 * 60 * 60; // 7 days in seconds

/**
 * Create a new session for a user
 */
export function createSession(userId: string, userAgent?: string, ipAddress?: string): Session {
  const id = nanoid();
  const token = crypto.randomBytes(32).toString('hex');
  const now = Math.floor(Date.now() / 1000);
  const expiresAt = now + SESSION_DURATION;

  db.prepare(`
    INSERT INTO sessions (id, user_id, token, expires_at, created_at, user_agent, ip_address)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(id, userId, token, expiresAt, now, userAgent || null, ipAddress || null);

  return {
    id,
    user_id: userId,
    token,
    expires_at: expiresAt,
    created_at: now,
  };
}

/**
 * Get session by token
 */
export function getSessionByToken(token: string): (Session & SessionUser) | null {
  const now = Math.floor(Date.now() / 1000);

  const result = db.prepare(`
    SELECT
      s.id as session_id,
      s.user_id,
      s.token,
      s.expires_at,
      s.created_at as session_created_at,
      u.id,
      u.email,
      u.name,
      u.role,
      u.status
    FROM sessions s
    INNER JOIN users u ON s.user_id = u.id
    WHERE s.token = ? AND s.expires_at > ?
  `).get(token, now) as any;

  if (!result) {
    return null;
  }

  return {
    id: result.session_id,
    user_id: result.user_id,
    token: result.token,
    expires_at: result.expires_at,
    created_at: result.session_created_at,
    email: result.email,
    name: result.name,
    role: result.role,
    status: result.status,
  };
}

/**
 * Delete a session
 */
export function deleteSession(token: string): void {
  db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
}

/**
 * Delete all sessions for a user
 */
export function deleteUserSessions(userId: string): void {
  db.prepare('DELETE FROM sessions WHERE user_id = ?').run(userId);
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

  return getSessionByToken(token);
}
