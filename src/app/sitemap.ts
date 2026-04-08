import type { MetadataRoute } from 'next';
import tools from '@/lib/data/tools';
import guides from '@/lib/data/guides';
import howto from '@/lib/data/howto';
import calculators from '@/lib/data/calculators';
import comparisons from '@/lib/data/comparisons';
import blog from '@/lib/data/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gaoshouke.com';

  const toolRoutes = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.category}/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const guideRoutes = guides.map((item) => ({
    url: `${baseUrl}/guides/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const howtoRoutes = howto.map((item) => ({
    url: `${baseUrl}/how-to/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const calculatorRoutes = calculators.map((item) => ({
    url: `${baseUrl}/calculators/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const comparisonRoutes = comparisons.map((item) => ({
    url: `${baseUrl}/comparisons/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const blogRoutes = blog.map((item) => ({
    url: `${baseUrl}/blog/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/guides`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/how-to`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/calculators`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/comparisons`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
  ];

  return [
    ...staticRoutes,
    ...toolRoutes,
    ...guideRoutes,
    ...howtoRoutes,
    ...calculatorRoutes,
    ...comparisonRoutes,
    ...blogRoutes,
  ];
}
