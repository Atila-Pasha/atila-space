import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { canonicalUrl, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: canonicalUrl('/'), types: { 'application/rss+xml': '/rss.xml' } },
  title: { default: 'Atila Portfolio', template: '%s | Atila Portfolio' },
  description: 'Personal website and digital space.',
  openGraph: { type: 'website', siteName: 'Atila Portfolio', title: 'Atila Portfolio', description: 'Personal website and digital space.' },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en" className="dark"><body>{children}</body></html>;
}
