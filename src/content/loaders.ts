import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { articleSchema, noteSchema } from './schema';
import { projectSchema } from './schema';
import { isValidDate, sortByDateDescending } from '@/lib/dates';
import type { Article, Note, Project } from '@/types/content';

const root = path.join(process.cwd(), 'content');
async function markdownFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const children = await Promise.all(entries.map((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? markdownFiles(full) : /\.(md|mdx)$/.test(entry.name) ? [full] : [];
  }));
  return children.flat().sort();
}
function explain(file: string, details: string): Error { return new Error(`Invalid content in ${path.relative(root, file)}: ${details}`); }
function assertUniqueSlugs<T extends { slug: string; sourcePath: string }>(kind: string, items: T[]): void {
  const seen = new Map<string, string>();
  for (const item of items) {
    const previous = seen.get(item.slug);
    if (previous) throw new Error(`Duplicate ${kind} slug '${item.slug}' in ${previous} and ${item.sourcePath}`);
    seen.set(item.slug, item.sourcePath);
  }
}

export async function getArticles(): Promise<Article[]> {
  const files = await markdownFiles(path.join(root, 'articles'));
  const articles = await Promise.all(files.map(async (file): Promise<Article> => {
    const parsed = matter(await readFile(file, 'utf8'));
    const result = articleSchema.safeParse(parsed.data);
    if (!result.success) throw explain(file, result.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; '));
    if (!isValidDate(result.data.date) || (result.data.updatedAt && !isValidDate(result.data.updatedAt))) throw explain(file, 'date fields must be real dates in YYYY-MM-DD format');
    return { ...result.data, sourcePath: path.relative(root, file), body: parsed.content.trim() };
  }));
  assertUniqueSlugs('article', articles);
  return sortByDateDescending(articles.filter((item) => item.published));
}
export async function getNotes(): Promise<Note[]> {
  const files = await markdownFiles(path.join(root, 'notes'));
  const notes = await Promise.all(files.map(async (file): Promise<Note> => {
    const parsed = matter(await readFile(file, 'utf8'));
    const result = noteSchema.safeParse(parsed.data);
    if (!result.success) throw explain(file, result.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; '));
    if (!isValidDate(result.data.date)) throw explain(file, 'date must be a real date in YYYY-MM-DD format');
    return { ...result.data, sourcePath: path.relative(root, file), body: parsed.content.trim() };
  }));
  assertUniqueSlugs('note', notes);
  return sortByDateDescending(notes.filter((item) => item.published));
}
export async function getProjects(): Promise<Project[]> {
  const file = path.join(root, 'projects', 'projects.json');
  const data: unknown = JSON.parse(await readFile(file, 'utf8'));
  const result = projectSchema.array().safeParse(data);
  if (!result.success) throw explain(file, result.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; '));
  return result.data;
}
export function findBySlug<T extends { slug: string }>(items: T[], slug: string): T | undefined { return items.find((item) => item.slug === slug); }
export function filterNotes(notes: Note[], options: { category?: string; tags?: string[] } = {}): Note[] {
  return notes.filter((note) => (!options.category || note.category === options.category) && (!options.tags?.length || options.tags.every((tag) => note.tags.includes(tag))));
}
export function randomNote(notes: Note[], random = Math.random): Note | undefined { return notes.length ? notes[Math.floor(random() * notes.length)] : undefined; }
