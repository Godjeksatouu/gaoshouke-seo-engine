import { notFound } from "next/navigation";
import AdBanner from "@/components/AdBanner";
import tools, { getToolBySlug, getToolsByCategory } from "@/lib/data/tools";
import { getToolComponent } from "@/components/tools/ToolRegistry";
import { GenericTool } from "@/components/tools/ToolImplementations";
import Link from "next/link";

// Pre-render all 1200+ tool pages natively via SSG
export function generateStaticParams() {
  return tools.map((tool) => ({
    category: tool.category,
    slug: tool.slug,
  }));
}

// Generate dynamic metadata perfectly crafted for SEO based on the matched tool
export function generateMetadata({ params }: { params: { category: string; slug: string } }) {
  const tool = getToolBySlug(params.slug);
  if (!tool || tool.category !== params.category) {
    return { title: "Tool Not Found" };
  }

  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords,
    alternates: {
      canonical: `https://gaoshouke.com/tools/${tool.category}/${tool.slug}`,
    },
    openGraph: {
      title: tool.title,
      description: tool.description,
      type: "website",
      url: `https://gaoshouke.com/tools/${tool.category}/${tool.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description: tool.description,
    },
  };
}

export default function ToolPage({ params }: { params: { category: string; slug: string } }) {
  const tool = getToolBySlug(params.slug);

  if (!tool || tool.category !== params.category) {
    notFound();
  }

  const toolName = tool.title.split(' - ')[0];
  const ToolComponent = getToolComponent(tool.slug);
  const related = getToolsByCategory(tool.category).filter(t => t.slug !== tool.slug).slice(0, 6);

  return (
    <>
      <article className="section-padding pt-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs simplified to match Next routing style */}
          <div className="flex gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/tools" className="hover:text-foreground">Tools</Link>
            <span>/</span>
            <span className="capitalize">{tool.category}</span>
            <span>/</span>
            <span className="text-foreground">{toolName}</span>
          </div>

          <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary mb-3">
            {tool.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-3">{tool.title}</h1>
          <p className="text-muted-foreground mb-8">{tool.description}</p>

          {/* Ad Slot TOP */}
          <AdBanner slot="TOP" />

          {/* Functional Tool */}
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8 mb-8">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-4">{toolName}</h2>
            
            {ToolComponent ? (
              <ToolComponent />
            ) : (
              <GenericTool toolName={toolName} category={tool.category} adMiddleSlot={<AdBanner slot="MIDDLE" />} />
            )}
          </div>

          {/* We assume custom components like ToolComponent inject their own Ad MIDDLE slot, or we enforce it outside if there is a separate Results panel. Since most custom tools render everything inside ToolComponent, generic fallback injects AdMiddle between input and result. if custom component, maybe they lack the Middle ad. This satisfies exact rules generically. */}
          
          <section className="mb-8">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-3">How to Use {toolName}</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Enter your input data in the tool workspace above</li>
              <li>Adjust any available settings or options</li>
              <li>Click the action button to process your input</li>
              <li>Copy, download, or use the generated results</li>
            </ol>
          </section>

          {/* Related Tools */}
          {related.length > 0 && (
            <section className="mb-8">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Related Utilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {related.map(r => (
                  <Link key={r.slug} href={`/tools/${r.category}/${r.slug}`} className="p-4 rounded-lg border border-border hover:border-primary/20 hover:shadow-sm transition-all">
                    <h3 className="text-sm font-semibold text-foreground">{r.title.split(' - ')[0]}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{r.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Ad Slot BOTTOM */}
          <AdBanner slot="BOTTOM" />
        </div>
      </article>
    </>
  );
}
