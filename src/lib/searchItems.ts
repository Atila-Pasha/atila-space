import type { Article, Note } from '@/types/content';
import { githubProjects } from '@/data/githubProjects';

export type SearchItem = { title: string; description: string; href: string; kind: string; external?: boolean };

export function createSearchItems(articles: Article[], notes: Note[]): SearchItem[] {
  return [
    ...articles.map((item) => ({ title: item.title, description: item.description, href: `/articles/${item.slug}/`, kind: 'Article' })),
    ...notes.map((item) => ({ title: item.title, description: item.body, href: `/notes/${item.slug}/`, kind: 'Note' })),
    ...githubProjects.map((item) => ({ title: item.name, description: item.description, href: item.repositoryUrl, kind: 'Project', external: true })),
  ];
}
