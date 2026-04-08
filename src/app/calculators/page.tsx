import type { Metadata } from 'next';
import calculators from '@/lib/data/calculators';
import CategoryPageClient from '@/components/CategoryPageClient';

export const metadata: Metadata = {
  title: 'Free Online Calculators - GaoShouKe',
  description: 'A comprehensive collection of 200+ free online calculators for finance, health, math, and lifestyle.',
  alternates: { canonical: 'https://gaoshouke.com/calculators' },
};

const categories = ["finance", "health", "math", "converter", "lifestyle"];

export default function CalculatorsPage() {
  return (
    <CategoryPageClient 
      title="Online Calculators"
      description="Fast, accurate, and easy-to-use calculators for all your daily needs."
      basePath="calculators"
      items={calculators}
      categories={categories}
    />
  );
}
