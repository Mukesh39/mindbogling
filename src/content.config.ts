// Defines the two kinds of content: articles ("blog") and sections ("categories").
// The CMS (public/admin/config.yml) writes files that match these fields.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.string(),                       // the section's file name, e.g. "economy"
      tags: z.array(z.string()).default([]),
      excerpt: z.string(),
      cover: image().optional(),
      coverAlt: z.string().default(''),
      date: z.coerce.date(),
      author: z.string().optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const categories = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/categories' }),
  schema: z.object({
    name: z.string(),
    description: z.string().default(''),
    color: z.string().default('#1F4FD8'),
    order: z.coerce.number().default(100),
  }),
});

export const collections = { blog, categories };
