'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/lib/auth/AuthProvider';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      const errorMessages: Record<string, string> = {
        missing_token: 'Invalid magic link. Please request a new one.',
        invalid_token: 'This magic link is invalid or has expired.',
        user_not_found: 'User not found.',
        not_approved: 'Your account is not yet approved.',
        verification_failed: 'Verification failed. Please try again.',
      };
      setError(errorMessages[errorParam] || 'An error occurred. Please try again.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    const result = await login(email);

    if (result.success) {
      setMessage(result.message);
      setEmail('');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen pt-24 pb-20 px-6 bg-sand-50">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border-2 border-sand-200 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-terracotta-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-3xl font-display font-bold text-sand-950 mb-2">
                Welcome Back
              </h1>
              <p className="text-sand-600">
                Enter your email to receive a magic link
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {message && (
              <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                <p className="text-green-700 text-sm">{message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-sand-900 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border-2 border-sand-300 rounded-lg focus:outline-none focus:border-brand-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="you@example.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Magic Link'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sand-600 text-sm">
                Don't have access?{' '}
                <a href="/register" className="text-brand-600 hover:text-brand-700 font-semibold">
                  Request Access
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
  );
}

export default function LoginPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <main className="min-h-screen pt-24 pb-20 px-6 bg-sand-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4" />
            <p className="text-sand-600">Loading...</p>
          </div>
        </main>
      }>
        <LoginForm />
      </Suspense>
      <Footer />
    </>
  );
}
