import type { MetadataRoute } from 'next';
import { getArticles, getNotes, getProjects } from '@/content/loaders';
import { canonicalUrl } from '@/lib/site';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fixed = ['', '/about', '/projects', '/articles', '/notes', '/stack', '/reading', '/now', '/contact'];
  const [articles, notes, projects] = await Promise.all([getArticles(), getNotes(), getProjects()]);
  return [
    ...fixed.map((path) => ({ url: canonicalUrl(path), changeFrequency: 'monthly' as const })),
    ...articles.map((item) => ({ url: canonicalUrl(`/articles/${item.slug}/`), lastModified: item.updatedAt ?? item.date })),
    ...notes.map((item) => ({ url: canonicalUrl(`/notes/${item.slug}/`), lastModified: item.date })),
    ...projects.map((item) => ({ url: canonicalUrl(`/projects/${item.slug}/`) })),
  ];
}
