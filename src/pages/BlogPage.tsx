import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import ItemCard from "@/components/ItemCard";
import AdSlot from "@/components/AdSlot";
import blogPosts from "@/lib/data/blog";

const cats = ["all", "tools", "tech", "home", "finance", "pet", "seo"];

const BlogPage = () => {
  const [cat, setCat] = useState("all");
  const filtered = blogPosts.filter(b => cat === "all" || b.category === cat);

  return (
    <>
      <SEOHead title="Blog — Tips, Guides & Insights" description="Expert articles on tools, tech, home improvement, personal finance, and pet care." keywords="blog, articles, tips, guides, tech news" />
      <Breadcrumbs items={[{ label: "Blog" }]} />

      <section className="section-padding pt-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">Blog</h1>
          <p className="text-muted-foreground mb-6">Expert insights and practical tips across all our niches.</p>

          <div className="flex gap-1.5 flex-wrap mb-6">
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${cat === c ? "bg-niche-blog text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>

          <AdSlot />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
            {filtered.slice(0, 60).map(b => (
              <ItemCard key={b.slug} title={b.title} description={b.description} href={`/blog/${b.slug}`} badge={b.category} meta={`${b.date} · ${b.readTime}`} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
