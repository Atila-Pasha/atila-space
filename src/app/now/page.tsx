import type { Metadata } from 'next';
import { canonicalUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Now',
  alternates: { canonical: canonicalUrl('/now/') },
  robots: { index: false, follow: false },
};

export default function NowPage() { return <main><h1>Now page placeholder</h1></main>; }
