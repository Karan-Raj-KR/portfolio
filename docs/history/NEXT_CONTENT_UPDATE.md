# Portfolio content update

Applied to the existing working tree. Existing uncommitted work was preserved. No push or deployment.

## What was already there

- `/`: animated portrait hero, achievements, About, current work/GitHub activity, selected projects, KĀRYO, animated skill chips and contact.
- `/about`: portrait, public profiles, biography and FAQ.
- `/blog`: two external articles, platform links, sharing and Blog JSON-LD.
- `/blog/[slug]`: article summaries, external reading links and BlogPosting JSON-LD.
- `/hackathons`: Open Loop, Hack BLR, Agentathon and Databricks cards.
- `/hackathons/open-loop-2026`: FormPilot story, team, certificate, architecture, event figures and results.
- `/projects`: project list; its descriptions referenced an empty optional `story` field.
- `/projects/[slug]`: FormPilot, VoiceRx, KĀRYO Lead Intelligence Agent and Court Backlog Predictor case studies.
- `/writing`: placeholder.
- `/changelog`: placeholder.
- `/achievements`: awards, competitions, open source, agency and education records.
- `/gallery`: portrait, Open Loop certificate, FormPilot diagram, filters and image modal (existing uncommitted work).
- Shared SEO: Person, Organization, WebSite, ProfilePage, ImageGallery, project and breadcrumb JSON-LD; canonical metadata, social images, sitemap, robots, manifest, RSS and llms.txt.
- Search Console verification, GA4 environment-based loading and Vercel Analytics.
- Existing GitHub feature: cached server fetches, statistics, recent activity, languages and commit recency; fallback fabricated fresh timestamps and statistics.

All source pages, data and components were read before editing. The initial source inventory follows.

### Pages

- `src/app/about/page.tsx`
- `src/app/achievements/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/changelog/page.tsx`
- `src/app/gallery/page.tsx`
- `src/app/hackathons/open-loop-2026/page.tsx`
- `src/app/hackathons/page.tsx`
- `src/app/page.tsx`
- `src/app/projects/[slug]/page.tsx`
- `src/app/projects/page.tsx`
- `src/app/writing/page.tsx`

### Data files

- `src/data/achievements.ts`
- `src/data/experience.ts`
- `src/data/gallery.ts`
- `src/data/projects.ts`
- `src/data/publications.ts`
- `src/data/roadmap.ts`

### Components

- `src/components/ClickSpark.tsx`
- `src/components/blog/share-buttons.tsx`
- `src/components/gallery/gallery-view.tsx`
- `src/components/layout/bottom-nav-sheet.tsx`
- `src/components/layout/bottom-nav.tsx`
- `src/components/layout/header.tsx`
- `src/components/not-found-content.tsx`
- `src/components/providers/motion-provider.tsx`
- `src/components/sections/about.tsx`
- `src/components/sections/achievement-card.tsx`
- `src/components/sections/achievements-full.tsx`
- `src/components/sections/achievements.tsx`
- `src/components/sections/contact.tsx`
- `src/components/sections/hackathon.tsx`
- `src/components/sections/hero-animations.tsx`
- `src/components/sections/hero-content.tsx`
- `src/components/sections/hero.tsx`
- `src/components/sections/karyo.tsx`
- `src/components/sections/now.tsx`
- `src/components/sections/skills.tsx`
- `src/components/seo/json-ld.tsx`
- `src/components/theme-provider.tsx`
- `src/components/ui/click-spark-wrapper.tsx`
- `src/components/ui/image-placeholder.tsx`
- `src/components/ui/magnetic.tsx`
- `src/components/ui/scroll-progress.tsx`
- `src/components/ui/spotlight.tsx`
- `src/components/ui/theme-toggle.tsx`
- `src/components/ui/tilt.tsx`

### Feature components

- `src/features/experience/components/experience-timeline.tsx`
- `src/features/github/components/activity-feed.tsx`
- `src/features/github/components/github-activity.tsx`
- `src/features/github/components/language-bar.tsx`
- `src/features/github/components/now-intro.tsx`
- `src/features/github/components/recency-indicator.tsx`
- `src/features/github/components/relative-time.tsx`
- `src/features/github/components/stat-card.tsx`
- `src/features/projects/components/project-list.tsx`

## Fact comparison

