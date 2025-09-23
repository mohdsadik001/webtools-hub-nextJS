'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function useAuthProtection(redirectTo = '/auth/signin', callbackUrl) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading
    if (!session) {
      const redirectUrl = callbackUrl 
        ? `${redirectTo}?callbackUrl=${encodeURIComponent(callbackUrl)}`
        : redirectTo;
      router.push(redirectUrl);
      return;
    }
  }, [session, status, router, redirectTo, callbackUrl]);

  return {
    session,
    status,
    isLoading: status === 'loading',
    isAuthenticated: !!session
  };
}
