export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com').replace(/\/$/, '');
export const basePath = process.env.CUSTOM_DOMAIN === 'true' ? '' : process.env.BASE_PATH ?? (process.env.GITHUB_PAGES === 'true' && process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}` : '');
export const publicAsset = (path: string) => `${basePath}${path.startsWith('/') ? path : `/${path}`}`;
export const canonicalUrl = (path: string) => `${siteUrl}${basePath}${path.startsWith('/') ? path : `/${path}`}`;
