# Atila Portfolio

A static, content-first foundation for a personal website. The route files are intentionally bare architecture placeholders; the visual design is reserved for a later phase. All examples are labeled sample content and make no claims about the site owner's experience.

## Architecture

```text
content/                 Source of truth for articles, notes, and projects
src/app/                 App Router routes and static metadata endpoints
src/content/              Frontmatter schemas, loaders, and MDX rendering
src/lib/                  Dates, canonical URLs, and slug helpers
src/types/                Shared content types
scripts/                  Content validation and RSS generation
public/                   Static assets copied into the export
.github/workflows/         GitHub Pages build and deploy workflow
```

The content layer reads Markdown/MDX with YAML frontmatter, validates it with Zod, and returns typed records to pages. Duplicate slugs are rejected during validation. Published records become static routes during `next build`; unpublished records are omitted. Project details live in `content/projects/projects.json`.

The project has no backend, API routes, database, authentication, admin area, or CMS. Next.js features requiring a server runtime are out of scope for the static export. Contact forms and dynamic search require a third-party service or a future static-compatible implementation.

## Technology stack

- Next.js App Router with `output: 'export'`
- TypeScript strict mode and Zod content validation
- Tailwind CSS with dark theme tokens in `src/app/globals.css`
- Markdown/MDX, `remark-math`, KaTeX, and Shiki-powered `rehype-pretty-code`
- Pagefind generated from exported HTML
- GitHub Actions and the official GitHub Pages artifact/deploy actions

Direct dependency versions are pinned in `package.json`. Run `npm install` to create `package-lock.json`, then commit it; once the lockfile is present, use `npm ci` for repeatable local installs. The sample intentionally avoids client-side frameworks for content management.

## Local development

Requires Node.js 22 and npm.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. Local development has no GitHub Pages base path. Route files are placeholders and not a designed user experience.

## Content formats

### Add an article

Create an `.mdx` file in an appropriate `content/articles/` category directory, for example `content/articles/programming/my-topic.mdx`:

```mdx
---
title: "A sample title"
description: "A concise summary for search and previews."
slug: my-topic
date: "2026-05-10"
updatedAt: "2026-05-12"
category: programming
tags: [python, sample]
cover: /images/example-cover.jpg
featured: false
published: true
---

Article body in Markdown/MDX. Use `\(x^2\)` or `$x^2$` for inline math and fenced code blocks for code.
```

`title`, `description`, `slug`, `date`, and `category` are required; other fields shown are optional or defaulted. Use unique slugs across article files. Supported Markdown includes code, math, images, tables, and links. Add images under `public/images/` and refer to them with a root-relative path such as `/images/example-cover.jpg` (prefix the repository path in custom components using `publicAsset` when needed).

### Add a note

Create a `.md` file below `content/notes/<category>/`. Notes have their own smaller schema and route:

```markdown
---
id: sample-fourier-observation
slug: fourier-observation
title: "A sample observation"
date: "2026-05-11"
category: mathematics
tags: [signals, sample]
featured: false
published: true
language: en
---

A short note goes here.
```

Use `language: fa` for Persian notes; the generated page sets Persian language and RTL direction. `slug` provides a stable URL and should not change after publication. The content API exposes date ordering, category/tag filters, and an injectable random-note selector for future interfaces.

### Add a project

Edit `content/projects/projects.json` and append an object:

```json
{
  "name": "Sample project",
  "slug": "sample-project",
  "description": "A short summary.",
  "longDescription": "Optional longer text.",
  "technologies": ["Python", "TypeScript"],
  "category": "software",
  "status": "planned",
  "repositoryUrl": "https://github.com/USERNAME/REPOSITORY",
  "demoUrl": "https://example.com",
  "cover": "/images/sample-project.jpg",
  "featured": false
}
```

Allowed statuses are `active`, `archived`, and `planned`. URLs must be absolute URLs when supplied.

### Images and fonts

Put images in `public/images/` (icons in `public/icons/`). In page or component code, use the `publicAsset('/images/name.png')` helper for paths that need a GitHub Pages base prefix. The examples contain no binary image files; add only assets you own or can use. Geist and Vazirmatn are configured as CSS font-family names with system fallbacks; place self-hosted font files in `public/fonts/` and add `@font-face` declarations when the visual-design phase begins. This avoids build-time network font downloads.

## Validation and production build

```bash
npm run validate:content
npm run lint
npm run typecheck
npm run build
```

`npm run build` validates frontmatter and project JSON, generates `public/rss.xml`, and writes the static site to `out/`. To build and add the Pagefind index locally:

```bash
npm run build:pages
```

To emulate a repository-hosted Pages build locally, set `GITHUB_PAGES=true` and `GITHUB_REPOSITORY=USERNAME/REPOSITORY` for the command. For a custom domain, also set `CUSTOM_DOMAIN=true` and `NEXT_PUBLIC_SITE_URL=https://example.com`.

## GitHub Pages deployment

`.github/workflows/deploy.yml` runs on pushes to `main` (and manual dispatch). It installs locked dependencies, runs linting and TypeScript checks, validates content, builds the export, indexes the exported HTML with Pagefind, uploads the Pages artifact, and deploys it. It uses the official `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages` actions. The Next.js `basePath` is computed at build time; for a repository site the workflow builds under `/<REPOSITORY>`, while local dev is unprefixed.

To enable deployment:

1. Push the project to a GitHub repository with the default deployment branch named `main` (or change the workflow trigger).
2. In **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source.
3. In **Settings → Actions → General → Workflow permissions**, ensure workflows can run. The workflow declares only `contents: read`, `pages: write`, and `id-token: write`.
4. Push to `main` or run the workflow manually under the **Actions** tab. The deployed URL appears in the workflow's `github-pages` environment.

Project hosting uses `https://USERNAME.github.io/REPOSITORY/`. Next's `basePath` is a build-time setting and all static asset paths must account for it. For a custom domain, configure the domain in **Settings → Pages → Custom domain**, verify the domain and DNS records with GitHub's instructions, set repository Actions variable `CUSTOM_DOMAIN` to `true`, and add `NEXT_PUBLIC_SITE_URL` as a repository Actions variable with the canonical origin such as `https://example.com`. The workflow uses that origin and disables the repository base path when `CUSTOM_DOMAIN=true`. With a custom Actions workflow, the domain is stored in repository settings; a `CNAME` file in the deployment artifact is ignored and is not required. No guessed domain is committed here.

To change the publishing source, use **Settings → Pages → Build and deployment → Source**. Keep it set to **GitHub Actions** for this workflow. To deploy from another branch instead, replace the workflow with a branch-publishing setup; do not mix branch publishing with this artifact workflow.

## Static hosting limits

GitHub Pages serves files only. Forms, private/draft content, server-side search, runtime redirects, server actions, and API routes cannot run there. Pagefind is a generated client-side search index; a search interface can be implemented in a later phase. Private drafts should not be committed to a public repository. RSS and sitemap URLs use the configured canonical origin.
