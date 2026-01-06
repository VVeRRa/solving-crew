import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {ButtonA, ButtonLink} from '@/components/ui/button';

export default async function SiteFooter() {
  const tBrand = await getTranslations('Brand');
  const tNav = await getTranslations('Nav');
  const tFooter = await getTranslations('Footer');

  // TODO: replace placeholders
  const company = {
    legalName: 'Solving Crew s.r.o.',
    ico: '________',
    dic: '________',
    email: 'hello@yourcompany.com',
    phone: '+420 000 000 000',
    address: 'Address placeholder',
    linkedin: 'https://www.linkedin.com', // TODO
    github: 'https://github.com' // TODO
  };

  return (
    <footer className="relative border-t border-slate-200/70 dark:border-slate-800/70">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 via-white to-white dark:from-slate-950 dark:via-slate-950/70 dark:to-black/20" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px -z-10 bg-gradient-to-r from-transparent via-blue-500/35 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* glass panel */}
        <div className="rounded-2xl  backdrop-blur-md  dark:bg-black/25">
          

          {/* main grid */}
          <div className="p-6 grid gap-10 md:grid-cols-12 md:gap-x-12">
            {/* Brand */}
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-start gap-3">
                <img
                  src="/brand/solving-crew.svg"
                  alt={tBrand('name')}
                  className="h-10 w-auto shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    {tBrand('name')}
                  </div>
                  <div className="text-sm text-slate-700 dark:text-slate-300">
                    {tBrand('promise')}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-slate-700 dark:border-slate-800 dark:bg-black/20 dark:text-slate-300">
                  EU timezone
                </span>
                <span className="rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-slate-700 dark:border-slate-800 dark:bg-black/20 dark:text-slate-300">
                  Product engineering
                </span>
                <span className="rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-slate-700 dark:border-slate-800 dark:bg-black/20 dark:text-slate-300">
                  Senior-led delivery
                </span>
              </div>

              <div className="text-sm text-slate-500 dark:text-slate-400 italic">
                {tBrand('playful')}
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <ButtonA href={company.linkedin} target="_blank" rel="noreferrer" variant="secondary" size="sm">
                  LinkedIn
                </ButtonA>
                <ButtonA href={company.github} target="_blank" rel="noreferrer" variant="secondary" size="sm">
                  GitHub
                </ButtonA>
              </div>
            </div>

            {/* Menu */}
            <div className="md:col-span-3">
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {tFooter('menu')}
              </div>

              <nav className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {[
                  {href: '/', label: tNav('home')},
                  {href: '/services', label: tNav('services')},
                  {href: '/expertise', label: tNav('expertise')},
                  {href: '/technology', label: tNav('technology')},
                  {href: '/team', label: tNav('team')},
                  {href: '/contact', label: tNav('contact')}
                ].map((x) => (
                  <Link
                    key={x.href}
                    href={x.href}
                    className="w-fit text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                  >
                    <span className="border-b border-transparent hover:border-slate-300 dark:hover:border-slate-600">
                      {x.label}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Company */}
            <div className="md:col-span-4">
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {tFooter('company')}
              </div>

              <div className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <div>{company.legalName}</div>

                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  <span>
                    {tFooter('ico')}: {company.ico}
                  </span>
                  <span className="text-slate-400 dark:text-slate-600">•</span>
                  <span>
                    {tFooter('dic')}: {company.dic}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <a
                    className="w-fit hover:text-slate-900 dark:hover:text-white transition-colors"
                    href={`mailto:${company.email}`}
                  >
                    ✉ {company.email}
                  </a>
                  <a
                    className="w-fit hover:text-slate-900 dark:hover:text-white transition-colors"
                    href={`tel:${company.phone.replace(/\s+/g, '')}`}
                  >
                    ☎ {company.phone}
                  </a>
                </div>

                <div className="max-w-sm">📍 {company.address}</div>
              </div>
            </div>
          </div>

          {/* bottom bar */}
          <div className="px-6 py-4 border-t border-slate-200/70 dark:border-slate-800/70">
            <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>© {new Date().getFullYear()} {tBrand('name')}</div>
              <div className="sm:text-right">{tBrand('short')}</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
