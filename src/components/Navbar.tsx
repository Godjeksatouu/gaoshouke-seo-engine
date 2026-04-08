"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Wrench, BookOpen, HelpCircle, Calculator, GitCompare, FileText } from "lucide-react";

const navItems = [
  { label: "Tools", href: "/tools", icon: Wrench },
  { label: "Guides", href: "/guides", icon: BookOpen },
  { label: "How-To", href: "/how-to", icon: HelpCircle },
  { label: "Calculators", href: "/calculators", icon: Calculator },
  { label: "Comparisons", href: "/comparisons", icon: GitCompare },
  { label: "Blog", href: "/blog", icon: FileText },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-heading text-xl font-bold text-foreground">
            <Image src="https://res.cloudinary.com/dhdbxilef/image/upload/q_auto/f_auto/v1775182794/GaoShouKe_asu96q.png" alt="GaoShouKe Logo" width={32} height={32} className="w-8 h-8 rounded-lg" />
            GaoShouKe
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-muted-foreground" aria-label="Toggle menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-card">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-6 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
