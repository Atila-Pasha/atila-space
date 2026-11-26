import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { BRAND_NAME, CORE_SEO_KEYWORDS, DEFAULT_OG_IMAGE, PERSON_NAME, buildSiteStructuredData } from '@/lib/seo';
import { canonicalUrl, siteUrl } from '@/lib/site';

const defaultTitle = 'Atila Pashazadeh (Atila Pasha) · آتیلا پاشازاده | AtA';
const defaultDescription = 'Official personal website of Atila Pashazadeh (Atila Pasha / آتیلا پاشازاده / آتیلا پاشا) — Python developer, Statistics student, projects, notes, and ideas.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { types: { 'application/rss+xml': '/rss.xml' } },
  title: { default: defaultTitle, template: `%s · ${PERSON_NAME} | AtA` },
  description: defaultDescription,
  keywords: CORE_SEO_KEYWORDS,
  authors: [{ name: PERSON_NAME, url: siteUrl }],
  creator: PERSON_NAME,
  publisher: PERSON_NAME,
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
  icons: { icon: '/favicon.png', shortcut: '/favicon.png', apple: '/favicon.png' },
  openGraph: {
    type: 'website',
    siteName: BRAND_NAME,
    locale: 'en_US',
    alternateLocale: ['fa_IR'],
    title: defaultTitle,
    description: defaultDescription,
    images: [{ url: canonicalUrl(DEFAULT_OG_IMAGE), alt: 'Atila Pashazadeh (Atila Pasha / آتیلا پاشازاده)' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: [canonicalUrl(DEFAULT_OG_IMAGE)],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const structuredData = buildSiteStructuredData();

  return <html lang="en" className="dark">
    <body>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </body>
  </html>;
}
