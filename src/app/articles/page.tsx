import type { Metadata } from 'next';
import { getArticles } from '@/content/loaders';
import { canonicalUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Articles',
  alternates: { canonical: canonicalUrl('/articles/') },
  robots: { index: false, follow: false },
};

export default async function ArticlesPage() { const articles = await getArticles(); return <main><h1>Articles page placeholder</h1><p>{articles.length} sample articles are available to the content layer.</p></main>; }
