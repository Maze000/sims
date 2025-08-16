import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

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

  // Close menu when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (open && !target.closest('.mobile-menu-container')) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [open]);

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
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border touch-target mobile-transition hover:bg-muted/50"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-sm">
          <div className="mobile-menu-container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-sm h-[80vh] max-h-[600px] bg-background/95 backdrop-blur-md rounded-2xl shadow-2xl border overflow-hidden">
            <div className="flex flex-col h-full">
              {/* Header del menú móvil */}
              <div className="flex items-center justify-between p-4 border-b">
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-md hover:bg-muted/50 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
                <h3 className="text-lg font-semibold">Menu</h3>
                <div className="w-10"></div> {/* Spacer para centrar el título */}
              </div>

              {/* Navegación */}
              <nav className="flex-1 p-4 space-y-2 overflow-y-auto" aria-label="Mobile">
                {navItems.map((item, index) => (
                  <a 
                    key={item.href} 
                    href={item.href} 
                    className="block py-3 px-4 text-base hover:bg-muted/50 rounded-lg transition-all duration-200 touch-target group"
                    style={{ animationDelay: `${index * 50}ms` }}
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
                    <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                      {item.label}
                    </span>
                  </a>
                ))}
              </nav>

              {/* Botones de acción */}
              <div className="p-4 border-t space-y-3">
                <Button 
                  variant="gold" 
                  className="w-full touch-target mobile-transition h-12 text-base"
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
                  variant="outline" 
                  className="w-full touch-target mobile-transition h-12 text-base"
                  onClick={(e) => {
                    e.preventDefault();
                    // TODO: Implement cart functionality
                    console.log('Cart clicked');
                  }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderNav;
