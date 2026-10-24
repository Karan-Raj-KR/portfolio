// axe-core on every route at desktop and phone, plus a keyboard walk that checks each focused
// element is visible, has a focus indicator, and is not hidden behind the fixed header.
// node scripts/check-a11y.mjs [base]
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const axe = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const base = process.argv[2] || 'http://localhost:4321';
const paths = process.env.PATHS ? process.env.PATHS.split(',') : ['/', '/about/', '/record/', '/work/formpilot/', '/work/voicerx/', '/work/crewai-recipes/', '/work/eligent/', '/work/client-onboarding-manager/', '/work/school-erp/', '/work/lead-intelligence-agent/', '/work/iskcon-visakhapatnam/', '/no-such-page/'];
const browser = await chromium.launch();
let serious = 0;
for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  for (const reduced of [false, true]) {
    if (reduced && vp.width === 390) continue;
    const ctx = await browser.newContext({ viewport: vp, reducedMotion: reduced ? 'reduce' : 'no-preference' });
    for (const path of paths) {
      const page = await ctx.newPage();
      await page.goto(base + path, { waitUntil: 'networkidle' });
      await page.waitForFunction(() => document.documentElement.classList.contains('is-booted'));
      // let reveals finish so axe sees final colours
      for (let y = 0; y < 30; y++) { await page.mouse.wheel(0, 600); await page.waitForTimeout(60); }
      await page.waitForTimeout(1500);
      await page.addScriptTag({ content: axe });
      const res = await page.evaluate(async () => {
        const r = await window.axe.run(document, { exclude: [['astro-dev-toolbar']], runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] });
        return { v: r.violations.map((v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, t: v.nodes.slice(0, 3).map((n) => n.target.join(' ') + ' :: ' + (n.failureSummary || '').split('\n')[1]) })), inc: r.incomplete.filter((x) => x.id === 'color-contrast').reduce((a, x) => a + x.nodes.length, 0) };
      });
      // keyboard walk from the top
      await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(300);
      await page.keyboard.press('Tab');
      const first = await page.evaluate(() => document.activeElement?.className);
      const problems = [];
      for (let i = 0; i < 80; i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(reduced ? 30 : 450);
        const f = await page.evaluate(() => {
          const el = document.activeElement;
          if (!el || el === document.body) return null;
          if (el.closest('astro-dev-toolbar')) return { skip: true };
          const r = el.getBoundingClientRect();
          const cs = getComputedStyle(el);
          const head = document.querySelector('[data-frame]');
          const hb = head && getComputedStyle(head).position === 'fixed' && !head.contains(el) ? head.getBoundingClientRect().bottom : 0;
          const outline = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0;
          return { tag: el.tagName, cls: String(el.className).slice(0, 40), text: (el.textContent || '').trim().slice(0, 30), top: Math.round(r.top), bottom: Math.round(r.bottom), h: Math.round(r.height), w: Math.round(r.width), hb: Math.round(hb), outline, vh: innerHeight };
        });
        if (!f || f.skip) continue;
        if (f.bottom <= f.hb + 2) problems.push(`obscured by header: ${f.tag}.${f.cls} "${f.text}" top ${f.top} header ${f.hb}`);
        if (f.top > f.vh || f.bottom < 0) problems.push(`offscreen: ${f.tag}.${f.cls} "${f.text}" ${f.top}`);
        if (!f.outline) problems.push(`no outline: ${f.tag}.${f.cls} "${f.text}"`);
        if (f.h < 24 || f.w < 24) problems.push(`small target ${f.w}x${f.h}: ${f.tag}.${f.cls} "${f.text}"`);
      }
      const s = res.v.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      serious += s.length;
      console.log(`${vp.width}${reduced ? ' reduced' : ''} ${path}: ${res.v.length} violations (${s.length} serious), contrast needs-review ${res.inc}, first tab: ${first}`);
      res.v.forEach((v) => console.log('   ', v.impact, v.id, v.n, v.t.join(' | ')));
      [...new Set(problems)].slice(0, 8).forEach((p) => console.log('    kb:', p));
      await page.close();
    }
    await ctx.close();
  }
}
await browser.close();
console.log('serious/critical total:', serious);
