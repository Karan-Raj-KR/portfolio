import { MetadataRoute } from 'next'
import { projects } from '@/data/projects'

const baseUrl = 'https://www.karanrajkr.com'

export default function sitemap(): MetadataRoute.Sitemap {
  // The case studies and the Open Loop write-up carry the substance; the old
  // list submitted two "coming soon" stubs and omitted all five.
  const routes = [
    '',
    '/about',
    '/projects',
    '/blog',
    '/hackathons',
    '/hackathons/open-loop-2026',
    ...projects.map((p) => `/projects/${p.slug}`),
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
    ...(route === '' ? { images: [`${baseUrl}/karan-raj-kr-ai-engineer.jpeg`] } : {})
  }))
}
