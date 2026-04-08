'use client';

import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ItemCard from "@/components/ItemCard";
import AdBanner from "@/components/AdBanner";

interface CategoryPageClientProps {
  title: string;
  description: string;
  basePath: string;
  items: any[];
  categories?: string[];
  itemMetaKey?: string;
  hrefBuilder?: (item: any) => string;
}

const CategoryPageClient = ({ 
  title, 
  description, 
  basePath, 
  items, 
  categories = [], 
  itemMetaKey,
  hrefBuilder
}: CategoryPageClientProps) => {
  const [cat, setCat] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = items.filter(t => {
    const matchCat = cat === "all" || t.category === cat;
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const getHref = (item: any) => {
    if (hrefBuilder) return hrefBuilder(item);
    return `/${basePath}/${item.slug}`;
  };

  return (
    <>
      <Breadcrumbs items={[{ label: title }]} />

      <section className="section-padding pt-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">{title}</h1>
          <p className="text-muted-foreground mb-6">{description}</p>

          <AdBanner slot="TOP" />

          <div className="flex flex-col sm:flex-row gap-3 mb-6 mt-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={`Search ${title.toLowerCase()}...`}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-card border border-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            {categories.length > 0 && (
              <div className="flex gap-1.5 flex-wrap">
                <button
                  onClick={() => setCat("all")}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${cat === "all" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
                >
                  All
                </button>
                {categories.map(c => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${cat === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
                  >
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.slice(0, 60).map(item => (
              <ItemCard 
                key={item.slug || item.id} 
                title={item.title} 
                description={item.description} 
                href={getHref(item)} 
                badge={item.category}
                meta={itemMetaKey ? item[itemMetaKey] : undefined}
              />
            ))}
          </div>

          {filtered.length > 60 && (
            <p className="text-center text-sm text-muted-foreground mt-8">Showing 60 of {filtered.length} entries. Use search to find more.</p>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20 border border-dashed border-border rounded-xl">
              <p className="text-muted-foreground">No matches found for your search.</p>
              <button onClick={() => {setSearch(""); setCat("all");}} className="mt-4 text-primary hover:underline font-medium text-sm">Clear all filters</button>
            </div>
          )}

          <AdBanner slot="BOTTOM" />
        </div>
      </section>
    </>
  );
};

export default CategoryPageClient;
