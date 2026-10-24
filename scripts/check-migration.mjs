// Build first. Exercises the built site under the configured security policy without
// contacting Google, Vercel or GitHub. It does not prove receipt in an analytics dashboard.
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { chromium, webkit } from 'playwright';
import { legacyRoutes, legacyAssets } from '../src/data/legacy-routes.mjs';

const root = resolve('dist');
const origin = 'https://www.karanrajkr.com';
const config = JSON.parse(await readFile('vercel.json', 'utf8'));
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const analytics = JSON.parse(html.match(/<script[^>]+id="portfolio-analytics"[^>]*>([^<]+)<\/script>/)[1]);
assert.equal(analytics.origin, origin);
assert.equal(analytics.enabled, true, 'Run this check against a normal production build.');
assert.match(analytics.id, /^G-[A-Z0-9]+$/);
assert.equal((html.match(/name="google-site-verification"/g) || []).length, 1);
assert.equal(config.framework, 'astro');
assert.equal(config.outputDirectory, 'dist');
assert.equal(config.buildCommand, 'npm run build');
assert.ok(config.headers.some((r) => r.has?.some((h) => h.type === 'host') && r.headers.some((h) => h.key === 'X-Robots-Tag' && /noindex/.test(h.value))));
const headers = Object.fromEntries(config.headers.find((r) => !r.has).headers.map((h) => [h.key, h.value]));
assert.ok(headers['Content-Security-Policy'].includes('https://mail.google.com'));
assert.ok(headers['Content-Security-Policy'].includes('https://api.github.com'));
assert.ok(!headers['Content-Security-Policy'].includes('unsafe-eval'));
for (const [source, destination] of Object.entries({ ...legacyRoutes, ...legacyAssets })) {
  for (const variant of [source, ...(!source.split('/').at(-1).includes('.') ? [source + '/'] : [])]) {
    assert.ok(config.redirects.some((r) => r.source === variant && r.destination === destination && r.permanent), `Missing redirect: ${variant}`);
  }
  const [path, hash] = destination.split('#');
  const file = resolve(root, '.' + path, path.endsWith('/') ? 'index.html' : '');
  assert.ok(existsSync(file), `Missing legacy destination: ${destination}`);
  if (hash) assert.ok((await readFile(file, 'utf8')).includes(`id="${hash}"`), `Missing legacy anchor: ${destination}`);
}
const bing = await readFile(resolve(root, 'BingSiteAuth.xml'), 'utf8');
assert.ok(bing.includes('B3FEA252606E5D9B50A4BEA367942AFB'));
const manifest = JSON.parse(await readFile(resolve(root, 'manifest.webmanifest'), 'utf8'));
for (const icon of manifest.icons) assert.ok(existsSync(resolve(root, '.' + icon.src)));
const llms = await readFile(resolve(root, 'llms.txt'), 'utf8');
assert.ok(!/mustafa|gubbi|tumkur|stack\s?overflow|telegram|facebook|\bspark\b/i.test(llms), 'Old public copy returned in llms.txt');
assert.ok(llms.includes('I built all of it'));
for (const name of await readdir(resolve(root, '_astro'))) {
  if (name.endsWith('.js')) assert.ok(!(await readFile(resolve(root, '_astro', name), 'utf8')).includes('GITHUB_TOKEN'), 'Server-only token variable appears in a client script');
}
console.log('Static: framework, security headers, verification, manifest, corrected llms.txt and all legacy URLs pass.');

const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json', '.ico': 'image/x-icon' };

async function routeBuild(context, requests) {
  await context.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.hostname === 'www.googletagmanager.com') {
      requests.push('google');
      return route.fulfill({ contentType: 'text/javascript', body: 'window.__googleScriptLoaded = true;' });
    }
    if (url.pathname.startsWith('/_vercel/insights/')) {
      requests.push('vercel');
      return route.fulfill({ contentType: 'text/javascript', body: 'window.__vercelScriptLoaded = true;' });
    }
    if (url.hostname === 'api.github.com') return route.fulfill({ json: [] });
    if (url.hostname === 'mail.google.com') return route.fulfill({ contentType: 'text/html', body: '<title>Intercepted email draft</title>' });
    assert.ok(['www.karanrajkr.com', 'localhost', 'portfolio-review.vercel.app'].includes(url.hostname), `Unexpected external request: ${url.origin}`);
    let file = resolve(root, '.' + decodeURIComponent(url.pathname));
    if (url.pathname.endsWith('/')) file = resolve(file, 'index.html');
    if (!existsSync(file)) return route.fulfill({ status: 404, headers, contentType: 'text/html', body: await readFile(resolve(root, '404.html')) });
    return route.fulfill({ headers, contentType: mime[extname(file)] || 'application/octet-stream', body: await readFile(file) });
  });
}

