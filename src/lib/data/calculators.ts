export interface CalculatorItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  keywords: string;
  category: string;
  featured?: boolean;
}

const calcNames = [
  "Age Calculator", "Loan Calculator", "BMI Calculator", "Tip Calculator", "Percentage Calculator",
  "Mortgage Calculator", "Compound Interest Calculator", "Salary Calculator", "Tax Calculator", "GPA Calculator",
  "Calorie Calculator", "Body Fat Calculator", "Pregnancy Due Date Calculator", "Discount Calculator", "Fuel Cost Calculator",
  "Currency Converter", "Time Zone Converter", "Date Difference Calculator", "Unit Converter", "Area Calculator",
  "Volume Calculator", "Speed Calculator", "Temperature Converter", "Hex to RGB Converter", "Binary to Decimal",
];

const calcCategories = ["finance", "health", "math", "converter", "lifestyle"];

const calculators: CalculatorItem[] = Array.from({ length: 200 }).map((_, i) => {
  const name = i < calcNames.length ? calcNames[i] : `Calculator ${i + 1}`;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return {
    id: i,
    title: `Free ${name} Online`,
    slug,
    description: `Use our free ${name.toLowerCase()} online. Get instant, accurate results with no signup required.`,
    keywords: `${name.toLowerCase()}, free ${name.toLowerCase()}, online ${name.toLowerCase()}`,
    category: calcCategories[i % calcCategories.length],
    featured: i < 10,
  };
});

export default calculators;
export const getCalculatorBySlug = (slug: string) => calculators.find(c => c.slug === slug);
export const getCalculatorsByCategory = (cat: string) => calculators.filter(c => c.category === cat);
