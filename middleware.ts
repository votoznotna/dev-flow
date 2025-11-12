import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const isLoggedIn = !!session;

  // Public routes that don't require authentication
  const isPublicRoute =
    pathname === '/' ||
    pathname.startsWith('/sign-in') ||
    pathname.startsWith('/sign-up') ||
    pathname.startsWith('/api/auth');

  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('Middleware:', {
      pathname,
      isLoggedIn,
      isPublicRoute,
      hasSession: !!session,
    });
  }

  // If user is not logged in and trying to access protected route
  if (!isLoggedIn && !isPublicRoute) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // If user is logged in and trying to access auth pages, redirect to home
  if (isLoggedIn && (pathname === '/sign-in' || pathname === '/sign-up')) {
    // Check if there's a callbackUrl to redirect to after login
    const callbackUrl = req.nextUrl.searchParams.get('callbackUrl');
    if (callbackUrl) {
      return NextResponse.redirect(new URL(callbackUrl, req.url));
    }
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
});

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
