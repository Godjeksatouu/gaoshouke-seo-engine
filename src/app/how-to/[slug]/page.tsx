import { notFound } from "next/navigation";
import howtos, { getHowToBySlug } from "@/lib/data/howto";
import Breadcrumbs from "@/components/Breadcrumbs";

export function generateStaticParams() {
  return howtos.map((item) => ({
    slug: item.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const item = getHowToBySlug(params.slug);
  if (!item) return { title: "How-To Guide Not Found" };

  const url = `https://gaoshouke.com/how-to/${item.slug}`;

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


export default function HowToSlugPage({ params }: { params: { slug: string } }) {
  const item = getHowToBySlug(params.slug);
  if (!item) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: item.title,
    description: item.description,
    step: item.steps.map((step, i) => ({
      '@type': 'HowToStep',
      name: `Step ${i + 1}`,
      itemListElement: [{
        '@type': 'HowToDirection',
        text: step,
      }]
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: "How-To", href: "/how-to" }, { label: item.title }]} />

      <article className="section-padding pt-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">{item.title}</h1>
          <p className="text-muted-foreground mb-8 text-lg">{item.description}</p>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Step-by-Step Instructions</h2>
            <div className="space-y-4">
              {item.steps.map((step, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-lg bg-card border border-border">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  <p className="text-foreground pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
