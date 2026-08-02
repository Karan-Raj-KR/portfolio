# SEO Audit — karanrajkr.com (read-only pass, Aug 2 2026)

Audit of this Next.js portfolio repo. Goal: NAME-ENTITY SEO for "Karan Raj KR",
"karanrajkr", "Karan Raj KR KĀRYO".

Verification methods used:
- `npm run build` (Next 16.1.1, Turbopack) + grep of built HTML in `.next/server/app/*.html`
- Live HTTP checks: `https://www.karanrajkr.com`, `https://karanrajkr.com`, `/apple-icon.png`, `/favicon.ico`, `/og-image.jpg`, `/blog/`
- `rg`/`grep` over `src/`; `sips` for image dimensions; `find public` for assets
- No files modified, created (other than this report), or deleted.

---

## 1. Summary table

Stack: **Next.js 16.1.1, App Router** (`src/app/`, `package.json` line 15 `"next": "16.1.1"`).
No `use client` in any `page.tsx` — every page is a Server Component. All page content is
present in the static HTML output (verified in `.next/server/app/*.html`; e.g. the hero
phrase "From ideas" is in the built homepage HTML). No data fetching exists anywhere that
could leave SSR HTML empty — all data is static imports from `src/data/*`.

| Route | Title (chars) | Meta description (chars) | Indexed? | h1 count | Client-only? |
|---|---|---|---|---|---|
| `/` | `Karan Raj KR \| AI Engineer & Backend Developer` (46) | `Karan Raj KR is an AI Engineer and Backend Dev building with Python, FastAPI and Next.js. Founder of KĀRYO. B.Tech CSE (AI/ML) at NIAT–S-VYASA, Bengaluru.` (154) | Yes (context) | 1 | No |
| `/about` | **IDENTICAL to `/`** (verified in build + live) | **IDENTICAL to `/`** | Yes (context) | 1 | No |
| `/blog` | `Blog \| Karan Raj KR` (20) | `Read my latest articles about AI Engineering, Backend Development, and building products.` (89) | Yes (context) | 1 | No |
| `/blog/[slug]` | `Post {slug} \| Karan Raj KR` | `A deep dive into {slug} as an AI Engineer and Backend Developer.` | No (placeholder, no inbound links, not in sitemap) | 1 | No (dynamic ƒ) |
| `/projects` | `Projects \| Karan Raj KR` (24) | `Case studies of what I've built — hackathon wins, agents, and tools, each starting with what actually happened.` (111) | No (orphan) | 1 | No |
| `/projects/[slug]` (×4 SSG) | `{Title} — Case Study \| Karan Raj KR` | `project.overview` | No (orphan) | 1 | No |
| `/hackathons` | `Hackathons \| Karan Raj KR` (26) | `A look at the projects and prototypes I've built under intense time constraints.` (80) | Yes (context) | 1 | No |
| `/hackathons/open-loop-2026` | `Open Loop 2026 Winner — FormPilot \| Karan Raj KR` (49) | `1st Place Winner at Open Loop Hackathon 2026. Built FormPilot, an AI-powered Chrome extension.` (94) | No (missing from sitemap) | 1 | No |
| `/achievements` | `Achievements \| Karan Raj KR` (27) | `Hackathon wins, open-source contributions, and milestones — a complete record of what I've won, shipped, and built.` (115) | No | 1 | No |
| `/writing` | `Writing \| Karan Raj KR` (23) | `Essays, thoughts, and research notes on software, AI, and startups.` (**67 — below 70 floor**) | No (orphan) | 1 | No |
| `/changelog` | `Changelog \| Karan Raj KR` (25) | `A timeline of my releases, updates, and major milestones.` (**57 — below 70 floor**) | No (orphan) | 1 | No |

Non-page routes: `/robots.txt`, `/sitemap.xml`, `/feed.xml` (dynamic), `/manifest.webmanifest`, `/_not-found`.
All titles are under the 60-char cap; homepage title leads with "Karan Raj KR"; every other
title ends with the template suffix "| Karan Raj KR" (`src/app/layout.tsx:14-17`).

---

## 2. Findings

### CRITICAL

**C1. `/` and `/about` emit byte-identical `<title>` and meta description, and `/about` canonicalizes to the homepage.**

- `src/app/about/page.tsx` — NO `metadata` export exists in the entire file (66 lines). Verified by read; the page
  inherits everything from the root layout.
