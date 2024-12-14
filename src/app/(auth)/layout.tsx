'use client';

import { BackgroundBeams } from '@/components/ui/background-beams';
import { useAuthStore } from '@/store/Auth';
import { useRouter } from 'next/navigation';
import Providers from '../provider';
import React from 'react';
import ThemeSwitch from '@/components/theme-switch';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  return (
    <Providers>
      <div className="relative flex min-h-screen flex-col items-center justify-center py-12">
        <ThemeSwitch />
        <BackgroundBeams />
        <div className="relative">{children}</div>
      </div>
    </Providers>
  );
};

export default Layout;
