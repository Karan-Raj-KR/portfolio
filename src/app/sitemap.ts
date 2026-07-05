import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://karanrajkr.vercel.app';
  
  return [
    { 
      url: baseUrl, 
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    { 
      url: `${baseUrl}/blog`, 
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // We would dynamically fetch blog post URLs here and map them.
    // For now we add a dummy route.
    {
      url: `${baseUrl}/blog/hello-world`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }
  ]
}
