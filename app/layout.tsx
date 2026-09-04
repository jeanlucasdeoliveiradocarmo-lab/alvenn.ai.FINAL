import type { Metadata, Viewport } from 'next';
import { Fira_Code } from 'next/font/google';
import Script from 'next/script';
import JsonLd from './components/JsonLd';
import {
  organizationSchema,
  websiteSchema,
} from '@/lib/structured-data';
import './globals.css';

const SITE_URL = 'https://alvenn.dev.br';
const SITE_TITLE =
  'Alvenn.ai — Sites estratégicos por assinatura';
const SITE_DESCRIPTION =
  'Sites estratégicos por assinatura com design premium, alta performance e foco em conversão para transformar a presença digital da sua empresa.';

const firaCode = Fira_Code({
  variable: '--font-fira',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | Alvenn.ai',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Alvenn.ai',
    'criação de sites',
    'sites por assinatura',
    'web design premium',
    'design estratégico',
    'sites de alta performance',
    'sites focados em conversão',
    'desenvolvimento Next.js',
    'SEO técnico',
    'presença digital',
  ],
  authors: [
    {
      name: 'Alvenn.ai',
      url: SITE_URL,
    },
  ],
  creator: 'Alvenn.ai',
  publisher: 'Alvenn.ai',
  category: 'technology',
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: 'Alvenn.ai',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/alvenn-logo.png',
        width: 1254,
        height: 1254,
        alt: 'Alvenn.ai — Design, estratégia e performance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/alvenn-logo.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon.png',
        type: 'image/png',
        sizes: '512x512',
      },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#05070b',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleAnalyticsId =
    process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="pt-BR">
      <body className={firaCode.variable}>
        <JsonLd
          id="organization-json-ld"
          data={organizationSchema}
        />

        <JsonLd
          id="website-json-ld"
          data={websiteSchema}
        />

        {children}

        {googleAnalyticsId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
                googleAnalyticsId,
              )}`}
              strategy="lazyOnload"
            />

            <Script
              id="google-analytics"
              strategy="lazyOnload"
            >
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', ${JSON.stringify(
                  googleAnalyticsId,
                )}, {
                  anonymize_ip: true,
                  page_path: window.location.pathname
                });
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
