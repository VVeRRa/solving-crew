'use client';

import {useLocale, useTranslations} from 'next-intl';
import {routing} from '@/i18n/routing';
import {Link, usePathname, useRouter} from '@/i18n/navigation';
import {ButtonLink} from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';

export default function SiteHeader() {
  const tNav = useTranslations('Nav');
  const tBrand = useTranslations('Brand');

  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const nav = [
    {href: '/', label: tNav('home')},
    {href: '/services', label: tNav('services')},
    {href: '/expertise', label: tNav('expertise')},
    {href: '/technology', label: tNav('technology')},
    {href: '/team', label: tNav('team')},
    {href: '/contact', label: tNav('contact')}
  ] as const;

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-slate-200/70
      bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70
      dark:border-slate-800 dark:bg-slate-950/90 dark:supports-[backdrop-filter]:bg-slate-950/70"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top row */}
        <div className="flex justify-between items-center gap-3 py-2 sm:py-3">
          <Link href="/" className="flex items-center gap-3 shrink-0 leading-tight">
            <img
              src="/brand/solving-crew.svg"
              alt="Solving Crew"
              className="h-10 sm:h-16 w-auto"
            />
            <div className="hidden sm:block text-xs text-slate-600 dark:text-slate-300">
              {tBrand('short')}
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 text-sm text-slate-700 dark:text-slate-200">
            {nav.slice(0, -1).map((x) => (
              <Link
                key={x.href}
                href={x.href}
                className="rounded-lg px-3 py-2 hover:bg-slate-100/70 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white transition"
              >
                {x.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <select
              value={locale}
              onChange={(e) => router.replace(pathname, {locale: e.target.value as any})}
              className="h-9 sm:h-10 w-[72px] sm:w-[86px] rounded-lg border border-slate-200 bg-white/70 px-2 sm:px-3 text-sm text-slate-700 shadow-sm dark:border-slate-800 dark:bg-black/25 dark:text-slate-200"
              aria-label="Language"
            >
              {routing.locales.map((l) => (
                <option key={l} value={l}>
                  {String(l).toUpperCase()}
                </option>
              ))}
            </select>

            <ThemeToggle />

            <ButtonLink
              href="/contact"
              variant="primary"
              className="h-9 sm:h-10 px-3 sm:px-4 text-sm whitespace-nowrap"
            >
              <span className="hidden sm:inline">{tNav('getInTouch')}</span>
              <span className="sm:hidden">{tNav('contact')}</span>
            </ButtonLink>
          </div>
        </div>

        {/* Mobile nav: horizontal scroll */}
        <div className="lg:hidden pb-2">
          <div className="flex gap-1 overflow-x-auto whitespace-nowrap">
            {nav.map((x) => (
              <Link
                key={x.href}
                href={x.href}
                className="inline-flex rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100/70 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white transition"
              >
                {x.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
