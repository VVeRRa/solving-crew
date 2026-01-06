import { getTranslations, setRequestLocale } from 'next-intl/server';
import SectionHeader from '@/components/SectionHeader';
import { Page, Section } from '@/components/ui/section';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ButtonLink } from '@/components/ui/button';
import PageLayout from '@/components/PageLayout';

export default async function ExpertisePage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations('Expertise');
    const nav = await getTranslations('Nav');

    const capabilities = t.raw('capabilities') as string[];

    const areas = [
        { key: 'proptech' as const, scheme: 'blue' as const },
        { key: 'fintech' as const, scheme: 'cyan' as const },
        { key: 'highload' as const, scheme: 'indigo' as const }
    ];

    return (
        <PageLayout>
            <Page className="space-y-14">
                <SectionHeader  title={t('title')} lead={t('lead')} />

                <Section className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-3 items-stretch">
                        {areas.map(({ key, scheme }) => (
                            <Card key={key} variant="glass" accent="stripe" scheme={scheme}>
                                <CardContent className="space-y-3">
                                    

                                    <div className="font-semibold">{t(`areas.${key}.title`)}</div>
                                    <div className="text-slate-700 dark:text-slate-300">{t(`areas.${key}.text`)}</div>
                                </CardContent>
                            </Card>
                        ))}</div>
                </Section>

                <Card variant="gradient" scheme="blue" accent="corner" className="rounded-[22px]">
                    <CardContent className="space-y-4">
                        <h2 className="text-2xl font-semibold">{t('capabilitiesTitle')}</h2>
                        <ul className="grid md:grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
                            {capabilities.map((x) => (
                                <li key={x} className="flex gap-2">
                                    <span className="mt-2 h-2 w-2 rounded-full bg-blue-500/80" />
                                    <span>{x}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-2">
                            <ButtonLink href="/contact" variant="primary">
                                {nav('contact')}
                            </ButtonLink>
                        </div>
                    </CardContent>
                </Card>
            </Page>
        </PageLayout>);
}
