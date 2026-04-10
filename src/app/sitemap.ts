import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://karanrajkr.vercel.app', lastModified: new Date() },
  ]
}
