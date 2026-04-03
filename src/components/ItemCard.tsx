import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ItemCardProps {
  title: string;
  description: string;
  href: string;
  badge?: string;
  meta?: string;
}

const ItemCard = ({ title, description, href, badge, meta }: ItemCardProps) => (
  <Link
    href={href}
    className="group block p-5 rounded-lg bg-card border border-border hover:border-primary/20 hover:shadow-md transition-all duration-200 animate-fade-in"
  >
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        {badge && (
          <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary mb-2">{badge}</span>
        )}
        <h3 className="font-heading text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">{title}</h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{description}</p>
        {meta && <p className="text-xs text-muted-foreground mt-2">{meta}</p>}
      </div>
      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
    </div>
  </Link>
);

export default ItemCard;
