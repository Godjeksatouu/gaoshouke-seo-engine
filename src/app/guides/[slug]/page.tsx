import { notFound } from "next/navigation";
import guides, { getGuideBySlug } from "@/lib/data/guides";
import Breadcrumbs from "@/components/Breadcrumbs";

export function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return { title: "Guide Not Found" };
  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();

  return (
    <>
      <Breadcrumbs items={[{ label: "Guides", href: "/guides" }, { label: guide.title }]} />
      <article className="section-padding pt-4">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary mb-3">
            {guide.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">{guide.title}</h1>
          <p className="text-muted-foreground mb-8 text-lg">{guide.description}</p>
          <div className="bg-card border border-border p-8 rounded-xl mb-8">
            <h2 className="text-xl font-bold mb-4">Inside This Guide</h2>
            <p className="text-muted-foreground mb-4">Detailed instructions and expert insights for {guide.title.toLowerCase()} are coming soon.</p>
            <p className="text-sm text-muted-foreground italic">Last updated: April 2026 • {guide.readTime}</p>
          </div>
        </div>
      </article>
    </>
  );
}
