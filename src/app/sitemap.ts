import type { MetadataRoute } from 'next';
import { getArticles, getNotes, getProjects } from '@/content/loaders';
import { canonicalUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fixed: Array<{ path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }> = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/about/', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/projects/', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/notes/', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/stack/', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact/', priority: 0.7, changeFrequency: 'monthly' },
  ];

  const [articles, notes, projects] = await Promise.all([getArticles(), getNotes(), getProjects()]);
  const publishedProjects = projects.filter((item) => !item.slug.startsWith('sample-') && item.status !== 'planned');

  return [
    ...fixed.map(({ path, priority, changeFrequency }) => ({
      url: canonicalUrl(path),
      changeFrequency,
      priority,
    })),
    ...(articles.length ? [{ url: canonicalUrl('/articles/'), changeFrequency: 'weekly' as const, priority: 0.7 }] : []),
    ...articles.map((item) => ({ url: canonicalUrl(`/articles/${item.slug}/`), lastModified: item.updatedAt ?? item.date })),
    ...notes.map((item) => ({ url: canonicalUrl(`/notes/${item.slug}/`), lastModified: item.date })),
    ...publishedProjects.map((item) => ({ url: canonicalUrl(`/projects/${item.slug}/`) })),
  ];
}
