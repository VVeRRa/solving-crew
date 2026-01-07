import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Page, Section } from '@/components/ui/section';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ButtonLink } from '@/components/ui/button';
import { TechPill } from '@/components/ui/tech-pill';
import PageLayout from '@/components/PageLayout';

export default async function HomePage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const tHome = await getTranslations('Home');
    const tBrand = await getTranslations('Brand');

    const heroBullets = tHome?.raw('heroBullets') as { title: string; text: string }[];
    const heroChip = tHome('heroChip');

    const highlights = [
        { k: 'h1' as const, scheme: 'blue' as const },
        { k: 'h2' as const, scheme: 'cyan' as const },
        { k: 'h3' as const, scheme: 'indigo' as const }
    ];

    const stack = tHome.raw('stack') as string[];

    // Simple grouping without new i18n keys (keeps build safe)
    const groupedStack = (() => {
        const used = new Set<string>();
        const pick = (re: RegExp) =>
            stack.filter((x) => {
                if (used.has(x)) return false;
                if (!re.test(x)) return false;
                used.add(x);
                return true;
            });

        const groups = [
            { title: 'Frontend', items: pick(/React|Next|TypeScript|Playwright|Cypress|Figma/i) },
            { title: 'Platform', items: pick(/Kubernetes|AWS|Terraform|Prometheus|Grafana|Loki/i) },
            { title: 'Backend & Data', items: pick(/Java|Quarkus|Spring|Node|Go|Postgres|NATS|Elastic|Valkey|Redis/i) }
        ];

        const rest = stack.filter((x) => !used.has(x));
        if (rest.length) groups.push({ title: 'Other', items: rest });

        return groups;
    })();

    return (
        <PageLayout>
            <Page className="space-y-16 py-12 md:py-16">
                {/* HERO (2 columns) */}
                <Section className="grid lg:grid-cols-2 gap-10 items-start">
                    <div className="space-y-5">
                        <Badge className="text-xs font-semibold" variant="soft">
                            {tHome('kicker')}
                        </Badge>

                        <h1 className="brand-font text-4xl md:text-5xl font-semibold tracking-tight">
                            {tBrand('name')}
                        </h1>

                        {/* “why” / promise – kratší řádek, lepší rytmus */}
                        <p className="text-lg text-slate-800 dark:text-slate-200 max-w-xl leading-relaxed">
                            {tBrand('promise')}
                        </p>

                        {/* subheadline a pod tím konkrétní body */}
                        <p className="text-base text-slate-700 dark:text-slate-300 max-w-xl leading-relaxed">
                            {tHome('subheadline')}
                        </p>

                        {/* 3 value bullets (fallback bez nových překladů) */}
                        <div className="grid gap-5 max-w-xl">
                            {heroBullets?.map((b) => (
                                <div
                                    key={b.title}
                                    className="rounded-xl border border-slate-200 bg-white/60 p-4 dark:border-slate-800 dark:bg-black/20"
                                >
                                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                                        {b.title}
                                    </div>
                                    <div className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                                        {b.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA + micro-proof row */}
                        <div className="pt-1 flex flex-wrap items-center gap-3">
                            <ButtonLink href="/contact" variant="primary">
                                {tHome('ctaPrimary')}
                            </ButtonLink>
                            <ButtonLink href="/services" variant="secondary">
                                {tHome('ctaSecondary')}
                            </ButtonLink>

                            {/* tiny “response time” chip */}
                            <Badge variant="outline" className="bg-white/60 dark:bg-black/20">
                                {(heroChip as string) ?? 'Typically reply within 24h'}
                            </Badge>
                        </div>
                    </div>


                    {/* right visual / showcase */}
                    <Section className="grid md:grid-cols-1 gap-6">
                        {highlights.map(({ k, scheme }) => (
                            <Card key={k} variant="glass" accent="stripe" scheme={scheme} className="h-full">
                                <CardContent className="space-y-3 h-full flex flex-col">
                                    <Badge variant="outline" className="bg-white/60 dark:bg-black/20 w-fit">
                                        {tHome(`highlights.${k}.badge`)}
                                    </Badge>

                                    <div className="font-semibold">{tHome(`highlights.${k}.title`)}</div>

                                    <div className="text-slate-700 dark:text-slate-300">
                                        {tHome(`highlights.${k}.text`)}
                                    </div>

                                    {/* spacer to keep equal visual rhythm */}
                                    <div className="mt-auto pt-2" />
                                </CardContent>
                            </Card>
                        ))}
                    </Section>
                </Section>



                {/* STACK (grouped) */}
                <Card variant="glass" scheme="cyan" accent="corner" className="rounded-[22px]">
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold">{tHome('stackTitle')}</h2>
                            <p className="text-slate-700 dark:text-slate-300">{tHome('stackNote')}</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            {groupedStack.slice(0, 3).map((g) => (
                                <div
                                    key={g.title}
                                    className="rounded-xl border border-slate-200 bg-white/60 p-4 dark:border-slate-800 dark:bg-black/20"
                                >
                                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                        {g.title}
                                    </div>

                                    <div className="mt-3 flex flex-wrap gap-2 text-sm">
                                        {g.items.map((x) => (
                                            <TechPill key={x} className="hover:bg-amber-50 dark:hover:border-amber-500/40">
                                                {x}
                                            </TechPill>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* If anything didn't fit, show it below (optional, safe) */}
                        {groupedStack.length > 3 && (
                            <div className="flex flex-wrap gap-2 text-sm">
                                {groupedStack.slice(3).flatMap((g) => g.items).map((x) => (
                                    <TechPill key={x} className="hover:bg-amber-50 dark:hover:border-amber-500/40">
                                        {x}
                                    </TechPill>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* CTA BLOCK */}
                <Card variant="gradient" scheme="blue" accent="corner" className="rounded-[22px]">
                    <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <div className="text-xl font-semibold">{tHome('ctaBlock.title')}</div>
                            <div className="mt-2 text-slate-700 dark:text-slate-300">
                                {tHome('ctaBlock.text')}
                            </div>
                        </div>

                        <ButtonLink href="/contact" variant="primary">
                            {tHome('ctaBlock.button')}
                        </ButtonLink>
                    </CardContent>
                </Card>
            </Page>
        </PageLayout>);
}
