import type { Metadata } from 'next';
import comparisons from '@/lib/data/comparisons';
import CategoryPageClient from '@/components/CategoryPageClient';

export const metadata: Metadata = {
  title: 'Product & Tool Comparisons - GaoShouKe',
  description: 'Unbiased side-by-side comparisons of popular tools, software, and products to help you make informed decisions.',
  alternates: { canonical: 'https://gaoshouke.com/comparisons' },
};

const categories = ["browsers", "frameworks", "cms", "design", "editors", "cloud", "phones", "os", "languages", "databases", "css", "communication", "productivity"];

export default function ComparisonsPage() {
  return (
    <CategoryPageClient 
      title="Expert Comparisons"
      description="Detailed vs comparisons to help you decide which tool or service is right for you."
      basePath="comparisons"
      items={comparisons}
      categories={categories}
    />
  );
}
