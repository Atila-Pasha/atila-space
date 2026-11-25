import { getArticles } from '@/content/loaders';
export default async function ArticlesPage() { const articles = await getArticles(); return <main><h1>Articles page placeholder</h1><p>{articles.length} sample articles are available to the content layer.</p></main>; }
