import type { Metadata } from 'next';
import guides from '@/lib/data/guides';
import CategoryPageClient from '@/components/CategoryPageClient';

export const metadata: Metadata = {
  title: 'Expert Guides & Tutorials - GaoShouKe',
  description: 'Step-by-step expert guides and tutorials on technology, development, and productivity.',
  alternates: { canonical: 'https://gaoshouke.com/guides' },
};

const categories = ["tech", "home", "pet", "finance"];

export default function GuidesPage() {
  return (
    <CategoryPageClient 
      title="Expert Guides"
      description="In-depth tutorials and comprehensive resources to master new skills."
      basePath="guides"
      items={guides}
      categories={categories}
    />
  );
}
