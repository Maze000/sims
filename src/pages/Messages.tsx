import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useMobile } from "@/hooks/use-mobile";
import HeaderMaind from "@/components/HeaderMaind";
import { 
  ArrowLeft,
  Edit,
  Search, 
  User, 
  Wallet, 
  Heart, 
  Bookmark, 
  Moon, 
  Sun, 
  LogOut, 
  Settings,
  Home as HomeIcon,
  Compass,
  Send,
  Bell,
  ChevronDown,
  Menu,
  X,
  ChevronRight,
  Plus
} from "lucide-react";

const Messages = () => {
  const navigate = useNavigate();
  const { isMobile } = useMobile();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [user] = useState({
    username: "maze",
    avatar: "/placeholder.svg",
    wallet: 0.00,
    subscriptions: 0,
    bookmarks: 0
  });

  const handleLogout = () => {
    navigate("/");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' 
        : 'bg-gradient-to-br from-purple-50 via-white to-pink-50'
    }`}>
      <HeaderMaind isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} currentPage="messages" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Section - Messages Header */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className={`bg-white/80 rounded-lg shadow-lg border border-purple-100 p-4 transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-800/80 border-purple-800' : 'bg-white/80 border-purple-100'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`p-2 transition-colors duration-300 ${
                    isDarkMode ? 'hover:bg-purple-800/50' : 'hover:bg-purple-100'
                  }`}
                  onClick={() => navigate(-1)}
                >
                  <ArrowLeft className="h-5 w-5 text-purple-600" />
                </Button>
                <h1 className={`text-lg font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  Messages
                </h1>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`p-2 transition-colors duration-300 ${
                    isDarkMode ? 'hover:bg-purple-800/50' : 'hover:bg-purple-100'
                  }`}
                >
                  <Edit className="h-5 w-5 text-purple-600" />
                </Button>
              </div>

              {/* Conversations Section */}
              <div className="mb-6">
                <h2 className={`text-sm font-medium mb-3 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Conversations
                </h2>
                <p className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  You have no conversations
                </p>
              </div>
            </div>
          </div>

          {/* Main Content - Messages View */}
          <div className="flex-1">
            <div className={`rounded-lg shadow-lg border transition-colors duration-300 min-h-[500px] flex flex-col items-center justify-center ${
              isDarkMode ? 'bg-gray-800/80 border-purple-800' : 'bg-white/80 border-purple-100'
            }`}>
              {/* Messages Icon and Text */}
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <Send className="w-12 h-12 text-purple-600" />
                </div>
                <h1 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  Messages
                </h1>
                <p className={`text-sm mb-6 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Your message inbox
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full">
                  <Plus className="w-4 h-4 mr-2" />
                  New message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`mt-16 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-1">
              <div className="text-xl sm:text-2xl font-bold mb-4">
                <span className="logo-nu text-purple-600">NU</span>
                <span className={`logo-massage transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>MASSAGE</span>
              </div>
              <p className={`text-sm mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Keep connect with us! Follow us on any of these platforms
              </p>
              {/* Social Icons */}
              <div className="flex space-x-4">
                <a href="#" className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                }`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                }`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
                  </svg>
                </a>
                <a href="#" className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                }`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.749.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.747 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.017 0z" clipRule="evenodd"/>
                  </svg>
                </a>
                <a href="#" className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                }`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* About Section */}
            <div>
              <h3 className={`text-sm font-semibold mb-4 uppercase tracking-wider transition-colors duration-300 ${
                isDarkMode ? 'text-purple-400' : 'text-purple-600'
              }`}>
                About
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                  }`}>
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                  }`}>
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories Section */}
            <div>
              <h3 className={`text-sm font-semibold mb-4 uppercase tracking-wider transition-colors duration-300 ${
                isDarkMode ? 'text-purple-400' : 'text-purple-600'
              }`}>
                Categories
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className={`text-sm transition-colors duration-300 flex items-center ${
                    isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                  }`}>
                    Explore
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Links Section */}
            <div>
              <h3 className={`text-sm font-semibold mb-4 uppercase tracking-wider transition-colors duration-300 ${
                isDarkMode ? 'text-purple-400' : 'text-purple-600'
              }`}>
                Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                  }`}>
                    My Profile
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                  }`}>
                    Edit Profile
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                  }`}>
                    My subscriptions
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                  }`}>
                    Log out
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className={`mt-8 pt-8 border-t text-center transition-colors duration-300 ${
            isDarkMode ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <p className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              © 2025 <span className="text-purple-600">NU</span><span className={isDarkMode ? 'text-gray-200' : 'text-gray-900'}>MASSAGE</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Messages;
