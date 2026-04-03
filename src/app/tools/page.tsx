import type { Metadata } from 'next';
import ToolsPageClient from './ToolsPageClient';
import { SITE_DESCRIPTION } from "@/lib/seo";

export const metadata: Metadata = {
  title: 'All Free Tools & Utilities - GaoShouKe',
  description: 'Browse 1200+ free online tools for developers, designers, and writers. No signup required.',
  keywords: 'free tools, online tools, developer tools, text tools, image tools',
  alternates: {
    canonical: 'https://gaoshouke.com/tools',
  },
};

export default function ToolsPage() {
  return <ToolsPageClient />;
}
