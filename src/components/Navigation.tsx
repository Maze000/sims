import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

import { 
  Home, 
  User, 
  Settings, 
  LogOut,
  Users,
  Star,
  Menu,
  X,
  BarChart3
} from 'lucide-react';

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isSidebarOpen) {
        const sidebar = document.querySelector('nav');
        const menuButton = document.querySelector('[data-menu-button]');
        
        if (sidebar && !sidebar.contains(event.target as Node) && 
            menuButton && !menuButton.contains(event.target as Node)) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isSidebarOpen]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => {
    if (isMobile) setIsSidebarOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    closeSidebar();
  };

  const isActive = (path: string) => location.pathname === path;
  const isPublicRoute = ['/', '/home', '/login'].includes(location.pathname);

  const handleLogout = () => {
    logout();
    navigate('/');
    closeSidebar();
  };

  // If we're on a public route and no user is logged in, show minimal navigation
  if (isPublicRoute && !user) {
    return (
      <nav className="bg-white shadow-lg border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-lg sm:text-xl md:text-2xl font-bold">
                <span style={{
                  color: '#FF6B35',
                  fontFamily: 'Orbitron, Rajdhani, monospace',
                  fontWeight: '900',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                  textRendering: 'optimizeLegibility',
                  WebkitFontSmoothing: 'antialiased'
                }}>SIMS</span>
              </Link>
            </div>

            {/* Navigation Links - Hidden on small mobile */}
            <div className="hidden sm:flex items-center space-x-4 md:space-x-6 lg:space-x-8">
              <Link 
                to="/" 
                className={`text-gray-700 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors`}
                style={{
                  color: isActive('/') ? '#FF6B35' : '#374151',
                  transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/')) {
                    (e.target as HTMLElement).style.color = '#FF6B35';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/')) {
                    (e.target as HTMLElement).style.color = '#374151';
                  }
                }}
              >
                Home
              </Link>
              <Link 
                to="/home" 
                className={`text-gray-700 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors`}
                style={{
                  color: isActive('/home') ? '#FF6B35' : '#374151',
                  transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/home')) {
                    (e.target as HTMLElement).style.color = '#FF6B35';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/home')) {
                    (e.target as HTMLElement).style.color = '#374151';
                  }
                }}
              >
                Explore
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link to="/login">
                <Button variant="outline" size="sm" className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // If user is logged in, show full sidebar navigation
  if (user) {
    const navItems = user.userType === 'service_provider' 
      ? [
          { path: '/therapist-dashboard', label: 'Dashboard', icon: Home },
          { path: '/explore', label: 'Find Your Sims', icon: Users },
          { path: '/profile', label: 'Profile', icon: User },
          { path: '/services', label: 'Services', icon: Star },
          { path: '/profile-stats', label: 'Profile Stats', icon: BarChart3 },
          { path: '/settings', label: 'Settings', icon: Settings }
        ]
      : [
          { path: '/dashboard', label: 'Dashboard', icon: Home },
          { path: '/explore', label: 'Find Your Sims', icon: Users },
          { path: '/profile', label: 'Profile', icon: User },
          { path: '/create-profile', label: 'Are you a Provider?', icon: Star },
          { path: '/settings', label: 'Settings', icon: Settings }
        ];

    return (
      <>
                 {/* Mobile Menu Button - Only visible on mobile when sidebar is closed */}
         {!isSidebarOpen && (
           <div className="lg:hidden fixed top-3 sm:top-4 left-3 sm:left-4 z-[60] mobile-menu-button">
             <Button
               variant="outline"
               size="sm"
               onClick={toggleSidebar}
               data-menu-button
               className="bg-white shadow-md border-gray-200 w-9 h-9 sm:w-10 sm:h-10 p-0 touch-target"
             >
               <Menu className="w-4 h-4" />
             </Button>
           </div>
         )}

        {/* Mobile Overlay - Only visible when sidebar is open on mobile */}
        {isMobile && isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[50] lg:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Sidebar - Conditional positioning and visibility */}
        <nav className={`
          bg-white shadow-lg border-r border-gray-200 h-full mobile-sidebar
          ${isMobile 
            ? 'fixed top-0 left-0 w-64 sm:w-72 transition-transform duration-300 ease-in-out z-[55]' + 
              (isSidebarOpen ? ' translate-x-0' : ' -translate-x-full')
            : 'fixed left-0 top-0 w-64 z-30'
          }
        `}>
          <div className="p-3 sm:p-4 md:p-6 overflow-y-auto h-full">
            {/* Logo */}
            <div className="flex items-center mb-6 sm:mb-8">
              <Link to="/" className="text-lg sm:text-xl md:text-2xl font-bold">
                <span style={{
                  color: '#FF6B35',
                  fontFamily: 'Orbitron, Rajdhani, monospace',
                  fontWeight: '900',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                  textRendering: 'optimizeLegibility',
                  WebkitFontSmoothing: 'antialiased'
                }}>SIMS</span>
              </Link>
            </div>

            {/* User Info */}
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                  <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                  <AvatarFallback style={{background: '#FF6B35', color: 'white'}} className="font-semibold text-xs sm:text-sm">
                    {user.firstName?.charAt(0) || user.lastName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-600 capitalize truncate">
                    {user.userType === 'service_provider' ? 'Service Provider' : 'Client'}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Items */}
            <ul className="space-y-1 sm:space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors duration-200 text-xs sm:text-sm touch-target mobile-nav-link ${
                        isActive(item.path)
                          ? 'border-r-2'
                          : ''
                        }`}
                        style={{
                          backgroundColor: isActive(item.path) ? 'rgba(109, 190, 69, 0.1)' : 'transparent',
                          color: isActive(item.path) ? '#FF6B35' : '#374151',
                          borderRightColor: isActive(item.path) ? '#FF6B35' : 'transparent',
                          transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive(item.path)) {
                            (e.target as HTMLElement).style.color = '#FF6B35';
                            (e.target as HTMLElement).style.backgroundColor = 'rgba(109, 190, 69, 0.05)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive(item.path)) {
                            (e.target as HTMLElement).style.color = '#374151';
                            (e.target as HTMLElement).style.backgroundColor = 'transparent';
                          }
                        }}
                      onClick={() => handleNavigation(item.path)}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span className="font-medium truncate">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Logout Button */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 w-full text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 text-xs sm:text-sm touch-target mobile-nav-link"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </nav>
      </>
    );
  }

  // Fallback - should not reach here
  return null;
};

export default Navigation;
