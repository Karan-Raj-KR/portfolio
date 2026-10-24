// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { legacyRoutes } from './src/data/legacy-routes.mjs';

// Override SITE_URL at build time for a separate deployment; leave DNS changes for launch.
const productionUrl = new URL(process.env.SITE_URL || 'https://www.karanrajkr.com');
if (!['http:', 'https:'].includes(productionUrl.protocol) || productionUrl.username || productionUrl.password || productionUrl.pathname !== '/' || productionUrl.search || productionUrl.hash) {
  throw new Error('SITE_URL must be an http(s) origin, such as https://portfolio.example.com');
}
export default defineConfig({
  site: productionUrl.origin,
  redirects: legacyRoutes,
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => {
    const path = new URL(page).pathname.replace(/\/$/, '');
    return path !== '/404' && !(path in legacyRoutes);
  } })],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  build: { inlineStylesheets: 'always' },
});
