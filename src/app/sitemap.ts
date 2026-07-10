import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.karanrajkr.com'
  const routes = ['', '/about', '/projects', '/blog', '/writing', '/hackathons', '/changelog']

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
    ...(route === '' ? { images: ['https://www.karanrajkr.com/karan-raj-kr-ai-engineer.jpeg'] } : {})
  }))
}
