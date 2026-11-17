import { getCollection } from 'astro:content';

// Drafts show in `npm run dev` and preview builds (PREVIEW=1), never on the live site.
const showDrafts = import.meta.env.DEV || import.meta.env.PREVIEW === '1' || process.env.PREVIEW === '1';

export async function getProjects() {
  const all = await getCollection('projects', ({ data }) => showDrafts || !data.draft);
  return all.sort((a, b) => a.data.order - b.data.order);
}
