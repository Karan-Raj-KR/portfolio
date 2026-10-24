import { inject, pageview } from '@vercel/analytics';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function setupAnalytics() {
  const element = document.getElementById('portfolio-analytics');
  if (!element) return;
  const config: { enabled: boolean; id: string; origin: string } = JSON.parse(element.textContent!);
  // A production build can also be opened on localhost or a preview host. Neither should
  // load an analytics SDK, even if it has the live site's measurement ID baked into it.
  if (!config.enabled || location.origin !== config.origin) return;

  window.dataLayer ??= [];
  window.gtag ??= function () { window.dataLayer!.push(arguments); };
  window.gtag('js', new Date());
  // Preserve the live site's GA4 setup: its first pageview is automatic, and the existing
  // Enhanced Measurement setting handles browser history changes. Do not also send manual
  // page_view events, which would count client-side navigations twice when that is enabled.
  window.gtag('config', config.id);
  const google = document.createElement('script');
  google.async = true;
  google.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.id)}`;
  document.head.append(google);

  inject({ mode: 'production', framework: 'astro', disableAutoTrack: true });
  // Astro emits this after the new document title and URL are in place, including Back/Forward.
  document.addEventListener('astro:page-load', () => {
    pageview({ path: location.pathname, route: location.pathname });
  });
}
