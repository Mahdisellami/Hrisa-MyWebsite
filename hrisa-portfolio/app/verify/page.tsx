'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

function VerifyContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get token from URL and redirect to API route
    const token = searchParams.get('token');
    if (token) {
      // Redirect to API route for actual verification
      window.location.href = `/api/auth/verify?token=${token}`;
    } else {
      // No token, redirect to login
      window.location.href = '/login?error=missing_token';
    }
  }, [searchParams]);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20 px-6 bg-sand-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-500 mx-auto mb-6" />
          <h1 className="text-2xl font-display font-bold text-sand-950 mb-2">
            Verifying...
          </h1>
          <p className="text-sand-600">
            Please wait while we verify your magic link.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <>
        <Header />
        <main className="min-h-screen pt-24 pb-20 px-6 bg-sand-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-500 mx-auto mb-6" />
            <h1 className="text-2xl font-display font-bold text-sand-950 mb-2">
              Loading...
            </h1>
          </div>
        </main>
        <Footer />
      </>
    }>
      <VerifyContent />
    </Suspense>
  );
}
