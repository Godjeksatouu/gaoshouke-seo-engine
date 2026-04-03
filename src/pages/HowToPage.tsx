import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import ItemCard from "@/components/ItemCard";
import AdSlot from "@/components/AdSlot";
import howtos from "@/lib/data/howto";

const HowToPage = () => {
  const [search, setSearch] = useState("");
  const filtered = howtos.filter(h => !search || h.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <SEOHead title="How-To Guides" description="200+ step-by-step how-to articles. Quick answers to common technical questions." keywords="how to, tutorials, step by step, guides" />
      <Breadcrumbs items={[{ label: "How-To" }]} />

      <section className="section-padding pt-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">How-To Articles</h1>
          <p className="text-muted-foreground mb-6">Quick, actionable answers to common questions.</p>

          <input type="text" placeholder="Search how-to articles..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg bg-card border border-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring mb-6" />

          <AdSlot />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
            {filtered.slice(0, 60).map(h => (
              <ItemCard key={h.slug} title={h.title} description={h.description} href={`/how-to/${h.slug}`} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HowToPage;