- `src/app/layout.tsx:14-18`:
  ```ts
  title: {
    default: 'Karan Raj KR | AI Engineer & Backend Developer',
    template: '%s | Karan Raj KR'
  },
  description: 'Karan Raj KR is an AI Engineer and Backend Dev building with Python, FastAPI and Next.js. Founder of KĀRYO. ...'
  ```
- Verified in build output — `.next/server/app/index.html` and `.next/server/app/about.html` both contain:
  `<title>Karan Raj KR | AI Engineer &amp; Backend Developer</title>` plus the same meta description.
  Verified live: `curl https://www.karanrajkr.com/about` returns the identical `<title>`.
- Canonical verified live on `/about`: `<link rel="canonical" href="https://www.karanrajkr.com"` — caused by
  `src/app/layout.tsx:22-24` `alternates: { canonical: '/' }`, which Next.js merges into every route that does not
  override it (`/about` is the only page without an override).
- Why it matters for name-entity SEO: `/about` is the only page with a standalone visible `<h1>Karan Raj KR</h1>`
  (`src/app/about/page.tsx:23-25`) and the richest full-name copy. It should be a second strong entity document for
  "Karan Raj KR" — instead Google sees two identical documents where one canonicalizes the other; the entity record
  collapses onto the homepage and the /about URL is declared a duplicate of it.
- Change (not made): add a `metadata` export to `src/app/about/page.tsx` (unique title, e.g. `'About Karan Raj KR |
  AI Engineer & Backend Developer'`, unique description, `alternates: { canonical: '/about' }`); remove
  `alternates.canonical` from `src/app/layout.tsx:22-24` so it cannot leak onto future routes.

### HIGH

**H1. The Person entity graph is disconnected — no `@id` anywhere, so Google cannot join the blocks.**

- `src/components/seo/json-ld.tsx:4-74` — Person, Organization (KĀRYO) and WebSite are emitted in one script array,
  but none carries an `"@id"` (verified by parsing the built HTML: `@id=NONE` on all three entities).
- `worksFor` (`json-ld.tsx:12-15`) is an anonymous `Organization` with no `url` — the homepage links
  `https://www.karyo.in` (`src/components/sections/karyo.tsx:71`) but the schema never states KĀRYO lives there.
- Why it matters: name-entity SEO depends on Google treating "Karan Raj KR", "Karan Raj KR portfolio", and "KĀRYO
  founder" as ONE entity. `@id`s (`https://www.karanrajkr.com/#person` etc.) with `WebSite`/`Organization` referring
  to the Person are what build that graph. Today: three isolated nodes in one script tag.
- Change (not made): add `@id` values to Person/Organization/WebSite, give the KĀRYO org a `url` of
  `https://www.karyo.in`, and have the WebSite reference the Person via `"publisher"`.

**H2. WebSite schema advertises a `SearchAction` for a search box the site does not have.**

- `src/components/seo/json-ld.tsx:69-73`:
  ```json
  "potentialAction": { "@type": "SearchAction", "target": "https://www.karanrajkr.com/?q={search_term_string}", "query-input": "required name=search_term_string" }
  ```
  Grep of `src/` finds no search route and no `?q=` handling anywhere. `/?q=anything` serves the homepage with no
  search UI.
- Why it matters: it is a misleading structured-data claim (site-link search box markup pointing at a
  non-functional endpoint) attached to the same entity record we're trying to strengthen.
- Change (not made): delete the `potentialAction` block entirely.

**H3. `/blog/[slug]` is an unguarded placeholder that HTTP 200s for every slug — a soft-404 factory.**

- `src/app/blog/[slug]/page.tsx:44-46`:
  ```tsx
  <h1>{resolvedParams.slug.replace("-", " ")}</h1>
  <p>This is a placeholder for the blog post content.</p>
  ```
  No `notFound()` for unknown slugs; the route is `ƒ` (Dynamic, server-rendered on demand — confirmed in build
  output), so ANY path like `/blog/garbage` returns HTTP 200 with placeholder text. The title is junk too:
  `src/app/blog/[slug]/page.tsx:7` — `title: \`Post ${resolvedParams.slug}\``.
- `src/app/feed.xml/route.ts:10` actively links to `/blog/hello-world`, which is not an article in
  `src/data/publications.ts` (real slugs are `open-loop-2026-formpilot-winner` and `my-first-year-of-engineering`).
  The feed pushes Googlebot at the placeholder. The page also renders no `<Header />`, so it has no visible link
  back to the site at all (see M2 note).
