'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { SearchItem } from '@/lib/searchItems';
import { Icon } from './Icon';

export type { SearchItem } from '@/lib/searchItems';

export function HomeSearch({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const matches = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    if (!normalized) return [];
    return items.filter((item) => `${item.title} ${item.description} ${item.kind}`.toLocaleLowerCase().includes(normalized)).slice(0, 5);
  }, [items, query]);

  useEffect(() => {
    function onShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    }
    window.addEventListener('keydown', onShortcut);
    return () => window.removeEventListener('keydown', onShortcut);
  }, []);

  return <div className="home-search">
    <Icon name="search" className="search-icon" />
    <input
      ref={inputRef}
      type="search"
      value={query}
      placeholder="Search anything…"
      aria-label="Search articles, notes, and projects"
      aria-expanded={isOpen && matches.length > 0}
      onFocus={() => setIsOpen(true)}
      onChange={(event) => { setQuery(event.target.value); setIsOpen(true); }}
      onBlur={() => window.setTimeout(() => setIsOpen(false), 120)}
    />
    <kbd>Ctrl <span>+</span> K</kbd>
    {isOpen && matches.length > 0 && <div className="search-results" role="listbox">
      {matches.map((item) => item.external
        ? <a href={item.href} className="search-result" key={`${item.kind}-${item.href}`} role="option" target="_blank" rel="noreferrer">
            <span className="search-result-kind">{item.kind}</span><span className="search-result-title">{item.title}</span>
          </a>
        : <Link href={item.href as Route} className="search-result" key={`${item.kind}-${item.href}`} role="option">
            <span className="search-result-kind">{item.kind}</span><span className="search-result-title">{item.title}</span>
          </Link>)}
    </div>}
  </div>;
}
