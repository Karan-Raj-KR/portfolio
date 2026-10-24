// Geometry at many widths: page overflow, elements past the right edge, header on one row,
// heading line counts. node scripts/check-responsive.mjs [base]
import { chromium } from 'playwright';
const base = process.argv[2] || 'http://localhost:4321';
const paths = ['/', '/about/', '/record/', '/work/formpilot/', '/work/client-onboarding-manager/', '/work/lead-intelligence-agent/', '/work/iskcon-visakhapatnam/', '/no-such-page/'];
const sizes = [[320, 640], [375, 812], [390, 844], [430, 932], [768, 1024], [1024, 768], [1440, 900], [1920, 1080], [844, 390]];
const browser = await chromium.launch();
let bad = 0;
for (const [w, h] of sizes) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce', isMobile: w < 600, hasTouch: w < 900 && h < 600 || w < 600 });
  for (const path of paths) {
    const page = await ctx.newPage();
    await page.goto(base + path, { waitUntil: 'networkidle' });
    const r = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const out = [];
      for (const el of document.querySelectorAll('main *, header *, footer *')) {
        if (el.closest('pre, astro-dev-toolbar, .sr-only, [hidden]')) continue;
        const b = el.getBoundingClientRect();
        if (b.width && b.right > vw + 1) out.push(`${el.tagName}.${String(el.className).split(' ')[0]} right ${Math.round(b.right)}`);
      }
      const links = [...document.querySelectorAll('[data-frame] a')].filter((a) => a.offsetParent);
      const tops = new Set(links.map((a) => Math.round(a.getBoundingClientRect().top + a.offsetHeight / 2)));
      const lh = (el) => { const cs = getComputedStyle(el); const l = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2; return Math.round(el.getBoundingClientRect().height / l); };
      const heads = [...document.querySelectorAll('main h1, main h2, main h3')].filter((x) => x.offsetParent && !x.closest('.sr-only')).map((x) => [x.textContent.trim().slice(0, 30), lh(x)]).filter(([, n]) => n > 2);
      return { overflow: document.documentElement.scrollWidth - vw, out: out.slice(0, 4), header: Math.round(document.querySelector('[data-frame]').getBoundingClientRect().height), headerRows: tops.size, heads };
    });
    const issues = [];
    if (r.overflow > 0) issues.push(`overflow ${r.overflow}`);
    if (r.out.length) issues.push(`past edge: ${r.out.join(', ')}`);
    if (r.headerRows > 1) issues.push(`header rows ${r.headerRows}`);
    if (r.heads.length) issues.push(`3+ line headings: ${r.heads.map((x) => x.join(':')).join(', ')}`);
    if (issues.length) { bad++; console.log(`${w}x${h} ${path} header ${r.header}: ${issues.join(' | ')}`); }
    await page.close();
  }
  await ctx.close();
}
await browser.close();
console.log(bad ? `${bad} page/size combinations with issues` : 'no responsive issues');
