'use client';

import * as React from 'react';

type Theme = 'light' | 'dark';

function apply(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
}

function systemTheme(): Theme {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = React.useState<Theme>('light');

  React.useEffect(() => {
    const stored = (localStorage.getItem('theme') as Theme | null) ?? null;
    const initial = stored ?? systemTheme();
    setTheme(initial);
    apply(initial);
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    apply(next);
  }


  return (
    <button
      type="button"
      onClick={toggle}
      className="h-9 sm:h-10 sm:px-3 md:h-10 md:px-4  lg:px-5  rounded-lg border border-slate-200 bg-white/70 px-3 text-sm text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-black/25 dark:text-slate-200 dark:hover:bg-white/10"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      <span className="inline-flex items-center gap-2">
        <span className="text-base leading-none">{theme === 'dark' ? '🌙' : '☀️'}</span>
        <span className="hidden sm:inline">{theme === 'dark' ? 'Dark' : 'Light'}</span>
      </span>
    </button>
  );
}
