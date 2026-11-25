import { getArticles, getNotes, getProjects } from '../src/content/loaders';

async function main() {
  const [articles, notes, projects] = await Promise.all([getArticles(), getNotes(), getProjects()]);
  const checks = [
    ['article', articles], ['note', notes], ['project', projects],
  ] as const;
  for (const [kind, items] of checks) {
    const seen = new Set<string>();
    for (const item of items) {
      if (seen.has(item.slug)) throw new Error(`Duplicate ${kind} slug: ${item.slug}`);
      seen.add(item.slug);
    }
  }
  console.log(`Validated ${articles.length} articles, ${notes.length} notes, and ${projects.length} projects.`);
}
main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
