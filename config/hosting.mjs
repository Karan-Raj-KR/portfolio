// Source of truth for the existing Vercel project's framework, headers and preview protection.
// write-redirects.mjs merges this with the shared legacy URL map after each build.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data: https://www.google-analytics.com https://*.googletagmanager.com",
  "connect-src 'self' https://api.github.com https://va.vercel-scripts.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
  "frame-src 'self'", "frame-ancestors 'none'", "object-src 'none'", "base-uri 'self'",
  // The contact form also works without JavaScript: keep its Gmail action usable.
  "form-action 'self' https://mail.google.com https://outlook.live.com mailto:",
  'upgrade-insecure-requests',
].join('; ') + ';';

export const hosting = {
  $schema: 'https://openapi.vercel.sh/vercel.json',
  framework: 'astro',
  installCommand: 'npm ci',
  buildCommand: 'npm run build',
  outputDirectory: 'dist',
  headers: [
    { source: '/(.*)', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
      { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
      { key: 'Content-Security-Policy', value: csp },
    ] },
    { source: '/(.*)', has: [{ type: 'host', value: '.*\\.vercel\\.app' }],
      headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
  ],
};
