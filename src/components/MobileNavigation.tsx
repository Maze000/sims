import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Home, 
  Compass, 
  Send, 
  Bell,
  User,
  Wallet,
  Heart,
  Bookmark,
  Moon,
  Sun,
  LogOut,
  Edit3,
  Settings,
  ChevronDown,
  Search
} from 'lucide-react';
import { useSwipe } from '@/hooks/useSwipe';
import { useMobile } from '@/hooks/use-mobile';

interface MobileNavigationProps {
  isDarkMode?: boolean;
  setIsDarkMode?: (value: boolean) => void;
  currentPage?: string;
  className?: string;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  isDarkMode = false, 
  setIsDarkMode,
  currentPage = "",
  className = "" 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useMobile();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [user] = useState({
    username: "maze",
    avatar: "/placeholder.svg",
    wallet: 0.00,
    subscriptions: 0,
    bookmarks: 0
  });

  const effectiveDarkMode = isDarkMode;

  const handleLogout = () => {
    navigate("/");
  };

  const toggleDarkMode = () => {
    if (setIsDarkMode) {
      setIsDarkMode(!isDarkMode);
    }
  };

  // Swipe gestures
  const swipeHandlers = useSwipe({
    onSwipeUp: () => setIsExpanded(true),
    onSwipeDown: () => setIsExpanded(false),
    minSwipeDistance: 30,
  });

  // Hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide
        setIsVisible(false);
      } else {
        // Scrolling up - show
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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

  // Don't render on desktop
  if (!isMobile) return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`${className} ${!isVisible ? 'translate-y-full' : 'translate-y-0'}`}>
      {/* Mobile Bottom Navigation */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
          effectiveDarkMode 
            ? 'bg-gray-800/95 border-gray-700' 
            : 'bg-white/95 border-gray-200'
        } backdrop-blur-lg border-t`}
        {...swipeHandlers}
      >
        {/* Expanded Menu - Search and Logo */}
        {isExpanded && (
          <div className={`p-4 border-b ${
            effectiveDarkMode ? 'border-purple-800' : 'border-purple-200'
          }`}>
            {/* Logo */}
            <div className="flex items-center mb-3">
              <div className="text-xl font-bold cursor-pointer" onClick={() => navigate("/home")}>
                <span className="logo-nu text-purple-600">NU</span>
                <span className={`logo-massage transition-colors duration-300 ${
                  effectiveDarkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>massage</span>
              </div>
            </div>

            {/* Search Bar */}
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
          </div>
        )}

        {/* Compact Navigation */}
        <div className="flex items-center justify-between px-4 py-2">
          {/* Primary Navigation Icons */}
          <div className="flex items-center space-x-1">
            {/* Home */}
            <Button
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-12 w-12 touch-target ${
                isActive('/home')
                  ? 'text-purple-600 bg-purple-50 dark:bg-purple-900/50'
                  : effectiveDarkMode
                  ? 'text-gray-400 hover:text-gray-200'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => navigate("/home")}
            >
              <Home className="h-5 w-5" />
              <span className="text-xs">Home</span>
            </Button>

            {/* Explore */}
              <Button
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center gap-1 h-12 w-12 touch-target ${
                isActive('/therapists/featured')
                    ? 'text-purple-600 bg-purple-50 dark:bg-purple-900/50'
                  : effectiveDarkMode
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              onClick={() => navigate("/therapists/featured")}
              >
              <Compass className="h-5 w-5" />
              <span className="text-xs">Explore</span>
              </Button>

            {/* Messages */}
          <Button
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 h-12 w-12 touch-target ${
                isActive('/messages')
                  ? 'text-purple-600 bg-purple-50 dark:bg-purple-900/50'
                  : effectiveDarkMode
                  ? 'text-gray-400 hover:text-gray-200'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => navigate("/messages")}
            >
              <Send className="h-5 w-5" />
              <span className="text-xs">Messages</span>
          </Button>

            {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center gap-1 h-12 w-12 touch-target ${
                isActive('/notifications')
                    ? 'text-purple-600 bg-purple-50 dark:bg-purple-900/50'
                  : effectiveDarkMode
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              onClick={() => navigate("/notifications")}
            >
              <Bell className="h-5 w-5" />
              <span className="text-xs">Notifications</span>
            </Button>
          </div>

          {/* User Avatar with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-1 h-12 w-12 touch-target"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <Avatar className="h-5 w-5">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback className={`text-xs transition-colors duration-300 ${
                  effectiveDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-300 text-gray-700'
                }`}>
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs">Profile</span>
              </Button>

            {/* Mobile Dropdown Menu */}
            {showUserMenu && createPortal(
              <div
                style={{
                  position: 'fixed',
                  bottom: '80px',
                  left: '20px',
                  right: '20px',
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
                      navigate("/profile");
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

          {/* Edit Profile Button */}
          <Button
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 h-12 w-12 touch-target ${
              effectiveDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => navigate("/edit-profile")}
          >
            <Edit3 className="h-5 w-5" />
            <span className="text-xs">Edit</span>
          </Button>
        </div>

        {/* Swipe Indicator */}
        <div className={`h-1 w-12 mx-auto mb-1 rounded-full ${
          effectiveDarkMode ? 'bg-gray-600' : 'bg-gray-300'
        }`} />
      </div>

      {/* Safe area for iPhone X and newer */}
      <div className="h-safe-area-inset-bottom" />
    </div>
  );
};

export default MobileNavigation;
