import type { Metadata } from 'next';
import { canonicalUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Reading',
  alternates: { canonical: canonicalUrl('/reading/') },
  robots: { index: false, follow: false },
};

export default function ReadingPage() { return <main><h1>Reading page placeholder</h1></main>; }
