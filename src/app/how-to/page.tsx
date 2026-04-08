import type { Metadata } from 'next';
import howtos from '@/lib/data/howto';
import CategoryPageClient from '@/components/CategoryPageClient';

export const metadata: Metadata = {
  title: 'How-To Guides & Tutorials - GaoShouKe',
  description: 'Learn how to perform common tasks online with our 200+ step-by-step how-to articles.',
  alternates: { canonical: 'https://gaoshouke.com/how-to' },
};

export default function HowToPage() {
  return (
    <CategoryPageClient 
      title="How-To Articles"
      description="Simple, clear, and effective tutorials for everyday digital tasks."
      basePath="how-to"
      items={howtos}
    />
  );
}