- Why it matters: placeholder documents indexed under the brand dilute the name-entity record with
  "Post hello-world" titles, and soft 404s invite a quality downgrade of the site.
- Change (not made): return `notFound()` unless the slug exists in `publications` (or `redirect()` the slug to the
  external article); fix `feed.xml` to point at the two real articles.

**H4. Broken assets: `/apple-icon.png` 404, `/og-image.jpg` 404, and `og:image` actual size ≠ declared size.**

- `src/app/layout.tsx:45-47`:
  ```ts
  icons: { icon: '/favicon.ico', apple: '/apple-icon.png' }
  ```
  `find public -name "apple-icon*"` → NOT FOUND. Verified live: `curl -sI https://www.karanrajkr.com/apple-icon.png`
  → `HTTP/2 404`. The emitted `<link rel="apple-touch-icon" href="/apple-icon.png">` is dead on every page.
- `src/components/seo/json-ld.tsx:50`: `logo: "https://www.karanrajkr.com/og-image.jpg"` → NOT FOUND in `public/`
  (only `og-image.png` exists). Verified live: `HTTP/2 404`. Same bad fallback at `src/app/blog/page.tsx:20`:
  `images: [{ url: publications[0]?.coverImage || "/og-image.jpg" }]` — articles without a cover emit OG meta
  pointing at a 404.
- `src/app/layout.tsx:30` declares `width: 1200, height: 630`; the actual file is **1731×909**
  (`sips -g pixelWidth -g pixelHeight public/og-image.png`).
- Why it matters: `og:image` is the visual identity Google/LinkedIn/X attach to the entity's pages; a 404 or
  wrong-aspect image degrades every share of the name, and the JSON-LD `logo` 404 is noise in the entity graph.
- Change (not made): export og-image at true 1200×630 (or declare 1731×909), add a real `apple-icon.png` (or drop
  the `apple` key), and change `og-image.jpg` references to `og-image.png`.


### MEDIUM

**M1. Sitemap is incomplete and `lastmod` is meaningless.**

- `src/app/sitemap.ts:5`:
  ```ts
  const routes = ['', '/about', '/projects', '/blog', '/writing', '/hackathons', '/achievements', '/changelog']
  ```
  Missing (confirmed in built `.next/server/app/sitemap.xml.body`): `/hackathons/open-loop-2026` — a substantive
  page carrying the "Karan Raj KR (Team Lead)" mention (`open-loop-2026/page.tsx:176`) — and all four
  `/projects/[slug]` pages (`formpilot`, `voicerx`, `karyo-agent`, `court-backlog-predictor`; all SSG'd, confirmed
  in build output).
- `src/app/sitemap.ts:9`: `lastModified: new Date()`. Verified in built output: every URL carries the identical
  build timestamp `2026-08-02T05:25:14.171Z`. Not hardcoded text, but also not a real content date — it changes on
  every deploy and tells Google nothing about content freshness.
- Change (not made): add the missing routes; derive `lastModified` from real data (e.g. git history or
  `publishedDate`/`timeline` in `src/data/`).

**M2. Four routes are orphans — zero inbound internal links: `/about`, `/projects`, `/writing`, `/changelog`.**

- `rg 'href="/about"|href="/writing"|href="/changelog"|href="/projects"' src/` → zero hits.
- Nav sources: `src/components/layout/header.tsx:8-17` (links `/#about`, `/#skills`, `/#projects`, `/hackathons`,
  `/achievements`, `/blog`, `/#karyo`, `/#contact`), `src/components/layout/bottom-nav.tsx:12-17` (mobile, 4 items),
  `src/components/layout/bottom-nav-sheet.tsx:14-19` (`#skills`, `/achievements`, `/blog`, `#contact`).
  The nav links homepage *sections* (`/#projects`, `/#about`) — never the standalone `/projects` or `/about` pages.
  Only the sitemap keeps `/writing` and `/changelog` discoverable; all four get zero internal link equity.
  Bonus: `/blog/[slug]` renders no `<Header />`, so blog-post pages have no link to home either.
- Why it matters: `/about` is the single most important page for "Karan Raj KR" name queries — the only page whose
  `<h1>` is exactly the name — and the site itself never points Googlebot at it. Orphan pages don't accumulate the
  entity signals you want them to have.
