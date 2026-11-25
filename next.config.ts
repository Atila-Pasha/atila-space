import type { NextConfig } from 'next';

const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
const customDomain = process.env.CUSTOM_DOMAIN === 'true';
const basePath = customDomain ? '' : process.env.BASE_PATH ?? (process.env.GITHUB_PAGES === 'true' && repo ? `/${repo}` : '');

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  typedRoutes: true,
};

export default nextConfig;
