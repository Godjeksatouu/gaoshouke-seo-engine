'use client';

import tools from "@/lib/data/tools";
import CategoryPageClient from "@/components/CategoryPageClient";

const categories = ["text", "image", "developer", "seo", "network", "converter", "generator", "security"];

const ToolsPageClient = () => {
  return (
    <CategoryPageClient 
      title="Free Online Tools"
      description="1200+ tools for every task. Fast, free, no signup."
      basePath="tools"
      items={tools}
      categories={categories}
      hrefBuilder={(t) => `/tools/${t.category}/${t.slug}`}
    />
  );
};

export default ToolsPageClient;
