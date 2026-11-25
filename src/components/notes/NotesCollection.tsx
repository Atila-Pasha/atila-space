'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import { useMemo, useState } from 'react';
import { Icon } from '@/components/home/Icon';
import type { Note } from '@/types/content';

const defaultCategories = ['philosophy', 'science', 'quotes', 'personal', 'programming'];

export function NotesCollection({ notes }: { notes: Note[] }) {
  const categories = useMemo(() => [...new Set([...defaultCategories, ...notes.map((note) => note.category)])], [notes]);
  const [activeCategory, setActiveCategory] = useState('all');
  const visibleNotes = useMemo(
    () => activeCategory === 'all' ? notes : notes.filter((note) => note.category === activeCategory),
    [activeCategory, notes],
  );

  return <section className="notes-collection" aria-label="Browse notes">
    <div className="notes-filters" role="group" aria-label="Filter notes by category">
      <button className={`notes-filter${activeCategory === 'all' ? ' is-active' : ''}`} type="button" aria-pressed={activeCategory === 'all'} onClick={() => setActiveCategory('all')}>All</button>
      {categories.map((category) => <button
        className={`notes-filter${activeCategory === category ? ' is-active' : ''}`}
        type="button"
        aria-pressed={activeCategory === category}
        key={category}
        onClick={() => setActiveCategory(category)}
      >{formatCategory(category)}</button>)}
    </div>

    {visibleNotes.length ? <div className="notes-list">
      {visibleNotes.map((note) => <Link className="note-card" href={`/notes/${note.slug}/` as Route} key={note.slug}>
        <div className="note-card-art">
          <Image src={note.cover ?? '/images/notes/notes-default-cover.webp'} alt="" fill sizes="(max-width: 760px) 100vw, 180px" />
        </div>
        <div className="note-card-copy">
          <div className="note-card-meta"><span>{formatCategory(note.category)}</span>{note.featured && <i>FEATURED</i>}</div>
          <h2>{note.title}</h2>
          <p>{excerpt(note.body)}</p>
          <time dateTime={note.date}>{formatDate(note.date)}</time>
        </div>
        <Icon className="note-card-arrow" name="arrow" />
      </Link>)}
    </div> : <div className="notes-empty-state">
      <span className="notes-empty-mark" aria-hidden="true">✦</span>
      <h2>{notes.length ? 'No notes in this category yet' : 'The first note is waiting to be written'}</h2>
      {notes.length > 0 && <p>Choose another category to explore more notes.</p>}
    </div>}
    <p className="notes-count">{notes.length} published {notes.length === 1 ? 'note' : 'notes'}</p>
  </section>;
}

function formatCategory(category: string) {
  return category.replace(/[-_]/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

function excerpt(body: string) {
  return body.replace(/[#>*_`~\[\]]/g, '').replace(/\s+/g, ' ').trim().slice(0, 150);
}
