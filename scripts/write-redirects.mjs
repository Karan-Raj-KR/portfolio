import { writeFile } from 'node:fs/promises';
import { legacyRoutes, legacyAssets } from '../src/data/legacy-routes.mjs';
import { hosting } from '../config/hosting.mjs';

const entries = Object.entries({ ...legacyRoutes, ...legacyAssets });
// Netlify must force redirects over Astro's fallback HTML; Cloudflare always redirects first.
const status = process.env.NETLIFY === 'true' ? '301!' : '301';
const rules = entries.flatMap(([from, to]) => [
  `${from} ${to} ${status}`,
  ...(!from.split('/').at(-1).includes('.') ? [`${from}/ ${to} ${status}`] : []),
]);
await writeFile(new URL('../dist/_redirects', import.meta.url), rules.join('\n') + '\n');
// Keep both legacy slash variants explicit. Vercel's permanent redirects use HTTP 308.
await writeFile(new URL('../vercel.json', import.meta.url), JSON.stringify({
  ...hosting,
  trailingSlash: true,
  redirects: entries.flatMap(([source, destination]) => [source, ...(!source.split('/').at(-1).includes('.') ? [source + '/'] : [])].map(source => ({ source, destination, permanent: true }))),
}, null, 2) + '\n');
console.log(`Prepared ${entries.length} legacy redirect rules for Netlify, Cloudflare Pages and Vercel.`);
