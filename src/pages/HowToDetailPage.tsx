import { useParams, Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";
import { getHowToBySlug } from "@/lib/data/howto";
import { saveRecentItem } from "@/lib/localStorage";
import { useEffect } from "react";

const HowToDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const item = getHowToBySlug(slug || "");

  useEffect(() => { if (item) saveRecentItem("howto", item.slug); }, [item]);

  if (!item) return <div className="section-padding text-center"><h1 className="text-2xl font-heading font-bold">Not Found</h1><Link to="/how-to" className="text-primary hover:underline mt-4 inline-block">← Back</Link></div>;

  return (
    <>
      <SEOHead title={item.title} description={item.description} keywords={item.keywords} canonical={`https://gaoshouke.com/how-to/${item.slug}`} ogType="article" />
      <Breadcrumbs items={[{ label: "How-To", href: "/how-to" }, { label: item.title }]} />

      <article className="section-padding pt-4">
        <div className="container-narrow">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-3">{item.title}</h1>
          <p className="text-muted-foreground mb-8">{item.description}</p>

          <div className="rounded-xl border border-border bg-card p-6 mb-8">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Step-by-Step Guide</h2>
            <ol className="space-y-4">
              {item.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">{i + 1}</span>
                  <span className="text-sm text-foreground pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <AdSlot />

          <section className="mt-8">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-3">Related Tools</h2>
            <div className="flex gap-3">
              {item.relatedTools.map(slug => (
                <Link key={slug} to={`/tools/${slug}`} className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80 transition-colors">{slug}</Link>
              ))}
            </div>
          </section>
        </div>
      </article>
    </>
  );
};

export default HowToDetailPage;
