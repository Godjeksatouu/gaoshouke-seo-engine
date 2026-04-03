import Link from "next/link";
import NicheCard from "@/components/NicheCard";
import ItemCard from "@/components/ItemCard";
import AdSlot from "@/components/AdSlot";
import { getFeaturedTools } from "@/lib/data/tools";
import { SITE_DESCRIPTION } from "@/lib/seo";
import { ArrowRight, Zap, Shield, Clock } from "lucide-react";

export const metadata = {
  title: "Free Online Tools, Calculators & Expert Guides",
  description: SITE_DESCRIPTION,
  keywords: "free online tools, calculators, how-to guides, tech tutorials, comparisons"
};

const niches = [
  { title: "Online Tools", description: "200+ free tools for every task", href: "/tools", count: 200, colorClass: "bg-primary" },
  { title: "Expert Guides", description: "Step-by-step tutorials across topics", href: "/guides", count: 200, colorClass: "bg-niche-guides" },
  { title: "How-To Articles", description: "Quick answers to common questions", href: "/how-to", count: 200, colorClass: "bg-niche-howto" },
  { title: "Calculators", description: "Finance, health, math & more", href: "/calculators", count: 200, colorClass: "bg-niche-calculators" },
  { title: "Comparisons", description: "Side-by-side tool & product comparisons", href: "/comparisons", count: 200, colorClass: "bg-niche-comparisons" },
  { title: "Blog", description: "Latest insights and expert articles", href: "/blog", count: 200, colorClass: "bg-niche-blog" },
];

const features = [
  { icon: Zap, title: "Lightning Fast", desc: "No signup, no loading. Tools work instantly in your browser." },
  { icon: Shield, title: "Privacy First", desc: "Your data never leaves your browser. Everything runs locally." },
  { icon: Clock, title: "Always Free", desc: "1000+ tools and resources, completely free forever." },
];

const HomePage = () => {
  const featured = getFeaturedTools().slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="section-padding text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
            Your go-to platform for{" "}
            <span className="text-gradient">free online tools</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            1000+ tools, calculators, guides, and comparisons. No signup, no cost, no limits.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/tools" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
              Explore Tools <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/calculators" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors">
              Try Calculators
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(f => (
            <div key={f.title} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
              <f.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading text-sm font-semibold text-foreground">{f.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AdSlot />

      {/* Niches */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground text-center mb-8">Explore Our Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {niches.map(n => <NicheCard key={n.href} {...n} />)}
          </div>
        </div>
      </section>

      {/* Featured tools */}
      <section className="section-padding bg-card border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">Popular Tools</h2>
            <Link href="/tools" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {featured.map(t => (
              <ItemCard key={t.slug} title={t.title} description={t.description} href={`/tools/${t.category}/${t.slug}`} badge={t.category} />
            ))}
          </div>
        </div>
      </section>

      <AdSlot />
    </>
  );
};

export default HomePage;
