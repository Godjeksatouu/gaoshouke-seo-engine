import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import ItemCard from "@/components/ItemCard";
import AdSlot from "@/components/AdSlot";
import calculators from "@/lib/data/calculators";

const cats = ["all", "finance", "health", "math", "converter", "lifestyle"];

const CalculatorsPage = () => {
  const [cat, setCat] = useState("all");
  const filtered = calculators.filter(c => cat === "all" || c.category === cat);

  return (
    <>
      <SEOHead title="Free Online Calculators" description="200+ free calculators for finance, health, math, and conversions." keywords="free calculator, online calculator, finance calculator, BMI calculator" />
      <Breadcrumbs items={[{ label: "Calculators" }]} />

      <section className="section-padding pt-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">Free Calculators</h1>
          <p className="text-muted-foreground mb-6">Instant, accurate calculations for every need.</p>

          <div className="flex gap-1.5 flex-wrap mb-6">
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${cat === c ? "bg-niche-calculators text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>

          <AdSlot />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
            {filtered.slice(0, 60).map(c => (
              <ItemCard key={c.slug} title={c.title} description={c.description} href={`/calculators/${c.slug}`} badge={c.category} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CalculatorsPage;
