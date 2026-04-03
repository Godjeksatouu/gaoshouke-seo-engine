import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface NicheCardProps {
  title: string;
  description: string;
  href: string;
  count: number;
  colorClass: string;
}

const NicheCard = ({ title, description, href, count, colorClass }: NicheCardProps) => (
  <Link
    href={href}
    className="group block p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
  >
    <div className={`w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center text-primary-foreground text-sm font-bold mb-4`}>
      {title[0]}
    </div>
    <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-sm text-muted-foreground mt-1 mb-3">{description}</p>
    <div className="flex items-center justify-between">
      <span className="text-xs text-muted-foreground">{count}+ pages</span>
      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
    </div>
  </Link>
);

export default NicheCard;
