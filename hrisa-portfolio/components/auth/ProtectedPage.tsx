'use client';

import { useAuth } from '@/lib/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { Role } from '@/types/auth';

interface ProtectedPageProps {
  children: React.ReactNode;
  minRole?: Role;
  fallback?: React.ReactNode;
}

export function ProtectedPage({
  children,
  minRole = 'EDITOR',
  fallback,
}: ProtectedPageProps) {
  const { user, loading, hasRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      const currentPath = window.location.pathname;
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4" />
          <p className="text-sand-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !hasRole(minRole)) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-sand-50">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 bg-terracotta-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-terracotta-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-display font-bold text-sand-950 mb-2">
            Access Denied
          </h1>
          <p className="text-sand-600 mb-6">
            You don't have permission to view this page.
          </p>
          <a
            href="/login"
            className="inline-block px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-lg transition-colors"
          >
            Log In
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
