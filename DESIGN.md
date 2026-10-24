# Karan Raj KR: design plan

## Current design (23 Oct 2026, product-clarity pass)

The jury's main findings were repeated sparse metric panels, awards out-weighing what the
products do, and a two-row phone header. This pass keeps the look (paper, ink, one blue,
Panchang and Switzer, the "From ideas / to real / products." hero) and changes what each part says.

- **Results, once.** The blue section under the hero states the national Open Loop win large,
  with the other results as a ledger and a link to the Record. The home page no longer has a
  separate wins section; the navbar still returns when this blue section reaches the top.
- **Products by how they work.** Each featured product pairs its idea and one-line description
  with its own mechanism set in type (`src/components/How.astro`): FormPilot's scan, preview,
  fill; VoiceRx's call path; crewai-recipes' contract as real code; Eligent's three verdicts.
  Tablet and desktop pin the sequence and play one product at a time with a chapter nav;
  phones, short landscape screens and reduced motion get the same content stacked.
- **Case studies** answer, in order: what it does and for whom, the result (once), my part,
  how it works, the problem, decisions on a blue band, the outcome with facts, and where to
  explore. FormPilot's "how it works" is an ARIA tabs walkthrough on a sample form
  (`FormWalk.astro`), labelled as an illustration; without script all three steps show.
- **KĀRYO** carries the karana line and the live clock (moved from the footer) and links to
  the three tools built for it.
- **Phone header:** one 56px row on every width down to 320px.
- **Pictures:** only real photographs of Karan (speaking portrait, Open Loop certificate). The
  certificate appears on FormPilot's outcome, the Record and About's archive, not on Home.

Content sources for the new fields (contribution, decisions, mechanisms): the FormPilot,
VoiceRx, crewai-recipes and Karyo-Agent READMEs and Karan's Open Loop write-up on Hashnode.
Eligent's source does not state Karan's own part, so its page shows the team instead.

## Previous pass (23 Oct 2026, migration)

Karan's brief: anyone who types karanrajkr.com should know within 60 seconds who he is, what he
builds and what he has won, and be impressed on the way. He likes the original look: paper
ground, Panchang display type with the blue echo. He rejected the WebGL ring field and the
forecast-cursor line, the giant name as the hero, every project picture (screenshots, diagrams,
generated figures, found pictures), the cluttered timeline, and a first redesign that swapped
Panchang for a plain sans on a blue field.

