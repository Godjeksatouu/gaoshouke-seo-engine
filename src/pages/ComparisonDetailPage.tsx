import { useParams, Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";
import { getComparisonBySlug } from "@/lib/data/comparisons";

const ComparisonDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const item = getComparisonBySlug(slug || "");

  if (!item) return <div className="section-padding text-center"><h1 className="text-2xl font-heading font-bold">Not Found</h1><Link to="/comparisons" className="text-primary hover:underline mt-4 inline-block">← Back</Link></div>;

  return (
    <>
      <SEOHead title={item.title} description={item.description} keywords={item.keywords} canonical={`https://gaoshouke.com/comparisons/${item.slug}`} ogType="article" />
      <Breadcrumbs items={[{ label: "Comparisons", href: "/comparisons" }, { label: `${item.itemA} vs ${item.itemB}` }]} />

      <article className="section-padding pt-4">
        <div className="container-narrow">
          <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-niche-comparisons/10 text-niche-comparisons mb-3">{item.category}</span>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-3">{item.title}</h1>
          <p className="text-muted-foreground mb-8">{item.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <h2 className="font-heading text-xl font-bold text-foreground mb-2">{item.itemA}</h2>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>✓ Feature 1</p><p>✓ Feature 2</p><p>✓ Feature 3</p><p>✗ Feature 4</p>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <h2 className="font-heading text-xl font-bold text-foreground mb-2">{item.itemB}</h2>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>✓ Feature 1</p><p>✗ Feature 2</p><p>✓ Feature 3</p><p>✓ Feature 4</p>
              </div>
            </div>
          </div>

          <AdSlot />

          <section className="mt-8">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-3">Verdict</h2>
            <p className="text-sm text-muted-foreground">Both {item.itemA} and {item.itemB} are excellent choices. Your decision should depend on your specific needs and priorities. Read our detailed analysis above to make an informed choice.</p>
          </section>

          <div className="mt-8 flex gap-3">
            <Link to="/tools" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Explore Tools</Link>
            <Link to="/guides" className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80">Read Guides</Link>
          </div>
        </div>
      </article>
    </>
  );
};

export default ComparisonDetailPage;
