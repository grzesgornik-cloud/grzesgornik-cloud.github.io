# Greg Gornik · portfolio

Greg Gornik's engineering portfolio. Built with [Astro](https://astro.build), hosted free on GitHub Pages.

## Adding or updating a project

### Option 1: in the browser (no code)

1. Go to **app.pagescms.org** and sign in with GitHub.
2. Open this repository → **Projects** → **Add an entry** (or open an existing one).
3. Fill in the form. **Stage** drives the progress bar; pick *Complete* when it's done.
4. Upload photos in **Cover photo**, **Gallery**, or drop them straight into the **Write-up**.
5. Tick **Draft** if it isn't ready to go public yet. Press **Save**.

The site rebuilds and is live about two minutes later.

### Option 2: upload files

1. Put the photos in `src/assets/projects/<project-name>/`.
2. Copy `src/content/projects/tsac-2026.md`, rename it (the file name becomes the web address), and edit it.
   Photo paths look like `/projects/<project-name>/photo.jpg`.
3. Commit to `main`.

Contact details, the timing strip numbers and the About section live in `src/data/profile.json` (also editable under **Profile and contact** in Pages CMS). To replace the CV, upload a new PDF to `public/cv/` with the same file name.

## Warning system

| What | How you hear about it |
|---|---|
| A change fails to build (missing field, bad photo path) | Live site keeps the last good version. An issue labelled `site-health` is opened, which emails you. |
| A broken internal link, missing image or missing CV | Same as above: checked on every build before anything goes live. |
| Site down, page missing, CV not downloading, 404 page broken, external link dead | Checked every 6 hours and after each deploy. One issue is opened (and updated), then closed automatically when things recover. |
| Site down between checks (optional, 5-minute checks) | Add a free monitor at uptimerobot.com for the site URL, keyword "Gornik". |

Make sure **Settings → Notifications → Email** is on in GitHub and you're watching this repository (you are by default).
GitHub pauses scheduled checks after 60 days without commits. Any edit restarts them.

## Moving to greg-gornik.ie

1. Buy greg-gornik.ie from an Irish registrar.
2. In the registrar's DNS settings add four `A` records for `@` pointing to
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`,
   and a `CNAME` record for `www` pointing to `grzesgornik-cloud.github.io`.
3. In this repo: Settings → Pages → Custom domain → `greg-gornik.ie` → Save, then tick Enforce HTTPS once it's offered.
4. Settings → Secrets and variables → Actions → Variables → New variable `SITE_URL` = `https://greg-gornik.ie`.
5. Actions → Deploy → Run workflow.

## Running it locally

```sh
npm install
npm run dev        # http://localhost:4321, drafts visible
npm run build      # production build into dist/
node scripts/check-site.mjs dist
```

## Design rules

- Colours: graphite neutrals + one accent `#3DAA78` (green = personal best on a timing screen).
- One corner radius: `4px` (`--radius`).
- Spacing scale only: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px (`--s1`–`--s10`).
- Type: Archivo (expanded for headlines) and JetBrains Mono for labels and numbers.
- Icons: Tabler outline SVGs in `src/icons/`.
- Motion: sector bars draw in once, the project photo carries across pages, the lightbox fades in. All of it switches off with "reduce motion".
