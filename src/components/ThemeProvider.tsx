'use client';

import React, {useEffect} from 'react';

type Theme = 'light' | 'dark';

function apply(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
}

function systemTheme(): Theme {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemeProvider({children}: {children: React.ReactNode}) {
  useEffect(() => {
    const stored = (localStorage.getItem('theme') as Theme | null) ?? null;
    if (stored) apply(stored);
    else apply(systemTheme());

    const mql = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!mql) return;

    const onChange = () => {
      const stillNoStored = !localStorage.getItem('theme');
      if (stillNoStored) apply(systemTheme());
    };

    mql.addEventListener?.('change', onChange);
    return () => mql.removeEventListener?.('change', onChange);
  }, []);

  return <>{children}</>;
}
