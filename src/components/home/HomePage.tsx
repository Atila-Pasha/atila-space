import Link from 'next/link';
import { mainNavigation } from '@/data/navigation';
import { githubProjects } from '@/data/githubProjects';
import { createSearchItems } from '@/lib/searchItems';
import type { Article, Note } from '@/types/content';
import { Icon, type IconName } from './Icon';
import { WorkspaceTopbar } from '@/components/layout/WorkspaceTopbar';
import { HomePortraitScene } from './HomePortraitScene';

type Props = { articles: Article[]; notes: Note[] };

export function HomePage({ articles, notes }: Props) {
  const searchItems = createSearchItems(articles, notes);
  const latestUpdate = [...articles, ...notes].reduce<string | undefined>(
    (latest, item) => !latest || item.date > latest ? item.date : latest,
    undefined,
  );

  return <main className="portfolio-frame">
    <aside className="sidebar">
      <Link href="/" className="brand-mark" aria-label="Atila home">
        <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M23.9 5.2 5.2 42h11.2l7.5-15.1 7.2 15.1h11.7L24.1 5.2Zm.1 15.1 4.1 8.2h-8.2Z" fill="currentColor"/><path d="M17.8 32.8h12.4l4.5 9.2H13.2Z" fill="currentColor" opacity=".55"/></svg>
      </Link>
      <nav className="side-navigation" aria-label="Main navigation">
        {mainNavigation.map(({ href, label, icon }) => <Link
          key={href}
          href={href}
          className={`side-link${href === '/' ? ' is-active' : ''}`}
          aria-current={href === '/' ? 'page' : undefined}
          title={label}
        ><Icon name={icon as IconName} /><span>{label}</span></Link>)}
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-orbit" aria-hidden="true"><span className="orbit-moon"><Icon name="moon" /></span><span className="orbit-dot" /><span className="orbit-star">✦</span></div>
        <div className="contact-prompt"><p>Have an idea<br />to explore together?</p><Link href="/contact">Contact me <Icon name="arrow" /></Link></div>
        <div className="social-links">
          <a href="https://github.com/Atila-Pasha" target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a>
          <a href="/rss.xml" aria-label="Articles RSS feed"><Icon name="rss" /></a>
        </div>
      </div>
    </aside>

    <section className="home-workspace">
      <WorkspaceTopbar items={searchItems} />
      <section className="home-stage" aria-labelledby="home-title">
        <HomePortraitScene alt="Atila Pashazadeh (Atila Pasha / آتیلا پاشازاده) portrait" />
        <div className="stage-vignette" aria-hidden="true" />
        <div className="hero-content">
          <div className="intro-copy">
            <div className="eyebrow"><Icon name="sparkle" /><span>PERSONAL SPACE</span><i /></div>
            <p className="hello-line">Hello, I’m</p>
            <h1 id="home-title">A<span>tila</span></h1>
            <p className="nickname-line">Atila Pashazadeh — or call me <strong>AtA</strong></p>
            <p className="role-line">Python Developer <b>·</b> Statistics Student <b>·</b> Lifelong Learner</p>
            <p className="hero-description">Exploring the intersection of code, mathematics,<br className="desktop-break" /> and human curiosity.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/projects">Explore My Work <Icon name="arrow" /></Link>
              <Link className="button button-secondary" href="/notes">Read My Notes</Link>
            </div>
          </div>
        </div>
        <div className="stats-grid" aria-label="Portfolio activity">
          <StatCard count={articles.length} label="Articles" />
          <StatCard count={notes.length} label="Notes" />
          <StatCard count={githubProjects.length} label="Projects" />
          <div className="stat-card stat-latest-update"><strong>{latestUpdate ? formatShortDate(latestUpdate) : '—'}</strong><span>Latest update</span></div>
        </div>
        <div className="scene-caption"><span /> A little space for ideas · <bdi lang="fa" dir="rtl">آتیلا پاشازاده</bdi></div>
      </section>
    </section>
  </main>;
}

function StatCard({ count, label }: { count: number; label: string }) {
  return <div className="stat-card"><strong>{String(count).padStart(2, '0')}</strong><span>{label}</span></div>;
}

function formatShortDate(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
}
