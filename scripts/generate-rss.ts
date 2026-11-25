import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { getArticles } from '../src/content/loaders';
import { canonicalUrl, siteUrl } from '../src/lib/site';

const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '\"': '&quot;' })[char]!);
async function main() {
  const articles = await getArticles();
  const items = articles.map((article) => `<item><title>${escapeXml(article.title)}</title><link>${canonicalUrl(`/articles/${article.slug}/`)}</link><guid>${canonicalUrl(`/articles/${article.slug}/`)}</guid><pubDate>${new Date(`${article.date}T00:00:00Z`).toUTCString()}</pubDate><description>${escapeXml(article.description)}</description></item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Atila Portfolio Articles</title><link>${siteUrl}</link><description>Articles feed</description>${items}</channel></rss>`;
  await mkdir(path.join(process.cwd(), 'public'), { recursive: true });
  await writeFile(path.join(process.cwd(), 'public', 'rss.xml'), xml);
}
main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
