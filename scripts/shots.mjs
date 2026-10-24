// Viewport screenshots down a page at several widths, for visual review.
// Usage: node scripts/shots.mjs <base> <outdir> <path> [widths=1440,390] [--reduce]
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const [base, out, path = '/', widthsArg = '1440,390'] = process.argv.slice(2);
const reduce = process.argv.includes('--reduce');
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
for (const w of widthsArg.split(',').map(Number)) {
  const h = w < 600 ? 844 : w < 1100 ? 1024 : 900;
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: reduce ? 'reduce' : 'no-preference', isMobile: w < 600, hasTouch: w < 600 });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.goto(base + path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const name = path.replace(/\W+/g, '-').replace(/^-|-$/g, '') || 'home';
  let i = 0;
  for (let y = 0; y < total && i < 40; y += Math.round(h * 0.85), i++) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    // Lenis may own scrolling; nudge with the wheel too
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${out}/${name}-${w}-${String(i).padStart(2, '0')}.png` });
  }
  const m = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth - innerWidth, header: document.querySelector('[data-frame]')?.getBoundingClientRect().height }));
  console.log(name, w, 'shots', i, 'height', total, JSON.stringify(m), errors.length ? 'ERRORS ' + errors.join(' | ') : '');
  await ctx.close();
}
await browser.close();
