import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import '@/app/globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import ThemeProvider from '@/components/ThemeProvider';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) notFound();

    setRequestLocale(locale);
    const messages = await getMessages();

    return (
            <NextIntlClientProvider locale={locale} messages={messages}>
                <ThemeProvider>
                    <div className="min-h-dvh flex flex-col">
                        <SiteHeader />
                        <main className="flex-1 relative">{children}</main>
                        <SiteFooter />
                    </div>
                </ThemeProvider>
            </NextIntlClientProvider>
    );
}
