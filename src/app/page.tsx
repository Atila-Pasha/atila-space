import { HomePage } from '@/components/home/HomePage';
import { getArticles, getNotes, getProjects } from '@/content/loaders';

export default async function Home() {
  const [articles, notes, projects] = await Promise.all([getArticles(), getNotes(), getProjects()]);
  return <HomePage articles={articles} notes={notes} projects={projects} />;
}
