'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthProvider';

const navigation = [
  { name: 'Professional', href: '/professional' },
  { name: 'Hobbies', href: '/hobbies' },
  { name: 'Ventures', href: '/ventures' },
  { name: 'About', href: '/about' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, authenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-terracotta-500 rounded-lg flex items-center justify-center font-display font-bold text-white text-xl transition-transform group-hover:scale-110">
              H
            </div>
            <span className="text-xl font-display font-bold text-sand-950">
              Hrisa
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-sand-700 hover:text-brand-500 transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all group-hover:w-full" />
              </Link>
            ))}

            {/* Auth Buttons */}
            {authenticated ? (
              <div className="flex items-center gap-4">
                {user?.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    className="text-sm font-medium text-sand-700 hover:text-brand-500 transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-sand-700 hover:text-brand-500 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-sand-700 hover:text-brand-500 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-sand-700 hover:text-brand-500 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  Request Access
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-sand-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-sand-900" />
            ) : (
              <Menu className="w-6 h-6 text-sand-900" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-sand-200 pt-4 animate-slide-down">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-sand-700 hover:text-brand-500 transition-colors px-4 py-2 rounded-lg hover:bg-sand-50"
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Auth Buttons */}
              {authenticated ? (
                <>
                  {user?.role === 'ADMIN' && (
                    <Link
                      href="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-base font-medium text-sand-700 hover:text-brand-500 transition-colors px-4 py-2 rounded-lg hover:bg-sand-50"
                    >
                      Admin
                    </Link>
                  )}
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-base font-medium text-sand-700 hover:text-brand-500 transition-colors px-4 py-2 rounded-lg hover:bg-sand-50"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-2 text-base font-medium text-sand-700 hover:text-brand-500 transition-colors px-4 py-2 rounded-lg hover:bg-sand-50 text-left w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-base font-medium text-sand-700 hover:text-brand-500 transition-colors px-4 py-2 rounded-lg hover:bg-sand-50"
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-semibold text-center transition-all duration-300"
                  >
                    Request Access
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
