import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findBySlug, getProjects } from '@/content/loaders';
import { canonicalUrl } from '@/lib/site';
export async function generateStaticParams() { return (await getProjects()).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const project = findBySlug(await getProjects(), slug);
  if (!project) return { robots: { index: false, follow: false } };
  const isPlaceholder = project.slug.startsWith('sample-') || project.status === 'planned';
  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: canonicalUrl(`/projects/${slug}/`) },
    ...(isPlaceholder ? { robots: { index: false, follow: false } } : {}),
  };
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const project = findBySlug(await getProjects(), slug); if (!project) notFound();
  return <main data-pagefind-body><article><h1>{project.name}</h1><p>{project.description}</p><p>{project.longDescription}</p><p>{project.technologies.join(', ')}</p></article></main>;
}
