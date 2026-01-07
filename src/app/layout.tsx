import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/cn";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const brand = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600"], // uprav dle potřeby
  variable: "--font-brand",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://solving-crew.vercel.app"),
  title: {
    default: "Solving Crew",
    template: "%s | Solving Crew",
  },
  description: "From problem to production — with the right people.",
  openGraph: {
    type: "website",
    siteName: "Solving Crew",
    url: "https://solving-crew.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Solving Crew",
  url: "https://solving-crew.vercel.app",
  email: "vera.kasperova@seznam.cz",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(geistSans.variable, geistMono.variable, brand.variable, "antialiased")}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
