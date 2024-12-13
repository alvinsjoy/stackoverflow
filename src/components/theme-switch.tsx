'use client';

import { RxMoon, RxSun } from 'react-icons/rx';
import { useTheme } from 'next-themes';

export default function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <button
      className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground dark:hover:text-foreground"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <RxSun className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform duration-500 ease-in-out dark:-rotate-90 dark:scale-0" />
      <RxMoon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform duration-500 ease-in-out dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
