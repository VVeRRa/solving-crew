import { getTranslations, setRequestLocale } from 'next-intl/server';
import SectionHeader from '@/components/SectionHeader';
import { Page, Section } from '@/components/ui/section';
import { Card, CardContent } from '@/components/ui/card';
import { Button, ButtonA } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ContactForm from '@/components/ContactForm';
import PageLayout from '@/components/PageLayout';

function normalizeTel(phone: string) {
    return phone.replace(/[^\d+]/g, '');
}

export default async function ContactPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations('Contact');

    const email = t('placeholders.email');
    const phone = t('placeholders.phone');
    const tel = normalizeTel(phone);

    return (
        <PageLayout>
            <Page>
                <SectionHeader
                    title={t('title')}
                    lead={t('lead')}
                />

                <Section className="grid md:grid-cols-2 gap-6">
                    <Card variant="gradient" scheme="cyan" className="rounded-3xl">
                        <CardContent className="space-y-5">
                            <div className="flex items-center gap-2">
                                <Badge variant="info">Email</Badge>
                                <Badge variant="success">Phone</Badge>
                            </div>

                            <div className="grid gap-4">
                                <Card variant="tinted" scheme="blue" className="rounded-xl shadow-none border border-blue-200/70 dark:border-blue-500/20">
                                    <CardContent className="p-4">
                                        <div className="text-sm text-slate-600 dark:text-slate-300">{t('emailLabel')}</div>
                                        <div className="mt-1 font-semibold">{email}</div>
                                    </CardContent>
                                </Card>

                                <Card variant="tinted" scheme="cyan" className="rounded-xl shadow-none border border-cyan-200/70 dark:border-cyan-500/20">
                                    <CardContent className="p-4">
                                        <div className="text-sm text-slate-600 dark:text-slate-300">{t('phoneLabel')}</div>
                                        <div className="mt-1 font-semibold">{phone}</div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="pt-1 flex flex-wrap gap-3">
                                <ButtonA href={`mailto:${email}`} variant="primary">
                                    {t('emailLabel')}
                                </ButtonA>
                                <ButtonA href={`tel:${tel}`} variant="secondary">
                                    {t('phoneLabel')}
                                </ButtonA>
                            </div>

                            <div className="text-sm text-slate-600 dark:text-slate-300">{t('notes.privacy')}</div>
                        </CardContent>
                    </Card>

                    <Card accent="stripe" scheme="indigo" className="rounded-3xl">
                        <CardContent className="space-y-4">
                            <ContactForm
                                locale={locale}
                                labels={{
                                    name: t('form.name'),
                                    company: t('form.company'),
                                    email: t('form.email'),
                                    phone: t('form.phone'),
                                    message: t('form.message'),
                                    submit: t('form.submit'),
                                    success: t('form.success'),
                                    error: t('form.error'),

                                    helper: {
                                        messageHint: t.raw('form.helper.messageHint') as string
                                    },
                                    validation: {
                                        nameRequired: t('form.validation.nameRequired'),
                                        nameTooLong: t.raw('form.validation.nameTooLong') as string,
                                        companyTooLong: t.raw('form.validation.companyTooLong') as string,
                                        emailRequired: t('form.validation.emailRequired'),
                                        emailInvalid: t('form.validation.emailInvalid'),
                                        phoneTooLong: t.raw('form.validation.phoneTooLong') as string,
                                        messageRequired: t('form.validation.messageRequired'),
                                        messageTooShort: t.raw('form.validation.messageTooShort') as string,
                                        messageTooLong: t.raw('form.validation.messageTooLong') as string
                                    }
                                }}
                            />
                        </CardContent>
                    </Card>
                </Section>
            </Page>
        </PageLayout>
    );
}
