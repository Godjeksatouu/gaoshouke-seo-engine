import { useParams, Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";
import { getToolBySlug, getToolsByCategory } from "@/lib/data/tools";
import { getToolComponent } from "@/components/tools/ToolRegistry";
import { GenericTool } from "@/components/tools/ToolImplementations";
import { saveRecentItem } from "@/lib/localStorage";
import { useEffect } from "react";

const ToolDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = getToolBySlug(slug || "");

  useEffect(() => {
    if (tool) saveRecentItem("tool", tool.slug);
  }, [tool]);

  if (!tool) return (
    <div className="section-padding text-center">
      <h1 className="text-2xl font-heading font-bold text-foreground">Tool Not Found</h1>
      <p className="text-muted-foreground mt-2">The tool you're looking for doesn't exist or has been moved.</p>
      <Link to="/tools" className="text-primary hover:underline mt-4 inline-block">← Browse All Tools</Link>
    </div>
  );

  const toolName = tool.title.split(' - ')[0];
  const ToolComponent = getToolComponent(tool.slug);
  const related = getToolsByCategory(tool.category).filter(t => t.slug !== tool.slug).slice(0, 6);

  return (
    <>
      <SEOHead title={tool.title} description={tool.description} keywords={tool.keywords} canonical={`https://gaoshouke.com/tools/${tool.slug}`} ogType="article" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: toolName }]} />

      <article className="section-padding pt-4">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary mb-3">{tool.category}</span>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-3">{tool.title}</h1>
          <p className="text-muted-foreground mb-8">{tool.description}</p>

          {/* Functional Tool */}
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8 mb-8">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-4">{toolName}</h2>
            {ToolComponent ? <ToolComponent /> : <GenericTool toolName={toolName} category={tool.category} />}
          </div>

          <AdSlot />

          {/* How to use — dynamic based on tool */}
          <section className="mb-8">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-3">How to Use {toolName}</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Enter your input data in the tool workspace above</li>
              <li>Adjust any available settings or options</li>
              <li>Click the action button to process your input</li>
              <li>Copy, download, or use the generated results</li>
            </ol>
          </section>

          {/* FAQ Section for SEO */}
          <section className="mb-8">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-3">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Is {toolName} free to use?</h3>
                <p className="text-sm text-muted-foreground mt-1">Yes, {toolName} is completely free. No signup, no downloads, no limits.</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Is my data safe?</h3>
                <p className="text-sm text-muted-foreground mt-1">All processing happens in your browser. Your data never leaves your device.</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Does it work on mobile?</h3>
                <p className="text-sm text-muted-foreground mt-1">Yes, {toolName} is fully responsive and works on all devices.</p>
              </div>
            </div>
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