| Supplied fact | Initial state → action |
| --- | --- |
| Karan Raj KR; Founder, KĀRYO | Different name spelling and mixed founder wording → normalized; old spelling retained as a Person alias. |
| B.Tech CSE (AI/ML), NIAT–S-VYASA, Bengaluru, 2025–29 | Partial → added consistent degree, location and batch. |
| Gubbi, Tumkur; builder, winner, contributor, creator | Missing origin and incomplete identity → added. |
| Running for EDC President | Missing → added to About, current work and Person. |
| Revenue: exactly “6 figures” | Missing → added to highlights, About, KĀRYO and crawler summary. |
| 3× awards; two GRIT categories; Technology Innovators Award, 10 Aug 2026 | Awards existed; precise date/count missing → added count/date; retained categories. |
| 2× wins: Open Loop 2026 and Ideathon | Individual wins existed → added accurate aggregate; no third hackathon win. |
| Hack BLR 2026: Top 40, solo, 2,500+ teams | Already correct result → retained; normalized event name and explicit result labels. |
| OpenAI DevDay Exchange community hackathon: Top 50, Bengaluru, 10 Oct 2026 | Missing → added full event name throughout. |
| 140+ people; biggest ED Club event | Missing → added. |
| 18 merged PRs, GSSoC 2026 | Already correct → retained. |
| Open Loop: FormPilot, AI Chrome extension, Karan/Havinash/Saagnik | Team existed in details but card credit missing → credited all three consistently, including project schema. |
| Open Loop: 309 participants, 121 teams, 109 colleges, 14 states, ₹20,000, 80/100 vs 60/100 | Already correct → retained. |
| Open Loop: Yenepoya, Mangaluru, 25–26 Apr 2026 | Already present in event detail → retained and added to the event card/project. |
| VoiceRx: Vapi, FastAPI, Qdrant, Groq | Already correct → retained. |
| Ideathon winner | Already in achievements → also added to hackathons. |
| TakeOver’26: participated, 24-hour build with Havinash/Saagnik, NIAT KKH Hyderabad | Missing → added as participation. |
| SIH 2026: EdgeWake, ISRO problem, internal presentation | Missing → added as internal-round presentation. |
| Agentathon: KĀRYO Lead Intelligence Agent | Already present → retained participation and CrewAI pipeline. |
| Client Onboarding Manager: AI quotations, GST invoices, payments; Next.js/Groq/Supabase; supplied repo/live URL | Missing project; vague current-work text → added full verified project and links. |
| School ERP: ~45 routes, students/fees/exams/attendance/parent portal/Ask ERP; Next.js 15/Supabase; demo URL | Missing → added explicitly as a demo product; demo button label. |
| Eligent: opportunity discovery/autofill, in-progress prototype, Mustafa | Missing → added with collaborator credit in content/schema. |
| ISKCON Visakhapatnam: Next.js 14/Tailwind client website | Missing → added as a client project. |
| crewai-recipes: CrewAI/NVIDIA NIM, MIT, 9 forks, ECSoC admin, supplied repo | Partial achievement only → added project, stack, forks and role. |
| NeuroDesk: solo AI gym dashboard | Missing → added; no invented stack or URL. |
| VC and angel pitches; founding Aug 2025; Bengaluru outreach | Outreach/founder existed, rest missing → added. |
| Proposals, contracts, GST invoices, international-client docs | Missing → added to About/experience and agency text. |
| Documentation app used by 3 batchmates; mentoring 2–3 revenue-earning batchmates | Missing → added. |
| ED Club Finance Head last term; best-member award | Missing → added role/award; TODO for exact award title. |
| 4+ events: IPL auction, 30-minute product pitch, sponsored teams, debate | Missing → added all four event types. |
| Large-audience speaking | Missing from biography → added. |
| Instagram/LinkedIn creator; SPARK 2026 | Profiles existed; creator selection missing → added. |
| First-year Hashnode article: full title, 6 Jul 2026 | Short title and 5 Jul date → corrected. |
| Hackathon Hashnode article: 9 Jul 2026 | Already correct → retained title/date/link. |
| Google Campus Ambassador ended Jan 2026; Google Pitch Night Top Prompt Creator, both past | Roles existed without past labels → marked past; ambassador end date added. |
| Requested stack | Partial → chips and Person knowsAbout now contain every supplied tool. |
| Forbidden claims/personal details | Removed crawler “Co-founder” and mixed agency-founder wording. No prohibited revenue, event-win, school-sales or personal-detail claims added. |

Only supplied facts are used for new descriptions. Unsupported Databricks/Court Backlog records and speculative roadmap plans were removed; unsupplied engineering/performance claims in case studies were omitted. Existing external article and Open Loop links were retained, without asserting fresh verification.

## Every file changed in this task

Compared against a snapshot of the working tree at task start, rather than against HEAD (which already contained uncommitted work).

