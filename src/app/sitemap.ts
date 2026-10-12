import { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { publications } from '@/data/publications';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.karanrajkr.com';
  const now = new Date();

  // Static routes with their priority and image associations
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [
        `${baseUrl}/karan-raj-kr-ai-engineer.jpeg`,
        `${baseUrl}/og-image.png`,
      ],
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
      images: [`${baseUrl}/karan-raj-kr-ai-engineer.jpeg`],
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
      images: [
        `${baseUrl}/karan-raj-kr-ai-engineer.jpeg`,
        `${baseUrl}/Karan-certificate.png`,
        `${baseUrl}/architecture-image.png`,
      ],
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/hackathons`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hackathons/open-loop-2026`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      images: [
        `${baseUrl}/Karan-certificate.png`,
        `${baseUrl}/architecture-image.png`,
      ],
    },
    {
      url: `${baseUrl}/achievements`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/writing`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/changelog`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Dynamic project routes
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
    images:
      project.slug === 'formpilot'
        ? [`${baseUrl}/architecture-image.png`]
        : undefined,
  }));

  // Dynamic blog publication routes
  const blogRoutes: MetadataRoute.Sitemap = publications.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.publishedDate),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
