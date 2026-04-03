import { useParams, Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";
import { getToolBySlug, getToolsByCategory } from "@/lib/data/tools";
import { saveRecentItem } from "@/lib/localStorage";
import { useEffect } from "react";

const ToolDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = getToolBySlug(slug || "");

  useEffect(() => {
    if (tool) saveRecentItem("tool", tool.slug);
  }, [tool]);

  if (!tool) return <div className="section-padding text-center"><h1 className="text-2xl font-heading font-bold text-foreground">Tool Not Found</h1><Link to="/tools" className="text-primary hover:underline mt-4 inline-block">← Back to Tools</Link></div>;

  const related = getToolsByCategory(tool.category).filter(t => t.slug !== tool.slug).slice(0, 6);

  return (
    <>
      <SEOHead title={tool.title} description={tool.description} keywords={tool.keywords} canonical={`https://gaoshouke.com/tools/${tool.slug}`} ogType="article" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: tool.title.split(' - ')[0] }]} />

      <article className="section-padding pt-4">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary mb-3">{tool.category}</span>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-3">{tool.title}</h1>
          <p className="text-muted-foreground mb-8">{tool.description}</p>

          {/* Tool Workspace */}
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8 mb-8">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Tool Workspace</h2>
            <div className="min-h-[200px] flex items-center justify-center rounded-lg bg-muted text-muted-foreground text-sm">
              Interactive tool area — {tool.title.split(' - ')[0]}
            </div>
            <div className="mt-4 flex gap-3">
              <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Run Tool</button>
              <button className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">Clear</button>
            </div>
          </div>

          <AdSlot />

          {/* How to use */}
          <section className="mb-8">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-3">How to Use This Tool</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Enter your input in the workspace above</li>
              <li>Configure any settings as needed</li>
              <li>Click "Run Tool" to process</li>
              <li>Copy or download your results</li>
            </ol>
          </section>

          {/* Related */}
          {related.length > 0 && (
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Related Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {related.map(r => (
                  <Link key={r.slug} to={`/tools/${r.slug}`} className="p-4 rounded-lg border border-border hover:border-primary/20 hover:shadow-sm transition-all">
                    <h3 className="text-sm font-semibold text-foreground">{r.title.split(' - ')[0]}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{r.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <AdSlot />
        </div>
      </article>
    </>
  );
};

export default ToolDetailPage;
