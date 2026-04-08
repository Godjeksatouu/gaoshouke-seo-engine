import { notFound } from "next/navigation";
import blogPosts, { getBlogBySlug } from "@/lib/data/blog";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogBySlug(params.slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `https://gaoshouke.com/blog/${post.slug}` },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getBlogBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />
      <article className="section-padding pt-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium uppercase font-sans tracking-wide">
              {post.category}
            </span>
            <span className="text-sm text-muted-foreground">{post.date}</span>
            <span className="text-sm text-muted-foreground">• {post.readTime}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight mb-8">
            {post.title}
          </h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {post.description}
            </p>
            <div className="bg-card border border-border p-8 rounded-2xl mb-8">
              <p className="text-foreground text-lg mb-4">
                Full content for this expert article is currently being optimized for the best reading experience.
              </p>
              <p className="text-muted-foreground">
                At GaoShouKe, we strive to provide the most accurate and up-to-date information. Check back soon for the full guide, including step-by-step instructions, expert tips, and exclusive insights.
              </p>
            </div>
            <h2 className="text-2xl font-bold mb-4">Why This Matters</h2>
            <p className="mb-4">Understanding the nuances of {post.category} is essential for success in today&apos;s fast-paced digital environment.</p>
          </div>

          <div className="mt-12 pt-8 border-t border-border flex justify-between items-center">
            <Link href="/blog" className="text-sm text-primary hover:underline">← Back to Blog</Link>
          </div>
        </div>
      </article>
    </>
  );
}
