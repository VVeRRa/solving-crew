import { getTranslations, setRequestLocale } from 'next-intl/server';
import SectionHeader from '@/components/SectionHeader';
import { Page, Section } from '@/components/ui/section';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import PageLayout from '@/components/PageLayout';

export default async function TechnologyPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations('Technology');
    const nav = await getTranslations('Nav');

    const principles = t.raw('principles') as string[];

    const sections = [
        { key: 'backend' as const, scheme: 'blue' as const },
        { key: 'frontend' as const, scheme: 'indigo' as const },
        { key: 'platform' as const, scheme: 'indigo' as const },
        { key: 'data' as const, scheme: 'blue' as const },
        { key: 'quality' as const, scheme: 'cyan' as const },
        { key: 'design' as const, scheme: 'indigo' as const }
    ];

    return (
        <PageLayout>
            <Page className="space-y-14">
                <SectionHeader  title={t('title')} lead={t('lead')} />

                <Section className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2 items-stretch">
                        {sections.map(({ key, scheme }) => (
                            <Card
                                key={key}
                                variant="glass"
                                accent="stripe"
                                scheme={scheme}
                                className="h-full"
                            >
                                <CardContent className="space-y-3">


                                    <div className="font-semibold">{t(`sections.${key}.title`)} </div>
                                    <div className="text-slate-700 dark:text-slate-300">
                                        {t(`sections.${key}.text`)}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Section>

                <Card variant="gradient" scheme="indigo" accent="corner" className="rounded-[22px]">
                    <CardContent className="space-y-4">
                        <h2 className="text-2xl font-semibold">{t('principlesTitle')}</h2>

                        <div className="grid md:grid-cols-2 gap-3">
                            {principles.map((x) => (
                                <div
                                    key={x}
                                    className="rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-black/20"
                                >
                                    <div className="text-slate-700 dark:text-slate-300">{x}</div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-2 flex gap-3">
                            <ButtonLink href="/services" variant="secondary">
                                {nav('services')}
                            </ButtonLink>
                            <ButtonLink href="/contact" variant="primary">
                                {nav('contact')}
                            </ButtonLink>
                        </div>
                    </CardContent>
                </Card>
            </Page>
        </PageLayout>);
}