- Change (not made): add `About` (and a `Projects` link) to the header/sheet nav pointing at the standalone pages;
  consider 301-merging `/writing` and `/changelog` into `/blog` until they have real content.

**M3. The one-word token "karanrajkr" barely exists in visible page text.**

- Case-insensitive grep of `src/` (52 hits) shows the token lives in profile URLs
  (`src/data/publications.ts:23-34`, `src/lib/social.ts:21-34`, `src/app/about/page.tsx:34,50,54`,
  `src/components/seo/json-ld.tsx:36,39-40`), emails, robots/sitemap/breadcrumb URLs, and JSON-LD — i.e. in
  attributes and outbound links, not copy.
- Visible *text* occurrences: exactly one — the anchor text `karanrajkr.hashnode.dev` at
  `src/components/sections/about.tsx:46` (renders on `/` and `/about`). The social "info" strings
  (`src/lib/social.ts:22,34`) are hover-only (`hoveredInfo` state, `hero-animations.tsx:49-50`,
  `contact.tsx:67-68`), not in initial HTML. `public/llms.txt:1` uses "Karan Raj" without the token.
- Why it matters: Google currently treats "karanrajkr" as a typo of the contested "Karan Raj". The token needs to
  appear as an intentional term in crawlable page copy so the entity is spelled in its queryable form.
- Change (not made): add a footer/brand line on all pages, e.g. "© 2026 karanrajkr.com — Karan Raj KR", or mention
  "karanrajkr" in hero sub-copy.

**M4. Person schema: `alternateName` is the contested name; `alumniOf` is absent.**

- `src/components/seo/json-ld.tsx:8`: `"alternateName": "Karan Raj"` — the exact string this audit's brief says is
  contested by a Bhojpuri singer / Spotify artist / influencers. `alternateName` invites Google to treat "Karan Raj"
  as an alias of this person, which is precisely the entity collision we want to avoid.
- `src/components/seo/json-ld.tsx:16-19` uses `affiliation` for the university. Valid schema.org, but `alumniOf` is
  the property Google's entity graph recognizes for education; the root description already says "B.Tech CSE
  (AI/ML) at NIAT–S-VYASA" (`layout.tsx:18`), so the data exists to move.
- Change (not made): remove `alternateName` (or set it to `"karanrajkr"`), and add
  `"alumniOf": { "@type": "CollegeOrUniversity", "name": "NIAT–S-VYASA University" }`.

**M5. `/about` (and every page without its own OG) inherits homepage `og:url`, `og:title`, `og:description`.**

- `src/app/layout.tsx:25-33` hardcodes `url: 'https://www.karanrajkr.com'` and the homepage title/description in
  the root `openGraph` block. Verified in build: `.next/server/app/about.html` emits
  `<meta property="og:url" content="https://www.karanrajkr.com"` — sharing /about claims the URL is the homepage.
  Only `/blog` overrides OG (`src/app/blog/page.tsx:16-21`).
- Why it matters: social platforms and Google's crawler read OG tags when rendering the entity's pages; wrong
  og:url on /about reinforces the C1 duplicate-state.
- Change (not made): drop `url` from the root `openGraph` (or set it per page); give `/about` its own OG block.

**M6. Description-length floors: `/writing` (67 chars) and `/changelog` (57 chars) are below 70.**

- `src/app/writing/page.tsx:5`: `description: "Essays, thoughts, and research notes on software, AI, and startups."` — 67 chars.
- `src/app/changelog/page.tsx:5`: `description: "A timeline of my releases, updates, and major milestones."` — 57 chars.
- Both pages are placeholders ("Essays coming soon." `writing/page.tsx:27`, "Changelog coming soon."
  `changelog/page.tsx:27`), so this is a symptom of the bigger placeholder problem; lengthen or fold the pages.

**M7. Heading hierarchy skip on `/about`: `h1` → `h3`.**

- `src/app/about/page.tsx:23-25` renders `<h1>Karan Raj KR</h1>`; the page then mounts `AboutSection`, whose first
  heading is `<h3>Frequently Asked Questions</h3>` (`src/components/sections/about.tsx:50`) with `h4` questions
  below — no `h2` between `h1` and `h3` on this page. (Homepage is fine: sr-only `h1` → visible `h2` hero →
  section `h2`s → `h3`s.)
- Change (not made): render the FAQ title as an `h2` (or add an `h2` intro heading) on the about page.

