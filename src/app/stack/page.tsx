import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { PortfolioSidebar } from '@/components/layout/PortfolioSidebar';
import { WorkspaceTopbar } from '@/components/layout/WorkspaceTopbar';
import { TechLogo } from '@/components/stack/TechLogo';
import { getArticles, getNotes } from '@/content/loaders';
import { createSearchItems } from '@/lib/searchItems';

type StackTechnology = { name: string; mark: string; icon?: string; color: string };
type StackGroup = { title: string; items: StackTechnology[] };

export const metadata: Metadata = {
  title: 'Stack',
  description: 'Languages, tools, and technologies Atila uses to build and explore.',
};

const stackGroups: StackGroup[] = [
  {
    title: 'Languages',
    items: [
      { name: 'Python', mark: 'Py', icon: 'python', color: '#3776ab' },
      { name: 'SQL', mark: 'SQL', color: '#d6a94b' },
    ],
  },
  {
    title: 'Backend Development',
    items: [
      { name: 'FastAPI', mark: 'API', icon: 'fastapi', color: '#20a884' },
      { name: 'SQLAlchemy', mark: 'SA', icon: 'sqlalchemy', color: '#d64b3c' },
      { name: 'Pydantic', mark: 'P', icon: 'pydantic', color: '#e8b443' },
      { name: 'Alembic', mark: 'A', color: '#b594ff' },
      { name: 'AsyncIO', mark: 'async', color: '#a98aff' },
      { name: 'REST API', mark: '{ }', color: '#8e72e8' },
      { name: 'JWT Authentication', mark: 'JWT', color: '#62a9d8' },
    ],
  },
  {
    title: 'Databases',
    items: [
      { name: 'PostgreSQL', mark: 'PG', icon: 'postgresql', color: '#4169e1' },
      { name: 'SQLite', mark: 'SQL', icon: 'sqlite', color: '#79b7d9' },
    ],
  },
  {
    title: 'UI Development',
    items: [{ name: 'Flet', mark: 'F', icon: 'flet', color: '#53a7ef' }],
  },
  {
    title: 'Data Science & Machine Learning',
    items: [
      { name: 'PyTorch', mark: '◉', icon: 'pytorch', color: '#ee4c2c' },
      { name: 'NumPy', mark: 'N', icon: 'numpy', color: '#4dabcf' },
      { name: 'Pandas', mark: 'pd', icon: 'pandas', color: '#b29aff' },
      { name: 'Scikit-learn', mark: 'sk', icon: 'scikitlearn', color: '#f2b84b' },
    ],
  },
  {
    title: 'DevOps & Environment',
    items: [
      { name: 'Docker', mark: 'whale', icon: 'docker', color: '#2496ed' },
      { name: 'Linux', mark: 'L', icon: 'linux', color: '#e6c84c' },
      { name: 'Ubuntu', mark: 'U', icon: 'ubuntu', color: '#e95420' },
      { name: 'Bash', mark: '$_', icon: 'gnubash', color: '#d0d0d0' },
    ],
  },
  {
    title: 'Tools & Platforms',
    items: [
      { name: 'Git', mark: 'Git', icon: 'git', color: '#f05032' },
      { name: 'GitHub', mark: 'GH', icon: 'github', color: '#e9e7f2' },
      { name: 'GitHub Copilot', mark: '✦', icon: 'githubcopilot', color: '#8db7ff' },
      { name: 'OpenAI Codex', mark: '⌘', icon: 'openai', color: '#b8a1ff' },
    ],
  },
  {
    title: 'Other',
    items: [
      { name: 'Telegram Bot API', mark: '➤', icon: 'telegram', color: '#2aabee' },
      { name: 'Asynchronous Programming', mark: '∞', color: '#a98aff' },
    ],
  },
];

export default async function StackPage() {
  const [articles, notes] = await Promise.all([getArticles(), getNotes()]);
  const searchItems = createSearchItems(articles, notes);

  return <main className="portfolio-frame stack-frame">
    <PortfolioSidebar activePath="/stack/" />
    <section className="home-workspace stack-workspace">
      <WorkspaceTopbar items={searchItems} />
      <div className="stack-main">
        <header className="stack-heading">
          <p className="page-eyebrow">TOOLS OF THE TRADE</p>
          <h1>Stack</h1>
          <p>Technologies I use and love.</p>
        </header>
        <article className="stack-surface" aria-label="Technologies and tools">
          {stackGroups.map((group) => <section className="stack-group" key={group.title} aria-labelledby={`stack-${group.title}`}>
            <h2 id={`stack-${group.title}`}>{group.title}</h2>
            <div className="stack-tech-grid">
              {group.items.map((technology) => <div className="stack-tech" key={technology.name} title={technology.name}>
                <span className="stack-tech-mark-wrap" style={{ '--tech-color': technology.color } as CSSProperties}>
                  <TechLogo name={technology.name} icon={technology.icon} mark={technology.mark} color={technology.color} />
                </span>
                <span className="stack-tech-name">{technology.name}</span>
              </div>)}
            </div>
          </section>)}
        </article>
      </div>
    </section>
  </main>;
}
