'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/lib/auth/AuthProvider';

export default function ShareLinkPage() {
  const params = useParams();
  const router = useRouter();
  const { setShareToken } = useAuth();
  const [status, setStatus] = useState<'validating' | 'valid' | 'invalid'>('validating');
  const [error, setError] = useState('');

  useEffect(() => {
    validateShareLink();
  }, []);

  const validateShareLink = async () => {
    const token = params.token as string;

    try {
      const res = await fetch(`/api/share/${token}`);
      const data = await res.json();

      if (data.valid) {
        // Store share token
        setShareToken(token);
        setStatus('valid');

        // Redirect based on resource type
        setTimeout(() => {
          if (data.resource.resource_type === 'ALL') {
            router.push('/hobbies/photography');
          } else if (data.resource.resource_type === 'PAGE') {
            router.push(data.resource.resource_id);
          } else if (data.resource.resource_type === 'SECTION') {
            router.push('/hobbies/photography');
          } else if (data.resource.resource_type === 'PROJECT') {
            router.push(`/professional/${data.resource.resource_id}`);
          }
        }, 2000);
      } else {
        setStatus('invalid');
        setError(data.error || 'Invalid share link');
      }
    } catch (error) {
      console.error('Share link validation error:', error);
      setStatus('invalid');
      setError('Failed to validate share link');
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20 px-6 bg-sand-50 flex items-center justify-center">
        <div className="max-w-md w-full">
          {status === 'validating' && (
            <div className="bg-white rounded-2xl shadow-lg border-2 border-sand-200 p-8 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-500 mx-auto mb-6" />
              <h1 className="text-2xl font-display font-bold text-sand-950 mb-2">
                Validating Access Link
              </h1>
              <p className="text-sand-600">
                Please wait while we verify your access...
              </p>
            </div>
          )}

          {status === 'valid' && (
            <div className="bg-white rounded-2xl shadow-lg border-2 border-green-200 p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-display font-bold text-sand-950 mb-2">
                Access Granted!
              </h1>
              <p className="text-sand-600">
                Redirecting you to the content...
              </p>
            </div>
          )}

          {status === 'invalid' && (
            <div className="bg-white rounded-2xl shadow-lg border-2 border-red-200 p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-2xl font-display font-bold text-sand-950 mb-2">
                Invalid Access Link
              </h1>
              <p className="text-sand-600 mb-6">
                {error}
              </p>
              <a
                href="/register"
                className="inline-block px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-lg transition-colors"
              >
                Request Permanent Access
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
