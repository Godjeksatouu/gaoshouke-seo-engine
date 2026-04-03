export interface HowToItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  keywords: string;
  steps: string[];
  relatedTools: string[];
}

const howToTopics = [
  "Convert JPG to PDF", "Clear Browser Cache", "Take a Screenshot on Mac", "Reset Your Router",
  "Create a Strong Password", "Compress an Image", "Merge PDF Files", "Convert CSV to JSON",
  "Check Website Speed", "Generate a QR Code", "Find Your IP Address", "Validate an Email",
  "Minify JavaScript", "Format JSON Data", "Encode Base64 Text", "Generate a UUID",
  "Create a Favicon", "Test Regular Expressions", "Build a Sitemap", "Check SSL Certificate",
  "Remove Image Background", "Convert Markdown to HTML", "Calculate Loan Payments",
  "Build a Budget Spreadsheet", "Train a New Puppy",
];

const howtos: HowToItem[] = Array.from({ length: 200 }).map((_, i) => {
  const topic = i < howToTopics.length ? howToTopics[i] : `Solve Problem ${i + 1} Step by Step`;
  const slug = `how-to-${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
  return {
    id: i,
    title: `How to ${topic}`,
    slug,
    description: `Learn how to ${topic.toLowerCase()} with our easy step-by-step guide. Free, fast, no signup required.`,
    keywords: `how to ${topic.toLowerCase()}, ${topic.toLowerCase()} guide, ${topic.toLowerCase()} tutorial`,
    steps: [
      `Open the ${topic.split(' ').slice(-1)} tool`,
      "Follow the on-screen instructions",
      "Configure your settings",
      "Click the action button",
      "Download or copy your result",
    ],
    relatedTools: [`tool-${(i % 50) + 1}`, `tool-${((i + 10) % 50) + 1}`],
  };
});

export default howtos;
export const getHowToBySlug = (slug: string) => howtos.find(h => h.slug === slug);
