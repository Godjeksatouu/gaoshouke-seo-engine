import { useParams, Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";
import { getBlogBySlug } from "@/lib/data/blog";

const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogBySlug(slug || "");

  if (!post) return <div className="section-padding text-center"><h1 className="text-2xl font-heading font-bold">Not Found</h1><Link to="/blog" className="text-primary hover:underline mt-4 inline-block">← Back to Blog</Link></div>;

  return (
    <>
      <SEOHead title={post.title} description={post.description} keywords={post.keywords} canonical={`https://gaoshouke.com/blog/${post.slug}`} ogType="article" />
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

      <article className="section-padding pt-4">
        <div className="container-narrow">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-niche-blog/10 text-niche-blog">{post.category}</span>
            <span className="text-xs text-muted-foreground">{post.date}</span>
            <span className="text-xs text-muted-foreground">{post.readTime}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">{post.title}</h1>
          <p className="text-lg text-muted-foreground mb-8">{post.description}</p>

          <div className="prose prose-sm max-w-none text-foreground space-y-4">
            <p className="text-sm text-muted-foreground">This is a comprehensive article about {post.title.toLowerCase()}. Our experts have compiled the most relevant information, tips, and actionable advice to help you succeed.</p>
            <h2 className="font-heading text-xl font-semibold text-foreground mt-6">Key Takeaways</h2>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Expert insights on {post.category}</li>
              <li>Practical, actionable steps you can take today</li>
              <li>Common mistakes to avoid</li>
              <li>Recommended tools and resources</li>
            </ul>

            <AdSlot />

            <h2 className="font-heading text-xl font-semibold text-foreground mt-6">Conclusion</h2>
            <p className="text-sm text-muted-foreground">We hope this guide helps you on your journey. Check out our related tools and calculators for hands-on solutions.</p>
          </div>

          <div className="mt-10 flex gap-3">
            <Link to="/tools" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Explore Tools</Link>
            <Link to="/calculators" className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80">Try Calculators</Link>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogDetailPage;
