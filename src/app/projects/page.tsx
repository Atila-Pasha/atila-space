import type { Metadata } from 'next';
import { PortfolioSidebar } from '@/components/layout/PortfolioSidebar';
import { WorkspaceTopbar } from '@/components/layout/WorkspaceTopbar';
import { ProjectsGallery } from '@/components/projects/ProjectsGallery';
import { getArticles, getNotes } from '@/content/loaders';
import { githubProjects } from '@/data/githubProjects';
import { publicAsset } from '@/lib/site';
import { createSearchItems } from '@/lib/searchItems';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Projects',
  description:
    'Open-source software and experiments by Atila Pashazadeh (Atila Pasha / آتیلا پاشازاده) — ByteBeacon API, ByteVault, and more.',
  path: '/projects/',
  keywords: ['ByteBeacon API', 'ByteVault', 'God Of Dars', 'GitHub Atila-Pasha'],
});

export default async function ProjectsPage() {
  const [articles, notes] = await Promise.all([getArticles(), getNotes()]);
  const searchItems = createSearchItems(articles, notes);

  return <main className="portfolio-frame projects-frame">
    <PortfolioSidebar activePath="/projects/" />
    <section className="home-workspace projects-workspace">
      <WorkspaceTopbar items={searchItems} />
      <div className="projects-main">
        <div className="projects-heading">
          <div>
            <p className="page-eyebrow">THINGS I BUILD</p>
            <h1>Projects</h1>
            <p className="projects-subtitle">Things I’ve built and worked on.</p>
          </div>
          <a className="github-profile-link" href="https://github.com/Atila-Pasha" target="_blank" rel="noreferrer">
            <span className="github-profile-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.1-1.5 6.1-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6S17.5 1.3 15 3.3a13 13 0 0 0-7 0C5.5 1.3 4.3 1.6 4.3 1.6a4.8 4.8 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.1 6.4 6.1 6.7A3.4 3.4 0 0 0 8 18.1V22"/></svg></span>
            <span>More on GitHub <i>↗</i></span>
          </a>
        </div>
        <ProjectsGallery projects={githubProjects.map((project) => ({
          ...project,
          cover: publicAsset(project.cover),
          logo: project.logo ? publicAsset(project.logo) : undefined,
        }))} />
      </div>
    </section>
  </main>;
}
