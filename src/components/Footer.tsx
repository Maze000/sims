import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';


const Footer = () => {
  return (
    <footer className="border-t-4 relative" style={{background: 'linear-gradient(135deg, rgba(0, 188, 212, 1) 0%, rgba(76, 175, 80, 1) 100%)', borderColor: 'hsl(var(--primary))'}}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Link to="/" className="text-2xl sm:text-3xl font-bold">
                <span style={{color: 'white'}}>SIMS</span>
              </Link>
            </div>
            <p className="text-sm sm:text-base mb-4 font-medium text-slate-700">
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
                <Instagram className="w-4 h-4" style={{color: 'hsl(var(--highlight))', filter: 'brightness(0.85)'}} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4" style={{color: 'rgba(156, 39, 176, 1)'}}>Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/explore" className="text-sm sm:text-base text-slate-700 hover:text-emerald-600 transition-colors font-medium">
                  Find Your Sims
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm sm:text-base text-slate-700 hover:text-emerald-600 transition-colors font-medium">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/create-profile" className="text-sm sm:text-base text-slate-700 hover:text-emerald-600 transition-colors font-medium">
                  List Your Services
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm sm:text-base text-slate-700 hover:text-emerald-600 transition-colors font-medium">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-emerald-600 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-sm sm:text-base text-slate-700 hover:text-emerald-600 transition-colors font-medium">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-sm sm:text-base text-slate-700 hover:text-emerald-600 transition-colors font-medium">
                  Safety Guidelines
                </Link>
              </li>
              <li>
                <Link to="/report" className="text-sm sm:text-base text-slate-700 hover:text-emerald-600 transition-colors font-medium">
                  Report Issue
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4" style={{color: 'rgba(0, 120, 140, 1)'}}>Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span className="text-sm sm:text-base text-slate-700 font-medium">Auckland, New Zealand</span>
              </div>
              <div>
                <Link to="/contact" className="text-sm sm:text-base text-slate-700 hover:text-emerald-600 transition-colors font-medium">
                  Contact Us
                </Link>
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
              <Link to="/terms" className="text-sm sm:text-base text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-sm sm:text-base text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="text-sm sm:text-base text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
