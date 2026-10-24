# Portfolio migration audit

Audited 23 October 2026. Source: [karanrajkr.com](https://karanrajkr.com/).

The new Astro portfolio is the retained version. All 20 HTML pages in the public
[sitemap](https://karanrajkr.com/sitemap.xml) were fetched, read in full, and rendered in
Chrome. Following their internal links found no additional HTML pages. Both article
detail pages contain excerpts and links to external publications, not full article bodies.
External websites were treated as references and destinations, rather than an unlimited crawl.

## Which information is newer?

| Content | Public portfolio | New portfolio / decision |
| --- | --- | --- |
| crewai-recipes | 9 forks | Keep 20; the public GitHub API confirms 20 forks and 7 stars on 23 October. |
| Project explanations | Mostly summaries, stack and feature lists, with image placeholders | Keep the new architecture, reasoning, outcomes and links for all eight projects. |
| FormPilot | Win, team, field, scores, prize, architecture image | All retained. Provider names from the architecture reference are included too. Chrome Web Store and source links remain. |
| VoiceRx | Solo, Top 40 of 2,500+, Vapi/FastAPI/Qdrant/Groq | All retained, together with the newer retrieval-pipeline explanation. |
| Client Onboarding Manager | Live app and source link | Keep the working live app. The old source URL returns a public 404, so it is intentionally not restored. |
| School ERP | About 45 routes, four areas, Ask ERP, demo status | All retained. The demo is reachable and leads to a login screen; no login was attempted. |
| Eligent | Team project; discovery/autofill prototype | Keep that status and the newer eligibility-engine explanation and working live link. |
| KĀRYO Lead Intelligence Agent | CrewAI, Agentathon participation | Retained with the newer manager/scorer/researcher/outreach explanation and public source. |
| ISKCON Visakhapatnam | Client site; Next.js 14 and Tailwind | Retained. No invented public live URL or source link added. |
| Achievements and hackathons | Wins, placements, participation, awards, education | All substantive entries already present. Keep the new consolidated record; preserve the exact 10 October DevDay date. |
| Agency and roles | Founded August 2025; outreach, revenue, operations, club roles | Retained. Candidate/prototype statuses remain as published because no newer change was established. |
| Education | B.Tech CSE (AI/ML), NIAT–S-VYASA, 2025–29 | Retained. Replaced the new site's time-sensitive present-tense “first year” claim with the documented degree and batch. Historical first-year articles and achievements retain their wording. |
| Identity heading | Factual founder/builder biography | Replaced the unsupported “Building before I was allowed to” heading with “Builder. Founder.” |
| Profiles | Additional YouTube, Stack Overflow, Medium, Telegram, Facebook links | Restored on About, alongside the existing five primary destinations. Email remains in the contact/footer. |
| Writing | Two titles, dates, excerpts, Hashnode and Dev.to links | Restore the excerpts and machine-readable dates; retain both publication choices and article-specific anchors. |
| Changelog | Six dated entries | Restore a dated-updates section on Record and include the already documented Hive Sprint build. |
| Gallery | Portrait, award photograph, FormPilot architecture screenshot | The two real photographs remain; the architecture reference is restored as a locally hosted file linked from the archive, without adding project pictures to the main work sequence. |
| FAQ | Repeated identity, education and project facts | Facts remain in the biography and work pages; the duplicate FAQ layout is not copied. |
| GitHub activity | A transient recent-events feed | Keep the newer live latest-push/fork panel and update its fallback to the public 22 October push. Historical feed rows are not copied as current activity. |

GitHub verification: [crewai-recipes](https://github.com/Karan-Raj-KR/crewai-recipes).
Live links checked successfully: [FormPilot](https://form-pilot.netlify.app/),
[Eligent](https://eligent.karanrajkr.com/), [School ERP](https://erpdemo.karanrajkr.com/),
[Client Onboarding Manager](https://karyo-client-onboarding-manager.vercel.app/), and
[crewai-recipes gallery](https://karan-raj-kr.github.io/crewai-recipes/).

## Every old page and its destination

| Old route | New destination |
| --- | --- |
| `/` | `/` |
| `/about` | `/about/` |
| `/projects` | `/#work` |
| `/projects/client-onboarding-manager` | `/work/client-onboarding-manager/` |
| `/projects/school-erp` | `/work/school-erp/` |
| `/projects/eligent` | `/work/eligent/` |
| `/projects/iskcon-visakhapatnam` | `/work/iskcon-visakhapatnam/` |
| `/projects/karyo-agent` | `/work/lead-intelligence-agent/` |
| `/projects/crewai-recipes` | `/work/crewai-recipes/` |
| `/projects/formpilot` | `/work/formpilot/` |
| `/projects/voicerx` | `/work/voicerx/` |
| `/hackathons` | `/record/#wins` |
| `/hackathons/open-loop-2026` | `/work/formpilot/` |
| `/achievements` | `/record/` |
| `/gallery` | `/about/#media` |
| `/blog` | `/about/#writing` |
| `/writing` | `/about/#writing` |
| `/blog/open-loop-2026-formpilot-winner` | `/about/#writing-open-loop-2026-formpilot-winner` |
| `/blog/my-first-year-of-engineering` | `/about/#writing-my-first-year-of-engineering` |
| `/changelog` | `/record/#updates` |

The old home anchors `#projects`, `#about`, `#karyo` and `#contact` remain usable.
Four old media/OG URLs also have host redirect rules. The single routing map is
`src/data/legacy-routes.mjs`.

Astro generates portable HTML redirect fallbacks. `npm run build` also prepares
`dist/_redirects` for Cloudflare Pages and Netlify, and `vercel.json` for Vercel.
These hosts can issue permanent HTTP redirects (301 on Cloudflare/Netlify, 308 on Vercel).
Netlify builds automatically use forced rules to override the fallback HTML. For a manual
Netlify upload, build with `NETLIFY=true npm run build` first. Generic static hosts use the
HTML fallbacks unless their own HTTP routing is configured. Asset redirects require the
host rules; an HTML page cannot substitute for an old image URL.

## Improvements included

- About and Record have section navigation; the footer links to writing, media and updates.
- Cross-page fragments resolve after the page transition and pin layout settle. This fixes
  the old transition behavior that reset `/about/#writing` and similar links to the top.
- Photo links open the full local images. The migrated architecture reference is a 64 KB WebP.
- The existing hero typography, blue echo and four-project touch/desktop scroll scene are kept.
- Keyboard focus on article dates keeps the same readable contrast as hover.
- Person metadata includes the restored profiles and identifies the university as current
  membership, rather than implying graduation.
- Canonicals, social metadata, sitemap, robots and structured-data origins follow `SITE_URL`.
  Legacy routes are excluded from the canonical sitemap.

## Validation

Production build and Astro diagnostics pass. Browser checks cover every canonical page,
all eight case studies and the 404 at 1440, 768 and 390 pixels. The audit checks WCAG A/AA
rules with axe, page errors, overflow, image failures, duplicate IDs, internal destinations,
all 18 moved HTML routes and cross-page fragment navigation. The existing touch sequence
is also checked separately. All 36 page/viewport combinations pass with zero axe violations,
horizontal overflow, duplicate IDs, broken loaded images or browser errors. The writing and
updates cross-page anchors land 96 pixels below the viewport top. A separate-origin build
was checked for matching canonical, OG, JSON-LD, robots and sitemap URLs. Netlify forced-rule
generation was checked too. Host configurations are prepared locally; their HTTP responses
must be checked on the eventual deployment.

No deployment or DNS change was performed. To use a separate deployment origin, set the
build environment's `SITE_URL` to that origin. The default remains `https://karanrajkr.com`.

## Launch handoff

1. Deploy the `dist/` build separately; on Vercel keep the generated `vercel.json` with the source.
2. Set `SITE_URL` to the chosen production origin and rebuild when the canonical domain changes.
3. On the deployed host, verify representative old project, blog, gallery and image URLs,
   their permanent status codes, and that fragments land on the correct sections.
4. Keep the existing `eligent.karanrajkr.com` and `erpdemo.karanrajkr.com` records intact when
   changing the portfolio's apex/`www` records. Those subdomains serve separate products.
5. After the domain switch, verify the canonical host and submit the generated sitemap.
