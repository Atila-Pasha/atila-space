import { HomePage } from '@/components/home/HomePage';
import { getArticles, getNotes } from '@/content/loaders';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: { absolute: 'AtA | Home' } };

export default async function Home() {
  const [articles, notes] = await Promise.all([getArticles(), getNotes()]);
  return <HomePage articles={articles} notes={notes} />;
}
