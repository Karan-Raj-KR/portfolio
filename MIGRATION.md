# Main portfolio repository migration

Prepared locally on 24 October 2026. No push, pull request, deployment or DNS change was made.

- Repository: `Karan-Raj-KR/portfolio`
- Local branch: `update/astro-portfolio`
- Starting main commit: `711fc3473d339437846c5994ccb6c4dd04d49f36`
- Design source: `/Users/karanrajkr/Projects/awards portfolio`
- Existing Vercel project: `karanportfolio`
- Existing canonical host: `https://www.karanrajkr.com`

The branch replaces the Next.js implementation with the reviewed Astro portfolio. Git history
retains the previous implementation; `main` and the remote are unchanged. The latest changes
(Eligent second, footer credit removed, sole Eligent contribution) are included.

## Preserved integrations

| Integration | Evidence in the old repository | Migration |
| --- | --- | --- |
| Google Analytics 4 | `src/app/layout.tsx`, `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`; live HTML confirms the stream ID | Same public ID and environment variable; lightweight loader replaces the Next.js wrapper. |
| Search Console | `src/app/layout.tsx`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Same verification token, emitted once in the shared head. |
| Bing Webmaster Tools | `public/BingSiteAuth.xml` | File preserved byte for byte. |
| Vercel Analytics | `@vercel/analytics/next` | Same package, framework-independent Astro lifecycle integration. |
| Preview noindex | Old `vercel.json` host condition | Host header retained; Vercel preview builds also emit noindex metadata and disallow crawling. |
| Security headers | Old `next.config.ts` | Recreated in `config/hosting.mjs` and generated `vercel.json`. CSP allows native Gmail and Outlook contact destinations and the public GitHub API; no unsafe-eval. |
| Production host | Live apex redirects to www; old metadata uses www | Canonicals, structured data, robots, RSS and sitemap use www. |
| RSS | `/feed.xml` | Two existing articles and dates retained, generated from shared content. |
| Manifest | `/manifest.webmanifest` | Same endpoint with the new site's colours, description and existing icon assets. |
| Machine-readable profile | `/llms.txt` | Generated from current corrected content, rather than copying old wording. |
| Favicon | `/favicon.ico` | Existing file remains available; the redesigned SVG/PNG icons are used in the head. |
| Old pages and images | Old sitemap and public assets | 18 moved page paths and five asset/sitemap paths redirect from the shared map. |

No skills folders were tracked in the original repository. Dependencies, environment files,
framework caches, browser evidence and local editor/skill output are ignored. Original Next.js
content notes and the earlier migration audit are archived under `docs/history/`.

## Analytics behaviour and validation limits

Only a production build on the configured canonical origin loads the analytics SDKs. Localhost,
Vercel preview hosts, and builds with `VERCEL_ENV=preview` do not track. No changes are needed
to the existing public analytics and verification variable names in Vercel. Public fallbacks
match the identifiers already published by the live site. No secrets are copied into the client.
The old server-only `GITHUB_TOKEN` can remain configured but is unused by the static site.

GA4 retains the old site's automatic first pageview and Enhanced Measurement history tracking.
There are no additional manual page_view events, which would duplicate those history views.
Before launch, check that **Enhanced Measurement > Page views > Page changes based on browser
history events** is enabled in the existing web data stream. That dashboard setting cannot be
verified from repository files. Vercel pageviews are explicitly emitted once per Astro page-load,
including Back and Forward.

`npm run check:migration` runs both Chromium and WebKit against the built pages with the actual
configured CSP. Google/Vercel script requests are intercepted and mocked; no analytics is sent.
The test checks SDK initialization, route lifecycle, local/preview gating, verification files,
all redirect targets/anchors, RSS parsing, manifest icons and a no-JavaScript native Gmail draft.
It verifies local integration behaviour, not receipt in a dashboard.

## Local validation completed

- Astro/type check: zero errors, warnings or hints.
- Production build and static SEO check: 11 indexable routes, zero failures or warnings.
- Migration regression: Chromium and WebKit pass, with external tracking requests mocked.
- Existing contact regression: desktop, phone, no JavaScript, provider returns, clipboard success
  and denial, whitespace validation and clearing stored drafts pass in both engines.
- Existing navigation regression: 1440, 1024 and 390px pass in both engines, including the updated
  product order, tab keys, anchor offsets, header return and browser history.
- An explicit Vercel preview build emits noindex, disallows robots and disables analytics;
  the final output was rebuilt with normal production settings afterward.
- Desktop and phone browser captures of Home, About, Record and Eligent show no horizontal
  overflow, page errors or production tracking on localhost. Evidence stays in `.migration/qa/`.

## Review and launch

The migrated development preview runs at `http://localhost:4322`; the original design workspace
remains available at `http://localhost:4321`. Continue edits in the main repository branch once
this migration is accepted; the source workspace is a separate snapshot and does not synchronize.

1. Review this branch and the local preview. Its `vercel.json` specifies Astro, `npm ci`,
   `npm run build` and `dist`, so the previous Next.js framework preset is overridden in code.
2. When authorized, push the branch and use the **existing Vercel project's preview** for a final
   hosting check. Keep its root directory at the repository root. Do not create a new analytics
   property, Vercel project or domain mapping.
3. On that preview, verify permanent redirects, security headers, 404 status, provider drafts
   and noindex headers. These are prepared locally but the Vercel routing layer is untested.
4. Check the GA4 history setting above, existing environment variables and the project's Analytics
   switch. A different public verification value can still be supplied through the retained env.
5. Merge only when publishing is explicitly approved. Then check real analytics receipt, Search
   Console verification, canonical URLs and sitemap on the production host.

The apex-to-www redirect and domain/subdomain records are managed by the existing hosting setup;
this branch does not change them. Leave the Eligent and ERP subdomains pointed at their own apps.
For rollback, redeploy the previous Vercel production deployment (the original main commit above).

## Reference documentation consulted

- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Astro routing](https://docs.astro.build/en/guides/routing/)
- [Vercel Web Analytics](https://vercel.com/docs/analytics/quickstart)
- [GA4 pageviews and history measurement](https://developers.google.com/analytics/devguides/collection/ga4/views)
