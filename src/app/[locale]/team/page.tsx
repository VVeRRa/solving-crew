import { getTranslations, setRequestLocale } from 'next-intl/server';
import SectionHeader from '@/components/SectionHeader';
import { Page, Section } from '@/components/ui/section';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ButtonLink } from '@/components/ui/button';
import PageLayout from '@/components/PageLayout';

import { FadeIn } from '@/components/FadeIn';

const isTeamEnabled = process.env.NEXT_PUBLIC_TEAM_ENABLED === 'true';

export default async function TeamPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations('Team');
    const nav = await getTranslations('Nav');

    return (
        <PageLayout>
            <Page className="space-y-12">
                <SectionHeader
                    title={t('title')}
                />

                <Section>
                    <FadeIn delay={0.1}>
                        <Card variant="plain" className="rounded-3xl">
                            <CardContent className="space-y-4">
                                {!isTeamEnabled ? (
                                    <>
                                        <Badge variant="warning">Coming soon</Badge>

                                        <p className="text-slate-700 dark:text-slate-300">{t('comingSoon')}</p>

                                        <div className="grid md:grid-cols-3 gap-4 pt-2">
                                            {[
                                                { title: 'Engineering & DevOps', scheme: 'blue' as const },
                                                { title: 'QA & Automation', scheme: 'cyan' as const },
                                                { title: 'Design & Product', scheme: 'indigo' as const }
                                            ].map((x) => (
                                                <Card
                                                    key={x.title}
                                                    accent="stripe"
                                                    scheme={x.scheme}
                                                    variant="tinted"
                                                    className="shadow-none"
                                                >
                                                    <CardContent className="p-5 space-y-2">
                                                        <div className="font-semibold">{x.title}</div>
                                                        <div className="text-sm text-slate-700 dark:text-slate-300">
                                                            Profiles & leadership details will be published in February 2026.
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>

                                        <div className="pt-2">
                                            <ButtonLink href="/contact" variant="primary">
                                                {nav('contact')}
                                            </ButtonLink>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-slate-700 dark:text-slate-300">Team enabled.</p>
                                )}
                            </CardContent>
                        </Card>
                    </FadeIn>
                </Section>
            </Page>
        </PageLayout>);
}
