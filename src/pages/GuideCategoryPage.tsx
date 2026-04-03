import { useParams } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import ItemCard from "@/components/ItemCard";
import AdSlot from "@/components/AdSlot";
import { getGuidesByCategory, guideCategories } from "@/lib/data/guides";

const GuideCategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const catInfo = guideCategories.find(c => c.slug === category);
  const items = getGuidesByCategory(category || "");

  if (!catInfo) return <div className="section-padding text-center"><h1 className="text-2xl font-heading font-bold">Category Not Found</h1></div>;

  return (
    <>
      <SEOHead title={catInfo.name} description={catInfo.description} keywords={`${catInfo.slug} guides, ${catInfo.slug} tutorials`} />
      <Breadcrumbs items={[{ label: "Guides", href: "/guides" }, { label: catInfo.name }]} />

      <section className="section-padding pt-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">{catInfo.name}</h1>
          <p className="text-muted-foreground mb-6">{catInfo.description}</p>
          <AdSlot />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
            {items.slice(0, 60).map(g => (
              <ItemCard key={g.slug} title={g.title} description={g.description} href={`/guides/${category}?article=${g.slug}`} meta={g.readTime} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default GuideCategoryPage;
