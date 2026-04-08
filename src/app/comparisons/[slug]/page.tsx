import { notFound } from "next/navigation";
import comparisons, { getComparisonBySlug } from "@/lib/data/comparisons";
import Breadcrumbs from "@/components/Breadcrumbs";

export function generateStaticParams() {
  return comparisons.map((item) => ({
    slug: item.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const item = getComparisonBySlug(params.slug);
  if (!item) return { title: "Comparison Not Found" };

  const url = `https://gaoshouke.com/comparisons/${item.slug}`;

  return {
    title: item.title,
    description: item.description,
    keywords: item.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: item.title,
      description: item.description,
      url: url,
      type: 'article',
      siteName: 'GaoShouKe',
      images: [
        {
          url: 'https://res.cloudinary.com/dhdbxilef/image/upload/v1775182794/GaoShouKe_asu96q.png',
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: item.title,
      description: item.description,
      images: ['https://res.cloudinary.com/dhdbxilef/image/upload/v1775182794/GaoShouKe_asu96q.png'],
    },
  };
}


export default function ComparisonSlugPage({ params }: { params: { slug: string } }) {
  const item = getComparisonBySlug(params.slug);
  if (!item) notFound();

  return (
    <>
      <Breadcrumbs items={[{ label: "Comparisons", href: "/comparisons" }, { label: item.title }]} />
      <article className="section-padding pt-4">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary mb-3">
            {item.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">{item.title}</h1>
          <p className="text-muted-foreground mb-8 text-lg">{item.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h2 className="text-2xl font-bold text-primary mb-4">{item.itemA}</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">✓ High performance</li>
                <li className="flex items-center gap-2">✓ Industry standard</li>
                <li className="flex items-center gap-2">✓ Great documentation</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h2 className="text-2xl font-bold text-secondary-foreground mb-4">{item.itemB}</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">✓ Cost effective</li>
                <li className="flex items-center gap-2">✓ Easy to learn</li>
                <li className="flex items-center gap-2">✓ Modern architecture</li>
              </ul>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
