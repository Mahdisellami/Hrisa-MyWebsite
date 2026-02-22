'use client';

import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function VerifyPage() {
  useEffect(() => {
    // The actual verification happens in the API route
    // This page is just a placeholder in case the redirect takes a moment
  }, []);

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
