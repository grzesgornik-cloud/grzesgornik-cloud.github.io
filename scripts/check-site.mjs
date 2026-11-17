// Site health check. Used by GitHub Actions; also runnable locally.
//   node scripts/check-site.mjs dist                 -> every internal link and image in the build exists
//   node scripts/check-site.mjs live https://site    -> every page is up, the CV downloads, 404s are styled
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const [mode = 'dist', base] = process.argv.slice(2);
const problems = [];
const pages = (dir, out = []) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) pages(p, out);
    else if (f.endsWith('.html')) out.push(p);
  }
  return out;
};
const toRoute = (file) => file.replace(/^dist/, '').replace(/index\.html$/, '').replace(/\\/g, '/');

if (mode === 'dist') {
  const external = new Set();
  const self = readFileSync('dist/index.html', 'utf8').match(/rel="canonical" href="(https?:\/\/[^/"]+)/)?.[1];
  for (const file of pages('dist')) {
    const html = readFileSync(file, 'utf8');
    for (const [, url] of html.matchAll(/(?:href|src)="([^"#]+)/g)) {
      if (url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('data:')) continue;
      if (/^https?:/.test(url)) { external.add(url); continue; }
      const path = join('dist', decodeURIComponent(url.split('?')[0]));
      const ok = existsSync(path) && (statSync(path).isFile() || existsSync(join(path, 'index.html')));
      if (!ok) problems.push(`Broken link on ${toRoute(file)}: ${url}`);
    }
  }
  // LinkedIn blocks bots (status 999), so it's checked for shape only.
  for (const url of external) {
    if (url.includes('linkedin.com')) { if (!/linkedin\.com\/in\/[\w-]+/.test(url)) problems.push(`LinkedIn URL looks wrong: ${url}`); continue; }
    if (url.includes('schema.org') || (self && url.startsWith(self))) continue;
    try {
      const r = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(15000) });
      if (r.status >= 400 && r.status !== 405 && r.status !== 429) problems.push(`External link returns ${r.status}: ${url}`);
    } catch (e) { problems.push(`External link unreachable: ${url} (${e.message})`); }
  }
} else {
  if (!base) throw new Error('Usage: node scripts/check-site.mjs live https://your-site');
  const routes = pages('dist').map(toRoute).filter((r) => !r.endsWith('404.html'));
  routes.push('/cv/Grzegorz_Gornik_CV.pdf');
  for (const route of routes) {
    const url = new URL(route, base).href;
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(20000) });
      if (!r.ok) { problems.push(`${url} returned ${r.status}`); continue; }
      if (route.endsWith('.pdf')) { if (!(r.headers.get('content-type') ?? '').includes('pdf')) problems.push(`CV is not serving as a PDF: ${url}`); }
      else if (!(await r.text()).includes('Gornik')) problems.push(`${url} loaded but looks empty or wrong`);
    } catch (e) { problems.push(`${url} is unreachable (${e.message})`); }
  }
  const missing = await fetch(new URL('/health-check-missing-page', base), { signal: AbortSignal.timeout(20000) }).catch(() => null);
  if (!missing || missing.status !== 404 || !(await missing.text()).includes('Off the circuit')) problems.push('The custom 404 page is not being served');
}

if (problems.length) {
  console.log(`Found ${problems.length} problem(s):\n` + problems.map((p) => `- ${p}`).join('\n'));
  process.exit(1);
}
console.log(`All checks passed (${mode}).`);
