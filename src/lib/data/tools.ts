export interface ToolItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  keywords: string;
  category: string;
  icon: string;
  featured?: boolean;
}

const toolNames = [
  "Word Counter", "Character Counter", "Image Compressor", "PDF Merger", "JSON Formatter",
  "Base64 Encoder", "URL Encoder", "HTML Minifier", "CSS Minifier", "JS Minifier",
  "Color Picker", "Gradient Generator", "Lorem Ipsum Generator", "Password Generator", "UUID Generator",
  "Hash Generator", "QR Code Generator", "Barcode Generator", "Favicon Generator", "Screenshot Tool",
  "Text to Speech", "Speech to Text", "Markdown Editor", "HTML to Markdown", "Markdown to HTML",
  "CSV to JSON", "JSON to CSV", "XML to JSON", "YAML to JSON", "Text Diff Tool",
  "Regex Tester", "Cron Expression Builder", "SQL Formatter", "Code Beautifier", "Placeholder Image Generator",
  "Meta Tag Generator", "Open Graph Checker", "Robots.txt Generator", "Sitemap Generator", "Schema Markup Generator",
  "Email Validator", "URL Shortener", "Link Checker", "DNS Lookup", "WHOIS Lookup",
  "IP Address Finder", "HTTP Header Checker", "SSL Checker", "Page Speed Tester", "Mobile Friendly Test",
];

const toolCategories = ["text", "image", "developer", "seo", "network", "converter", "generator", "security"];
const icons = ["FileText", "Image", "Code", "Search", "Globe", "ArrowRightLeft", "Wand2", "Shield"];

const tools: ToolItem[] = Array.from({ length: 1250 }).map((_, i) => {
  const catIdx = i % toolCategories.length;
  const category = toolCategories[catIdx];
  
  // Use real names for first batch, then smarter variations
  const baseName = i < toolNames.length 
    ? toolNames[i] 
    : `${category.charAt(0).toUpperCase() + category.slice(1)} Utility ${i + 1}`;
    
  const slug = baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  // Create more unique templates
  const titleTemplates = [
    `Free ${baseName} — Online Browser Utility`,
    `Premium ${baseName} Tool (100% Free)`,
    `Secure ${baseName} — Web-based App`,
    `Fast ${baseName} Online | No Signup`,
  ];
  
  const descTemplates = [
    `Use our free ${baseName.toLowerCase()} directly in your browser. Fast, secure, and no signup required.`,
    `Need a reliable ${baseName.toLowerCase()}? Our free online tool provides instant results with zero cost.`,
    `Optimize your workflow with our ${baseName.toLowerCase()}. Works on any device, completely free of charge.`,
  ];
  
  return {
    id: i,
    title: titleTemplates[i % titleTemplates.length],
    slug,
    description: descTemplates[i % descTemplates.length],
    keywords: `${baseName.toLowerCase()}, free ${baseName.toLowerCase()}, online utility, ${category} tool`,
    category,
    icon: icons[catIdx] || "Code",
    featured: i < 12,
  };
});


export default tools;

export function getToolBySlug(slug: string) {
  return tools.find(t => t.slug === slug);
}

export function getToolsByCategory(category: string) {
  return tools.filter(t => t.category === category);
}

export function getFeaturedTools() {
  return tools.filter(t => t.featured);
}
