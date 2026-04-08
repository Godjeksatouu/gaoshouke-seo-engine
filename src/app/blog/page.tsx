import type { Metadata } from 'next';
import blogPosts from '@/lib/data/blog';
import CategoryPageClient from '@/components/CategoryPageClient';

export const metadata: Metadata = {
  title: 'Expert Articles & Insights - GaoShouKe Blog',
  description: 'Read the latest tutorials, guides, and expert insights on tech, productivity, and SEO from GaoShouKe.',
  alternates: { canonical: 'https://gaoshouke.com/blog' },
};

const categories = ["tools", "tech", "home", "finance", "pet", "seo"];

export default function BlogPage() {
  return (
    <CategoryPageClient 
      title="Latest from GaoShouKe"
      description="Deep dives, tutorials, and expert commentary to help you do more online."
      basePath="blog"
      items={blogPosts}
      categories={categories}
      itemMetaKey="date"
    />
  );
}
