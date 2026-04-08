import type { Metadata } from 'next';
import Link from 'next/link';
import blogPosts from '@/lib/data/blog';
import Breadcrumbs from '@/components/Breadcrumbs';
import ItemCard from '@/components/ItemCard';

export const metadata: Metadata = {
  title: 'Expert Articles & Insights - GaoShouKe Blog',
  description: 'Read the latest tutorials, guides, and expert insights on tech, productivity, and SEO from GaoShouKe.',
  alternates: { canonical: 'https://gaoshouke.com/blog' },
};

export default function BlogPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Blog' }]} />
      <section className="section-padding pt-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">Latest from GaoShouKe</h1>
          <p className="text-muted-foreground mb-8 text-lg">Deep dives, tutorials, and expert commentary to help you do more online.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map(post => (
              <ItemCard 
                key={post.slug} 
                title={post.title} 
                description={post.description} 
                href={`/blog/${post.slug}`} 
                badge={post.category} 
                meta={post.date}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
