import type { MetadataRoute } from 'next';
import tools from '@/lib/data/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gaoshouke.com';

  const toolRoutes = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.category}/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...toolRoutes,
  ];
}
