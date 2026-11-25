'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import type { GithubProject, GithubProjectCategory } from '@/data/githubProjects';
import { Icon } from '@/components/home/Icon';

const filters: Array<'All' | GithubProjectCategory> = ['All', 'Web', 'Data', 'Tools', 'Others'];

export function ProjectsGallery({ projects }: { projects: GithubProject[] }) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>('All');
  const visibleProjects = useMemo(() => projects
    .filter((project) => activeFilter === 'All' || project.category === activeFilter)
    .sort((a, b) => b.stars - a.stars), [activeFilter, projects]);

  return <div className="projects-gallery">
    <div className="project-filters" role="group" aria-label="Filter projects by category">
      {filters.map((filter) => <button
        key={filter}
        type="button"
        className={`project-filter${activeFilter === filter ? ' is-active' : ''}`}
        aria-pressed={activeFilter === filter}
        onClick={() => setActiveFilter(filter)}
      >{filter}</button>)}
    </div>

    <div className="projects-grid" aria-live="polite">
      {visibleProjects.map((project, index) => <a
        className="project-card"
        href={project.repositoryUrl}
        target="_blank"
        rel="noreferrer"
        key={project.slug}
        aria-label={`${project.name}: open GitHub repository`}
        style={{ animationDelay: `${Math.min(index * 55, 330)}ms` }}
      >
        <div className={`project-art${project.coverMode === 'contain-logo' ? ' project-art-logo' : ''}`}>
          <Image
            className={`project-cover-image${project.coverMode === 'contain-logo' ? ' is-contained' : ''}`}
            src={project.cover}
            alt={project.coverAlt}
            fill
            sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 38vw"
          />
          <div className="project-art-shade" aria-hidden="true" />
          <span className="project-category">{project.category}</span>
          {project.logo && <span className="project-logo-chip"><Image src={project.logo} alt="" fill sizes="48px" /></span>}
          <span className="project-stars"><Icon name="star" /> {project.stars}</span>
        </div>
        <div className="project-card-content">
          <div className="project-title-row"><h2>{project.name}</h2><Icon className="project-open-icon" name="arrow" /></div>
          <p>{project.description}</p>
          <div className="project-tech-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
          <span className="project-visit">View on GitHub <Icon name="arrow" /></span>
        </div>
      </a>)}
    </div>
    <p className="projects-footnote">Sorted by GitHub stars <span>·</span> {visibleProjects.length} projects</p>
  </div>;
}
