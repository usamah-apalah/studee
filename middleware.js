import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  
  // Proteksi route /admin
  if (url.pathname.startsWith('/admin')) {
    const userRole = request.cookies.get('userRole')?.value;
    
    // Jika tidak ada cookie role atau bukan admin, redirect ke Home
    if (userRole !== 'admin') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

// Konfigurasi path mana saja yang akan dicegat oleh middleware ini
export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
