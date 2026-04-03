export interface BlogItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  keywords: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

const blogTopics = [
  { title: "10 Best Free Online Tools for Developers in 2026", cat: "tools" },
  { title: "How AI Is Changing Web Development", cat: "tech" },
  { title: "Complete Home Office Setup Guide", cat: "home" },
  { title: "Top 5 Budget Apps That Actually Work", cat: "finance" },
  { title: "Essential Pet Care Tips for New Owners", cat: "pet" },
  { title: "The Ultimate Guide to SEO in 2026", cat: "seo" },
  { title: "Best Practices for Website Performance", cat: "tech" },
  { title: "DIY Smart Home on a Budget", cat: "home" },
  { title: "Investing for Beginners: Where to Start", cat: "finance" },
  { title: "Understanding Your Dog's Body Language", cat: "pet" },
  { title: "Web Accessibility: A Complete Guide", cat: "tech" },
  { title: "Kitchen Organization Hacks That Save Space", cat: "home" },
  { title: "How to Build an Emergency Fund Fast", cat: "finance" },
  { title: "Cat vs Dog: Which Pet Is Right for You?", cat: "pet" },
  { title: "JavaScript Performance Optimization Tips", cat: "tech" },
];

const categories = ["tools", "tech", "home", "finance", "pet", "seo"];

const blogPosts: BlogItem[] = Array.from({ length: 200 }).map((_, i) => {
  const base = i < blogTopics.length ? blogTopics[i] : { title: `Expert Article ${i + 1}: Tips & Insights`, cat: categories[i % categories.length] };
  const slug = base.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const month = ((i % 12) + 1).toString().padStart(2, '0');
  return {
    id: i,
    title: base.title,
    slug,
    description: `Read: ${base.title}. Expert insights, practical tips, and actionable advice.`,
    keywords: `${base.title.toLowerCase()}, ${base.cat}, tips, guide`,
    category: base.cat,
    date: `2026-${month}-${((i % 28) + 1).toString().padStart(2, '0')}`,
    readTime: `${3 + (i % 12)} min read`,
    featured: i < 6,
  };
});

export default blogPosts;
export const getBlogBySlug = (slug: string) => blogPosts.find(b => b.slug === slug);
export const getBlogsByCategory = (cat: string) => blogPosts.filter(b => b.category === cat);
