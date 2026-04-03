export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
}

export function generateSEO(data: SEOData) {
  return {
    title: `${data.title} | GaoShouKe`,
    description: data.description,
    keywords: data.keywords || "",
    canonical: data.canonical || `https://gaoshouke.com`,
    ogType: data.ogType || "website",
  };
}

export const SITE_NAME = "GaoShouKe";
export const SITE_URL = "https://gaoshouke.com";
export const SITE_DESCRIPTION = "Free online tools, calculators, guides, and expert comparisons. Everything you need, no signup required.";
