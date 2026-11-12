// Regenerate the checked-in social preview with `npm run generate:og`.
// This runs locally; production builds do not need a browser installation.
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { site, projects } from '../src/data/site.ts';

const asset = async (path, mime) => `data:${mime};base64,${(await readFile(new URL(path, import.meta.url))).toString('base64')}`;
const [display, body, portrait] = await Promise.all([
  asset('../public/fonts/panchang-800-normal.woff2', 'font/woff2'),
  asset('../public/fonts/switzer-500-normal.woff2', 'font/woff2'),
  asset('../public/media/karan-portrait-600.webp', 'image/webp'),
]);
const escape = (value) => value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
    @font-face { font-family: Panchang; src: url('${display}'); font-weight: 800; }
    @font-face { font-family: Switzer; src: url('${body}'); font-weight: 500; }
    * { box-sizing: border-box; margin: 0; }
    body { width: 1200px; height: 630px; background: #ecedef; color: #0c0d10; font: 500 24px/1.35 Switzer; padding: 44px 48px; }
    header { display: flex; justify-content: space-between; align-items: center; }
    main { display: grid; grid-template-columns: 1fr 270px; align-items: center; gap: 48px; margin-top: 48px; }
    h1 { font: 800 88px/1.08 Panchang; letter-spacing: -0.03em; text-transform: uppercase; }
    h1 span { display: block; position: relative; isolation: isolate; }
    h1 span::before { content: attr(data-text); position: absolute; inset: 0; color: #1f35ff; translate: 4px 0; z-index: -1; }
    p { margin-top: 24px; font-size: 27px; line-height: 1.45; }
    img { display: block; width: 270px; height: 360px; object-fit: cover; }
    footer { margin-top: 34px; color: #1f35ff; font-size: 22px; }
  </style></head><body>
    <header><span>${escape(new URL(site.url).hostname)}</span><span>Bengaluru, India</span></header>
    <main><div><h1 aria-label="${escape(site.name)}"><span data-text="Karan">Karan</span><span data-text="Raj KR">Raj KR</span></h1>
    <p>${escape(site.role)}<br>Open-source maintainer</p></div><img src="${portrait}" alt="Karan Raj KR speaking in public"></main>
    <footer>From ideas to real products.</footer>
  </body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.locator('img').evaluate((img) => img.decode());
  const fits = await page.evaluate(() => document.documentElement.scrollWidth === 1200 && document.documentElement.scrollHeight === 630);
  if (!fits) throw new Error('Social preview exceeds the 1200 × 630 canvas');
  await page.screenshot({ path: fileURLToPath(new URL('../public/og.png', import.meta.url)) });
  console.log('Generated public/og.png (1200 × 630)');

  // One card per case study, so a shared project link previews the project and not the home page.
  await mkdir(new URL('../public/og/', import.meta.url), { recursive: true });
  for (const project of projects) {
    const size = project.title.length > 16 ? 60 : project.title.length > 10 ? 84 : 112;
    await page.setContent(`<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
      @font-face { font-family: Panchang; src: url('${display}'); font-weight: 800; }
      @font-face { font-family: Switzer; src: url('${body}'); font-weight: 500; }
      * { box-sizing: border-box; margin: 0; }
      body { width: 1200px; height: 630px; background: #ecedef; color: #0c0d10; font: 500 24px/1.35 Switzer; padding: 44px 48px; display: flex; flex-direction: column; }
      header, footer { display: flex; justify-content: space-between; align-items: center; }
      main { flex: 1; display: flex; flex-direction: column; justify-content: center; }
      .kind { color: #1f35ff; font-size: 26px; text-transform: uppercase; letter-spacing: 0.06em; }
      h1 { margin-top: 18px; font: 800 ${size}px/1.08 Panchang; letter-spacing: -0.03em; word-spacing: 0.18em; text-transform: uppercase; position: relative; isolation: isolate; width: fit-content; max-width: 100%; }
      h1::before { content: attr(data-text); position: absolute; inset: 0; color: #1f35ff; translate: 4px 0; z-index: -1; }
      p { margin-top: 26px; font-size: 32px; line-height: 1.4; max-width: 940px; }
      footer { font-size: 22px; } footer span:last-child { color: #1f35ff; }
    </style></head><body>
      <header><span>${escape(new URL(site.url).hostname)}</span><span>${escape(project.result)}</span></header>
      <main><span class="kind">${escape(project.kind)}</span><h1 data-text="${escape(project.title)}">${escape(project.title)}</h1><p>${escape(project.line)}</p></main>
      <footer><span>${escape(site.name)}, ${escape(site.role)}</span><span>From ideas to real products.</span></footer>
    </body></html>`);
    await page.evaluate(() => document.fonts.ready);
    const ok = await page.evaluate(() => document.documentElement.scrollWidth === 1200 && document.documentElement.scrollHeight === 630);
    if (!ok) throw new Error(`Social preview for ${project.slug} exceeds the 1200 × 630 canvas`);
    await page.screenshot({ path: fileURLToPath(new URL(`../public/og/${project.slug}.png`, import.meta.url)) });
  }
  console.log(`Generated ${projects.length} project previews in public/og/`);
} finally {
  await browser.close();
}
