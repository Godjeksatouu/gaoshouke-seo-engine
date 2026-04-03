import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import ItemCard from "@/components/ItemCard";
import AdSlot from "@/components/AdSlot";
import tools from "@/lib/data/tools";

const categories = ["all", "text", "image", "developer", "seo", "network", "converter", "generator", "security"];

const ToolsPage = () => {
  const [cat, setCat] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = tools.filter(t => {
    const matchCat = cat === "all" || t.category === cat;
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <SEOHead title="Free Online Tools" description="200+ free online tools for developers, writers, and professionals. No signup required." keywords="free online tools, developer tools, text tools, image tools" />
      <Breadcrumbs items={[{ label: "Tools" }]} />

      <section className="section-padding pt-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">Free Online Tools</h1>
          <p className="text-muted-foreground mb-6">200+ tools for every task. Fast, free, no signup.</p>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              placeholder="Search tools..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg bg-card border border-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <div className="flex gap-1.5 flex-wrap">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${cat === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
                >
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <AdSlot />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
            {filtered.slice(0, 60).map(t => (
              <ItemCard key={t.slug} title={t.title} description={t.description} href={`/tools/${t.slug}`} badge={t.category} />
            ))}
          </div>

          {filtered.length > 60 && (
            <p className="text-center text-sm text-muted-foreground mt-8">Showing 60 of {filtered.length} tools. Use search to find more.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default ToolsPage;
