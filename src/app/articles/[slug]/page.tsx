import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findBySlug, getArticles } from '@/content/loaders';
import { renderMarkdown } from '@/content/mdx';
import { canonicalUrl } from '@/lib/site';
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.length ? articles.map(({ slug }) => ({ slug })) : [{ slug: '__no-published-articles__' }];
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const article = findBySlug(await getArticles(), slug);
  if (!article) return { robots: { index: false, follow: false } };
  const url = canonicalUrl(`/articles/${slug}/`);
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: url },
    openGraph: { title: article.title, description: article.description, type: 'article', publishedTime: article.date, url },
  };
}
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const article = findBySlug(await getArticles(), slug); if (!article) notFound();
  const { content } = await renderMarkdown(article.body);
  return <main data-pagefind-body><article><h1>{article.title}</h1><p>{article.description}</p><time dateTime={article.date}>{article.date}</time>{content}</article></main>;
}
