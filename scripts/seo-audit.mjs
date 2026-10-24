// Static SEO and content audit over dist/. Run after `npm run build`:
//   node scripts/seo-audit.mjs            (expects https://www.karanrajkr.com, or SITE_URL)
// Exits 1 on any failure; warnings are printed but do not fail the run.
import { readFile, readdir } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { legacyRoutes } from '../src/data/legacy-routes.mjs';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const origin = new URL(process.env.SITE_URL || 'https://www.karanrajkr.com').origin;
const failures = [];
const warnings = [];
const fail = (where, msg) => failures.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

if (!existsSync(root)) { console.error('dist/ not found. Run npm run build first.'); process.exit(1); }

// ---------- helpers ----------
async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(p)); else out.push(p);
  }
  return out;
}
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'");
function attrs(tag) {
  const a = {};
  for (const m of tag.matchAll(/([^\s=/<>"']+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
    if (m.index === 0) continue; // tag name
    a[m[1].toLowerCase()] = decode(m[2] ?? m[3] ?? m[4] ?? '');
  }
  return a;
}
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}(?=[\\s>/])[^>]*>`, 'gi'))].map((m) => attrs(m[0]));
const meta = (html, key, val) => tags(html, 'meta').find((t) => t[key] === val)?.content;
const stripTags = (s) => decode(s.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const pathOf = (file) => '/' + relative(root, file).split(sep).join('/').replace(/index\.html$/, '').replace(/\.html$/, '/');
function resolveFile(pathname) {
  const p = decodeURIComponent(pathname);
  const direct = join(root, p);
  if (existsSync(direct) && statSync(direct).isFile()) return direct;
  const idx = join(root, p, 'index.html');
  if (existsSync(idx)) return idx;
  return null;
}
function pngSize(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47) return null;
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

// ---------- collect ----------
const files = await walk(root);
const htmlFiles = files.filter((f) => f.endsWith('.html')).sort();
const pages = new Map(); // path -> { file, html, ids:Set, kind }
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const ids = new Set([...html.matchAll(/\sid=(?:"([^"]+)"|'([^']+)'|([^\s>]+))/g)].map((m) => decode(m[1] ?? m[2] ?? m[3])));
  const isStub = /<meta http-equiv="refresh"/i.test(html) && !/<main[\s>]/i.test(html);
  const path = file === join(root, '404.html') ? '/404/' : pathOf(file);
  pages.set(path, { file, html, ids, kind: isStub ? 'stub' : path === '/404/' ? '404' : 'page' });
}

const normLegacy = Object.fromEntries(Object.entries(legacyRoutes).map(([k, v]) => [k.replace(/\/?$/, '/'), v]));
const titles = new Map();
const descriptions = new Map();
const indexable = new Set();
const forbidden = [
  [/mustafa/i, 'Mustafa'], [/gubbi/i, 'Gubbi'], [/tumkur/i, 'Tumkur'], [/stack\s?overflow/i, 'Stack Overflow'],
  [/telegram|t\.me\//i, 'Telegram'], [/facebook|fb\.com/i, 'Facebook'], [/\bSPARK\b/i, 'SPARK'], [/\bforecast/i, 'forecast'],
  [/localhost|127\.0\.0\.1|\[::1\]/i, 'local host'],
];

// ---------- per-page checks ----------
for (const [path, { file, html, kind }] of pages) {
  const where = relative(root, file);
  const head = html.split(/<\/head>/i)[0];

  if (kind === 'stub') {
    const target = normLegacy[path];
    if (!target) { fail(where, 'redirect stub with no entry in legacy-routes.mjs'); continue; }
    const refresh = meta(head, 'http-equiv', 'refresh') ?? '';
    const robots = meta(head, 'name', 'robots') ?? '';
    const canonical = tags(head, 'link').find((t) => t.rel === 'canonical')?.href;
    if (!/noindex/.test(robots)) fail(where, 'redirect stub is not noindex');
    if (!refresh.endsWith(`url=${target}`)) fail(where, `refresh "${refresh}" does not point to ${target}`);
    if (canonical !== new URL(target, origin).href) fail(where, `canonical ${canonical} != ${new URL(target, origin).href}`);
    continue;
  }

  // Title and description
  const title = decode(head.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? '').trim();
  const desc = meta(head, 'name', 'description') ?? '';
  if (!title) fail(where, 'missing <title>');
  else if (title.length > 65) warn(where, `title is ${title.length} chars (may truncate): "${title}"`);
  else if (title.length < 15) warn(where, `title is short (${title.length}): "${title}"`);
  if (!desc) fail(where, 'missing meta description');
  else if (desc.length < 70 || desc.length > 170) warn(where, `description is ${desc.length} chars`);
  if (titles.has(title)) fail(where, `duplicate title with ${titles.get(title)}`); else titles.set(title, where);
  if (descriptions.has(desc)) fail(where, `duplicate description with ${descriptions.get(desc)}`); else descriptions.set(desc, where);

  // Headings
  const headings = [...html.matchAll(/<h([1-6])[\s>]/gi)].map((m) => Number(m[1]));
  const h1s = headings.filter((h) => h === 1).length;
  if (h1s !== 1) fail(where, `${h1s} <h1> elements (expected 1)`);
  if (headings[0] !== 1) warn(where, `first heading is h${headings[0]}, not h1`);
  for (let i = 1; i < headings.length; i++) {
    if (headings[i] > headings[i - 1] + 1) warn(where, `heading skips h${headings[i - 1]} -> h${headings[i]} (heading #${i + 1})`);
  }

  // Canonical / robots
  const canonical = tags(head, 'link').find((t) => t.rel === 'canonical')?.href;
  const robots = meta(head, 'name', 'robots') ?? '';
  const expected = new URL(path, origin).href;
  if (kind === '404') {
    if (!/noindex/.test(robots)) fail(where, '404 is not noindex');
  } else {
    if (canonical !== expected) fail(where, `canonical ${canonical} != ${expected}`);
    if (/noindex/.test(robots)) fail(where, 'indexable page is noindex');
    indexable.add(expected);
  }
  if (canonical && !canonical.startsWith(origin + '/')) fail(where, `canonical not on ${origin}`);
  if (canonical && !new URL(canonical).pathname.endsWith('/')) fail(where, 'canonical has no trailing slash');

  // Open Graph / Twitter
  const og = (p) => meta(head, 'property', p);
  const tw = (n) => meta(head, 'name', n);
  for (const p of ['og:type', 'og:title', 'og:description', 'og:url', 'og:image', 'og:image:alt', 'og:site_name']) if (!og(p)) fail(where, `missing ${p}`);
  for (const n of ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']) if (!tw(n)) fail(where, `missing ${n}`);
  if (og('og:title') !== title) fail(where, 'og:title differs from <title>');
  if (og('og:description') !== desc) fail(where, 'og:description differs from meta description');
  if (kind !== '404' && og('og:url') !== canonical) fail(where, 'og:url differs from canonical');
  for (const img of [og('og:image'), tw('twitter:image')].filter(Boolean)) {
    if (!img.startsWith(origin + '/')) { fail(where, `social image not absolute on ${origin}: ${img}`); continue; }
    const local = resolveFile(new URL(img).pathname);
    if (!local) { fail(where, `social image missing in dist: ${img}`); continue; }
    const size = local.endsWith('.png') ? pngSize(await readFile(local)) : null;
    const w = Number(og('og:image:width')), h = Number(og('og:image:height'));
    if (size && (size.w !== w || size.h !== h)) fail(where, `og:image is ${size.w}x${size.h} but meta says ${w}x${h}`);
    if (size && (size.w !== 1200 || size.h !== 630)) warn(where, `og:image is ${size.w}x${size.h}, recommended 1200x630`);
  }

  // Preview / local hosts anywhere in head metadata
  if (/localhost|127\.0\.0\.1|\[::1\]/i.test(head)) fail(where, 'localhost URL in <head>');

  // JSON-LD
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  if (kind === '404') { if (blocks.length) warn(where, '404 page ships JSON-LD'); }
  else if (blocks.length !== 1) fail(where, `${blocks.length} JSON-LD blocks (expected 1)`);
  for (const raw of blocks) {
    let data;
    try { data = JSON.parse(raw); } catch (e) { fail(where, `JSON-LD does not parse: ${e.message}`); continue; }
    if (data['@context'] !== 'https://schema.org') fail(where, 'JSON-LD @context is not https://schema.org');
    const graph = data['@graph'] ?? [data];
    const byId = new Map();
    for (const node of graph) {
      if (!node['@type']) fail(where, `JSON-LD node without @type (${node['@id']})`);
      if ('@context' in node) fail(where, `nested @context inside @graph node ${node['@id']}`);
      if (node['@id']) { if (byId.has(node['@id'])) fail(where, `duplicate @id ${node['@id']}`); byId.set(node['@id'], node); }
    }
    const refs = [];
    const scan = (v, key) => {
      if (Array.isArray(v)) v.forEach((x) => scan(x, key));
      else if (v && typeof v === 'object') {
        if (Object.keys(v).length === 1 && v['@id']) refs.push([key, v['@id']]);
        for (const [k, x] of Object.entries(v)) { if (x === undefined || x === null || x === '') fail(where, `empty JSON-LD value at ${k}`); scan(x, k); }
      } else if (typeof v === 'string' && /localhost|127\.0\.0\.1/.test(v)) fail(where, `localhost in JSON-LD (${key})`);
    };
    graph.forEach((n) => scan(n, n['@type']));
    for (const [key, id] of refs) if (!byId.has(id)) fail(where, `JSON-LD ${key} references missing @id ${id}`);
    const need = { Person: ['name', 'url'], Organization: ['name', 'url'], WebSite: ['name', 'url'], WebPage: ['url', 'name', 'isPartOf'], ProfilePage: ['url', 'name', 'mainEntity'], CollectionPage: ['url', 'name'], CreativeWork: ['name', 'creator'], SoftwareApplication: ['name', 'applicationCategory', 'operatingSystem'], BreadcrumbList: ['itemListElement'] };
    for (const node of graph) for (const p of need[node['@type']] ?? []) if (node[p] === undefined) fail(where, `${node['@type']} missing ${p}`);
    const pageNode = graph.find((n) => ['WebPage', 'ProfilePage', 'CollectionPage'].includes(n['@type']));
    if (!pageNode) fail(where, 'JSON-LD has no WebPage node');
    else {
      if (pageNode.url !== canonical) fail(where, 'WebPage.url differs from canonical');
      if (pageNode.name !== title) warn(where, 'WebPage.name differs from <title>');
      if (pageNode.mainEntity && !byId.has(pageNode.mainEntity['@id'])) fail(where, 'WebPage.mainEntity unresolved');
      if (path.startsWith('/work/') && pageNode.mainEntity?.['@id'] !== `${canonical}#work`) fail(where, 'case study mainEntity is not the work node');
    }
    const crumbs = graph.find((n) => n['@type'] === 'BreadcrumbList');
    if (crumbs) {
      crumbs.itemListElement.forEach((li, i) => {
        if (li.position !== i + 1) fail(where, `breadcrumb position ${li.position} at index ${i}`);
        if (!li.name || !li.item) fail(where, `breadcrumb ${i + 1} missing name/item`);
        else if (new URL(li.item).hash) warn(where, `breadcrumb ${i + 1} points to a fragment URL ${li.item}`);
      });
      if (crumbs.itemListElement.at(-1)?.item !== canonical) fail(where, 'last breadcrumb is not the page itself');
    }
    const person = graph.find((n) => n['@type'] === 'Person' && n['@id']?.endsWith('/#person'));
    if (person) {
      const loc = JSON.stringify(person.homeLocation ?? '');
      if (!/Bangalore|Bengaluru/.test(loc)) fail(where, 'Person.homeLocation is not Bangalore');
      for (const s of person.sameAs ?? []) if (/stackoverflow|t\.me|telegram|facebook/i.test(s)) fail(where, `forbidden profile in sameAs: ${s}`);
    }
    const org = graph.find((n) => n['@type'] === 'Organization');
    if (org && !String(org.url).startsWith('https://karyo.online')) fail(where, `KĀRYO Organization url is ${org.url}`);
  }

  // Images
  for (const img of tags(html, 'img')) {
    if (!('alt' in img)) fail(where, `<img src="${img.src}"> missing alt`);
    if (!img.width || !img.height) fail(where, `<img src="${img.src}"> missing width/height`);
    if (img.src?.startsWith('/') && !resolveFile(new URL(img.src, origin).pathname)) fail(where, `<img> source missing: ${img.src}`);
    for (const cand of (img.srcset ?? '').split(',').map((c) => c.trim().split(/\s+/)[0]).filter((c) => c.startsWith('/'))) {
      if (!resolveFile(new URL(cand, origin).pathname)) fail(where, `<img> srcset candidate missing: ${cand}`);
    }
  }

  // Content wording
  const text = stripTags(html);
  for (const [re, label] of forbidden) {
    for (const [src, hay] of [['text', text], ['head', head]]) {
      const m = hay.match(re);
      if (m) { fail(where, `forbidden wording "${label}" in ${src}: …${hay.slice(Math.max(0, m.index - 40), m.index + 60)}…`); break; }
    }
  }
  for (const m of text.matchAll(/DevDay/g)) {
    const win = text.slice(Math.max(0, m.index - 160), m.index + 200);
    if (/\btop\s+(?!41\b)\d+/i.test(win.replace(/Top 40[^.]*Hack BLR|Hack BLR[^.]*Top 40/gi, ''))) warn(where, `DevDay context mentions a rank other than Top 41: …${win}…`);
    if (/hundreds of applications/i.test(win)) fail(where, 'DevDay wording says hundreds of applications');
  }
  for (const m of text.matchAll(/Finance Head/g)) {
    const win = text.slice(m.index, m.index + 120);
    if (/\b20(1\d|2[0-46-9])\b/.test(win.split(/(?:Project Admin|Contributor|Google)/)[0])) fail(where, `Finance Head dated other than 2025: ${win}`);
  }
  const footer = html.match(/<footer[\s\S]*?<\/footer>/i)?.[0] ?? '';
  const footerText = stripTags(footer);
  if (!footer) fail(where, 'no <footer>');
  else {
    if (!/Founder of KĀRYO/.test(footerText)) fail(where, 'footer does not say "Founder of KĀRYO"');
    if (/co-?founder|Havinash/i.test(footerText)) fail(where, 'footer mentions co-founder/Havinash');
  }
  for (const m of html.matchAll(/<a(?=[\s>])[^>]*>([\s\S]*?)<\/a>/gi)) {
    const a = attrs(m[0].match(/<a[^>]*>/)[0]);
    const label = stripTags(m[1]);
    if (/^(visit )?KĀRYO\b/i.test(label) && /^https?:/.test(a.href ?? '') && !a.href.startsWith('https://karyo.online')) fail(where, `"${label}" link goes to ${a.href}`);
  }
  for (const a of tags(html, 'a')) {
    if (/stackoverflow|t\.me|telegram|facebook/i.test(a.href ?? '')) fail(where, `forbidden social link ${a.href}`);
  }
}

// ---------- internal links and fragments ----------
for (const [path, { file, html }] of pages) {
  const where = relative(root, file);
  const base = new URL(path, origin);
  const hrefs = [...tags(html, 'a'), ...tags(html, 'link')].map((t) => t.href).filter(Boolean);
  for (const href of hrefs) {
    if (!(href.startsWith('/') || href.startsWith('#')) || href.startsWith('//')) continue;
    const u = new URL(href, base);
    const targetPath = u.pathname;
    let target = [...pages.entries()].find(([p]) => p === targetPath)?.[1];
    if (!target) {
      if (!resolveFile(targetPath)) { fail(where, `broken internal link ${href}`); continue; }
      if (u.hash) warn(where, `fragment on non-HTML resource ${href}`);
      continue;
    }
    if (!targetPath.endsWith('/') && !/\.[a-z0-9]+$/i.test(targetPath)) warn(where, `internal link without trailing slash ${href}`);
    if (target.kind === 'stub') warn(where, `internal link goes through legacy redirect ${href}`);
    const frag = decodeURIComponent(u.hash.slice(1));
    if (frag && !target.ids.has(frag)) fail(where, `fragment #${frag} not found on ${targetPath} (${href})`);
  }
}

// ---------- sitemap and robots ----------
const read = async (p) => (existsSync(join(root, p)) ? readFile(join(root, p), 'utf8') : null);
const robotsTxt = await read('robots.txt');
if (!robotsTxt) fail('robots.txt', 'missing');
else {
  if (!robotsTxt.includes(`Sitemap: ${origin}/sitemap-index.xml`)) fail('robots.txt', 'does not reference sitemap-index.xml on production origin');
  if (/^Disallow:\s*\/\s*$/m.test(robotsTxt)) fail('robots.txt', 'disallows the whole site');
}
const index = await read('sitemap-index.xml');
if (!index) fail('sitemap-index.xml', 'missing');
else {
  const sitemaps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const locs = new Set();
  for (const sm of sitemaps) {
    if (!sm.startsWith(origin + '/')) fail('sitemap-index.xml', `sitemap not on origin: ${sm}`);
    const body = await read(new URL(sm).pathname.slice(1));
    if (!body) { fail('sitemap-index.xml', `listed sitemap missing: ${sm}`); continue; }
    for (const m of body.matchAll(/<loc>([^<]+)<\/loc>/g)) locs.add(m[1]);
  }
  for (const l of locs) if (!indexable.has(l)) fail('sitemap', `lists a non-indexable URL ${l}`);
  for (const l of indexable) if (!locs.has(l)) fail('sitemap', `missing indexable URL ${l}`);
}

// ---------- report ----------
const stubs = [...pages.values()].filter((p) => p.kind === 'stub').length;
console.log(`SEO audit of ${htmlFiles.length} HTML files (${indexable.size} indexable, ${stubs} legacy stubs) against ${origin}`);
for (const w of warnings) console.log(`  warn  ${w}`);
for (const f of failures) console.log(`  FAIL  ${f}`);
console.log(failures.length ? `\n${failures.length} failure(s), ${warnings.length} warning(s).` : `\nAll checks passed, ${warnings.length} warning(s).`);
process.exit(failures.length ? 1 : 0);
