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
  const catIdx = i % categories.length;
  const category = categories[catIdx];
  
  const baseTitle = i < blogTopics.length ? blogTopics[i].title : `Insights into ${category} and Digital Strategy ${i + 1}`;
  const slug = baseTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const month = ((i % 12) + 1).toString().padStart(2, '0');
  
  const titleTemplates = [
    `${baseTitle} — Expert Analysis`,
    `A Complete Guide to ${baseTitle}`,
    `${baseTitle}: Trends and Insights for 2026`,
  ];
  
  const descTemplates = [
    `Read our expert analysis on ${baseTitle.toLowerCase()}. Discover trends, tips, and professional advice.`,
    `Master ${baseTitle.toLowerCase()} with our comprehensive guide. Everything you need to know in one place.`,
    `Looking for info on ${baseTitle.toLowerCase()}? Our latest article dives deep into best practices and more.`,
  ];

  return {
    id: i,
    title: titleTemplates[i % titleTemplates.length],
    slug,
    description: descTemplates[i % descTemplates.length],
    keywords: `${baseTitle.toLowerCase()}, ${category}, tips, guide`,
    category,
    date: `2026-${month}-${((i % 28) + 1).toString().padStart(2, '0')}`,
    readTime: `${3 + (i % 12)} min read`,
    featured: i < 6,
  };
});


export default blogPosts;
export const getBlogBySlug = (slug: string) => blogPosts.find(b => b.slug === slug);
export const getBlogsByCategory = (cat: string) => blogPosts.filter(b => b.category === cat);
