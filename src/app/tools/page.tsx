import type { Metadata } from 'next';
import ToolsPageClient from './ToolsPageClient';
import { SITE_DESCRIPTION } from "@/lib/seo";

export const metadata: Metadata = {
  title: 'Free Online Tools Catalog - GaoShouKe',
  description: 'Explore our complete catalog of 1200+ free online tools. Text utilities, image converters, developer tools, and more. All free, no signup required.',
  keywords: 'free tools, online tools, developer tools, text tools, image tools, converter tools, online utilities',
  alternates: {
    canonical: 'https://gaoshouke.com/tools',
  },
};

export default function ToolsPage() {
  return <ToolsPageClient />;
}
