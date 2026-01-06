import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Page, Section } from '@/components/ui/section';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ButtonLink } from '@/components/ui/button';
import PageLayout from '@/components/PageLayout';
import SectionHeader from '@/components/SectionHeader';

export default async function ServicesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Services');

  const includesRaw = t.raw('includes');
  const includes = Array.isArray(includesRaw) ? (includesRaw as string[]) : [];

  const options = ['o1', 'o2', 'o3'] as const;
  const process = ['p1', 'p2', 'p3'] as const;

  return (
    <PageLayout>
      <Page className="space-y-14">
        <SectionHeader title={t('title')} lead={t('lead')} />

        {/* Options */}
        <Section className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">{t('optionsTitle')}</h2>
            <Badge variant="info">{t('availabilityBadge')}</Badge>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {options.map((k) => (
              <Card
                key={k}
                variant="glass"
                accent="stripe"
                scheme="blue"
                className="rounded-[22px]"
              >
                <CardContent className="space-y-3">
                  <Badge variant="outline" className="bg-white/60 dark:bg-black/20">
                    {t(`options.${k}.badge`)}
                  </Badge>
                  <div className="font-semibold">{t(`options.${k}.title`)}</div>
                  <div className="text-slate-700 dark:text-slate-300">
                    {t(`options.${k}.text`)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* Process */}
        <Section className="space-y-6">
          <h2 className="text-2xl font-semibold">{t('processTitle')}</h2>

          <div className="grid gap-6 md:grid-cols-3 items-stretch">
            {process.map((k, idx) => (
              <Card
                key={k}
                variant="glass"
                accent="corner"
                scheme="blue"
                className="rounded-[22px]"
              >
                <CardContent className="space-y-2">
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    0{idx + 1}
                  </div>
                  <div className="font-semibold">{t(`process.${k}.title`)}</div>
                  <div className="text-slate-700 dark:text-slate-300">
                    {t(`process.${k}.text`)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* Pricing + Includes */}
        <Section className="grid md:grid-cols-2 gap-6">
          {/* Pricing (zjemněno: glass místo gradientu) */}
          <Card
            variant="glass"
            accent="stripe"
            scheme="blue"
            className="rounded-[22px]"
          >
            <CardContent className="space-y-3">
              <h2 className="text-xl font-semibold">{t('pricingTitle')}</h2>
              <div className="text-slate-600 dark:text-slate-300">
                {t('pricing.rateLabel')}
              </div>
              <div className="text-3xl font-semibold tracking-tight">
                {t('pricing.rate')}
              </div>
              <div className="text-slate-600 dark:text-slate-300">
                {t('pricing.note')}
              </div>
            </CardContent>
          </Card>

          <Card
            variant="glass"
            accent="stripe"
            scheme="blue"
            className="rounded-[22px]"
          >
            <CardContent className="space-y-4">
              <h2 className="text-xl font-semibold">{t('includesTitle')}</h2>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                {includes.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-2 h-2 w-2 rounded-full bg-blue-500/70" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <ButtonLink href="/contact" variant="primary">
                  {t('cta.button')}
                </ButtonLink>
              </div>
            </CardContent>
          </Card>
        </Section>
      </Page>
    </PageLayout>
  );
}
