import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ButtonA, ButtonLink } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { FadeIn, FadeInStagger, FadeInItem } from '@/components/FadeIn';

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
    <footer className="relative mt-0 pt-20 border-t border-slate-200/60 dark:border-slate-800/60 bg-slate-50/10 dark:bg-slate-900/10 backdrop-blur-sm overflow-hidden">
      {/* Background Glow - Max Intensity */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] h-[1200px] md:h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.4)_0%,transparent_70%)] blur-3xl opacity-100" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[800px] md:h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.3)_0%,transparent_70%)] blur-3xl opacity-100" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-12">

        {/* CTA Section - Integrated */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20">
          <div className="text-center md:text-left max-w-5xl">
            <FadeIn amount={0.2} direction="down">
              <h2 className="brand-font text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
                {tFooter.rich('ctaTitle', {
                  highlight: (chunks) => <span className="text-blue-600 dark:text-blue-500">{chunks}</span>
                })}
              </h2>
            </FadeIn>

            {/* Static Gradient Line */}
            <div className="relative z-20 h-1 w-24 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mb-6 mx-auto md:mx-0 transform-gpu" />

            <FadeIn amount={0.2} delay={0.1}>
              <p className="text-lg text-slate-700 dark:text-slate-300 font-medium">
                {tFooter('ctaSubtitle')}
              </p>
            </FadeIn>
          </div>

          <FadeIn amount={0.2} delay={0.2}>
            <ButtonLink href="/contact" size="lg" className="h-14 rounded-full px-10 text-lg font-semibold shadow-2xl shadow-blue-600/30 hover:scale-105 transition-transform duration-300 bg-blue-600 hover:bg-blue-700 text-white border-0">
              {tNav('contact')}
            </ButtonLink>
          </FadeIn>
        </div>

        <FadeInStagger amount={0.25} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 border-t border-slate-200/50 dark:border-slate-800/50">
          {/* Brand */}
          <FadeInItem className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3">
              <img
                src="/brand/solving-crew.svg"
                alt={tBrand('name')}
                className="h-10 w-auto"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-blue-600 dark:text-blue-500 tracking-tight leading-none">
                  {tBrand('name')}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                  {tBrand('promise')}
                </span>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed max-w-xs">
              {tFooter('brandText')}
            </p>

            <div className="flex gap-4">
              <ButtonA href={company.linkedin} target="_blank" rel="noreferrer" variant="secondary" size="icon" className="rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 dark:hover:bg-slate-800 transition-all">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
              </ButtonA>
              <ButtonA href={company.github} target="_blank" rel="noreferrer" variant="secondary" size="icon" className="rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 dark:hover:bg-slate-800 transition-all">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              </ButtonA>
            </div>
          </FadeInItem>

          {/* Navigation - Animated Links */}
          <FadeInItem className="lg:col-span-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-500 mb-6 text-lg">Menu</h3>
            <ul className="space-y-4">
              {[
                { href: '/', label: tNav('home') },
                { href: '/services', label: tNav('services') },
                { href: '/expertise', label: tNav('expertise') },
                { href: '/technology', label: tNav('technology') },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500 shadow-sm group-hover:scale-125 transition-all" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeInItem>

          <FadeInItem className="lg:col-span-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-500 mb-6 text-lg">Company</h3>
            <ul className="space-y-4">
              {[
                { href: '/team', label: tNav('team') },
                { href: '/contact', label: tNav('contact') },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500 shadow-sm group-hover:scale-125 transition-all" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeInItem>


          {/* Contact Info - More styling */}
          <FadeInItem className="lg:col-span-4">
            <h3 className="font-bold text-blue-600 dark:text-blue-500 mb-6 text-lg">{tFooter('contact')}</h3>
            <div className="space-y-6 text-sm text-slate-600 dark:text-slate-400">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white text-base mb-1">{tFooter('legalName')}</p>
                <p className="leading-relaxed">{tFooter('address')}</p>
              </div>
              <div className="flex flex-col gap-3">
                <a href={`mailto:${company.email}`} className="flex items-center gap-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                  <span className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 group-hover:text-blue-600 group-hover:bg-blue-50 dark:group-hover:bg-slate-800 transition-all">
                    ✉
                  </span>
                  <span className="font-medium">{company.email}</span>
                </a>
                <a href={`tel:${company.phone}`} className="flex items-center gap-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                  <span className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 group-hover:text-blue-600 group-hover:bg-blue-50 dark:group-hover:bg-slate-800 transition-all">
                    ☎
                  </span>
                  <span className="font-medium">{company.phone}</span>
                </a>
              </div>
            </div>
          </FadeInItem>
        </FadeInStagger>

        <FadeIn amount="all" delay={0.2} className="mt-16 pt-8 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-500">
          <p>© {new Date().getFullYear()} {tBrand('name')}. {tFooter('rights')}</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">{tFooter('privacy')}</Link>
            <Link href="#" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">{tFooter('terms')}</Link>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
