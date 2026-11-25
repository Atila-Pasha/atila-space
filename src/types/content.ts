export type Article = {
  title: string; description: string; slug: string; date: string; updatedAt?: string;
  category: string; tags: string[]; cover?: string; featured: boolean; published: boolean;
  sourcePath: string; body: string;
};
export type Note = {
  id: string; title: string; slug: string; date: string; category: string; tags: string[];
  featured: boolean; published: boolean; language?: 'en' | 'fa'; sourcePath: string; body: string;
};
export type Project = {
  name: string; slug: string; description: string; longDescription?: string; technologies: string[];
  category: string; status: 'active' | 'archived' | 'planned'; repositoryUrl?: string;
  demoUrl?: string; cover?: string; featured: boolean;
};
