'use client';

import { BackgroundBeams } from '@/components/ui/background-beams';
import Providers from '../provider';
import React from 'react';
import ThemeSwitch from '@/components/theme-switch';

const Layout = ({ children }: { children: React.ReactNode }) => {
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
