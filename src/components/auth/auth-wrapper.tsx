'use client';

import { useAuthStore } from '@/store/Auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AuthPageWrapperProps {
  children: React.ReactNode;
  requireUnauth?: boolean;
  requireAuth?: boolean;
  requireVerified?: boolean;
}

export function AuthWrapper({
  children,
  requireUnauth,
  requireAuth,
  requireVerified,
}: AuthPageWrapperProps) {
  const { session, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (requireUnauth && session) {
      router.push('/');
      return;
    }

    if (requireAuth && !session) {
      router.push('/login');
      return;
    }

    if (requireVerified && !user?.emailVerification) {
      router.push('/verify');
      return;
    }
  }, [session, user, router, requireUnauth, requireAuth, requireVerified]);

  return <>{children}</>;
}
