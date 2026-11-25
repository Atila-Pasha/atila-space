import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findBySlug, getNotes } from '@/content/loaders';
import { renderMarkdown } from '@/content/mdx';
import { canonicalUrl } from '@/lib/site';
export async function generateStaticParams() {
  const notes = await getNotes();
  return notes.length ? notes.map(({ slug }) => ({ slug })) : [{ slug: '__no-published-notes__' }];
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const note = findBySlug(await getNotes(), slug);
  return note ? { title: note.title, description: note.body.slice(0, 160), alternates: { canonical: canonicalUrl(`/notes/${slug}/`) } } : {};
}
export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const note = findBySlug(await getNotes(), slug); if (!note) notFound();
  const { content } = await renderMarkdown(note.body);
  return <main data-pagefind-body lang={note.language ?? 'en'} dir={note.language === 'fa' ? 'rtl' : 'ltr'}><article><h1>{note.title}</h1><time dateTime={note.date}>{note.date}</time>{content}</article></main>;
}
