import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public assets and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/register', '/verify', '/about', '/colophon', '/ventures'];
  const isPublicRoute = publicRoutes.some(route => pathname === route);

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Share link routes (allow public access)
  if (pathname.startsWith('/share/')) {
    return NextResponse.next();
  }

  // Check if route requires authentication
  const protectedRoutes = ['/admin', '/dashboard'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    const sessionToken = request.cookies.get('hrisa_session')?.value;

    if (!sessionToken) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // For admin routes, check if user is actually an admin
    if (pathname.startsWith('/admin')) {
      try {
        // We can't directly query the database in middleware (edge runtime)
        // So we'll just check for the session cookie and let the page components handle role checks
        // The ProtectedPage component will handle the actual authorization
        return NextResponse.next();
      } catch (error) {
        console.error('Middleware error:', error);
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  // For hobby pages and professional projects, we'll use client-side protection
  // with ProtectedSection and ProtectedPage components
  // This allows for more granular control and better UX

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
