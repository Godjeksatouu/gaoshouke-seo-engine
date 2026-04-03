import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Tools",
    links: [
      { label: "All Tools", href: "/tools" },
      { label: "Word Counter", href: "/tools/word-counter" },
      { label: "Image Compressor", href: "/tools/image-compressor" },
      { label: "JSON Formatter", href: "/tools/json-formatter" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Guides", href: "/guides" },
      { label: "How-To", href: "/how-to" },
      { label: "Blog", href: "/blog" },
      { label: "Comparisons", href: "/comparisons" },
    ],
  },
  {
    title: "Calculators",
    links: [
      { label: "All Calculators", href: "/calculators" },
      { label: "Age Calculator", href: "/calculators/age-calculator" },
      { label: "Loan Calculator", href: "/calculators/loan-calculator" },
      { label: "BMI Calculator", href: "/calculators/bmi-calculator" },
    ],
  },
];

const Footer = () => (
  <footer className="border-t border-border bg-card mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="font-heading text-lg font-bold text-foreground">GaoShouKe</Link>
          <p className="mt-2 text-sm text-muted-foreground">Free online tools, calculators, and expert guides. No signup required.</p>
        </div>
        {footerLinks.map(section => (
          <div key={section.title}>
            <h3 className="font-heading text-sm font-semibold text-foreground mb-3">{section.title}</h3>
            <ul className="space-y-2">
              {section.links.map(link => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10 pt-6 border-t border-border text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} GaoShouKe. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