| File | Change |
| --- | --- |
| `public/llms.txt` | Verified identity, facts, projects and stack; removed co-founder claim. |
| `src/app/about/page.tsx` | Founder title, origin, degree/batch and consistent identity. |
| `src/app/achievements/page.tsx` | Normalized identity to Karan Raj KR; existing structure retained. |
| `src/app/blog/[slug]/page.tsx` | Normalized identity to Karan Raj KR; existing structure retained. |
| `src/app/blog/page.tsx` | Shorter intro and consistent identity in metadata/schema. |
| `src/app/changelog/page.tsx` | Replaced placeholder with supplied dated milestones. |
| `src/app/feed.xml/route.ts` | RSS now uses the two real publications and escapes XML. |
| `src/app/gallery/page.tsx` | Normalized identity to Karan Raj KR; existing structure retained. |
| `src/app/hackathons/open-loop-2026/page.tsx` | Team credit and verified venue/date/scale/score/prize; retained assets/links; removed unsupported details and emoji. |
| `src/app/hackathons/page.tsx` | Normalized identity to Karan Raj KR; existing structure retained. |
| `src/app/layout.tsx` | Identity and founder metadata; tracking/verification unchanged. |
| `src/app/manifest.ts` | Identity and founder metadata. |
| `src/app/projects/[slug]/page.tsx` | Collaborator schema credit; conditional detail sections; School ERP demo label. |
| `src/app/projects/page.tsx` | Normalized identity to Karan Raj KR; existing structure retained. |
| `src/app/writing/page.tsx` | Replaced placeholder with both dated Hashnode articles. |
| `src/components/gallery/gallery-view.tsx` | Normalized identity to Karan Raj KR; existing structure retained. |
| `src/components/layout/header.tsx` | Normalized identity to Karan Raj KR; existing structure retained. |
| `src/components/sections/about.tsx` | Point-form experience, leadership, creator credentials, FAQ and award TODO. |
| `src/components/sections/achievements.tsx` | All seven headline figures using existing styling. |
| `src/components/sections/contact.tsx` | Short founder/product-focused contact copy. |
| `src/components/sections/hackathon.tsx` | All seven supplied event records with accurate result labels and team credit. |
| `src/components/sections/hero-content.tsx` | Founder title and concise builder/contributor/creator identity. |
| `src/components/sections/karyo.tsx` | Founding date, founder wording, outreach, revenue and agency docs. |
| `src/components/sections/skills.tsx` | Exact supplied stack; existing chip/marquee behavior retained. |
| `src/components/seo/json-ld.tsx` | Updated Person facts, KĀRYO founding date and data-driven project list with team credit. |
| `src/data/achievements.ts` | DevDay, revenue, leadership, SPARK, award date, past labels and project-admin detail. |
| `src/data/experience.ts` | Verified entrepreneurship, leadership, candidacy, education and open source. |
| `src/data/gallery.ts` | Identity and FormPilot team credit. |
| `src/data/projects.ts` | All supplied projects, statuses, stacks, metrics and URLs; omitted unsupported details. |
| `src/data/publications.ts` | Full first-year article title, corrected date and shorter excerpt. |
| `src/data/roadmap.ts` | Replaced speculative plans with verified milestones and current Eligent prototype. |
| `src/features/github/components/activity-feed.tsx` | Removed terminal prompt symbol; activity behavior unchanged. |
| `src/features/github/components/github-activity.tsx` | Honest unavailable state and plain activity label. |
| `src/features/github/components/language-bar.tsx` | Removed terminal prompt symbol; language display unchanged. |
| `src/features/github/components/now-intro.tsx` | Verified onboarding work, Eligent status and EDC candidacy. |
| `src/features/github/lib/fallback.ts` | Removed fabricated counts, commits and recent timestamps. |
| `src/features/github/lib/types.ts` | Explicit unavailable flag for GitHub fallback. |
| `src/lib/social.ts` | Normalized identity to Karan Raj KR; existing structure retained. |
| `CONTENT_UPDATE.md` | This inventory, fact audit, file list, validation and input list. |

## Validation

- Final `npm run build`: passed, including TypeScript and static generation (28 pages).
- 14 production-route checks: passed for supplied content, JSON-LD parsing, team credits, demo labels and article title/date.
- RSS XML: parsed; both articles present.
- GA4 and Search Console wiring: compared against the starting working tree; unchanged.
- Existing fonts, global CSS, navigation structure, theme, animation components, lazy loading, dependencies, robots, canonical URLs and deployment configuration preserved.
- `npm run lint`: existing errors remain in bottom-nav-sheet, bottom-nav and not-found-content; existing unused-variable/import warnings remain. The changed About content's escaping issue was fixed. These pre-existing unrelated errors do not block the successful build.
- PageSpeed was not measured; no new dependencies, remote assets or client-side libraries were added.

## Needs your input

- Exact ED Club best-member award title. TODO remains in source; displayed as title pending.
- OpenAI DevDay Exchange community hackathon result link or screenshot. Top 50 is included based on your verified fact sheet; no evidence link was invented.
- Optional confirmed URLs for Eligent, ISKCON Visakhapatnam and NeuroDesk; stacks for Eligent/NeuroDesk if you want them displayed. None invented.
- Existing Hashnode/Dev.to and FormPilot links were retained from the repository and not independently verified.

## Subsequent requested edits

- Removed the landing hero portrait and name badge above the headline.
- Removed NeuroDesk from project listings, generated project schema/routes and the crawler summary.
- Replaced the Founder, KĀRYO experience description with the eight points supplied by Karan.
- Final build passed after these edits (27 statically generated pages).
