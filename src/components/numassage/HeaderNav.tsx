import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#packages" },
  { label: "About", href: "#about" },
  { label: "Therapists", href: "#therapists" },
  { label: "Gift Cards", href: "#gift-cards" },
  { label: "Contact", href: "#contact" },
];

const HeaderNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <a href="#home" className="flex items-center gap-2" aria-label="Numasage home">
          <div className="text-2xl font-display">Numasage</div>
        </a>

        <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm hover:underline story-link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="icon" aria-label="Cart">
            <ShoppingCart />
          </Button>
          <Button variant="gold" asChild>
            <a href="#booking" aria-label="Book a session">Book</a>
          </Button>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <Menu />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t">
          <nav className="container mx-auto px-4 py-3 grid gap-3" aria-label="Mobile">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="py-2" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <div className="flex items-center gap-2 pt-2">
              <Button variant="gold" className="flex-1" asChild>
                <a href="#booking">Book</a>
              </Button>
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingCart />
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default HeaderNav;
