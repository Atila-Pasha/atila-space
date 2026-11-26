import { HomePage } from '@/components/home/HomePage';
import { getArticles, getNotes } from '@/content/loaders';
import { buildProfilePageStructuredData, createPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = createPageMetadata({
  title: 'Home',
  absoluteTitle: 'Atila Pashazadeh (Atila Pasha) · آتیلا پاشازاده | AtA',
  description:
    'Official personal website of Atila Pashazadeh (Atila Pasha / آتیلا پاشازاده / آتیلا پاشا) — Python developer and Statistics student sharing projects, notes, and ideas.',
  path: '/',
});

export default async function Home() {
  const [articles, notes] = await Promise.all([getArticles(), getNotes()]);
  const profileJsonLd = buildProfilePageStructuredData();

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }} />
    <HomePage articles={articles} notes={notes} />
  </>;
}
