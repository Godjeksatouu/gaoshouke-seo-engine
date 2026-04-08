import { notFound } from "next/navigation";
import calculators, { getCalculatorBySlug } from "@/lib/data/calculators";
import Breadcrumbs from "@/components/Breadcrumbs";

export function generateStaticParams() {
  return calculators.map((calc) => ({
    slug: calc.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const calc = getCalculatorBySlug(params.slug);
  if (!calc) return { title: "Calculator Not Found" };
  return {
    title: calc.title,
    description: calc.description,
    keywords: calc.keywords,
  };
}

export default function CalculatorPage({ params }: { params: { slug: string } }) {
  const calc = getCalculatorBySlug(params.slug);
  if (!calc) notFound();

  return (
    <>
      <Breadcrumbs items={[{ label: "Calculators", href: "/calculators" }, { label: calc.title }]} />
      <article className="section-padding pt-4">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary mb-3">
            {calc.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">{calc.title}</h1>
          <p className="text-muted-foreground mb-8 text-lg">{calc.description}</p>
          <div className="bg-card border border-border p-8 rounded-xl mb-8 flex flex-col items-center justify-center min-h-[300px]">
             <div className="text-center">
                <h2 className="text-xl font-bold mb-2">Calculator Interface</h2>
                <p className="text-muted-foreground">The functional interface for this calculator is being initialized.</p>
             </div>
          </div>
        </div>
      </article>
    </>
  );
}
