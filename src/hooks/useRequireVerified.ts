'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { account } from '@/models/client/config';
import { useAuthStore } from '@/store/Auth';

export function useRequireVerified() {
  const [isChecking, setIsChecking] = useState(true);
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const checkVerification = async () => {
      if (!user) return;

      try {
        const currentUser = await account.get();
        if (!currentUser.emailVerification) {
          router.push('/verify');
        }
      } catch (error) {
        console.error('Error checking verification status:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkVerification();
  }, [user, router]);

  return {
    isChecking,
  };
}
