import type { Metadata } from 'next';
import guides from '@/lib/data/guides';
import Breadcrumbs from '@/components/Breadcrumbs';
import ItemCard from '@/components/ItemCard';

export const metadata: Metadata = {
  title: 'Expert Guides & Tutorials - GaoShouKe',
  description: 'Step-by-step expert guides and tutorials on technology, development, and productivity.',
  alternates: { canonical: 'https://gaoshouke.com/guides' },
};

export default function GuidesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Guides' }]} />
      <section className="section-padding pt-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">Expert Guides</h1>
          <p className="text-muted-foreground mb-8 text-lg">In-depth tutorials and comprehensive resources to master new skills.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map(item => (
              <ItemCard key={item.slug} title={item.title} description={item.description} href={`/guides/${item.slug}`} badge={item.category} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
