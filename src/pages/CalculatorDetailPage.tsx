import { useParams, Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";
import { getCalculatorBySlug, getCalculatorsByCategory } from "@/lib/data/calculators";
import { saveRecentItem } from "@/lib/localStorage";
import { useEffect, useState } from "react";

const CalculatorDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const calc = getCalculatorBySlug(slug || "");
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => { if (calc) saveRecentItem("calculator", calc.slug); }, [calc]);

  if (!calc) return <div className="section-padding text-center"><h1 className="text-2xl font-heading font-bold">Not Found</h1><Link to="/calculators" className="text-primary hover:underline mt-4 inline-block">← Back</Link></div>;

  const related = getCalculatorsByCategory(calc.category).filter(c => c.slug !== calc.slug).slice(0, 4);

  return (
    <>
      <SEOHead title={calc.title} description={calc.description} keywords={calc.keywords} canonical={`https://gaoshouke.com/calculators/${calc.slug}`} />
      <Breadcrumbs items={[{ label: "Calculators", href: "/calculators" }, { label: calc.title.replace("Free ", "").replace(" Online", "") }]} />

      <article className="section-padding pt-4">
        <div className="container-narrow">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-3">{calc.title}</h1>
          <p className="text-muted-foreground mb-8">{calc.description}</p>

          <div className="rounded-xl border border-border bg-card p-6 sm:p-8 mb-8">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Calculator</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Value 1</label>
                  <input type="number" value={val1} onChange={e => setVal1(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-input bg-background" placeholder="Enter number..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Value 2</label>
                  <input type="number" value={val2} onChange={e => setVal2(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-input bg-background" placeholder="Enter number..." />
                </div>
              </div>
              <button 
                onClick={() => {
                  const n1 = parseFloat(val1);
                  const n2 = parseFloat(val2);
                  if (isNaN(n1) || isNaN(n2)) setResult("Please enter valid numbers");
                  else setResult(`Result: ${n1 + n2} (Example calculation for ${calc.title.replace("Free ", "").replace(" Online", "")})`);
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Calculate
              </button>
              {result && (
                <div className="p-4 rounded-lg bg-muted text-foreground text-sm mt-4">
                  {result}
                </div>
              )}
            </div>
          </div>

          <AdSlot />

          {related.length > 0 && (
            <section className="mt-8">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Related Calculators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {related.map(r => (
                  <Link key={r.slug} to={`/calculators/${r.slug}`} className="p-4 rounded-lg border border-border hover:border-primary/20 hover:shadow-sm transition-all">
                    <h3 className="text-sm font-semibold text-foreground">{r.title.replace("Free ", "").replace(" Online", "")}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{r.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
};

export default CalculatorDetailPage;
