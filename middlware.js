import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  console.log('🚀 Middleware triggered for:', pathname);
  
  // Define protected and public routes
  const protectedRoutes = ['/profile', '/tools', '/categories'];
  const authRoutes = ['/auth/signin', '/auth/signup'];
  
  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );
  
  const isAuthRoute = authRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );
  
  console.log('Route Analysis:', { pathname, isProtectedRoute, isAuthRoute });
  
  // Get the token from cookies
  const token = request.cookies.get('auth-token');
  
  // Verify token
  let user = null;
  if (token) {
    try {
      user = verifyToken(token.value);
      console.log('✅ User authenticated:', !!user);
    } catch (error) {
      console.log('❌ Token verification failed:', error);
      user = null;
    }
  } else {
    console.log('🚫 No auth token found');
  }
  
  // Redirect authenticated users away from auth routes
  if (user && isAuthRoute) {
    console.log('🔄 Redirecting authenticated user to /tools');
    return NextResponse.redirect(new URL('/tools', request.url));
  }
  
  // Redirect unauthenticated users away from protected routes
  if (!user && isProtectedRoute) {
    console.log('🔄 Redirecting unauthenticated user to /auth/signin');
    const signInUrl = new URL('/auth/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }
  
  // Add user info to request headers
  if (user) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-info', JSON.stringify(user));
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
  
  return NextResponse.next();
}

// 🎯 **THIS IS THE KEY FIX** - Use specific matchers with :path*
export const config = {
  matcher: [
    '/tools/:path*',
    '/categories/:path*', 
    '/profile/:path*',
    '/auth/:path*'
  ],
};
