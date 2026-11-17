import type { ImageMetadata } from 'astro';

// Maps a CMS path like /projects/tsac-2026/cad.png to the optimisable file in src/assets/.
const files = import.meta.glob<ImageMetadata>('/src/assets/projects/**/*.{png,jpg,jpeg,webp,avif,PNG,JPG,JPEG}', {
  eager: true,
  import: 'default',
});

export function img(path: string): ImageMetadata {
  const found = files[`/src/assets${path}`];
  if (!found) throw new Error(`Image not found: ${path}. Upload it to src/assets${path.replace(/[^/]+$/, '')}`);
  return found;
}
