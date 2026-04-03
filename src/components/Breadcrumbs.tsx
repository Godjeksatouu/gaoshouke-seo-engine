import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => (
  <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 lg:px-8">
    <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
      <li>
        <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span className="sr-only sm:not-sr-only">Home</span>
        </Link>
      </li>
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5 text-border" />
          {item.href ? (
            <Link href={item.href} className="hover:text-foreground transition-colors">{item.label}</Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;
