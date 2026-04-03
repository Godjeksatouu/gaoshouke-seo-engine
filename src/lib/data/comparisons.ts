export interface ComparisonItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  keywords: string;
  itemA: string;
  itemB: string;
  category: string;
}

const comparisonTopics = [
  { a: "Chrome", b: "Firefox", cat: "browsers" },
  { a: "React", b: "Vue", cat: "frameworks" },
  { a: "WordPress", b: "Wix", cat: "cms" },
  { a: "Photoshop", b: "GIMP", cat: "design" },
  { a: "VS Code", b: "Sublime Text", cat: "editors" },
  { a: "AWS", b: "Google Cloud", cat: "cloud" },
  { a: "iPhone", b: "Samsung Galaxy", cat: "phones" },
  { a: "Windows", b: "Mac", cat: "os" },
  { a: "Python", b: "JavaScript", cat: "languages" },
  { a: "MySQL", b: "PostgreSQL", cat: "databases" },
  { a: "Tailwind CSS", b: "Bootstrap", cat: "css" },
  { a: "Next.js", b: "Gatsby", cat: "frameworks" },
  { a: "Figma", b: "Sketch", cat: "design" },
  { a: "Slack", b: "Teams", cat: "communication" },
  { a: "Notion", b: "Confluence", cat: "productivity" },
];

const comparisons: ComparisonItem[] = Array.from({ length: 200 }).map((_, i) => {
  const base = i < comparisonTopics.length ? comparisonTopics[i] : { a: `Tool A${i}`, b: `Tool B${i}`, cat: "general" };
  return {
    id: i,
    title: `${base.a} vs ${base.b} — Which Is Better in 2026?`,
    slug: `${base.a.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-vs-${base.b.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    description: `Detailed comparison of ${base.a} vs ${base.b}. Features, pricing, pros & cons to help you choose.`,
    keywords: `${base.a} vs ${base.b}, ${base.a} comparison, ${base.b} alternative`,
    itemA: base.a,
    itemB: base.b,
    category: base.cat,
  };
});

export default comparisons;
export const getComparisonBySlug = (slug: string) => comparisons.find(c => c.slug === slug);