for (const [name, engine] of Object.entries({ chromium, webkit })) {
  const browser = await engine.launch();
  const requests = [];
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  await routeBuild(context, requests);
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.addInitScript(() => {
    window.__policyViolations = [];
    document.addEventListener('securitypolicyviolation', (e) => window.__policyViolations.push(`${e.violatedDirective}: ${e.blockedURI}`));
  });
  await page.goto(origin + '/', { waitUntil: 'networkidle' });
  const views = (count) => page.waitForFunction((n) => window.vaq?.filter((a) => a[0] === 'pageview').length === n, count);
  await views(1);
  assert.deepEqual(await page.locator('[data-shift-link]').allTextContents(), ['FormPilot', 'Eligent', 'VoiceRx', 'crewai-recipes']);
  assert.equal(await page.locator('.footer__meta').textContent(), '© 2026 Karan Raj KR.');
  await page.locator('.frame__nav a[href="/about/"]').click();
  await page.waitForURL(origin + '/about/'); await page.waitForLoadState('networkidle');
  await views(2);
  await page.locator('.frame__nav a[href="/record/"]').click();
  await page.waitForURL(origin + '/record/'); await page.waitForLoadState('networkidle');
  await views(3);
  await page.goBack(); await page.waitForURL(origin + '/about/'); await page.waitForLoadState('networkidle');
  await views(4);
  await page.goForward(); await page.waitForURL(origin + '/record/'); await page.waitForLoadState('networkidle');
  await views(5);
  assert.deepEqual(requests, ['google', 'vercel'], 'SDKs should load once across client navigation');
  const data = await page.evaluate(() => ({
    ga: window.dataLayer.map((a) => Array.from(a)),
    views: window.vaq.filter((a) => a[0] === 'pageview').map((a) => a[1].path),
    violations: window.__policyViolations,
  }));
  assert.equal(data.ga.filter((a) => a[0] === 'config').length, 1);
  assert.equal(data.ga.filter((a) => a[0] === 'event' && a[1] === 'page_view').length, 0, 'Manual page views would duplicate GA enhanced history measurement');
  assert.deepEqual(data.views, ['/', '/about/', '/record/', '/about/', '/record/']);
  assert.deepEqual(errors, []);
  assert.deepEqual(data.violations, []);
  const xml = await page.evaluate(async () => {
    const feed = new DOMParser().parseFromString(await (await fetch('/feed.xml')).text(), 'application/xml');
    return { errors: feed.querySelectorAll('parsererror').length, items: feed.querySelectorAll('item').length };
  });
  assert.deepEqual(xml, { errors: 0, items: 2 });
  await context.close();

  for (const host of ['http://localhost:4410', 'https://portfolio-review.vercel.app']) {
    const quiet = await browser.newContext({ reducedMotion: 'reduce' });
    const reqs = [];
    await routeBuild(quiet, reqs);
    const p = await quiet.newPage();
    await p.goto(host + '/', { waitUntil: 'networkidle' });
    assert.deepEqual(reqs, [], `${host} loaded a production analytics SDK`);
    assert.equal(await p.evaluate(() => Boolean(window.gtag || window.va)), false);
    await quiet.close();
  }

  const native = await browser.newContext({ javaScriptEnabled: false });
  await routeBuild(native, []);
  const p = await native.newPage();
  await p.goto(origin + '/');
  await p.locator('[name="body"]').fill('Migration test only: a & b. No email is sent.');
  await p.locator('.ask__send').click();
  await p.waitForURL('https://mail.google.com/**');
  assert.equal(new URL(p.url()).searchParams.get('body'), 'Migration test only: a & b. No email is sent.');
  await native.close();
  await browser.close();
  console.log(`${name}: analytics initialize once; Vercel views follow routes and history; local/preview stay untracked; RSS and native Gmail form pass under CSP. All external scripts were mocked.`);
}
