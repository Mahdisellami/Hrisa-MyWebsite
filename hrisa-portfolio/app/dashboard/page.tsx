'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/lib/auth/AuthProvider';
import { ProtectedPage } from '@/components/auth/ProtectedPage';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedPage>
      <Header />
      <main className="min-h-screen pt-24 pb-20 px-6 bg-sand-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-display font-bold text-sand-950 mb-2">
              Welcome back, {user?.name || user?.email}!
            </h1>
            <p className="text-sand-600">
              You now have access to the full Hrisa Portfolio.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="/hobbies/photography"
              className="group p-6 bg-white border-2 border-sand-200 hover:border-brand-500 rounded-xl transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-display font-bold text-sand-950 mb-2 group-hover:text-brand-600 transition-colors">
                Photography
              </h2>
              <p className="text-sand-600">
                Browse 130+ photos by 7 photographers
              </p>
            </a>

            <a
              href="/professional"
              className="group p-6 bg-white border-2 border-sand-200 hover:border-brand-500 rounded-xl transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-display font-bold text-sand-950 mb-2 group-hover:text-brand-600 transition-colors">
                Professional Projects
              </h2>
              <p className="text-sand-600">
                Explore portfolio projects and work
              </p>
            </a>

            <a
              href="/hobbies"
              className="group p-6 bg-white border-2 border-sand-200 hover:border-brand-500 rounded-xl transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-display font-bold text-sand-950 mb-2 group-hover:text-brand-600 transition-colors">
                Hobbies
              </h2>
              <p className="text-sand-600">
                Music, Theatre, Art, Sports & more
              </p>
            </a>

            {user?.role === 'ADMIN' && (
              <a
                href="/admin"
                className="group p-6 bg-gradient-to-br from-terracotta-500 to-brand-600 rounded-xl transition-all transform hover:scale-105"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-display font-bold text-white mb-2">
                  Admin Panel
                </h2>
                <p className="text-white/80">
                  Manage users, permissions & share links
                </p>
              </a>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </ProtectedPage>
  );
}