- **Hero:** his own line from karanrajkr.com, "From ideas to real products.", in Panchang with the
  blue echo, stepped over three lines (a deliberate exception to the taste skill's two-line rule).
  Under it, who he is in one sentence and his roles.
- **Idea:** blue is the idea, ink is the thing that shipped, and the ink always follows the blue.
- **Signature interaction (replaces the rings):** "From ideas to real products", a pinned scroll
  scene at every screen width. Each featured project arrives as its idea in blue, its name lands in blue
  and the ink wipes in over it, then the result and a blue panel with its one figure. Phones use
  a compact vertical composition and landscape uses a side-by-side layout. Reduced motion keeps
  the stacked list. Nothing follows the pointer except the hero echo's small lean.
- **Order:** hero → four figures on blue → the idea-to-product scene and an "Also built" index →
  wins on ink with the certificate → KĀRYO (Panchang with echo) → about with the portrait → open
  source and writing → one-line idea form → footer with "Let's build something." in Panchang.
- **Pictures:** only real photographs of Karan (portrait, Open Loop certificate). The inspector's
  four-picture floor is waived at his request. About's archive links to the preserved FormPilot
  architecture file as a reference; project pictures do not return to the work sequence.
- **Migration:** all 20 old public pages have corresponding content or legacy destinations.
  About carries full profile links, writing summaries and the media archive; Record carries dated
  updates. Quiet section navigation and footer links make those areas discoverable.

The rest of this file is the original plan, kept for history.


## Brief

- **Subject:** Karan Raj (name taken from the owner's account handle). Independent designer and
  creative developer (assumed: no profession was given).
- **Audience:** studios, founders and teams hiring someone who builds interfaces; peers.
- **Job:** get hired / get booked. The owner's one instruction: it should feel like they are
  way ahead of everyone else for their time.
- **Assets:** none. Projects, bio, email and socials are placeholders (`placeholder: true` in
  `src/data/site.ts`).
- **Language:** English.

## Concepts

| | A. Lead time (material: interfaces) | B. Karana (name) | C. Release candidate (material: software) |
|---|---|---|---|
| Idea | The site runs one beat ahead of you: every element casts a blue forecast of where it is going, and the ink follows it there | *Karan*, read as *karana*, is a unit of time in the Panchang, the Hindu almanac that computes the future to the minute. The site is an almanac | The site is a build from the future: version numbers, a changelog dated ahead |
| Anchor | the brief ("way ahead"), and a craft (interfaces) that is literally about anticipating people | the name is a slice of time; the almanac predicts | software versions |
| Signature | a forecast cursor: a line projects where the pointer will be in 0.45 s, and anything on that path wakes up before you reach it | a live table of the coming karanas, computed in the browser | a scrubbable changelog |
| O / F / Fe / P | 5 / 4 / 4 / 3 | 4 / 4 / 3 / 1 | 2 / 3 / 5 / 4 |

**Pick A**, built on B's anchor. A gives the full rule system (hover, reveal, transition, loader
all become "forecast first, fact second"); B makes it impossible to move to anyone else: the
name is a unit of time, the display face is called Panchang, and the site shows real, computed
future times. C is dropped: future-dated versions would be fake facts.

## Concept card

```
Idea:        A site that is always a step ahead of you: blue is where things are going, ink is where they are.
Metaphor:    the almanac / forecast. Tables that know the future, fan charts, isochrones.
Signature:   the forecast cursor. A blue line projects the pointer 0.45 s ahead; whatever sits on the
             forecast point wakes up (blue) before you arrive, then settles into ink when you do.
             Touch: a scroll forecast rail marks where your flick will land.
Emotion:     the first 3 seconds feel like the page already knew you were coming.
Motion verb: lead and follow. Blue arrives first, ink follows into it. Always forward (left to right).
Screenshot:  KARAN RAJ at full width, its blue forecast a few pixels ahead of the ink, and a blue
             forecast line running out ahead of the pointer.
```

## Art direction

### Palette (by role)

| Role | Hex | Source |
|---|---|---|
| ground | `#ECEDEF` | cool almanac paper (not cream) |
| ink | `#0C0D10` | the present tense |
| muted | `#53575F` | secondary text, 6.3:1 on ground |
| line | `rgb(12 13 16 / 0.14)` | hairlines, table rules |
| forecast (accent) | `#1F35FF` | ephemeris blue: everything that has not happened yet. 6.0:1 on ground |
| curtain | `#1F35FF` then ink | transitions lead in blue, ink follows |

Rule: blue only ever means "ahead" (forecast lines, predicted states, the next karana, focus,
the transition's leading panel). Never decoration.

### Type

- **Display:** Panchang 800 (Fontshare). Ultra-wide, architectural, and named after the almanac.
  Uppercase only, mega size, tracking -0.04em, leading 0.86.
- **Text and UI:** Switzer 400/500 (Fontshare). Body 17 px / 1.55, UI 13 px.
- **Data:** Martian Mono 400, only for computed values (times, offsets, the forecast label,
  table figures). Never for decorative labels.
- Scale: mega `clamp(3.4rem, 0.6rem + 12.4vw, 15rem)`, xl, l, m, body, s, xs (tokens.css).

### Grid and rhythm

- 12 columns, fluid gutter. Three hang lines: col 1, col 5, col 9. Every text block starts on one.
- Section rhythm: hero full viewport; statement airy (28u); work tight rows; almanac normal (16u);
  about airy; footer full viewport, inverted.
- Shape: radius 0 everywhere. Circles appear only as forecast marks (the ring, the dots).

### Motion language

- Ease family: expo (engine `ease`). Hovers 0.35 to 0.5 s, reveals 1.1 to 1.3 s, transitions 0.9 s.
- Lead and follow in practice:
  - **Reveals:** text lines rise in forecast blue and settle into ink.
  - **Hover (two stage):** foreseen (the forecast point is on it) → a blue ghost moves ahead;
    hovered → the ink moves into the ghost's place. Keyboard focus shows the final state.
  - **Page transition:** a blue panel sweeps in from the left, ink follows it; on enter ink leaves
    first, blue last, always moving right (forward).
  - **Loader:** a blue field counting to 100 while the almanac is computed; it exits to the right
    and its counter lands where the corner clock lives.
- Idle: the hero's blue forecast drifts slightly ahead of the ink; the GL isochrones expand from
  the forecast point; the corner clock counts down to the next karana.

### Composition plan

```
HOME
┌ Karan Raj ─────────────────────────── Work About Contact ┐   four-corner frame
│                                                           │
│ Designer and creative developer.         (GL isochrones)  │
│ I build interfaces that are ready                         │
│ before you are.                                           │
│ KARAN                                                     │   POSTER: name as image,
│ RAJ ░(blue forecast echo ahead)                           │   echo leads the ink
└ Scroll                    Now: Taitila · Gara in 02:14:09 ┘

STATEMENT (manifesto, cols 5 to 12, t-l)
            Most screens wait for you to act. ...

WORK (index as forecast table)
 No.  Project              Field              Year
 01   Tidewatch            Product design      2026   → preview floats at the FORECAST point
 02   Platform Zero        Interface system    2025
 ...

ALMANAC (data family: live table, sticky intro left, table right)
 | Named after a unit of time      | Karana     Begins        |
 | copy on the Panchang            | Gara       Tue 14:32  ●  |
 |                                 | Vanija     Wed 02:51     |

ABOUT (asymmetric pair: big statement cols 1 to 7, bio + services cols 9 to 12)

FOOTER (finale, inverted ink field): "Write to me first." mega email, links, colophon, clock

CASE PAGE: title poster + meta row → hero forecast figure (full width) → context / idea (pair)
           → craft figures (gallery wall, 3, captioned) → outcome → next project (blue wipe)
ABOUT PAGE: statement poster → bio pair → services list → how I work (sticky narrative)
404: "This page hasn't happened yet." Forecast: none. Link home.
```

### Genericness test

- A generic model would give "ahead of time" a black page, neon gradient and a glitch effect.
  Changed: light cool paper, one blue with one meaning, wide architectural type.
- A generic forecast cursor would be a trailing follower dot. Changed: it leads (prediction),
  and it changes what the page does (pre-activation), so it is a function, not a decoration.
- A generic project grid of three cards. Changed: a forecast table whose preview appears where
  your pointer is going.
- Covers would be fbm blobs. Changed: SVG fan charts (forecast cones) seeded per project, which
  are honest generative figures, on concept and weigh nothing.
- Mono for every label. Changed: mono only for computed values.

## Build notes

- Stack: Astro (content-only showcase, motion is the product, minimal JS).
- Driver: `src/motion/forecast.ts` owns the forecast point (pointer + velocity → +0.45 s); the
  GL isochrones, the hero echo, pre-activation and the work preview all read it.
- Almanac: `src/motion/almanac.ts`, a truncated Meeus lunar/solar series; karana boundaries
  found by bisection on the moon/sun elongation (accurate to a few minutes).
- Reduced motion: no GL, no forecast line, no echo drift; the static rings are a CSS fallback;
  hovers keep ink underline/colour states.

---

## Redesign pass, 21 Oct 2026 (jury fixes + taste skill + awwwards QA)

Inputs: the jury scorecard (.jury/127.0.0.1-4400/scorecard-2.md, critic 7.7) and the
design-taste-frontend run (.taste-skill/notes.md, sheet.md, critique.md).

- **Direction dealt:** `type-only-statement` ("Type and nothing else"), seed 367136197, palette and
  type kept from the brand. Chosen because the idea's anchor is the name itself.
- **Redraws:** hero blueprint ("controls on the sentence" needs a variable display face; Panchang is
  static), then the direction's own composition was used over the second hero blueprint, which it
  outranks. Work section: book-spine index (20 to 40 names) swapped for "big names, fixed preview"
  (eight projects with real screens), which also removes the preview-over-text overlap the jury
  ranked first.
- **Idea sentence:** On this page, the name (Karan, a karana: half a lunar day) becomes a page dated
  against a live now, where black is done and blue is next.
- **Live thing:** the karana table and clock computed in the browser, and the forecast cursor that
  wakes what you are heading for (the work frame switches to the project you are heading toward).
- **House rules applied:** no monospace (Martian Mono removed), no index numbers, no hairlines,
  gradients or shadows (tone steps and space instead), no eyebrows, headings two lines or fewer at
  every width, statements 36px or less, a real button on the first screen, at least four real
  pictures on every page, one honest moving picture (the moon), title painted on the first frame
  (CSS masked rise; the loader is gone).
- **Type steps:** display (name), title (project names, case titles), lead (headings, statements),
  body, small; a note size for captions. Panchang only for the name and KĀRYO; Switzer for the rest.
- **Found pictures (credited in the footer):** Maithili Panchang (CC BY-SA 4.0), Lunar libration Oct
  2007 (CC0), Tumkur Countryside (CC BY-SA 3.0), bangalore market street (CC BY 2.0).
- **Transition:** a ring opens from the clicked point (blue, then ink with the destination), and
  closes back into it on the new page.
