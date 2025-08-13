import { Facebook, Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="text-2xl font-display mb-2">Numasage</div>
          <p className="text-sm text-muted-foreground">
            Premium therapeutic massage in a serene spa setting.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Services", href: "#services" },
              { label: "Packages", href: "#packages" },
              { label: "About", href: "#about" },
              { label: "Gift Cards", href: "#gift-cards" },
            ].map((l) => (
              <li key={l.href}><a href={l.href} className="hover:underline story-link">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +64 000 0000</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@numasage.com</li>
          </ul>
          <div className="flex gap-3 mt-3">
            <a href="#" aria-label="Facebook" className="p-2 rounded-full border hover:bg-accent/40"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram" className="p-2 rounded-full border hover:bg-accent/40"><Instagram className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Payments</h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {['Visa', 'MasterCard', 'PayPal', 'Amex'].map((p) => (
              <span key={p} className="px-2 py-1 border rounded-md">{p}</span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">© {new Date().getFullYear()} Numasage. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
