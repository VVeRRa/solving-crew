'use client';

import * as React from 'react';
import NextLink from 'next/link';
import {usePathname as useNextPathname, useRouter as useNextRouter} from 'next/navigation';
import {useLocale} from 'next-intl';
import {routing, type Locale} from './routing';

function hasLocalePrefix(path: string) {
  return routing.locales.some((l) => path === `/${l}` || path.startsWith(`/${l}/`));
}

function stripLocale(path: string) {
  const match = routing.locales.find((l) => path === `/${l}` || path.startsWith(`/${l}/`));
  if (!match) return path || '/';
  const rest = path.slice(`/${match}`.length);
  return rest.length ? rest : '/';
}

function addLocale(locale: Locale, href: string) {
  if (!href.startsWith('/')) return href;
  if (href.startsWith('/api') || href.startsWith('/_next')) return href;
  if (hasLocalePrefix(href)) return href;
  return href === '/' ? `/${locale}` : `/${locale}${href}`;
}

function isExternal(href: string) {
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:');
}

/** Locale-aware Link that accepts plain paths like "/services" and prefixes "/{locale}". */
export function Link(
  props: React.ComponentProps<typeof NextLink> & {locale?: Locale}
) {
  const {href, locale: localeOverride, ...rest} = props as any;
  const locale = (localeOverride ?? (useLocale() as Locale)) as Locale;

  const hrefStr = typeof href === 'string' ? href : href?.pathname ?? '/';
  const finalHref = isExternal(hrefStr) ? hrefStr : addLocale(locale, hrefStr);

  return <NextLink href={finalHref} {...rest} />;
}

/** Returns pathname WITHOUT "/{locale}" prefix (so you can reuse it when switching locale). */
export function usePathname() {
  const p = useNextPathname() ?? '/';
  return stripLocale(p);
}

/**
 * Router wrapper:
 * router.push('/services', {locale:'de'}) -> '/de/services'
 * router.replace(pathnameFromUsePathname, {locale:'cs'})
 */
export function useRouter() {
  const r = useNextRouter();
  const current = useLocale() as Locale;

  return {
    ...r,
    push: (href: string, opts?: {locale?: Locale}) => r.push(addLocale(opts?.locale ?? current, href)),
    replace: (href: string, opts?: {locale?: Locale}) => r.replace(addLocale(opts?.locale ?? current, href))
  };
}
