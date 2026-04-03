import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import ItemCard from "@/components/ItemCard";
import AdSlot from "@/components/AdSlot";
import comparisons from "@/lib/data/comparisons";

const ComparisonsPage = () => (
  <>
    <SEOHead title="Product & Tool Comparisons" description="200+ side-by-side comparisons to help you choose the best tools, software, and products." keywords="comparison, vs, best tools, alternatives" />
    <Breadcrumbs items={[{ label: "Comparisons" }]} />

    <section className="section-padding pt-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">Comparisons</h1>
        <p className="text-muted-foreground mb-6">Side-by-side breakdowns to help you decide.</p>

        <AdSlot />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
          {comparisons.slice(0, 60).map(c => (
            <ItemCard key={c.slug} title={c.title} description={c.description} href={`/comparisons/${c.slug}`} badge={c.category} />
          ))}
        </div>
      </div>
    </section>
  </>
);

export default ComparisonsPage;
