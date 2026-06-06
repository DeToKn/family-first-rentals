import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Rentals", href: "#rentals" },
  { label: "Packages", href: "#packages" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Book Now", href: "#book" },
];

const SiteNav = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-[hsl(var(--primary-dark)/0.4)]">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="text-xl text-primary">♛</span>
          <span className="font-display text-primary text-base">Family First Event Rentals</span>
        </a>
        <ul className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="text-white text-[0.68rem] font-semibold tracking-[0.18em] uppercase hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="tel:4045209004" className="hidden md:inline-flex ff-btn-gold !px-4 !py-2">
          404-520-9004
        </a>
        <button
          className="md:hidden text-primary"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[hsl(var(--primary-dark)/0.4)] px-6 py-4 space-y-3 bg-background">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-white text-sm font-semibold tracking-wider uppercase hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <a href="tel:4045209004" className="ff-btn-gold w-full !px-4 !py-2">
            Call 404-520-9004
          </a>
        </div>
      )}
    </nav>
  );
};

export default SiteNav;