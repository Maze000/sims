import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Wallet, 
  Heart, 
  Bookmark, 
  Moon, 
  Sun, 
  LogOut, 
  Edit3, 
  Settings,
  Home as HomeIcon,
  Compass,
  Send,
  Bell,
  ChevronDown,
  Search,
  Menu,
  X
} from "lucide-react";

interface HeaderProps {
  isDarkMode?: boolean;
  setIsDarkMode?: (value: boolean) => void;
  currentPage?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  isDarkMode = false, 
  setIsDarkMode,
  currentPage = ""
}) => {
  const navigate = useNavigate();
  const [localDarkMode, setLocalDarkMode] = useState(isDarkMode);
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

  const effectiveDarkMode = setIsDarkMode ? isDarkMode : localDarkMode;

  const handleLogout = () => {
    navigate("/");
  };

  const toggleDarkMode = () => {
    if (setIsDarkMode) {
      setIsDarkMode(!isDarkMode);
    } else {
      setLocalDarkMode(!localDarkMode);
    }
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
    <header className={`backdrop-blur-sm shadow-sm border-b transition-colors duration-300 ${
      effectiveDarkMode 
        ? 'bg-gray-800/95 border-purple-800' 
        : 'bg-white/95 border-purple-100'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-xl sm:text-2xl font-bold cursor-pointer" onClick={() => navigate("/home")}>
              <span className="logo-nu text-purple-600">NU</span>
              <span className={`logo-massage transition-colors duration-300 ${
                effectiveDarkMode ? 'text-gray-200' : 'text-gray-900'
              }`}>MASSAGE</span>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile, shown on tablet+ */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Find a therapist"
                className={`w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent placeholder-gray-500 transition-colors duration-300 ${
                  effectiveDarkMode 
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
                effectiveDarkMode ? 'hover:bg-purple-800/50' : 'hover:bg-purple-100'
              } ${currentPage === 'home' ? (effectiveDarkMode ? 'bg-purple-800/50' : 'bg-purple-100') : ''}`}
              onClick={() => navigate("/home")}
            >
              <HomeIcon className="h-5 w-5 text-purple-600" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`p-2 transition-colors duration-300 ${
                effectiveDarkMode ? 'hover:bg-purple-800/50' : 'hover:bg-purple-100'
              } ${currentPage === 'dashboard' ? (effectiveDarkMode ? 'bg-purple-800/50' : 'bg-purple-100') : ''}`}
              onClick={() => navigate("/therapists/featured")}
            >
              <Compass className="h-5 w-5 text-purple-600" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`p-2 transition-colors duration-300 ${
                effectiveDarkMode ? 'hover:bg-purple-800/50' : 'hover:bg-purple-100'
              } ${currentPage === 'messages' ? (effectiveDarkMode ? 'bg-purple-800/50' : 'bg-purple-100') : ''}`}
              onClick={() => navigate("/messages")}
            >
              <Send className="h-5 w-5 text-purple-600" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`p-2 transition-colors duration-300 ${
                effectiveDarkMode ? 'hover:bg-purple-800/50' : 'hover:bg-purple-100'
              } ${currentPage === 'notifications' ? (effectiveDarkMode ? 'bg-purple-800/50' : 'bg-purple-100') : ''}`}
              onClick={() => navigate("/notifications")}
            >
              <Bell className="h-5 w-5 text-purple-600" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className={`sm:hidden p-2 transition-colors duration-300 ${
                effectiveDarkMode ? 'hover:bg-purple-800/50' : 'hover:bg-purple-100'
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
                    effectiveDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-300 text-gray-700'
                  }`}>
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className={`h-4 w-4 text-purple-600 transition-transform duration-200 ${
                  showUserMenu ? 'rotate-180' : ''
                }`} />
              </Button>

              {/* Dropdown Menu */}
              {showUserMenu && createPortal(
                <div 
                  style={{
                    position: 'fixed',
                    top: '70px',
                    right: '20px',
                    width: '280px',
                    backgroundColor: effectiveDarkMode ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    border: effectiveDarkMode ? '1px solid rgb(147, 51, 234)' : '1px solid rgb(233, 213, 255)',
                    borderRadius: '12px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    zIndex: 9999,
                    padding: '16px'
                  }}
                >
                  {/* Wallet */}
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px',
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: effectiveDarkMode ? 'rgba(147, 51, 234, 0.5)' : 'rgb(250, 245, 255)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Wallet className="h-4 w-4 mr-2 text-purple-600" />
                      <span 
                        style={{
                          fontSize: '14px',
                          fontWeight: '500',
                          color: effectiveDarkMode ? 'rgb(229, 231, 235)' : 'rgb(55, 65, 81)'
                        }}
                      >
                        Wallet:
                      </span>
                    </div>
                    <span 
                      style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: effectiveDarkMode ? 'rgb(229, 231, 235)' : 'rgb(17, 24, 39)'
                      }}
                    >
                      ${user.wallet.toFixed(2)}
                    </span>
                  </div>

                  {/* Menu Items */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        padding: '8px 12px',
                        fontSize: '14px',
                        color: effectiveDarkMode ? 'rgb(229, 231, 235)' : 'rgb(55, 65, 81)',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseOver={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = effectiveDarkMode ? 'rgba(147, 51, 234, 0.5)' : 'rgb(250, 245, 255)';
                      }}
                      onMouseOut={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = 'transparent';
                      }}
                      onClick={() => {
                        navigate("/home");
                        setShowUserMenu(false);
                      }}
                    >
                      <User className="h-4 w-4 mr-3 text-purple-600" />
                      My profile
                    </button>

                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        padding: '8px 12px',
                        fontSize: '14px',
                        color: effectiveDarkMode ? 'rgb(229, 231, 235)' : 'rgb(55, 65, 81)',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseOver={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = effectiveDarkMode ? 'rgba(147, 51, 234, 0.5)' : 'rgb(250, 245, 255)';
                      }}
                      onMouseOut={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = 'transparent';
                      }}
                      onClick={() => {
                        navigate("/edit-profile");
                        setShowUserMenu(false);
                      }}
                    >
                      <Edit3 className="h-4 w-4 mr-3 text-purple-600" />
                      Edit Profile
                    </button>

                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '8px 12px',
                        fontSize: '14px',
                        color: effectiveDarkMode ? 'rgb(229, 231, 235)' : 'rgb(55, 65, 81)',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseOver={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = effectiveDarkMode ? 'rgba(147, 51, 234, 0.5)' : 'rgb(250, 245, 255)';
                      }}
                      onMouseOut={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = 'transparent';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Heart className="h-4 w-4 mr-3 text-purple-600" />
                        My subscriptions
                      </div>
                      <span 
                        style={{
                          fontSize: '12px',
                          backgroundColor: effectiveDarkMode ? 'rgba(147, 51, 234, 0.8)' : 'rgb(243, 232, 255)',
                          color: effectiveDarkMode ? 'rgb(196, 181, 253)' : 'rgb(124, 58, 237)',
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}
                      >
                        {user.subscriptions}
                      </span>
                    </button>

                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '8px 12px',
                        fontSize: '14px',
                        color: effectiveDarkMode ? 'rgb(229, 231, 235)' : 'rgb(55, 65, 81)',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseOver={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = effectiveDarkMode ? 'rgba(147, 51, 234, 0.5)' : 'rgb(250, 245, 255)';
                      }}
                      onMouseOut={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = 'transparent';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Bookmark className="h-4 w-4 mr-3 text-purple-600" />
                        Bookmarks
                      </div>
                      <span 
                        style={{
                          fontSize: '12px',
                          backgroundColor: effectiveDarkMode ? 'rgba(147, 51, 234, 0.8)' : 'rgb(243, 232, 255)',
                          color: effectiveDarkMode ? 'rgb(196, 181, 253)' : 'rgb(124, 58, 237)',
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}
                      >
                        {user.bookmarks}
                      </span>
                    </button>

                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        padding: '8px 12px',
                        fontSize: '14px',
                        color: effectiveDarkMode ? 'rgb(229, 231, 235)' : 'rgb(55, 65, 81)',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseOver={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = effectiveDarkMode ? 'rgba(147, 51, 234, 0.5)' : 'rgb(250, 245, 255)';
                      }}
                      onMouseOut={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = 'transparent';
                      }}
                      onClick={() => {
                        navigate("/explore");
                        setShowUserMenu(false);
                      }}
                    >
                      <Settings className="h-4 w-4 mr-3 text-purple-600" />
                      Are you a Therapist?
                    </button>

                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '8px 12px',
                        fontSize: '14px',
                        color: effectiveDarkMode ? 'rgb(229, 231, 235)' : 'rgb(55, 65, 81)',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseOver={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = effectiveDarkMode ? 'rgba(147, 51, 234, 0.5)' : 'rgb(250, 245, 255)';
                      }}
                      onMouseOut={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = 'transparent';
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {effectiveDarkMode ? (
                          <Sun className="h-4 w-4 mr-3 text-purple-600" />
                        ) : (
                          <Moon className="h-4 w-4 mr-3 text-purple-600" />
                        )}
                        Dark mode
                      </div>
                      <div
                        style={{
                          width: '32px',
                          height: '18px',
                          backgroundColor: effectiveDarkMode ? 'rgb(124, 58, 237)' : 'rgb(229, 231, 235)',
                          borderRadius: '9px',
                          position: 'relative',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDarkMode();
                        }}
                      >
                        <div
                          style={{
                            width: '14px',
                            height: '14px',
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            position: 'absolute',
                            top: '2px',
                            left: effectiveDarkMode ? '16px' : '2px',
                            transition: 'left 0.2s'
                          }}
                        ></div>
                      </div>
                    </button>

                    <hr 
                      style={{
                        margin: '8px 0',
                        border: 'none',
                        borderTop: effectiveDarkMode ? '1px solid rgb(147, 51, 234)' : '1px solid rgb(233, 213, 255)'
                      }}
                    />

                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        padding: '8px 12px',
                        fontSize: '14px',
                        color: effectiveDarkMode ? 'rgb(248, 113, 113)' : 'rgb(220, 38, 38)',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseOver={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = effectiveDarkMode ? 'rgba(153, 27, 27, 0.5)' : 'rgb(254, 242, 242)';
                      }}
                      onMouseOut={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = 'transparent';
                      }}
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign out
                    </button>
                  </div>
                </div>,
                document.body
              )}
            </div>

            {/* Edit Profile Button - Hidden on mobile */}
            <Button 
              className="hidden sm:flex bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full"
              onClick={() => navigate("/edit-profile")}
            >
              Edit profile →
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className={`sm:hidden border-t transition-colors duration-300 ${
            effectiveDarkMode ? 'border-purple-800' : 'border-purple-200'
          }`}>
            <div className="px-3 py-4 space-y-3">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Find a therapist"
                  className={`w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent placeholder-gray-500 transition-colors duration-300 ${
                    effectiveDarkMode 
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
                    effectiveDarkMode ? 'hover:bg-purple-800/50' : 'hover:bg-purple-100'
                  } ${currentPage === 'home' ? (effectiveDarkMode ? 'bg-purple-800/50' : 'bg-purple-100') : ''}`}
                  onClick={() => {
                    navigate("/home");
                    setShowMobileMenu(false);
                  }}
                >
                  <HomeIcon className="h-5 w-5 text-purple-600 mb-1" />
                  <span className={`text-xs transition-colors duration-300 ${
                    effectiveDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>Home</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`flex flex-col items-center p-3 h-auto transition-colors duration-300 ${
                    effectiveDarkMode ? 'hover:bg-purple-800/50' : 'hover:bg-purple-100'
                  } ${currentPage === 'dashboard' ? (effectiveDarkMode ? 'bg-purple-800/50' : 'bg-purple-100') : ''}`}
                  onClick={() => {
                    navigate("/therapists/featured");
                    setShowMobileMenu(false);
                  }}
                >
                  <Compass className="h-5 w-5 text-purple-600 mb-1" />
                  <span className={`text-xs transition-colors duration-300 ${
                    effectiveDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>Explore</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`flex flex-col items-center p-3 h-auto transition-colors duration-300 ${
                    effectiveDarkMode ? 'hover:bg-purple-800/50' : 'hover:bg-purple-100'
                  } ${currentPage === 'messages' ? (effectiveDarkMode ? 'bg-purple-800/50' : 'bg-purple-100') : ''}`}
                  onClick={() => {
                    navigate("/messages");
                    setShowMobileMenu(false);
                  }}
                >
                  <Send className="h-5 w-5 text-purple-600 mb-1" />
                  <span className={`text-xs transition-colors duration-300 ${
                    effectiveDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>Messages</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`flex flex-col items-center p-3 h-auto transition-colors duration-300 ${
                    effectiveDarkMode ? 'hover:bg-purple-800/50' : 'hover:bg-purple-100'
                  } ${currentPage === 'notifications' ? (effectiveDarkMode ? 'bg-purple-800/50' : 'bg-purple-100') : ''}`}
                  onClick={() => {
                    navigate("/notifications");
                    setShowMobileMenu(false);
                  }}
                >
                  <Bell className="h-5 w-5 text-purple-600 mb-1" />
                  <span className={`text-xs transition-colors duration-300 ${
                    effectiveDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>Notifications</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
