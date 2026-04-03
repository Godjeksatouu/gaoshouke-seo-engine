export interface GuideItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  keywords: string;
  category: string;
  readTime: string;
  featured?: boolean;
}

const guideTopics = [
  { title: "How to Speed Up Your Computer", cat: "tech" },
  { title: "Complete Guide to Home Network Setup", cat: "tech" },
  { title: "Beginner's Guide to Linux", cat: "tech" },
  { title: "How to Build a Smart Home", cat: "tech" },
  { title: "VPN Setup Guide for Beginners", cat: "tech" },
  { title: "How to Tile a Bathroom Floor", cat: "home" },
  { title: "Complete Guide to Interior Painting", cat: "home" },
  { title: "How to Install a Ceiling Fan", cat: "home" },
  { title: "Kitchen Renovation on a Budget", cat: "home" },
  { title: "Guide to Garden Landscaping", cat: "home" },
  { title: "Puppy Training Guide for Beginners", cat: "pet" },
  { title: "Cat Nutrition Complete Guide", cat: "pet" },
  { title: "How to Groom Your Dog at Home", cat: "pet" },
  { title: "Understanding Pet Vaccinations", cat: "pet" },
  { title: "Fish Tank Setup for Beginners", cat: "pet" },
  { title: "How to Create a Monthly Budget", cat: "finance" },
  { title: "Beginner's Guide to Investing", cat: "finance" },
  { title: "Understanding Credit Scores", cat: "finance" },
  { title: "Emergency Fund Building Guide", cat: "finance" },
  { title: "Student Loan Repayment Strategies", cat: "finance" },
];

const categories = ["tech", "home", "pet", "finance"];

const guides: GuideItem[] = Array.from({ length: 200 }).map((_, i) => {
  const base = i < guideTopics.length ? guideTopics[i] : { title: `Expert Guide ${i + 1}`, cat: categories[i % 4] };
  const slug = base.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return {
    id: i,
    title: base.title,
    slug,
    description: `Complete step-by-step guide: ${base.title}. Expert tips, best practices, and actionable advice.`,
    keywords: `${base.title.toLowerCase()}, guide, tutorial, how to, ${base.cat}`,
    category: base.cat,
    readTime: `${5 + (i % 15)} min read`,
    featured: i < 8,
  };
});

export default guides;
export const getGuideBySlug = (slug: string) => guides.find(g => g.slug === slug);
export const getGuidesByCategory = (cat: string) => guides.filter(g => g.category === cat);
export const guideCategories = [
  { slug: "tech", name: "Tech Guides", description: "Technology tutorials and how-tos", icon: "Monitor" },
  { slug: "home", name: "Home & DIY", description: "Home improvement and DIY projects", icon: "Home" },
  { slug: "pet", name: "Pet Care", description: "Pet health, training, and nutrition", icon: "Heart" },
  { slug: "finance", name: "Personal Finance", description: "Budgeting, investing, and money management", icon: "DollarSign" },
];
