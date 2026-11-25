import { z } from 'zod';
import { normalizeSlug } from '@/lib/slug';

const slugSchema = z.string().trim().min(1).regex(/^[\p{L}\p{N}][\p{L}\p{N}-]*$/u)
  .refine((slug) => normalizeSlug(slug) === slug, 'must be lowercase words separated by single hyphens');

const shared = {
  title: z.string().trim().min(1), slug: slugSchema,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), category: z.string().trim().min(1),
  tags: z.array(z.string()).default([]), featured: z.boolean().default(false), published: z.boolean().default(true),
};
export const articleSchema = z.object({ ...shared, description: z.string().trim().min(1), updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(), cover: z.string().optional() });
export const noteSchema = z.object({ ...shared, id: z.string().trim().min(1), language: z.enum(['en', 'fa']).optional() });
export const projectSchema = z.object({
  name: z.string().trim().min(1), slug: slugSchema, description: z.string().trim().min(1), longDescription: z.string().optional(),
  technologies: z.array(z.string()).min(1), category: z.string().trim().min(1), status: z.enum(['active', 'archived', 'planned']),
  repositoryUrl: z.string().url().optional(), demoUrl: z.string().url().optional(), cover: z.string().optional(), featured: z.boolean().default(false),
});
export type ArticleFrontmatter = z.infer<typeof articleSchema>;
export type NoteFrontmatter = z.infer<typeof noteSchema>;
