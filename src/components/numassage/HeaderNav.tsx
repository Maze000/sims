import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#packages" },
  { label: "About", href: "#about" },

  { label: "Gift Cards", href: "#gift-cards" },
  { label: "Contact", href: "#contact" },
];

const HeaderNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto flex items-center justify-between py-3 md:py-4 px-4 md:px-6">
        <a 
          href="#home" 
          className="flex items-center gap-2" 
          aria-label="Numassage at Home home"
          onClick={(e) => {
            e.preventDefault();
            const element = document.querySelector('#home') as HTMLElement;
            if (element) {
              const headerHeight = 80; // Height of fixed header
              const elementPosition = element.offsetTop - headerHeight;
              window.scrollTo({
                top: elementPosition,
                behavior: 'smooth',
                left: 0 // Ensure no horizontal movement
              });
            }
          }}
        >
          <div className="logo-elegant text-xl sm:text-2xl tracking-wider leading-tight">
            <span className="brand-name">Numassage</span>
            <span className="brand-connector"> at </span>
            <span className="brand-location">Home</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-4 lg:gap-6" aria-label="Primary">
                      {navItems.map((item) => (
              <a 
                key={item.href} 
                href={item.href} 
                className="text-sm hover:underline story-link mobile-transition-colors"
                            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector(item.href) as HTMLElement;
              if (element) {
                const headerHeight = 80; // Height of fixed header
                const elementPosition = element.offsetTop - headerHeight;
                window.scrollTo({
                  top: elementPosition,
                  behavior: 'smooth',
                  left: 0 // Ensure no horizontal movement
                });
              }
            }}
              >
                {item.label}
              </a>
            ))}
        </nav>

        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Cart"
            className="touch-target mobile-transition"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button 
            variant="gold" 
            className="touch-target mobile-transition"
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector('#booking') as HTMLElement;
              if (element) {
                const headerHeight = 80; // Height of fixed header
                const elementPosition = element.offsetTop - headerHeight;
                window.scrollTo({
                  top: elementPosition,
                  behavior: 'smooth',
                  left: 0 // Ensure no horizontal movement
                });
              }
            }}
          >
            Book
          </Button>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border touch-target mobile-transition"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-sm">
          <nav className="container mx-auto px-4 py-4 space-y-3" aria-label="Mobile">
            {navItems.map((item) => (
              <a 
                key={item.href} 
                href={item.href} 
                className="block py-3 px-2 text-base hover:bg-muted/50 rounded-md mobile-transition-colors touch-target"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  const element = document.querySelector(item.href) as HTMLElement;
                  if (element) {
                    const headerHeight = 80; // Height of fixed header
                    const elementPosition = element.offsetTop - headerHeight;
                    window.scrollTo({
                      top: elementPosition,
                      behavior: 'smooth',
                      left: 0 // Ensure no horizontal movement
                    });
                  }
                }}
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t">
              <Button 
                variant="gold" 
                className="w-full touch-target mobile-transition"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  const element = document.querySelector('#booking') as HTMLElement;
                  if (element) {
                    const headerHeight = 80; // Height of fixed header
                    const elementPosition = element.offsetTop - headerHeight;
                    window.scrollTo({
                      top: elementPosition,
                      behavior: 'smooth',
                      left: 0 // Ensure no horizontal movement
                    });
                  }
                }}
              >
                Book Now
              </Button>
              <Button 
                variant="ghost" 
                className="w-full touch-target mobile-transition"
                onClick={(e) => {
                  e.preventDefault();
                  // TODO: Implement cart functionality
                  console.log('Cart clicked');
                }}
              >
                View Cart
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default HeaderNav;
