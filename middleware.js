import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';
  const userRole = request.cookies.get('userRole')?.value;

  // List of protected routes that require login
  const protectedRoutes = ['/dashboard', '/profile', '/stats'];

  // Check if accessing actual lesson player (e.g. /lesson/[id]/[lessonIdx] -> segments length > 2)
  const segments = url.pathname.split('/').filter(Boolean);
  const isLessonPlayer = segments[0] === 'lesson' && segments.length > 2;

  // 1. Redirect to /login if trying to access protected routes while logged out
  const isAccessingProtectedRoute = protectedRoutes.some(route => url.pathname.startsWith(route)) || isLessonPlayer;
  if (isAccessingProtectedRoute && !isLoggedIn) {
    url.pathname = '/login';
    // Append redirectTo parameter so they can redirect back after successful login
    url.searchParams.set('redirectTo', request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.redirect(url);
  }

  // 2. Redirect to root (/) if trying to access admin dashboard without being an admin
  if (url.pathname.startsWith('/admin')) {
    if (userRole !== 'admin') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin', '/admin/:path*',
    '/lesson/:path*',
    '/dashboard', '/dashboard/:path*',
    '/profile', '/profile/:path*',
    '/stats', '/stats/:path*'
  ],
};
