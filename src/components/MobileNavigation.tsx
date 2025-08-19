import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Compass, 
  Send, 
  Bell,
  User,
  Menu,
  X,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { useSwipe } from '@/hooks/useSwipe';
import { useMobile } from '@/hooks/use-mobile';

interface MobileNavigationProps {
  isDarkMode?: boolean;
  className?: string;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  isDarkMode = false, 
  className = "" 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useMobile();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Navigation items
  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Compass, label: 'Explore', path: '/therapists/featured' },
    { icon: Send, label: 'Messages', path: '/messages' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

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

  // Don't render on desktop
  if (!isMobile) return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`${className} ${!isVisible ? 'translate-y-full' : 'translate-y-0'}`}>
      {/* Mobile Bottom Navigation */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-900/95 border-gray-700' 
            : 'bg-white/95 border-gray-200'
        } backdrop-blur-lg border-t`}
        {...swipeHandlers}
      >
        {/* Expanded Menu */}
        {isExpanded && (
          <div className={`p-4 border-b ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="grid grid-cols-2 gap-3">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className={`flex flex-col items-center gap-1 h-16 touch-target ${
                    isActive(item.path)
                      ? 'bg-purple-600 text-white'
                      : isDarkMode
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    navigate(item.path);
                    setIsExpanded(false);
                  }}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Compact Navigation */}
        <div className="flex items-center justify-between px-4 py-2">
          {/* Primary Actions */}
          <div className="flex items-center space-x-1">
            {navItems.slice(0, 3).map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center gap-1 h-12 w-12 touch-target ${
                  isActive(item.path)
                    ? 'text-purple-600 bg-purple-50 dark:bg-purple-900/50'
                    : isDarkMode
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </Button>
            ))}
          </div>

          {/* Expand/Collapse Button */}
          <Button
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 h-12 w-12 touch-target ${
              isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronUp className="h-5 w-5" />
            )}
            <span className="text-xs">More</span>
          </Button>

          {/* Secondary Actions */}
          <div className="flex items-center space-x-1">
            {navItems.slice(3).map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center gap-1 h-12 w-12 touch-target ${
                  isActive(item.path)
                    ? 'text-purple-600 bg-purple-50 dark:bg-purple-900/50'
                    : isDarkMode
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Swipe Indicator */}
        <div className={`h-1 w-12 mx-auto mb-1 rounded-full ${
          isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
        }`} />
      </div>

      {/* Safe area for iPhone X and newer */}
      <div className="h-safe-area-inset-bottom" />
    </div>
  );
};

export default MobileNavigation;
