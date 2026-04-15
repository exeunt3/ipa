# LSM — Deployment Context for New Session

Send this document to a new Claude Code session after moving the project folder.

---

## What this project is

**Latent Space Museum (LSM)** — a Next.js 16 App Router web application for collecting,
organizing, and visualizing first-person phenomenological reports of non-ordinary experience.
The site has four layers: Reports, Frameworks, Interpretations, Renderings.

**Current URL of GitHub repo:** https://github.com/exeunt3/ipa.git
(remote is already configured in `.git/config` — no need to re-add it)

---

## Tech stack

- **Framework:** Next.js 16, App Router, TypeScript
- **Database:** PostgreSQL via `pg` driver; connection via `DATABASE_URL` env var (currently pointing to local DB)
- **Styling:** `app/globals.css` (global) + styled-jsx scoped CSS inside `app/page.tsx`
- **Deployment target:** Netlify (config already created, see below)

---

## Current git state

The branch is `main`. There is a **large batch of uncommitted changes** — essentially the entire
site has been rewritten from a previous version. Nothing has been committed since the work began.
The changes include:

- Full rename/rebrand from IPA → Latent Space Museum
- New pages: `/genres`, `/frameworks`, `/submit`, `/interpretations`, `/renderings` (all new)
- Old pages deleted: `/protocols`, `/experiences` (old system)
- New API routes: `/api/genres`, `/api/frameworks`, `/api/reports`, `/api/interpretations`, `/api/renderings`
- `app/globals.css` — heavily extended with accent colors, hover states
- `app/page.tsx` — homepage rewritten with hero, sections, styled-jsx
- `app/about/page.tsx` — rewritten
- `app/layout.tsx` — renamed to LSM, updated nav
- `migrations/001_iea_schema.sql` — full DB schema + seed data (new file)
- `netlify.toml` — Netlify build config (new file)
- `site-copy.md` — editable site copy reference (new file)
- `package.json` / `package-lock.json` — `@netlify/plugin-nextjs` added

**All of these need to be committed before pushing.**

---

## Visual/design details

- Hero title: "Latent" = `#FF7A29` (orange), "Space" = `#E0197D` (pink), "Museum" = white
- Global accent vars: `--accent-a: #FF7A29`, `--accent-b: #E0197D`
- Hero has a text overlay: "step into / the (indented) / mauve zone" in dark type on white box backgrounds
- Hover states site-wide use the two accent colors alternating by nth-child

---

## What needs to happen (in order)

### Step 1 — Commit everything

```bash
git add -A
git commit -m "Full LSM rewrite: new schema, all pages, copy, styles"
```

### Step 2 — Push to GitHub

The remote is already set to `https://github.com/exeunt3/ipa.git`.

```bash
git push origin main
```

If the push is rejected (remote has diverged), check with the user before force-pushing.

### Step 3 — Create a Neon PostgreSQL database (free)

1. Go to https://neon.tech and create a free project
2. Copy the connection string — it looks like:
   `postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require`
3. In the Neon SQL editor, paste and run the full contents of `migrations/001_iea_schema.sql`
   — this creates all tables and seeds genres/frameworks

### Step 4 — Deploy to Netlify

1. Go to https://netlify.com → Add new site → Import from Git → connect the GitHub repo
2. Build settings are auto-detected from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Before deploying, add an environment variable:
   - Key: `DATABASE_URL`
   - Value: the Neon connection string from Step 3
4. Deploy

---

## Files already prepared for deployment

| File | Status | Notes |
|------|--------|-------|
| `netlify.toml` | Created | Build config + Netlify Next.js plugin |
| `package.json` | Updated | `@netlify/plugin-nextjs` added as devDependency |
| `migrations/001_iea_schema.sql` | Exists | Full schema + seed data — run against Neon DB |

---

## After deployment: what will and won't work

**Works without DB:** `/` (homepage), `/about`

**Requires DB:** All other pages — `/genres`, `/frameworks`, `/submit`, `/interpretations`,
`/renderings`, and all `/api/*` routes. These will 500 until `DATABASE_URL` is set and
the migration has been run.

---

## Key files to know about

```
app/
  page.tsx              — Homepage (client component, styled-jsx)
  about/page.tsx        — About page
  globals.css           — Global styles, CSS variables, all hover states
  layout.tsx            — Root layout, nav (logo: "LSM")
  submit/
    page.tsx            — Submit page shell
    submit-form.tsx     — Multi-step form (genre → framework → compose)
  genres/page.tsx       — Genres index
  frameworks/page.tsx   — Frameworks index
  interpretations/      — Interpretations index + new + detail
  renderings/           — Renderings index + new
  api/                  — All API routes (REST, all need DB)

lib/
  db.ts                 — pg connection pool (reads DATABASE_URL)
  queries/              — All DB query functions (genres, frameworks, reports, etc.)

migrations/
  001_iea_schema.sql    — Complete schema + seed data

netlify.toml            — Netlify build config
site-copy.md            — Human-editable copy reference for all pages
```
