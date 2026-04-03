import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import ItemCard from "@/components/ItemCard";
import AdSlot from "@/components/AdSlot";
import guides, { guideCategories } from "@/lib/data/guides";
import { Link } from "react-router-dom";

const GuidesPage = () => (
  <>
    <SEOHead title="Expert Guides & Tutorials" description="200+ step-by-step guides on tech, home improvement, pet care, and personal finance." keywords="guides, tutorials, how-to, tech guide, DIY" />
    <Breadcrumbs items={[{ label: "Guides" }]} />

    <section className="section-padding pt-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">Expert Guides</h1>
        <p className="text-muted-foreground mb-8">Step-by-step tutorials across tech, home, pets, and finance.</p>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {guideCategories.map(cat => (
            <Link key={cat.slug} to={`/guides/${cat.slug}`} className="p-4 rounded-xl bg-card border border-border hover:border-primary/20 hover:shadow-md transition-all text-center">
              <h3 className="font-heading text-sm font-semibold text-foreground">{cat.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{cat.description}</p>
            </Link>
          ))}
        </div>

        <AdSlot />

        <h2 className="text-xl font-heading font-semibold text-foreground mb-4 mt-8">Latest Guides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {guides.filter(g => g.featured).map(g => (
            <ItemCard key={g.slug} title={g.title} description={g.description} href={`/guides/${g.category}?article=${g.slug}`} badge={g.category} meta={g.readTime} />
          ))}
        </div>
      </div>
    </section>
  </>
);

export default GuidesPage;
