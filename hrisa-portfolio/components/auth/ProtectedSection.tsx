'use client';

import { useAuth } from '@/lib/auth/AuthProvider';
import { useEffect, useState } from 'react';

interface ProtectedSectionProps {
  children: React.ReactNode;
  resourceType: string;
  resourceId: string;
  fallback?: React.ReactNode;
}

export function ProtectedSection({
  children,
  resourceType,
  resourceId,
  fallback,
}: ProtectedSectionProps) {
  const { checkAccess, loading: authLoading } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkAccess(resourceType, resourceId).then(access => {
      setHasAccess(access);
      setChecking(false);
    });
  }, [resourceType, resourceId, checkAccess]);

  if (authLoading || checking) {
    return (
      <div className="animate-pulse bg-sand-200 rounded-xl h-64 mb-20" />
    );
  }

  if (!hasAccess) {
    return fallback || (
      <div className="mb-20 p-8 bg-sand-100 border-2 border-sand-200 rounded-xl text-center">
        <div className="w-12 h-12 bg-sand-300 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-sand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <p className="text-sand-700 mb-4">
          🔒 This content is protected.{' '}
          <a href="/login" className="text-brand-600 hover:text-brand-700 underline">
            Log in
          </a>
          {' '}or{' '}
          <a href="/register" className="text-brand-600 hover:text-brand-700 underline">
            request access
          </a>
          {' '}to view it.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
