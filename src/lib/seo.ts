import type { Metadata } from 'next';
import { canonicalUrl } from '@/lib/site';

export const PERSON_NAME = 'Atila Pashazadeh';
export const BRAND_NAME = 'Atila Pashazadeh · AtA';
export const DEFAULT_OG_IMAGE = '/images/atila-home.webp';

export const CORE_SEO_KEYWORDS = [
  'Atila Pashazadeh',
  'Atila Pasha',
  'Atila',
  'AtA',
  'آتیلا پاشازاده',
  'آتیلا پاشا',
  'آتیلا',
  'Python Developer',
  'Statistics Student',
  'atilapasha.ir',
];

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
};

/**
 * Builds consistent per-page SEO, canonical, Open Graph, and Twitter metadata.
 */
export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  image = DEFAULT_OG_IMAGE,
  imageAlt = 'Atila Pashazadeh (Atila Pasha / آتیلا پاشازاده)',
  keywords = [],
}: PageMetadataOptions): Metadata {
  const url = canonicalUrl(path);
  const fullTitle = absoluteTitle ?? `${title} · ${PERSON_NAME} | AtA`;
  const ogImage = canonicalUrl(image);

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    keywords: Array.from(new Set([...CORE_SEO_KEYWORDS, ...keywords])),
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: BRAND_NAME,
      locale: 'en_US',
      alternateLocale: ['fa_IR'],
      title: fullTitle,
      description,
      images: [{ url: ogImage, alt: imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

/**
 * Generates schema.org JSON-LD graph linking the site and bilingual identity of Atila Pashazadeh.
 */
export function buildSiteStructuredData() {
  const homeUrl = canonicalUrl('/');
  const personId = `${homeUrl}#person`;
  const websiteId = `${homeUrl}#website`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: 'Atila Pashazadeh',
        alternateName: [
          'Atila Pasha',
          'Atila',
          'AtA',
          'آتیلا پاشازاده',
          'آتیلا پاشا',
          'آتیلا',
        ],
        givenName: 'Atila',
        familyName: 'Pashazadeh',
        url: homeUrl,
        mainEntityOfPage: homeUrl,
        image: canonicalUrl('/images/atila-about.jpg'),
        email: 'mailto:AtilaPashazdeh@gmail.com',
        jobTitle: 'Python Developer & Statistics Student',
        description:
          'Atila Pashazadeh (Atila Pasha / آتیلا پاشازاده) is a Python developer, backend engineer, and Statistics student exploring software engineering, mathematics, and artificial intelligence.',
        knowsAbout: [
          'Python',
          'FastAPI',
          'Backend Development',
          'PostgreSQL',
          'Statistics',
          'Machine Learning',
          'Artificial Intelligence',
          'Software Engineering',
        ],
        sameAs: [
          'https://github.com/Atila-Pasha',
          'https://t.me/AtilaPashazadeh',
          'https://instagram.com/Atilapasha_',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: homeUrl,
        name: 'Atila Pashazadeh (Atila Pasha) · AtA',
        alternateName: [
          'AtA',
          'Atila Space',
          'آتیلا پاشازاده',
          'آتیلا پاشا',
        ],
        description:
          'Official personal website and portfolio of Atila Pashazadeh (Atila Pasha / آتیلا پاشازاده).',
        inLanguage: ['en', 'fa'],
        publisher: { '@id': personId },
        author: { '@id': personId },
      },
    ],
  };
}

/**
 * Generates ProfilePage JSON-LD for the homepage.
 */
export function buildProfilePageStructuredData() {
  const homeUrl = canonicalUrl('/');

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${homeUrl}#profile`,
    url: homeUrl,
    name: 'Atila Pashazadeh (Atila Pasha) · آتیلا پاشازاده',
    inLanguage: ['en', 'fa'],
    isPartOf: { '@id': `${homeUrl}#website` },
    mainEntity: { '@id': `${homeUrl}#person` },
  };
}
