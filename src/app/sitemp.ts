import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/routing';

const baseUrl = 'https://solving-crew.vercel.app';
const paths = ['', '/services', '/expertise', '/technology', '/team', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    paths.map((p) => ({
      url: `${baseUrl}/${locale}${p}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: p === '' ? 1 : 0.8
    }))
  );
}
