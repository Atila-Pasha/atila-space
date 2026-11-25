import { getProjects } from '@/content/loaders';
export default async function ProjectsPage() { const projects = await getProjects(); return <main><h1>Projects page placeholder</h1><p>{projects.length} sample projects are available to the content layer.</p></main>; }
