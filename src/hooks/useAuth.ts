'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/Auth';

interface UseAuthOptions {
  requireAuth?: boolean;
  redirectTo?: string;
  requireUnauth?: boolean;
}

export function useAuth({
  requireAuth = false,
  redirectTo = '/login',
  requireUnauth = false,
}: UseAuthOptions = {}) {
  const router = useRouter();
  const { user, hydrated, verfiySession } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!user && hydrated) {
        await verfiySession();
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [hydrated, user, verfiySession]);

  useEffect(() => {
    if (isLoading || !hydrated) return;

    if (requireAuth && !user) {
      router.push(redirectTo);
    } else if (requireUnauth && user) {
      router.push('/');
    }
  }, [
    router,
    user,
    isLoading,
    hydrated,
    requireAuth,
    requireUnauth,
    redirectTo,
  ]);

  return {
    isLoading: isLoading || !hydrated,
    user,
    isAuthenticated: !!user,
  };
}