### LOW

**L1. Blog page `Blog` schema points `BlogPosting` URLs at external domains.**
`src/app/blog/page.tsx:43-59` — the `Blog` schema's `blogPost` entries use `article.canonicalUrl || article.platforms[0]?.url`
(hashnode.dev / dev.to), and the visible cards all link out (`blog/page.tsx:94,115,130-140`). Google's Blog
schema expects post URLs on the same site; posts living externally means the blog section contributes little to the
site's entity graph. Also a third-party `Blog` type is not a Google-recognized rich-result type anyway. Consider
removing or keeping only as-is.

**L2. `feed.xml` is stale.** `src/app/feed.xml/route.ts:8-13` — one hardcoded item (`Hello World - Building KĀRYO`,
`pubDate` fixed `Sun, 05 Jul 2026 08:00:00 GMT`) whose `/blog/hello-world` URL hits the H3 placeholder. The feed
should derive from `publications` or be removed.

**L3. `keywords` meta is dead weight.** `src/app/layout.tsx:19` — `keywords: ['Karan Raj KR', 'Karan Raj AI Engineer',
'Karan Raj Portfolio', ...]`. Google has ignored `keywords` for ~15 years; harmless, but it implies an old-style
approach. The `creator`/`authors` fields (`layout.tsx:20-21`) are the ones worth keeping.

**L4. Duplicate site-verification meta.** `src/app/layout.tsx:40-42` uses `verification.google` from env, and
`src/app/layout.tsx:64` hardcodes `<meta name="google-site-verification" content="0W3wPYuowx9ekB31u-YSCyuTTf0GQeRXilZ3nagT-BM" />`.
Two copies of the same meta in `head`; harmless, but delete one.


---

## 3. Verified correct — do not touch

- **Every page is server-rendered with full content.** Build output confirms all static HTML contains the content;
  the homepage hero ("From ideas") and all section copy are in the SSR HTML. `use client` exists only in leaf
  components (23 files), and `next/dynamic` on the homepage (`src/app/page.tsx:8-15`) is used WITHOUT `ssr: false`,
  so those sections still render server-side. Googlebot sees the full page, not a shell.
- **Exactly one `<h1>` per route** (verified via grep of all built HTML files) with the homepage h1 containing the
  literal name: `<h1 class="sr-only">Karan Raj KR — AI Engineer & Backend Developer</h1>`
  (`src/components/sections/hero-content.tsx:12`).
- **Title template discipline.** Every subpage title ends with "| Karan Raj KR" (template `layout.tsx:16`), the
  homepage leads with the full name, and no title exceeds 60 chars. `metadataBase` is consistently
  `https://www.karanrajkr.com` (`layout.tsx:13`).
- **Canonical/host hygiene.** Apex → www is a 308 redirect (verified live: `karanrajkr.com` → `www.karanrajkr.com/`;
  this is Vercel project-level, not in `next.config.ts` or `vercel.json`, but it works). `trailingSlash` is not set
  (default false) and `/blog/` 308s to `/blog/` (verified live) — no route is reachable at two URLs. Every page with
  its own metadata export has a self-referencing canonical (`/blog`, `/projects`, both `[slug]` routes,
  `/hackathons`, `/hackathons/open-loop-2026`, `/achievements`, `/writing`, `/changelog`).
- **robots.txt allows everything** (`src/app/robots.ts:5` — `{ userAgent: '*', allow: '/' }`) and lists the sitemap;
  `vercel.json` applies `X-Robots-Tag: noindex, nofollow` to `*.vercel.app` preview deployments — correct, prevents
  duplicate-content bleed from preview URLs.
- **Person JSON-LD core fields are present**: `name`, `url`, `image`, `jobTitle`, `worksFor`, `address`,
  `knowsAbout`, and a 7-entry `sameAs` (`src/components/seo/json-ld.tsx:4-43`): GitHub, LinkedIn, Twitter/X,
  Instagram, Hashnode, Dev.to, YouTube — matching the profiles actually linked in the UI
  (`src/app/about/page.tsx:30-57`). No common profile is linked on the site but missing from `sameAs`.
- **BreadcrumbList on all content pages**: `/blog`, `/blog/[slug]`, `/projects`, `/projects/[slug]`,
  `/hackathons/open-loop-2026`, `/achievements`, `/writing`, `/changelog` all emit `BreadcrumbList` via
  `BreadcrumbJsonLd` with correct Home → section chains.
