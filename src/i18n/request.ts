import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';

const messageLoaders = {
  en: () => import('../messages/en.json').then((m) => m.default),
  cs: () => import('../messages/cs.json').then((m) => m.default),
  de: () => import('../messages/de.json').then((m) => m.default)
} as const;

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;

  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: await messageLoaders[locale as keyof typeof messageLoaders]()
  };
});
