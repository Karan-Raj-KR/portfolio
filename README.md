# Karan Raj KR: portfolio

Astro, TypeScript, Panchang and Switzer, GSAP and Lenis. The current redesign and its content
live in this repository. [MIGRATION.md](MIGRATION.md) records how the live site's integrations
were retained and which launch checks still require the hosting and Google dashboards.

## Run

Use Node 22.22 or later.

```sh
npm ci
npm run dev -- --background
npm run build
npm run preview
```

While the original design workspace uses port 4321, start this branch with
`npm run dev -- --background --port 4322`. Manage it with `npx astro dev status`,
`npx astro dev logs` and `npx astro dev stop`.

## Edit

- Content, projects and links: `src/data/site.ts`.
- Home featured order: `src/pages/index.astro`.
- Layout, metadata and verification: `src/layouts/Base.astro`.
- Product explanations: `src/components/How.astro` and `FormWalk.astro`.
- Motion and navigation: `src/motion/setup.ts`, `src/engine/`.
- Appearance: `src/styles/`.
- GA4 and Vercel Analytics: `src/analytics.ts`, `src/lib/deployment.ts`.
- Hosting headers and build settings: `config/hosting.mjs`.
- Legacy redirects: `src/data/legacy-routes.mjs`.

Builds generate `vercel.json` from hosting settings and the redirect map; edit those source
files rather than the generated JSON. RSS, the manifest and llms.txt share current site content.
The GitHub panel fetches public repository data only when it approaches the viewport, with an
hour-long cache. The karana clock is computed in the browser for the KĀRYO section.

## Checks

```sh
npm run check
npm run build
npm run check:seo
npm run check:migration
CONTACT_BASE_URL=http://localhost:4322 npm run check:contact
node scripts/check-nav.mjs http://localhost:4322
node scripts/check-a11y.mjs http://localhost:4322
node scripts/check-responsive.mjs http://localhost:4322
```

The migration check intercepts all external requests. It never sends email or real analytics.
See MIGRATION.md for what these local checks prove and what still needs a deployed preview.

## Production settings

The existing Vercel project and domain are retained. `.env.example` lists the existing public
GA4 and Search Console variable names; local `.env*` files and host credentials stay ignored.
The default canonical origin is `https://www.karanrajkr.com`, matching the live host.
`SITE_URL` overrides the build's metadata origin; it does not change DNS.

Vercel preview builds and hosts are noindex, and analytics only loads on the configured
production origin. `GITHUB_TOKEN` is no longer needed by the static site and is never read in
client code. No push, deployment or domain change is performed by a build.
