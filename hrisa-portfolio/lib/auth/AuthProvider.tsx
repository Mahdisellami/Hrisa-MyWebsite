'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { Role } from '@/types/auth';

interface User {
  id: string;
  email: string;
  name: string | null;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authenticated: boolean;
  shareToken: string | null;
  login: (email: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  checkAccess: (resourceType: string, resourceId: string) => Promise<boolean>;
  hasRole: (minRole: Role) => boolean;
  setShareToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const roleHierarchy: Record<Role, number> = {
  PUBLIC: 0,
  EDITOR: 1,
  ADMIN: 2,
};

const SHARE_TOKEN_KEY = 'hrisa_share_token';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareToken, setShareTokenState] = useState<string | null>(null);

  // Load share token from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(SHARE_TOKEN_KEY);
      if (stored) {
        setShareTokenState(stored);
      }
    }
  }, []);

  // Fetch session on mount
  useEffect(() => {
    fetchSession();
  }, []);

  const fetchSession = async () => {
    try {
      const res = await fetch('/api/auth/session');
      const data = await res.json();

      if (data.authenticated && data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('Session fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return res.json();
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    // Clear share token on logout
    setShareToken(null);
    window.location.href = '/';
  };

  const checkAccess = async (resourceType: string, resourceId: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/protected/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resourceType,
          resourceId,
          shareToken,
        }),
      });
      const data = await res.json();
      return data.hasAccess === true;
    } catch (error) {
      console.error('Access check error:', error);
      return false;
    }
  };

  const hasRole = (minRole: Role): boolean => {
    if (!user) return minRole === 'PUBLIC';
    return roleHierarchy[user.role] >= roleHierarchy[minRole];
  };

  const setShareToken = (token: string | null) => {
    setShareTokenState(token);
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem(SHARE_TOKEN_KEY, token);
      } else {
        localStorage.removeItem(SHARE_TOKEN_KEY);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authenticated: !!user,
        shareToken,
        login,
        logout,
        checkAccess,
        hasRole,
        setShareToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
