import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function setAuthCookie(token) {
  const cookieStore = cookies();
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export function removeAuthCookie() {
  const cookieStore = cookies();
  cookieStore.set('auth-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
}

export async function getCurrentUser() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token');
    
    if (!token) return null;
    
    const decoded = verifyToken(token.value);
    if (!decoded) return null;
    
    return decoded;
  } catch (error) {
    return null;
  }
}

// Server-side function to get user from headers (set by middleware)
export function getUserFromHeaders(headers) {
  try {
    const userInfo = headers.get('x-user-info');
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    return null;
  }
}
