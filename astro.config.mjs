import { defineConfig } from 'astro/config';
import remarkProjectImages from './src/data/remark-project-images.mjs';

// The live address comes from the SITE_URL repository variable (Settings → Secrets and variables → Actions → Variables).
export default defineConfig({
  site: process.env.SITE_URL || 'https://grzesgornik-cloud.github.io',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  markdown: { remarkPlugins: [remarkProjectImages] },
});
