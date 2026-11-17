import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

import { STAGES } from './data/stages';

// Every project is one Markdown file in src/content/projects/.
// If a required field is missing or wrong, the build fails and GitHub emails you.

const imagePath = z
  .string()
  .regex(/^\/projects\/.+\.(png|jpe?g|webp|avif)$/i, 'Images must be uploaded to /projects/<project>/ as png, jpg, webp or avif');

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  // Image paths look like /projects/<slug>/<file>.jpg and live in src/assets/projects/.
  schema: () =>
    z.object({
      title: z.string(),
      summary: z.string().max(220, 'Keep the summary under 220 characters'),
      team: z.string(),
      year: z.string(),
      role: z.string(),
      tools: z.array(z.string()).default([]),
      stage: z.enum(STAGES),
      cover: imagePath.optional(),
      coverAlt: z.string().default(''),
      metrics: z
        .array(z.object({ value: z.string(), label: z.string() }))
        .max(3)
        .default([]),
      gallery: z
        .array(z.object({ image: imagePath, alt: z.string(), caption: z.string().optional() }))
        .default([]),
      order: z.number().default(100),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
