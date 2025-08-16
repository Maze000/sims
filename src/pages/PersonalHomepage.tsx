import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Wallet, 
  Heart, 
  Bookmark, 
  Moon, 
  Sun, 
  LogOut, 
  Edit3, 
  Camera,
  Settings,
  CreditCard,
  Home,
  Compass,
  Send,
  Bell,
  ChevronDown,
  Search,
  Menu,
  X
} from "lucide-react";

const PersonalHomepage = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [user] = useState({
    username: "maze",
    avatar: "/placeholder.svg",
    coverImage: "/placeholder-cover.jpg",
    wallet: 0.00,
    subscriptions: 0,
    bookmarks: 0
  });

  const handleLogout = () => {
    // Handle logout logic here
    navigate("/");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Add dark mode toggle logic here
  };

  // Close dropdown when clicking outside
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
      {/* Header */}
      <header className={`backdrop-blur-sm shadow-sm border-b transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gray-800/95 border-purple-800' 
          : 'bg-white/95 border-purple-100'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-xl sm:text-2xl font-bold">
                <span className="logo-nu text-purple-600">NU</span>
                <span className={`logo-massage transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>massage</span>
              </div>
            </div>

            {/* Search Bar - Hidden on mobile, shown on tablet+ */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Find a Therapist"
                  className={`w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent placeholder-gray-500 transition-colors duration-300 ${
                    isDarkMode 
                      ? 'border-purple-700 bg-purple-900/50 text-gray-200' 
                      : 'border-purple-200 bg-purple-50/50 text-gray-900'
                  }`}
                />
              </div>
            </div>

            {/* Desktop Navigation Icons */}
            <div className="hidden sm:flex items-center space-x-2 lg:space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`p-2 transition-colors duration-300 ${
                  isDarkMode ? 'hover:bg-purple-800/50' : 'hover:bg-purple-100'
                }`}
                onClick={() => navigate("/dashboard")}
              >
                <Home className="h-5 w-5 text-purple-600" />
              </Button>
              <Button variant="ghost" size="sm" className={`p-2 transition-colors duration-300 ${
                isDarkMode ? 'hover:bg-purple-800/50' : 'hover:bg-purple-100'
              }`}>
                <Compass className="h-5 w-5 text-purple-600" />
              </Button>
              <Button variant="ghost" size="sm" className={`p-2 transition-colors duration-300 ${
                isDarkMode ? 'hover:bg-purple-800/50' : 'hover:bg-purple-100'
              }`}>
                <Send className="h-5 w-5 text-purple-600" />
              </Button>
              <Button variant="ghost" size="sm" className={`p-2 transition-colors duration-300 ${
                isDarkMode ? 'hover:bg-purple-800/50' : 'hover:bg-purple-100'
              }`}>
                <Bell className="h-5 w-5 text-purple-600" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className={`sm:hidden p-2 transition-colors duration-300 ${
                  isDarkMode ? 'hover:bg-purple-800/50' : 'hover:bg-purple-100'
                }`}
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? (
                  <X className="h-5 w-5 text-purple-600" />
                ) : (
                  <Menu className="h-5 w-5 text-purple-600" />
                )}
              </Button>
              
              {/* User Avatar with Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-1 p-1"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-300 text-gray-700'
                    }`}>
                      {user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className={`h-4 w-4 text-purple-600 transition-transform duration-200 ${
                    showUserMenu ? 'rotate-180' : ''
                  }`} />
                </Button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className={`absolute right-0 mt-2 w-64 sm:w-72 backdrop-blur-sm rounded-lg shadow-xl border z-50 transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-800/95 border-purple-800' 
                      : 'bg-white/95 border-purple-200'
                  }`}>
                    <div className="p-4">
                      {/* Wallet */}
                      <div className={`flex items-center justify-between mb-4 p-3 rounded transition-colors duration-300 ${
                        isDarkMode ? 'bg-purple-900/50' : 'bg-purple-50'
                      }`}>
                        <div className="flex items-center">
                          <Wallet className="h-4 w-4 mr-2 text-purple-600" />
                          <span className={`text-sm font-medium transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-700'
                          }`}>Wallet:</span>
                        </div>
                        <span className={`text-sm font-bold transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-900'
                        }`}>${user.wallet.toFixed(2)}</span>
                      </div>

                      {/* Menu Items */}
                      <div className="space-y-1">
                        <Button 
                          variant="ghost" 
                          className={`w-full justify-start text-sm transition-colors duration-300 ${
                            isDarkMode ? 'hover:bg-purple-800/50 text-gray-200' : 'hover:bg-purple-50 text-gray-700'
                          }`}
                          onClick={() => {
                            navigate("/profile");
                            setShowUserMenu(false);
                          }}
                        >
                          <User className="h-4 w-4 mr-3 text-purple-600" />
                          My profile
                        </Button>

                        <Button 
                          variant="ghost" 
                          className={`w-full justify-start text-sm transition-colors duration-300 ${
                            isDarkMode ? 'hover:bg-purple-800/50 text-gray-200' : 'hover:bg-purple-50 text-gray-700'
                          }`}
                        >
                          <Heart className="h-4 w-4 mr-3 text-purple-600" />
                          My subscriptions
                          <Badge variant="secondary" className={`ml-auto text-xs transition-colors duration-300 ${
                            isDarkMode ? 'bg-purple-800 text-purple-200' : 'bg-purple-100 text-purple-700'
                          }`}>
                            {user.subscriptions}
                          </Badge>
                        </Button>

                        <Button 
                          variant="ghost" 
                          className={`w-full justify-start text-sm transition-colors duration-300 ${
                            isDarkMode ? 'hover:bg-purple-800/50 text-gray-200' : 'hover:bg-purple-50 text-gray-700'
                          }`}
                        >
                          <Bookmark className="h-4 w-4 mr-3 text-purple-600" />
                          Bookmarks
                          <Badge variant="secondary" className={`ml-auto text-xs transition-colors duration-300 ${
                            isDarkMode ? 'bg-purple-800 text-purple-200' : 'bg-purple-100 text-purple-700'
                          }`}>
                            {user.bookmarks}
                          </Badge>
                        </Button>

                        <Button 
                          variant="ghost" 
                          className={`w-full justify-start text-sm transition-colors duration-300 ${
                            isDarkMode ? 'hover:bg-purple-800/50 text-gray-200' : 'hover:bg-purple-50 text-gray-700'
                          }`}
                          onClick={() => {
                            navigate("/explore");
                            setShowUserMenu(false);
                          }}
                        >
                          <Settings className="h-4 w-4 mr-3 text-purple-600" />
                          Become a creator!
                        </Button>

                        <Button 
                          variant="ghost" 
                          className={`w-full justify-start text-sm transition-colors duration-300 ${
                            isDarkMode ? 'hover:bg-purple-800/50 text-gray-200' : 'hover:bg-purple-50 text-gray-700'
                          }`}
                          onClick={toggleDarkMode}
                        >
                          {isDarkMode ? (
                            <Sun className="h-4 w-4 mr-3 text-purple-600" />
                          ) : (
                            <Moon className="h-4 w-4 mr-3 text-purple-600" />
                          )}
                          {isDarkMode ? 'Light' : 'Dark'} mode
                        </Button>

                        <hr className={`my-2 transition-colors duration-300 ${
                          isDarkMode ? 'border-purple-800' : 'border-purple-200'
                        }`} />

                        <Button 
                          variant="ghost" 
                          className={`w-full justify-start text-sm transition-colors duration-300 ${
                            isDarkMode 
                              ? 'text-red-400 hover:text-red-300 hover:bg-red-900/50' 
                              : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                          }`}
                          onClick={handleLogout}
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign out
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Edit Profile Button - Hidden on mobile */}
              <Button 
                className="hidden sm:flex bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full"
                onClick={() => navigate("/create-profile")}
              >
                Edit profile
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className={`sm:hidden border-t transition-colors duration-300 ${
              isDarkMode ? 'border-purple-800' : 'border-purple-200'
            }`}>
              <div className="px-3 py-4 space-y-3">
                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Find a Therapist"
                    className={`w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent placeholder-gray-500 transition-colors duration-300 ${
                      isDarkMode 
                        ? 'border-purple-700 bg-purple-900/50 text-gray-200' 
                        : 'border-purple-200 bg-purple-50/50 text-gray-900'
                    }`}
                  />
                </div>
                
                {/* Mobile Navigation */}
                <div className="grid grid-cols-4 gap-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`flex flex-col items-center p-3 h-auto transition-colors duration-300 ${
                      isDarkMode ? 'hover:bg-purple-800/50' : 'hover:bg-purple-100'
                    }`}
                    onClick={() => {
                      navigate("/dashboard");
                      setShowMobileMenu(false);
                    }}
                  >
                    <Home className="h-5 w-5 text-purple-600 mb-1" />
                    <span className={`text-xs transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>Home</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`flex flex-col items-center p-3 h-auto transition-colors duration-300 ${
                      isDarkMode ? 'hover:bg-purple-800/50' : 'hover:bg-purple-100'
                    }`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Compass className="h-5 w-5 text-purple-600 mb-1" />
                    <span className={`text-xs transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>Explore</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`flex flex-col items-center p-3 h-auto transition-colors duration-300 ${
                      isDarkMode ? 'hover:bg-purple-800/50' : 'hover:bg-purple-100'
                    }`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Send className="h-5 w-5 text-purple-600 mb-1" />
                    <span className={`text-xs transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>Messages</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`flex flex-col items-center p-3 h-auto transition-colors duration-300 ${
                      isDarkMode ? 'hover:bg-purple-800/50' : 'hover:bg-purple-100'
                    }`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Bell className="h-5 w-5 text-purple-600 mb-1" />
                    <span className={`text-xs transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>Alerts</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Profile Section */}
        <div className={`backdrop-blur-sm rounded-lg shadow-lg border mb-6 sm:mb-8 transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gray-800/80 border-purple-800' 
            : 'bg-white/80 border-purple-100'
        }`}>
          {/* Cover Image */}
          <div className="relative h-32 sm:h-48 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-lg">
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-white/20 hover:bg-white/30 text-white border-0 rounded-full backdrop-blur-sm text-xs sm:text-sm"
            >
              <Camera className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Change cover</span>
              <span className="sm:hidden">Cover</span>
            </Button>
          </div>

          {/* Profile Info */}
          <div className={`relative px-3 sm:px-6 pb-4 sm:pb-6 transition-colors duration-300 ${
            isDarkMode ? 'bg-purple-900/50' : 'bg-purple-50/50'
          }`}>
            <div className="flex items-end -mt-8 sm:-mt-16 mb-3 sm:mb-4">
              <Avatar className="h-16 w-16 sm:h-32 sm:w-32 border-2 sm:border-4 border-white">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback className={`text-lg sm:text-2xl transition-colors duration-300 ${
                  isDarkMode ? 'bg-purple-700 text-purple-200' : 'bg-purple-200 text-purple-700'
                }`}>
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div>
                <h1 className={`text-xl sm:text-3xl font-bold mb-1 sm:mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  {user.username}
                </h1>
              </div>
              
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-full sm:w-auto"
                onClick={() => navigate("/create-profile")}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit profile
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PersonalHomepage;
