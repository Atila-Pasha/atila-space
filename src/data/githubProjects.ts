export type GithubProjectCategory = 'Web' | 'Data' | 'Tools' | 'Others';

export type GithubProject = {
  name: string;
  slug: string;
  description: string;
  stars: number;
  category: GithubProjectCategory;
  technologies: string[];
  repositoryUrl: string;
  cover: string;
  coverAlt: string;
  logo?: string;
  coverMode?: 'contain-logo';
};

// Public repositories curated from github.com/Atila-Pasha, ordered by current stars.
export const githubProjects: GithubProject[] = [
  {
    name: 'ByteBeacon API',
    slug: 'bytebeacon-api',
    description: 'An open-source uptime monitoring service that checks HTTP endpoints, tracks incidents, and sends Telegram or email alerts.',
    stars: 10,
    category: 'Tools',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Telegram'],
    repositoryUrl: 'https://github.com/Atila-Pasha/ByteBeacon-API',
    cover: '/images/projects/bytebeacon-api-logo.jpg',
    coverAlt: 'ByteBeacon project logo from GitHub',
    coverMode: 'contain-logo',
  },
  {
    name: 'ByteVault',
    slug: 'bytevault',
    description: 'A clean, local-first desktop app for saving, organizing, searching, and revisiting code snippets.',
    stars: 4,
    category: 'Tools',
    technologies: ['Python', 'Flet', 'SQLite', 'SQLAlchemy'],
    repositoryUrl: 'https://github.com/Atila-Pasha/ByteVault',
    cover: '/images/projects/bytevault-cover.webp',
    coverAlt: 'Purple ByteVault logo and secure vault artwork',
    logo: '/images/projects/bytevault-logo.webp',
  },
  {
    name: 'God Of Dars',
    slug: 'god-of-dars',
    description: 'A Telegram educational strategy game where students learn, compete, and progress through lessons.',
    stars: 2,
    category: 'Others',
    technologies: ['Python', 'Telegram', 'PostgreSQL'],
    repositoryUrl: 'https://github.com/Atila-Pasha/God-Of-Dars',
    cover: '/images/projects/god-of-dars-cover.webp',
    coverAlt: 'Original violet fantasy artwork made for God Of Dars',
  },
  {
    name: 'ByteBeacon Flet',
    slug: 'bytebeacon-flet',
    description: 'A polished desktop and mobile monitoring client for the ByteBeacon API.',
    stars: 2,
    category: 'Tools',
    technologies: ['Python', 'Flet', 'FastAPI'],
    repositoryUrl: 'https://github.com/Atila-Pasha/ByteBeacon-Flet',
    cover: '/images/projects/bytebeacon-flet.jpg',
    coverAlt: 'ByteBeacon monitoring dashboard from its GitHub README',
    logo: '/images/projects/bytebeacon-flet-logo.jpg',
  },
  {
    name: 'Kheilisabz Biology Exam',
    slug: 'kheilisabz-harrypotter-exam',
    description: 'An offline Persian biology exam app with 4,210 questions, chapter-based practice, and detailed review.',
    stars: 0,
    category: 'Data',
    technologies: ['JavaScript', 'Biology', 'Offline-first'],
    repositoryUrl: 'https://github.com/Atila-Pasha/kheilisabz-harrypotter-exam',
    cover: '/images/projects/biology-exam-cover.webp',
    coverAlt: 'Original violet biology and study artwork made for the exam app',
  },
  {
    name: 'Atila Space',
    slug: 'atila-space',
    description: 'My personal website: a place for projects, articles, notes, and the ideas I keep exploring.',
    stars: 0,
    category: 'Web',
    technologies: ['Next.js', 'React', 'TypeScript', 'MDX'],
    repositoryUrl: 'https://github.com/Atila-Pasha/atila-space',
    cover: '/images/home-hero-cosmos.png',
    coverAlt: 'The purple cosmic landscape from Atila Space',
  },
];
