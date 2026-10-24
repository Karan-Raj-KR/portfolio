// Keep the existing Vercel environment variable names so the same project can be updated.
// These two identifiers are public and already present in the live site's HTML.
export const googleAnalyticsId = import.meta.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-KQ4MWRFNY8';
export const googleSiteVerification = import.meta.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '0W3wPYuowx9ekB31u-YSCyuTTf0GQeRXilZ3nagT-BM';
export const isPreview = Boolean(import.meta.env.VERCEL_ENV && import.meta.env.VERCEL_ENV !== 'production');
export const analyticsEnabled = import.meta.env.PROD && !isPreview;

if (!/^G-[A-Z0-9]+$/.test(googleAnalyticsId)) {
  throw new Error('NEXT_PUBLIC_GOOGLE_ANALYTICS_ID must be a GA4 Measurement ID (G-…).');
}
