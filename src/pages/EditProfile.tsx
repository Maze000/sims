import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import "../styles/mobile.css";
import { Badge } from "@/components/ui/badge";
import { useMobile } from "@/hooks/use-mobile";
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
  X,
  ChevronRight,
  Lock,
  Users,
  Shield,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  Globe,
  Save,
  Star
} from "lucide-react";

const EditProfile = () => {
  const navigate = useNavigate();
  const { isMobile } = useMobile();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [currentView, setCurrentView] = useState("editProfile"); // "editProfile" or "wallet" or "subscriptions" or "privacy"
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [username, setUsername] = useState("maze2");
  const [linkName, setLinkName] = useState("numassage.com/u3332007");
  const [email, setEmail] = useState("mazeaction@gmail.com");
  const [profession, setProfession] = useState("");
  const [language, setLanguage] = useState("English");
  const [birthDate, setBirthDate] = useState("31/12/1989");
  const [gender, setGender] = useState("(Gender) Not specified");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("New Zealand");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

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
    console.log('Toggle dark mode clicked! Current state:', isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  const handleSaveChanges = () => {
    console.log("Saving changes...");
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
      {/* Header */}
      <header className={`backdrop-blur-sm shadow-sm border-b transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gray-800/95 border-purple-800' 
          : 'bg-white/95 border-purple-100'
      }`}>
        <div className={`max-w-7xl mx-auto ${isMobile ? 'px-4' : 'px-3 sm:px-6 lg:px-8'}`}>
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
                onClick={() => navigate("/home")}
              >
                <Home className="h-5 w-5 text-purple-600" />
              </Button>
              <Button variant="ghost" size="sm" className={`p-2 transition-colors duration-300 ${
                isDarkMode ? 'hover:bg-purple-800/50' : 'hover:bg-purple-100'
              }`}
              onClick={() => navigate("/therapists/featured")}>
                <Compass className="h-5 w-5 text-purple-600" />
              </Button>
              <Button variant="ghost" size="sm" className={`p-2 transition-colors duration-300 ${
                isDarkMode ? 'hover:bg-purple-800/50' : 'hover:bg-purple-100'
              }`}>
                <Send className="h-5 w-5 text-purple-600" />
              </Button>
              <Button variant="ghost" size="sm" className={`p-2 transition-colors duration-300 ${
                isDarkMode ? 'hover:bg-purple-800/50' : 'hover:bg-purple-100'
              }`}
              onClick={() => navigate("/notifications")}>
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
                  onClick={() => {
                    setShowUserMenu(!showUserMenu);
                  }}
                >
                  <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback className="text-sm bg-gray-300 text-gray-700">
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
                      backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(8px)',
                      border: isDarkMode ? '1px solid rgb(147, 51, 234)' : '1px solid rgb(233, 213, 255)',
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
                        backgroundColor: isDarkMode ? 'rgba(147, 51, 234, 0.5)' : 'rgb(250, 245, 255)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Wallet className="h-4 w-4 mr-2 text-purple-600" />
                        <span 
                          style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            color: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(55, 65, 81)'
                          }}
                        >
                          Wallet:
                        </span>
                        </div>
                      <span 
                        style={{
                          fontSize: '14px',
                          fontWeight: '700',
                          color: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(17, 24, 39)'
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
                          color: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(55, 65, 81)',
                          backgroundColor: 'transparent',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = isDarkMode ? 'rgba(147, 51, 234, 0.5)' : 'rgb(250, 245, 255)';
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
                          justifyContent: 'space-between',
                          width: '100%',
                          padding: '8px 12px',
                          fontSize: '14px',
                          color: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(55, 65, 81)',
                          backgroundColor: 'transparent',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = isDarkMode ? 'rgba(147, 51, 234, 0.5)' : 'rgb(250, 245, 255)';
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
                            backgroundColor: isDarkMode ? 'rgba(147, 51, 234, 0.8)' : 'rgb(243, 232, 255)',
                            color: isDarkMode ? 'rgb(196, 181, 253)' : 'rgb(124, 58, 237)',
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
                          color: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(55, 65, 81)',
                          backgroundColor: 'transparent',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = isDarkMode ? 'rgba(147, 51, 234, 0.5)' : 'rgb(250, 245, 255)';
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
                            backgroundColor: isDarkMode ? 'rgba(147, 51, 234, 0.8)' : 'rgb(243, 232, 255)',
                            color: isDarkMode ? 'rgb(196, 181, 253)' : 'rgb(124, 58, 237)',
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
                          color: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(55, 65, 81)',
                          backgroundColor: 'transparent',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = isDarkMode ? 'rgba(147, 51, 234, 0.5)' : 'rgb(250, 245, 255)';
                        }}
                        onMouseOut={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = 'transparent';
                        }}
                        onClick={() => {
                          setShowVerification(true);
                          setCurrentView("verification");
                          setShowUserMenu(false);
                        }}
                      >
                          <Star className="h-4 w-4 mr-3 text-purple-600" />
                        Are you a Therapist?
                        </button>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          padding: '8px 12px',
                          fontSize: '14px',
                          color: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(55, 65, 81)',
                          backgroundColor: 'transparent',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = isDarkMode ? 'rgba(147, 51, 234, 0.5)' : 'rgb(250, 245, 255)';
                        }}
                        onMouseOut={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = 'transparent';
                        }}
                        onClick={() => {
                          console.log('Dark mode div clicked!');
                          toggleDarkMode();
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {isDarkMode ? (
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
                            backgroundColor: isDarkMode ? 'rgb(124, 58, 237)' : 'rgb(229, 231, 235)',
                            borderRadius: '9px',
                            position: 'relative',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Toggle switch clicked!');
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
                              left: isDarkMode ? '16px' : '2px',
                              transition: 'left 0.2s'
                            }}
                          ></div>
                          </div>
                      </div>

                      <hr 
                        style={{
                          margin: '8px 0',
                          border: 'none',
                          borderTop: isDarkMode ? '1px solid rgb(147, 51, 234)' : '1px solid rgb(233, 213, 255)'
                        }}
                      />

                      <button
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          padding: '8px 12px',
                          fontSize: '14px',
                          color: isDarkMode ? 'rgb(248, 113, 113)' : 'rgb(220, 38, 38)',
                          backgroundColor: 'transparent',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = isDarkMode ? 'rgba(153, 27, 27, 0.5)' : 'rgb(254, 242, 242)';
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
                Edit Profile →
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
                      navigate("/home");
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
                    onClick={() => {
                      navigate("/therapists/featured");
                      setShowMobileMenu(false);
                    }}
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
                    onClick={() => {
                      navigate("/notifications");
                      setShowMobileMenu(false);
                    }}
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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0 order-2 lg:order-1">
            <div className="bg-white/80 rounded-lg shadow-lg border border-purple-100 p-3 sm:p-4">
              <h3 className="text-sm font-semibold mb-4 text-gray-700">ACCOUNT</h3>
              <div className="space-y-1">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-sm text-gray-700 min-h-[44px] touch-target"
                  onClick={() => navigate("/profile")}
                >
                  <User className="h-4 w-4 mr-3 text-purple-600" />
                  My Profile
                </Button>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start text-sm min-h-[44px] touch-target ${currentView === "editProfile" ? "bg-purple-100 text-purple-700" : "text-gray-700"}`}
                  onClick={() => {
                    setCurrentView("editProfile");
                    setShowVerification(false);
                  }}
                >
                  <Edit3 className="h-4 w-4 mr-3 text-purple-600" />
                  Edit Profile
                </Button>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start text-sm min-h-[44px] touch-target ${currentView === "wallet" ? "bg-purple-100 text-purple-700" : "text-gray-700"}`}
                  onClick={() => setCurrentView("wallet")}
                >
                  <Wallet className="h-4 w-4 mr-3 text-purple-600" />
                  Wallet
                </Button>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start text-sm min-h-[44px] touch-target ${currentView === "verification" ? "bg-purple-100 text-purple-700" : "text-teal-600 hover:text-teal-700 hover:bg-teal-50"}`}
                  onClick={() => {
                    setCurrentView("verification");
                    setShowVerification(true);
                  }}
                >
                  <Settings className="h-4 w-4 mr-3 text-purple-600" />
                  Are you a therapist?
                </Button>
              </div>
              <h3 className="text-sm font-semibold mt-6 mb-4 text-gray-700">SUBSCRIPTION</h3>
              <Button 
                variant="ghost" 
                className={`w-full justify-start text-sm min-h-[44px] touch-target ${currentView === "subscriptions" ? "bg-purple-100 text-purple-700" : "text-gray-700"}`}
                onClick={() => setCurrentView("subscriptions")}
              >
                <CreditCard className="h-4 w-4 mr-3 text-purple-600" />
                My subscriptions
              </Button>
              <h3 className="text-sm font-semibold mt-6 mb-4 text-gray-700">PRIVACY AND SECURITY</h3>
              <div className="space-y-1">
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start text-sm min-h-[44px] touch-target ${currentView === "privacy" ? "bg-purple-100 text-purple-700" : "text-gray-700"}`}
                  onClick={() => setCurrentView("privacy")}
                >
                  <Shield className="h-4 w-4 mr-3 text-purple-600" />
                  Privacy and Security
                </Button>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start text-sm min-h-[44px] touch-target ${currentView === "password" ? "bg-purple-100 text-purple-700" : "text-gray-700"}`}
                  onClick={() => setCurrentView("password")}
                >
                  <Lock className="h-4 w-4 mr-3 text-purple-600" />
                  Password
                </Button>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start text-sm min-h-[44px] touch-target ${currentView === "restrictedUsers" ? "bg-purple-100 text-purple-700" : "text-gray-700"}`}
                  onClick={() => setCurrentView("restrictedUsers")}
                >
                  <Users className="h-4 w-4 mr-3 text-purple-600" />
                  Restricted users
                </Button>
              </div>
              <h3 className="text-sm font-semibold mt-6 mb-4 text-gray-700">PAYMENTS</h3>
              <div className="space-y-1">
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start text-sm min-h-[44px] touch-target ${currentView === "payments" ? "bg-purple-100 text-purple-700" : "text-gray-700"}`}
                  onClick={() => setCurrentView("payments")}
                >
                  <CreditCard className="h-4 w-4 mr-3 text-purple-600" />
                  Payments
                </Button>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="flex-1 order-1 lg:order-2">
            <div className="bg-white/80 rounded-lg shadow-lg border border-purple-100 p-4 sm:p-6">
              {currentView === "wallet" ? (
                <>
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div className="text-center w-full">
                      <div className="flex flex-col sm:flex-row items-center justify-center mb-4">
                        <Wallet className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600 mb-2 sm:mb-0 sm:mr-3" />
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Wallet</h1>
                      </div>
                      <p className="text-sm text-gray-600 px-4 sm:px-0">Add funds to your wallet to use for subscriptions, tips, and more</p>
                    </div>
                  </div>

                  {/* Wallet Balance Card */}
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-90">Funds available in your account</p>
                        <div className="flex items-baseline mt-2">
                          <span className="text-3xl font-bold">$0.00</span>
                          <span className="text-sm ml-2 opacity-75">USD</span>
                        </div>
                      </div>
                      <div className="text-right opacity-60">
                        <Wallet className="w-12 h-12" />
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center mb-4">
                      <CreditCard className="w-6 h-6 text-gray-600 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-800">Tarjeta Crédito / Débito / Prepago</h3>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4">
                      <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzAwNTFBNSIvPgo8dGV4dCB4PSI1IiB5PSIxNSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMTAiPnZpc2E8L3RleHQ+Cjwvc3ZnPgo=" alt="Visa" className="h-8" />
                      <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iI0VCMDAxQiIvPgo8Y2lyY2xlIGN4PSIxNSIgY3k9IjEyIiByPSI2IiBmaWxsPSIjRkY1RjAwIi8+CjxjaXJjbGUgY3g9IjI1IiBjeT0iMTIiIHI9IjYiIGZpbGw9IiNGRkY1RjAiLz4KPC9zdmc+Cg==" alt="Mastercard" className="h-8" />
                      <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlYYgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzAwNjZBMCIvPgo8dGV4dCB4PSI1IiB5PSIxNSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iOCI+YW1leCZuYnNwOzwvdGV4dD4KPC9zdmc+Cg==" alt="American Express" className="h-8" />
                      <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzAwNTFBNSIvPgo8dGV4dCB4PSI1IiB5PSIxNSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iOCI+ZGluZXJzPC90ZXh0Pgo8L3N2Zz4K" alt="Diners" className="h-8" />
                      <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iI0VEMUMyNCIvPgo8dGV4dCB4PSI1IiB5PSIxNSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iOCI+cmVkY29tcDwvdGV4dD4KPC9zdmc+Cg==" alt="Redcompra" className="h-8" />
                    </div>

                    <div className="text-center text-sm text-gray-600 mb-4">
                      <p>Ingresa el monto que quieres recargar expresado en dólares.</p>
                      <p className="mt-2">Para pagar con medios de pago chilenos, solo debes cambiar el país configurado en tu cuenta Aromate por Chile.</p>
                      <p className="mt-2 text-xs">SI TIENES INCONVENIENTES CON ALGUNA TRANSACCIÓN, HÁBLANOS VÍA WHATSAPP AL +56975444457</p>
                      <p className="text-xs mt-1">Se aplicarán tarifas por uso de la plataforma y procesamiento de pagos</p>
                      <p className="text-xs font-semibold">IMPORTANTE: Los saldos recargados NO SON REEMBOLSABLES</p>
                    </div>
                  </div>

                  {/* Amount Input */}
                  <div className="mb-4 sm:mb-6">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-base sm:text-lg">$</span>
                      <Input
                        type="text"
                        placeholder="Amount (Min $5 - Max $100)"
                        className="pl-8 py-3 text-base sm:text-lg border-gray-300 rounded-lg min-h-[44px] touch-target"
                      />
                    </div>
                  </div>

                  {/* Add Funds Button */}
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-base sm:text-lg font-semibold min-h-[44px] touch-target">
                    Add funds
                  </Button>
                </>
              ) : currentView === "subscriptions" ? (
                <>
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div className="text-center w-full">
                      <div className="flex flex-col sm:flex-row items-center justify-center mb-4">
                        <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600 mb-2 sm:mb-0 sm:mr-3" />
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">My subscriptions</h1>
                      </div>
                      <p className="text-sm text-gray-600 px-4 sm:px-0">Users you have subscribed to your content</p>
                    </div>
                  </div>

                  {/* Empty State */}
                  <div className="text-center py-8 sm:py-12">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <CreditCard className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
                    </div>
                    <p className="text-gray-600 mb-4 px-4 sm:px-0">You have not subscribed to any user</p>
                    <Button 
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg min-h-[44px] touch-target"
                      onClick={() => navigate("/explore")}
                    >
                      Explore Creators
                    </Button>
                  </div>
                </>
              ) : currentView === "privacy" ? (
                <>
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div className="text-center w-full">
                      <div className="flex flex-col sm:flex-row items-center justify-center mb-4">
                        <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600 mb-2 sm:mb-0 sm:mr-3" />
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Privacy and Security</h1>
                      </div>
                      <p className="text-sm text-gray-600 px-4 sm:px-0">Set your privacy</p>
                    </div>
                  </div>

                </>
              ) : currentView === "password" ? (
                <>
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div className="text-center w-full">
                      <div className="flex flex-col sm:flex-row items-center justify-center mb-4">
                        <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600 mb-2 sm:mb-0 sm:mr-3" />
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Password</h1>
                      </div>
                      <p className="text-sm text-gray-600 px-4 sm:px-0">Update your password</p>
                    </div>
                  </div>

                  {/* Password Form */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Old Password */}
                    <div>
                      <Label htmlFor="oldPassword" className="text-sm font-medium text-gray-700">
                        Old password
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          id="oldPassword"
                          type="password"
                          placeholder="Old password"
                          className="border-purple-200 min-h-[44px] touch-target pr-10"
                        />
                        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>

                    {/* New Password */}
                    <div>
                      <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                        New password
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="New password"
                          className="border-purple-200 min-h-[44px] touch-target pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        >
                          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878l-.771-.771m4.242 4.242L15.07 15.07M14.121 14.121L16.95 16.95m-2.829-2.829l-.771-.771" />
                          </svg>
                        </Button>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-4">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg min-h-[44px] touch-target">
                        Save changes
                      </Button>
                    </div>
                  </div>
                </>
              ) : currentView === "restrictedUsers" ? (
                <>
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div className="text-center w-full">
                      <div className="flex flex-col sm:flex-row items-center justify-center mb-4">
                        <Users className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600 mb-2 sm:mb-0 sm:mr-3" />
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Restricted users</h1>
                      </div>
                      <p className="text-sm text-gray-600 px-4 sm:px-0">Users you have restricted</p>
                    </div>
                  </div>

                  {/* Empty State */}
                  <div className="text-center py-8 sm:py-12">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <div className="relative">
                        <Users className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 px-4 sm:px-0">No results have been found</p>
                  </div>
                </>
              ) : currentView === "payments" ? (
                <>
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div className="text-center w-full">
                      <div className="flex flex-col sm:flex-row items-center justify-center mb-4">
                        <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600 mb-2 sm:mb-0 sm:mr-3" />
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Payments</h1>
                      </div>
                      <p className="text-sm text-gray-600 px-4 sm:px-0">History of all payments made</p>
                    </div>
                  </div>

                  {/* Empty State */}
                  <div className="text-center py-8 sm:py-12">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <CreditCard className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
                    </div>
                    <p className="text-gray-600 mb-4 px-4 sm:px-0">You haven't made any payments yet</p>
                  </div>
                </>
              ) : currentView === "verification" ? (
                <>
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div className="text-center w-full">
                      <div className="flex flex-col sm:flex-row items-center justify-center mb-4">
                        <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600 mb-2 sm:mb-0 sm:mr-3" />
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Verify Account</h1>
                      </div>
                      <p className="text-sm text-gray-600 px-4 sm:px-0">Fill in your address, city, ZIP and attach your government issued picture ID</p>
                    </div>
                  </div>
                  
                  {/* Red Alert Box */}
                  <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">To submit a verification request you must complete your profile.</p>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center text-sm">
                            <span className="mr-2">⚠️</span>
                            <span>Upload a profile picture</span>
                            <Button variant="link" className="text-white underline ml-1 p-0 h-auto">
                              Upload →
                            </Button>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="mr-2">⚠️</span>
                            <span>Upload a cover image</span>
                            <Button variant="link" className="text-white underline ml-1 p-0 h-auto">
                              Upload →
                            </Button>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="mr-2">⚠️</span>
                            <span>Set your date of birth</span>
                            <Button variant="link" className="text-white underline ml-1 p-0 h-auto">
                              Edit →
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Create Profile Button */}
                  <div className="mt-6 text-center">
                    <Button 
                      onClick={() => navigate('/create-profile')}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                    >
                      Create Profile
                    </Button>
                  </div>
                </>
              ) : currentView === "editProfile" ? (
                <>
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div className="text-center w-full">
                      <div className="flex flex-col sm:flex-row items-center justify-center mb-4">
                        <Edit3 className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600 mb-2 sm:mb-0 sm:mr-3" />
                      <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Edit Profile</h1>
                      </div>
                      <p className="text-sm text-gray-600 px-4 sm:px-0">Tell us something about you.</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center mb-6">
                    <div className="text-center w-full">
                      <div className="flex items-center justify-center mb-4">
                        <Shield className="w-8 h-8 text-gray-600 mr-3" />
                        <h1 className="text-2xl font-bold text-gray-900">Verify Account</h1>
                      </div>
                      <p className="text-sm text-gray-600">Fill in your address, city, ZIP and attach your government issued picture ID</p>
                    </div>
                  </div>
                  
                  {/* Red Alert Box */}
                  <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">To submit a verification request you must complete your profile.</p>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center text-sm">
                            <span className="mr-2">⚠️</span>
                            <span>Upload a profile picture</span>
                            <Button variant="link" className="text-white underline ml-1 p-0 h-auto">
                              Upload →
                            </Button>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="mr-2">⚠️</span>
                            <span>Upload a cover image</span>
                            <Button variant="link" className="text-white underline ml-1 p-0 h-auto">
                              Upload →
                            </Button>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="mr-2">⚠️</span>
                            <span>Set your date of birth</span>
                            <Button variant="link" className="text-white underline ml-1 p-0 h-auto">
                              Edit →
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {!showVerification && currentView === "editProfile" && (
              <div className="space-y-4 sm:space-y-6">
                {/* Username */}
                <div>
                  <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                    Username *
                  </Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10 border-purple-200 min-h-[44px] touch-target"
                    />
                  </div>
                </div>

                {/* Link Name */}
                <div>
                  <Label htmlFor="linkName" className="text-sm font-medium text-gray-700">
                    Link Name *
                  </Label>
                  <Input
                    id="linkName"
                    type="text"
                    value={linkName}
                    onChange={(e) => setLinkName(e.target.value)}
                    className="mt-1 border-purple-200 min-h-[44px] touch-target"
                  />
                  <div className="flex items-center mt-2">
                    <input type="checkbox" id="showLink" className="mr-2" />
                    <Label htmlFor="showLink" className="text-sm text-gray-600">
                      Show link name instead of your username
                    </Label>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-0 bg-transparent text-sm text-gray-700 p-0 focus:ring-0 shadow-none"
                    disabled
                  />
                </div>

                {/* Profession and Language */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Profession/Occupation
                    </Label>
                    <div className="relative mt-1">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                        className="pl-10 border-purple-200 min-h-[44px] touch-target"
                    />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Language</Label>
                    <div className="relative mt-1">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                    <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="pl-10 border-purple-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Māori">Māori</SelectItem>
                      </SelectContent>
                    </Select>
                    </div>
                  </div>
                </div>

                {/* Birth Date and Gender */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Birth Date</Label>
                    <div className="relative mt-1">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                        className="pl-10 border-purple-200 min-h-[44px] touch-target"
                    />
                    </div>
                    <p className="text-xs mt-1 text-gray-500">
                      Valid formats: 16/08/2007 - (Can be edited only once)
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Gender</Label>
                    <div className="relative mt-1">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                    <Select value={gender} onValueChange={setGender}>
                        <SelectTrigger className="pl-10 border-purple-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="(Gender) Not specified">(Gender) Not specified</SelectItem>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Non-binary">Non-binary</SelectItem>
                      </SelectContent>
                    </Select>
                    </div>
                  </div>
                </div>

                {/* Billing Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">— Billing Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Company</Label>
                      <div className="relative mt-1">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                          className="pl-10 border-purple-200 min-h-[44px] touch-target"
                      />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Country</Label>
                        <div className="relative mt-1">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                        <Select value={country} onValueChange={setCountry}>
                            <SelectTrigger className="pl-10 border-purple-200 min-h-[44px] touch-target">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="New Zealand">New Zealand</SelectItem>
                            <SelectItem value="Australia">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">City</Label>
                        <div className="relative mt-1">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                            className="pl-10 border-purple-200 min-h-[44px] touch-target"
                        />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Address</Label>
                      <div className="relative mt-1">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                          className="pl-10 border-purple-200 min-h-[44px] touch-target"
                      />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Postal/ZIP</Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                          className="pl-10 border-purple-200 min-h-[44px] touch-target"
                      />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    onClick={handleSaveChanges}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-full font-semibold min-h-[44px] touch-target transition-colors duration-200"
                  >
                    Save changes
                  </Button>
                </div>
              </div>
              )}
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

export default EditProfile;
