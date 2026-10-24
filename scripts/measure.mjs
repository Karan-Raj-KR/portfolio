// Lab measurements of the production preview: throttled phone LCP/CLS, header height, overflow.
// Usage: node scripts/measure.mjs [base] > out.json
import { chromium } from 'playwright';
const base = process.argv[2] || 'http://127.0.0.1:4400';
const paths = ['/', '/about/', '/record/', '/work/formpilot/', '/work/voicerx/', '/work/crewai-recipes/', '/work/eligent/', '/work/school-erp/', '/nope/'];
const browser = await chromium.launch();
const out = [];
for (const path of paths) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6e6 / 8 * 0.9, uploadThroughput: 750e3 / 8 * 0.9 });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.addInitScript(() => {
    window.__lcp = 0; window.__cls = 0;
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
  });
  const res = await page.goto(base + path, { waitUntil: 'load' });
  await page.waitForTimeout(2500);
  for (let y = 0; y < 6; y++) { await page.mouse.wheel(0, 700); await page.waitForTimeout(250); }
  await page.waitForTimeout(800);
  const m = await page.evaluate(() => ({
    lcp: Math.round(window.__lcp), cls: +window.__cls.toFixed(4),
    header: Math.round(document.querySelector('[data-frame]')?.getBoundingClientRect().height || 0),
    overflow: document.documentElement.scrollWidth - innerWidth,
    bytes: performance.getEntriesByType('resource').reduce((a, r) => a + (r.transferSize || 0), 0) + (performance.getEntriesByType('navigation')[0]?.transferSize || 0),
  }));
  out.push({ path, status: res.status(), ...m });
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(out, null, 1));
