import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

// MaoriPattern Component
const MaoriPattern = ({ pattern }: { pattern: 'koru' | 'wave' }) => {
  if (pattern === 'koru') {
    return (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="koru-pattern-footer" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M50 50 Q30 30 50 10 Q70 30 50 50 Q30 70 50 90 Q70 70 50 50" 
                  fill="none" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth="1" 
                  opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#koru-pattern-footer)" />
      </svg>
    );
  }
  
  if (pattern === 'wave') {
    return (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="wave-pattern-footer" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M0 40 Q20 20 40 40 T80 40" 
                  fill="none" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth="1" 
                  opacity="0.2"/>
            <path d="M0 60 Q20 40 40 60 T80 60" 
                  fill="none" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth="1" 
                  opacity="0.2"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wave-pattern-footer)" />
      </svg>
    );
  }
  
  return null;
};

const Footer = () => {
  return (
    <footer className="border-t-4 relative" style={{background: 'hsl(var(--background))', borderColor: 'hsl(var(--primary))'}}>
      {/* Maori Patterns for Footer */}
      <div className="absolute inset-0 opacity-15 pointer-events-none z-0">
        <div className="absolute inset-0">
          <MaoriPattern pattern="wave" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Link to="/" className="text-2xl sm:text-3xl font-bold">
                <span style={{color: 'hsl(var(--foreground))'}}>SIMS</span>
              </Link>
            </div>
            <p className="text-sm sm:text-base mb-4 font-medium" style={{color: 'hsl(var(--muted-foreground))'}}>
              New Zealand's premier service marketplace. Connect directly with local service providers.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2 rounded-full bg-white/60 backdrop-blur-md border-2 hover:scale-105 transition-transform" style={{borderColor: 'hsl(var(--primary))'}}>
                <Facebook className="w-4 h-4" style={{color: 'hsl(var(--primary))'}} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/60 backdrop-blur-md border-2 hover:scale-105 transition-transform" style={{borderColor: 'hsl(var(--secondary))'}}>
                <Twitter className="w-4 h-4" style={{color: 'hsl(var(--secondary))'}} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/60 backdrop-blur-md border-2 hover:scale-105 transition-transform" style={{borderColor: 'hsl(var(--highlight))'}}>
                <Instagram className="w-4 h-4" style={{color: 'hsl(var(--highlight))'}} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4" style={{color: 'hsl(var(--primary))'}}>Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/explore" className="text-sm sm:text-base transition-colors font-medium" style={{color: 'hsl(var(--muted-foreground))'}} onMouseEnter={(e) => e.target.style.color = 'hsl(var(--primary))'} onMouseLeave={(e) => e.target.style.color = 'hsl(var(--muted-foreground))'}>
                  Find Your Sims
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm sm:text-base transition-colors font-medium" style={{color: 'hsl(var(--muted-foreground))'}} onMouseEnter={(e) => e.target.style.color = 'hsl(var(--primary))'} onMouseLeave={(e) => e.target.style.color = 'hsl(var(--muted-foreground))'}>
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/create-profile" className="text-sm sm:text-base transition-colors font-medium" style={{color: 'hsl(var(--muted-foreground))'}} onMouseEnter={(e) => e.target.style.color = 'hsl(var(--primary))'} onMouseLeave={(e) => e.target.style.color = 'hsl(var(--muted-foreground))'}>
                  List Your Services
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-base transition-colors font-medium" style={{color: 'hsl(var(--muted-foreground))'}} onMouseEnter={(e) => e.target.style.color = 'hsl(var(--primary))'} onMouseLeave={(e) => e.target.style.color = 'hsl(var(--muted-foreground))'}>
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-emerald-600 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm sm:text-base text-slate-700 hover:text-emerald-600 transition-colors font-medium">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-base text-slate-700 hover:text-emerald-600 transition-colors font-medium">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-base text-slate-700 hover:text-emerald-600 transition-colors font-medium">
                  Safety Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-base text-slate-700 hover:text-emerald-600 transition-colors font-medium">
                  Report Issue
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-amber-600 mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-sm sm:text-base text-slate-700 font-medium">hello@sims.co.nz</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-sm sm:text-base text-slate-700 font-medium">+64 9 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span className="text-sm sm:text-base text-slate-700 font-medium">Auckland, New Zealand</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t-2 border-white/30">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2 text-sm sm:text-base text-slate-700 font-medium">
              <span>© 2024 SIMS Platform. Made with</span>
              <Heart className="w-4 h-4 text-emerald-600 fill-current" />
              <span>in New Zealand</span>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6">
              <a href="#" className="text-sm sm:text-base text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Terms of Service
              </a>
              <a href="#" className="text-sm sm:text-base text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Privacy Policy
              </a>
              <a href="#" className="text-sm sm:text-base text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
