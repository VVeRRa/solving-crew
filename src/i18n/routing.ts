import {defineRouting} from 'next-intl/routing';

export const locales = ['en', 'cs', 'de'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always'
});