- **Every `<img>`/`next/image` has meaningful alt text**:
  - `src/app/about/page.tsx:16` — `alt="Karan Raj KR - AI Engineer and Backend Developer, Founder of KĀRYO"`
  - `src/components/sections/karyo.tsx:128` — `alt="KĀRYO Client Dashboard"`
  - `src/app/hackathons/open-loop-2026/page.tsx:79` — `alt="Open Loop Hackathon 2026 Winner Certificate"`
  - `src/app/hackathons/open-loop-2026/page.tsx:95` — `alt="FormPilot Architecture Diagram"`
  - `src/app/blog/page.tsx:97` — `alt={article.title}`
  - Project case-study "images" are non-image placeholder divs (`src/components/ui/image-placeholder.tsx`), so no alt issue.
- **`<html lang="en">`** (`layout.tsx:62`); GA/analytics gated behind env + production (`layout.tsx:70-72`); favicon
  `/favicon.ico` resolves 200 live (served from `src/app/favicon.ico`); `manifest.ts` emits a valid webmanifest.
- **No `noindex` on any production route**, no `nofollow` on internal links, and the two external-link hops in
  `hero-content.tsx:40-52` correctly use `rel="noopener noreferrer"`.

---

## 4. Could not verify

- **Actual Google index state** of `/projects`, `/projects/[slug]×4`, `/achievements`, `/writing`, `/changelog`,
  `/hackathons/open-loop-2026`. The user-supplied context says only `/`, `/blog`, `/hackathons`, `/about` are
  indexed; index status of the rest requires Search Console. The "Indexed?" column above therefore reflects
  reachability signals (internal links + sitemap), not Google's index.
- **Whether Google has already flagged the /about duplicate** (e.g. "Duplicate without user-selected canonical")
  — needs Search Console.
- **The apex domain's deployment config** — the 308 www redirect exists and works live, but nothing in this repo
  (`next.config.ts`, `vercel.json`) defines it; it is Vercel platform behavior. UNVERIFIED where it is configured.
- **`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` value** — env-dependent `verification.google`
  (`layout.tsx:40-42`); the hardcoded tag (`layout.tsx:64`) is present regardless, so verification is not at risk,
  but whether the env var duplicates it in production is UNVERIFIED.
- **`og-image.png` visual content** — file dimensions verified (1731×909); whether the design contains text that
  gets cropped by social platforms at those dimensions is not checkable without rendering.
- **Bing site verification** — `public/BingSiteAuth.xml` exists but whether the Bing search console accepted it
  requires the Bing dashboard.
- **Lastmod intent** — `sitemap.ts:9` uses `new Date()`; there is no history-based lastmod to confirm whether that
  was deliberate.

---

*Report written read-only. No repo files were modified. Findings are code-verified (build output, live HTTP,
`rg`/`grep`, `sips`) — nothing assumed from framework conventions.*

---

## NOTES (from the fix pass, Aug 2 2026)

- **Homepage no longer emits `<link rel="canonical">` or `og:url`.** Step 3 ordered the deletion of
  `alternates: { canonical: '/' }` and the root `openGraph.url` from `src/app/layout.tsx`. As a direct consequence,
  `/` (which has no `metadata` export of its own) now renders neither a canonical link nor an `og:url` meta tag in
  the built HTML. If a canonical tag on `/` is desired, a minimal `metadata` export (or `alternates: { canonical: '/' }`)
  would need to be added to `src/app/page.tsx` — not done here because the step named only layout.tsx changes.
- **`/about` title exceeds the 60-char cap (66 chars).** The step-specified title
  `'About Karan Raj KR | AI Engineer & Backend Developer'` + the root template `'%s | Karan Raj KR'` renders as
  `About Karan Raj KR | AI Engineer & Backend Developer | Karan Raj KR`. Template and title string were both
  dictated by the instructions (template is on the DO-NOT-TOUCH list), so kept as ordered.
- **Nav arrays use object-literal form** (`href: "/about"`), not JSX-attribute form (`href="/about"`); the audit's
  M2 `rg` pattern and the Step 1 verify pattern only match the JSX form. Verified with the correct pattern
  (`rg 'href: "/about"'`) — hits at `src/components/layout/header.tsx:9,11` and
  `src/components/layout/bottom-nav-sheet.tsx:16`.
