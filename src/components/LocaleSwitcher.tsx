'use client';

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';
import {routing, type Locale} from '@/i18n/routing';

export default function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <select
      className="rounded-md border px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-900"
      value={locale}
      onChange={(e) => {
        const nextLocale = e.target.value as Locale;
        router.replace(pathname, {locale: nextLocale});
      }}
      aria-label="Language"
    >
      {routing.locales.map((l) => (
        <option key={l} value={l}>
          {l.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
