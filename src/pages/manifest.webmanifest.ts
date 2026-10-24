import type { APIRoute } from 'astro';
import { site } from '../data/site';

export const GET: APIRoute = () => new Response(JSON.stringify({
  id: '/', name: site.name, short_name: site.short, description: site.description,
  start_url: '/', scope: '/', display: 'standalone',
  background_color: '#ecedef', theme_color: '#ecedef',
  icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
}), { headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' } });
