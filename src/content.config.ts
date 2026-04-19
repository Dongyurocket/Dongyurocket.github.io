import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    series: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    wechatReady: z.boolean().default(true),
    wechatTitle: z.string().optional(),
    wechatDigest: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
};
