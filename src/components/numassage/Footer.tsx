import { Facebook, Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-gradient-orange-pink">
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="text-center sm:text-left">
            <div className="text-xl sm:text-2xl font-display mb-2 text-white">Numassage at Home</div>
            <p className="text-sm text-white/90 leading-relaxed">
              Premium therapeutic massage in the comfort of your home.
            </p>
          </div>
          
          <div className="text-center sm:text-left">
            <h3 className="font-semibold mb-3 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Services", href: "#services" },
                { label: "Packages", href: "#packages" },
                { label: "About", href: "#about" },
                { label: "Gift Cards", href: "#gift-cards" },
              ].map((l) => (
                <li key={l.href}>
                  <a 
                    href={l.href} 
                    className="hover:underline text-white/80 hover:text-white transition-colors touch-target block py-1"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="text-center sm:text-left">
            <h3 className="font-semibold mb-3 text-white">Contact</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-center gap-2 justify-center sm:justify-start">
                <Phone className="h-4 w-4 text-white flex-shrink-0" /> 
                <span>+64 000 0000</span>
              </li>
              <li className="flex items-center gap-2 justify-center sm:justify-start">
                <Mail className="h-4 w-4 text-white flex-shrink-0" /> 
                <span>hello@numasage.com</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-3 justify-center sm:justify-start">
              <button 
                aria-label="Facebook" 
                className="p-2 rounded-full border border-white/30 hover:bg-white/20 text-white transition-colors touch-target"
                onClick={(e) => {
                  e.preventDefault();
                  // TODO: Implement Facebook link
                  console.log('Facebook clicked');
                }}
              >
                <Facebook className="h-4 w-4" />
              </button>
              <button 
                aria-label="Instagram" 
                className="p-2 rounded-full border border-white/30 hover:bg-white/20 text-white transition-colors touch-target"
                onClick={(e) => {
                  e.preventDefault();
                  // TODO: Implement Instagram link
                  console.log('Instagram clicked');
                }}
              >
                <Instagram className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="text-center sm:text-left">
            <h3 className="font-semibold mb-3 text-white">Payments</h3>
            <div className="flex flex-wrap gap-3 md:gap-4 justify-center sm:justify-start">
              {/* Visa */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-7 sm:w-12 sm:h-8 bg-white rounded-md flex items-center justify-center p-1">
                  <svg viewBox="0 0 48 16" className="w-full h-full">
                    <path d="M44.1 0H3.9C1.7 0 0 1.7 0 3.9v8.2C0 14.3 1.7 16 3.9 16h40.2c2.2 0 3.9-1.7 3.9-3.9V3.9C48 1.7 46.3 0 44.1 0z" fill="#1A1F71"/>
                    <path d="M20.1 11.5l-2.1-8.5h2.5l2.1 8.5h-2.5zm-4.2 0l-2.1-8.5h2.5l2.1 8.5h-2.5zm-4.2 0l-2.1-8.5h2.5l2.1 8.5h-2.5zm-4.2 0l-2.1-8.5h2.5l2.1 8.5h-2.5z" fill="#fff"/>
                  </svg>
                </div>
                <span className="text-white/80 text-xs">Visa</span>
              </div>
              
              {/* MasterCard */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-7 sm:w-12 sm:h-8 bg-white rounded-md flex items-center justify-center p-1">
                  <svg viewBox="0 0 48 16" className="w-full h-full">
                    <circle cx="16" cy="8" r="6" fill="#EB001B"/>
                    <circle cx="32" cy="8" r="6" fill="#F79E1B"/>
                    <path d="M24 2C20.7 2 17.8 4.9 17.8 8.5c0 3.6 2.9 6.5 6.2 6.5s6.2-2.9 6.2-6.5C30.2 4.9 27.3 2 24 2z" fill="#FF5F00"/>
                  </svg>
                </div>
                <span className="text-white/80 text-xs">MasterCard</span>
              </div>
              
              {/* PayPal */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-7 sm:w-12 sm:h-8 bg-white rounded-md flex items-center justify-center p-1">
                  <svg viewBox="0 0 48 16" className="w-full h-full">
                    <path d="M44.1 0H3.9C1.7 0 0 1.7 0 3.9v8.2C0 14.3 1.7 16 3.9 16h40.2c2.2 0 3.9-1.7 3.9-3.9V3.9C48 1.7 46.3 0 44.1 0z" fill="#003087"/>
                    <path d="M32.5 4.5c-0.3-0.2-0.7-0.3-1.1-0.3h-3.2l-1.2 6.8h2.5l0.3-1.8h1.8c1.5 0 2.7-0.8 3-2.2 0.2-0.8 0-1.5-0.3-1.5z" fill="#009CDE"/>
                    <path d="M24.5 4.5c-0.3-0.2-0.7-0.3-1.1-0.3h-3.2l-1.2 6.8h2.5l0.3-1.8h1.8c1.5 0 2.7-0.8 3-2.2 0.2-0.8 0-1.5-0.3-1.5z" fill="#009CDE"/>
                  </svg>
                </div>
                <span className="text-white/80 text-xs">PayPal</span>
              </div>
              
              {/* American Express */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-7 sm:w-12 sm:h-8 bg-white rounded-md flex items-center justify-center p-1">
                  <svg viewBox="0 0 48 16" className="w-full h-full">
                    <path d="M44.1 0H3.9C1.7 0 0 1.7 0 3.9v8.2C0 14.3 1.7 16 3.9 16h40.2c2.2 0 3.9-1.7 3.9-3.9V3.9C48 1.7 46.3 0 44.1 0z" fill="#006FCF"/>
                    <path d="M24 2L20 8l4 6 4-6-4-6z" fill="#fff"/>
                    <path d="M16 8l4 6 4-6-4-6-4 6z" fill="#fff"/>
                  </svg>
                </div>
                <span className="text-white/80 text-xs">Amex</span>
              </div>
            </div>
            <p className="text-xs text-white/70 mt-4 text-center sm:text-left">© {new Date().getFullYear()} Numassage at Home. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
