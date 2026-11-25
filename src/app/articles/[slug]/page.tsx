import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findBySlug, getArticles } from '@/content/loaders';
import { renderMarkdown } from '@/content/mdx';
import { canonicalUrl } from '@/lib/site';
export async function generateStaticParams() { return (await getArticles()).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const article = findBySlug(await getArticles(), slug);
  return article ? { title: article.title, description: article.description, alternates: { canonical: canonicalUrl(`/articles/${slug}/`) }, openGraph: { title: article.title, description: article.description, type: 'article', publishedTime: article.date, url: canonicalUrl(`/articles/${slug}/`) } } : {};
}
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const article = findBySlug(await getArticles(), slug); if (!article) notFound();
  const { content } = await renderMarkdown(article.body);
  return <main data-pagefind-body><article><h1>{article.title}</h1><p>{article.description}</p><time dateTime={article.date}>{article.date}</time>{content}</article></main>;
}
