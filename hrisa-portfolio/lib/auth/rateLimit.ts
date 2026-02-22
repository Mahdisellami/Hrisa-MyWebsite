/**
 * Simple in-memory rate limiter
 * For production, consider using Redis or a similar solution
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Clean up expired entries periodically
 */
function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now) {
      rateLimitStore.delete(key);
    }
  }
}

// Run cleanup every 5 minutes
setInterval(cleanupExpiredEntries, 5 * 60 * 1000);

export interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Check rate limit for an identifier
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const key = identifier.toLowerCase();

  let entry = rateLimitStore.get(key);

  // If entry doesn't exist or has expired, create new one
  if (!entry || entry.resetAt < now) {
    entry = {
      count: 0,
      resetAt: now + config.windowMs,
    };
    rateLimitStore.set(key, entry);
  }

  // Increment count
  entry.count++;

  const allowed = entry.count <= config.maxAttempts;
  const remaining = Math.max(0, config.maxAttempts - entry.count);

  return {
    allowed,
    remaining,
    resetAt: entry.resetAt,
  };
}

/**
 * Reset rate limit for an identifier
 */
export function resetRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier.toLowerCase());
}

/**
 * Get current rate limit status
 */
export function getRateLimitStatus(identifier: string): RateLimitResult | null {
  const entry = rateLimitStore.get(identifier.toLowerCase());

  if (!entry) {
    return null;
  }

  const now = Date.now();
  if (entry.resetAt < now) {
    return null;
  }

  return {
    allowed: true,
    remaining: 0,
    resetAt: entry.resetAt,
  };
}

/**
 * Predefined rate limit configurations
 */
export const RateLimits = {
  LOGIN: {
    maxAttempts: 3,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
  REGISTER: {
    maxAttempts: 1,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  API: {
    maxAttempts: 100,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
} as const;
