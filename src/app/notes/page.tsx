import type { Metadata } from 'next';
import { NotesCollection } from '@/components/notes/NotesCollection';
import { PortfolioSidebar } from '@/components/layout/PortfolioSidebar';
import { WorkspaceTopbar } from '@/components/layout/WorkspaceTopbar';
import { getArticles, getNotes } from '@/content/loaders';
import { createSearchItems } from '@/lib/searchItems';
import { publicAsset } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Small thoughts, big ideas — notes by Atila Pasha.',
};

export default async function NotesPage() {
  const [articles, notes] = await Promise.all([getArticles(), getNotes()]);
  const searchItems = createSearchItems(articles, notes);

  return <main className="portfolio-frame notes-frame">
    <PortfolioSidebar activePath="/notes/" />
    <section className="home-workspace notes-workspace">
      <WorkspaceTopbar items={searchItems} />
      <div className="notes-main">
        <header className="notes-heading">
          <div>
            <p className="page-eyebrow">A LITTLE SPACE FOR IDEAS</p>
            <h1>Notes</h1>
            <p>Small thoughts. Big ideas.</p>
          </div>
          <span className="notes-heading-sparkle" aria-hidden="true">✦</span>
        </header>
        <NotesCollection notes={notes.map((note) => ({
          ...note,
          cover: publicAsset(note.cover ?? '/images/notes/notes-default-cover.webp'),
        }))} />
      </div>
    </section>
  </main>;
}
