import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { useMobile } from "@/hooks/use-mobile";
import MobileNavigation from "@/components/MobileNavigation";
import OptimizedImage from "@/components/OptimizedImage";
import HeaderMaind from "@/components/HeaderMaind";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Star, 
  Heart, 
  Share2,
  ChevronLeft,
  ChevronRight,
  User, 
  Wallet, 
  Bookmark, 
  Moon, 
  Sun, 
  LogOut, 
  Edit3, 
  Camera,
  Settings,
  CreditCard,
  Home as HomeIcon,
  Compass,
  Send,
  Bell,
  ChevronDown,
  Menu,
  X
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface TherapistProfile {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  location: string;
  specialties: string[];
  price: number;
  isOnline: boolean;
  description: string;
  services: string[];
}

const mockTherapists: TherapistProfile[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    avatar: "/placeholder.svg",
    rating: 4.9,
    reviews: 234,
    location: "Auckland, New Zealand",
    specialties: ["Relaxation Massage", "Deep Tissue", "Aromatherapy"],
    price: 120,
    isOnline: true,
    description: "Certified therapist with 8 years of experience in therapeutic and relaxation massage.",
    services: ["60 min Massage", "90 min Massage", "Hot Stone Massage"]
  },
  {
    id: "2",
    name: "James Thompson",
    avatar: "/placeholder.svg",
    rating: 4.8,
    reviews: 189,
    location: "Wellington, New Zealand",
    specialties: ["Sports Massage", "Remedial Therapy", "Reflexology"],
    price: 135,
    isOnline: true,
    description: "Sports massage specialist focused on muscle recovery and sports physiotherapy.",
    services: ["Sports massage", "Post-workout recovery", "Therapeutic massage"]
  },
  {
    id: "3",
    name: "Emma Williams",
    avatar: "/placeholder.svg",
    rating: 5.0,
    reviews: 156,
    location: "Christchurch, New Zealand",
    specialties: ["Pregnancy Massage", "Lymphatic Drainage", "Relaxation"],
    price: 110,
    isOnline: false,
    description: "Specialising in pregnancy massage and manual lymphatic drainage techniques.",
    services: ["Pregnancy massage", "Lymphatic drainage", "Stress relief massage"]
  },
  {
    id: "4",
    name: "Michael Chen",
    avatar: "/placeholder.svg",
    rating: 4.7,
    reviews: 298,
    location: "Hamilton, New Zealand",
    specialties: ["Thai Massage", "Shiatsu", "Acupressure"],
    price: 125,
    isOnline: true,
    description: "Therapist trained in traditional Eastern massage techniques.",
    services: ["Thai massage", "Traditional Shiatsu", "Therapeutic acupressure"]
  },
  {
    id: "5",
    name: "Lisa Rodriguez",
    avatar: "/placeholder.svg",
    rating: 4.6,
    reviews: 167,
    location: "Tauranga, New Zealand",
    specialties: ["Hot Stone Massage", "Reflexology", "Relaxation"],
    price: 115,
    isOnline: true,
    description: "Specializing in hot stone therapy and reflexology for deep relaxation.",
    services: ["Hot stone massage", "Foot reflexology", "Full body relaxation"]
  },
  {
    id: "6",
    name: "David Park",
    avatar: "/placeholder.svg",
    rating: 4.8,
    reviews: 203,
    location: "Dunedin, New Zealand",
    specialties: ["Sports Massage", "Injury Recovery", "Deep Tissue"],
    price: 140,
    isOnline: false,
    description: "Sports massage specialist with focus on athlete recovery and performance.",
    services: ["Sports recovery", "Injury rehabilitation", "Performance massage"]
  },
  {
    id: "7",
    name: "Rachel Green",
    avatar: "/placeholder.svg",
    rating: 4.9,
    reviews: 145,
    location: "Rotorua, New Zealand",
    specialties: ["Aromatherapy", "Swedish Massage", "Stress Relief"],
    price: 105,
    isOnline: true,
    description: "Certified aromatherapist offering holistic wellness and stress relief treatments.",
    services: ["Aromatherapy massage", "Essential oils therapy", "Stress management"]
  },
  {
    id: "8",
    name: "Tom Wilson",
    avatar: "/placeholder.svg",
    rating: 4.5,
    reviews: 178,
    location: "Palmerston North, New Zealand",
    specialties: ["Remedial Therapy", "Trigger Point", "Myofascial Release"],
    price: 130,
    isOnline: true,
    description: "Remedial therapist specializing in trigger point therapy and pain management.",
    services: ["Remedial massage", "Pain relief therapy", "Muscle tension release"]
  },
  {
    id: "9",
    name: "Sophie Taylor",
    avatar: "/placeholder.svg",
    rating: 4.7,
    reviews: 192,
    location: "Nelson, New Zealand",
    specialties: ["Prenatal Massage", "Postnatal Care", "Gentle Touch"],
    price: 120,
    isOnline: false,
    description: "Prenatal and postnatal massage specialist providing gentle care for mothers.",
    services: ["Pregnancy massage", "Postnatal recovery", "Maternal wellness"]
  },
  {
    id: "10",
    name: "Alex Johnson",
    avatar: "/placeholder.svg",
    rating: 4.8,
    reviews: 221,
    location: "Napier, New Zealand",
    specialties: ["Cupping Therapy", "Traditional Chinese Medicine", "Acupressure"],
    price: 135,
    isOnline: true,
    description: "Traditional Chinese medicine practitioner offering cupping and acupressure.",
    services: ["Cupping therapy", "TCM treatments", "Energy balancing"]
  },
  {
    id: "11",
    name: "Maria Santos",
    avatar: "/placeholder.svg",
    rating: 4.6,
    reviews: 134,
    location: "New Plymouth, New Zealand",
    specialties: ["Lymphatic Drainage", "Detox Massage", "Wellness"],
    price: 110,
    isOnline: true,
    description: "Lymphatic drainage specialist focused on detoxification and wellness.",
    services: ["Manual lymphatic drainage", "Detox treatments", "Wellness massage"]
  },
  {
    id: "12",
    name: "Chris Anderson",
    avatar: "/placeholder.svg",
    rating: 4.7,
    reviews: 189,
    location: "Invercargill, New Zealand",
    specialties: ["Deep Tissue", "Trigger Point", "Pain Relief"],
    price: 125,
    isOnline: false,
    description: "Deep tissue specialist with expertise in chronic pain management.",
    services: ["Deep tissue massage", "Pain management", "Chronic condition care"]
  },
  {
    id: "13",
    name: "Jessica Lee",
    avatar: "/placeholder.svg",
    rating: 4.9,
    reviews: 156,
    location: "Whangarei, New Zealand",
    specialties: ["Relaxation Massage", "Stress Relief", "Mindfulness"],
    price: 100,
    isOnline: true,
    description: "Relaxation specialist combining massage with mindfulness techniques.",
    services: ["Relaxation massage", "Stress management", "Mindful healing"]
  },
  {
    id: "14",
    name: "Ryan Murphy",
    avatar: "/placeholder.svg",
    rating: 4.5,
    reviews: 167,
    location: "Gisborne, New Zealand",
    specialties: ["Sports Recovery", "Athletic Performance", "Injury Prevention"],
    price: 145,
    isOnline: true,
    description: "Sports recovery specialist working with professional athletes.",
    services: ["Athletic recovery", "Performance enhancement", "Injury prevention"]
  },
  {
    id: "15",
    name: "Anna Thompson",
    avatar: "/placeholder.svg",
    rating: 4.8,
    reviews: 198,
    location: "Timaru, New Zealand",
    specialties: ["Therapeutic Massage", "Rehabilitation", "Mobility"],
    price: 120,
    isOnline: false,
    description: "Therapeutic massage specialist focused on rehabilitation and mobility.",
    services: ["Therapeutic massage", "Rehabilitation therapy", "Mobility improvement"]
  },
  {
    id: "16",
    name: "Ben Clarke",
    avatar: "/placeholder.svg",
    rating: 4.6,
    reviews: 143,
    location: "Wanganui, New Zealand",
    specialties: ["Traditional Massage", "Holistic Healing", "Energy Work"],
    price: 115,
    isOnline: true,
    description: "Holistic healer combining traditional massage with energy work.",
    services: ["Traditional massage", "Energy healing", "Holistic wellness"]
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isMobile, isSmallMobile } = useMobile();
  
  console.log('Dashboard component rendered, showUserMenu:', showUserMenu);
  
  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [sortBy, setSortBy] = useState("rating");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("Featured Creators");
  const itemsPerPage = 10;

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
        console.log('Clicking outside dropdown, closing menu');
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  // Get unique locations and specialties for filters
  const locations = [...new Set(mockTherapists.map(t => t.location))];
  const allSpecialties = [...new Set(mockTherapists.flatMap(t => t.specialties))];

  // Filter and sort therapists
  const filteredTherapists = useMemo(() => {
    let filtered = mockTherapists.filter(therapist => {
      // Search query filter
      if (searchQuery && !therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !therapist.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false;
      }

      // Location filter
      if (selectedLocation !== "all" && therapist.location !== selectedLocation) {
        return false;
      }

      // Price range filter
      if (therapist.price < priceRange[0] || therapist.price > priceRange[1]) {
        return false;
      }

      // Specialties filter
      if (selectedSpecialties.length > 0 && 
          !selectedSpecialties.some(specialty => therapist.specialties.includes(specialty))) {
        return false;
      }

      // Rating filter
      if (therapist.rating < minRating) {
        return false;
      }

      // Online only filter
      if (onlineOnly && !therapist.isOnline) {
        return false;
      }

      return true;
    });

    // Sort
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "reviews":
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [searchQuery, selectedLocation, priceRange, selectedSpecialties, minRating, onlineOnly, sortBy]);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedLocation !== "all") count++;
    if (priceRange[0] !== 0 || priceRange[1] !== 200) count++;
    if (selectedSpecialties.length > 0) count++;
    if (minRating > 0) count++;
    if (onlineOnly) count++;
    return count;
  }, [searchQuery, selectedLocation, priceRange, selectedSpecialties, minRating, onlineOnly]);

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedLocation("all");
    setPriceRange([0, 200]);
    setSelectedSpecialties([]);
    setMinRating(0);
    setOnlineOnly(false);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredTherapists.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTherapists = filteredTherapists.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' 
        : 'bg-gradient-to-br from-purple-50 via-white to-pink-50'
    }`}>
      <HeaderMaind isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} currentPage="dashboard" />

      {/* Main Content */}
      <div className={`max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 ${
        isMobile ? 'pb-24' : 'pb-8'
      }`}>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Sidebar - Hidden on mobile, shown as modal */}
          <div className={`${
            isMobile ? 'hidden' : 'lg:w-64 flex-shrink-0'
          }`}>
            <div className={`backdrop-blur-sm rounded-lg shadow-lg border transition-colors duration-300 p-4 ${
              isDarkMode 
                ? 'bg-gray-800/80 border-purple-800' 
                : 'bg-white/80 border-purple-100'
            }`}>
              <h3 className={`font-semibold mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-900'
              }`}>Featured Therapists</h3>
              <p className={`text-sm mb-6 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>The best of content therapists are here</p>
              
              {/* Filter Options */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full border-2 border-teal-500 bg-teal-500 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-sm text-teal-600 font-medium">Featured Therapists</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                  <span className="text-sm text-gray-600">New Therapists</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded border-2 border-gray-300"></div>
                  <span className="text-sm text-gray-600">Free Subscription</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded border-2 border-gray-300"></div>
                  <span className="text-sm text-gray-600">Live</span>
                </div>
              </div>
              
              <hr className="my-6 border-gray-200" />
              
              <h4 className="font-semibold mb-3 text-gray-900">Categories</h4>
              <div className="space-y-2">
                <div className="text-sm text-gray-600 hover:text-purple-600 cursor-pointer">Relaxation Massage</div>
                <div className="text-sm text-gray-600 hover:text-purple-600 cursor-pointer">Deep Tissue</div>
                <div className="text-sm text-gray-600 hover:text-purple-600 cursor-pointer">Sports Massage</div>
                <div className="text-sm text-gray-600 hover:text-purple-600 cursor-pointer">Thai Massage</div>
                <div className="text-sm text-gray-600 hover:text-purple-600 cursor-pointer">Hot Stone</div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Therapists</h2>
                <p className="text-gray-600">The best of content therapists are here</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="relative"
                  onClick={() => setShowFilters(true)}
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="price-low">Price: Low</SelectItem>
                    <SelectItem value="price-high">Price: High</SelectItem>
                    <SelectItem value="reviews">Reviews</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Therapists Grid */}
            <div className={`grid gap-4 sm:gap-6 mb-8 ${
              isMobile 
                ? 'grid-cols-1' 
                : isSmallMobile 
                ? 'grid-cols-1' 
                : 'grid-cols-1 md:grid-cols-2'
            }`}>
              {paginatedTherapists.map((therapist) => (
                <Card key={therapist.id} className={`transition-all duration-200 ${
                  isMobile 
                    ? 'hover:shadow-md mobile-touch-friendly' 
                    : 'hover:shadow-lg'
                } w-full ${isMobile ? 'max-w-full' : 'max-w-md mx-auto'}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className={`${isMobile ? 'w-14 h-14' : 'w-12 h-12'}`}>
                            <OptimizedImage
                              src={therapist.avatar}
                              alt={`${therapist.name} avatar`}
                              className="w-full h-full object-cover rounded-full"
                              width={isMobile ? 56 : 48}
                              height={isMobile ? 56 : 48}
                              loading="lazy"
                            />
                            <AvatarFallback className={`${isMobile ? 'text-lg' : 'text-sm'}`}>
                              {therapist.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 ${
                            isMobile ? 'w-5 h-5' : 'w-4 h-4'
                          } rounded-full border-2 border-white ${
                            therapist.isOnline ? 'bg-green-500' : 'bg-gray-400'
                          }`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{therapist.name}</CardTitle>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="w-3 h-3" />
                            {therapist.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(therapist.id)}
                          className={`${
                            isMobile ? 'p-2 h-10 w-10 mobile-touch-friendly' : 'p-1 h-auto'
                          }`}
                        >
                          <Heart 
                            className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'} ${
                              favorites.includes(therapist.id) 
                                ? 'fill-red-500 text-red-500' 
                                : 'text-gray-400'
                            }`} 
                          />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`${
                            isMobile ? 'p-2 h-10 w-10 mobile-touch-friendly' : 'p-1 h-auto'
                          }`}
                        >
                          <Share2 className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'} text-gray-400`} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{therapist.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        ({therapist.reviews} reviews)
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {therapist.specialties.slice(0, 2).map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {therapist.specialties.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{therapist.specialties.length - 2}
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      {therapist.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="text-lg font-bold text-purple-600">
                        ${therapist.price.toLocaleString()}
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={() => navigate(`/therapist/${therapist.id}`)}
                      >
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(page)}
                    className={`w-8 h-8 p-0 ${
                      currentPage === page 
                        ? 'bg-teal-500 hover:bg-teal-600 text-white' 
                        : 'text-gray-600 hover:text-teal-600'
                    }`}
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Filters Modal */}
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent className={`${
          isMobile 
            ? 'max-w-full h-full max-h-full m-0 rounded-none' 
            : 'max-w-2xl max-h-[90vh]'
        } overflow-y-auto mobile-scroll-container`}>
          <DialogHeader className={isMobile ? 'p-4 pb-2' : ''}>
            <DialogTitle className={`flex items-center justify-between ${
              isMobile ? 'text-lg' : ''
            }`}>
              <span>Filter Therapists</span>
              {activeFiltersCount > 0 && (
                <Button 
                  variant="outline" 
                  size={isMobile ? "default" : "sm"} 
                  onClick={clearAllFilters}
                  className={isMobile ? 'mobile-touch-friendly' : ''}
                >
                  Clear All ({activeFiltersCount})
                </Button>
              )}
            </DialogTitle>
            <DialogDescription className={isMobile ? 'text-base' : ''}>
              Refine your search to find the perfect therapist
            </DialogDescription>
          </DialogHeader>

          <div className={`space-y-6 ${isMobile ? 'p-4 pt-2' : 'py-4'}`}>
            {/* Search */}
            <div className="space-y-2">
              <Label 
                htmlFor="search" 
                className={`font-semibold ${isMobile ? 'text-lg' : 'text-base'}`}
              >
                Search
              </Label>
              <Input
                id="search"
                type="text"
                placeholder="Search by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${
                  isMobile 
                    ? 'h-12 text-base mobile-touch-friendly' 
                    : ''
                }`}
                autoComplete="off"
                inputMode="search"
              />
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">Location</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </Label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={200}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>$0</span>
                <span>$200+</span>
              </div>
            </div>

            {/* Minimum Rating */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                Minimum Rating: {minRating > 0 ? `${minRating}+ stars` : 'Any rating'}
              </Label>
              <Slider
                value={[minRating]}
                onValueChange={(value) => setMinRating(value[0])}
                max={5}
                min={0}
                step={0.5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Any</span>
                <span>5 stars</span>
              </div>
            </div>

            {/* Specialties */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Specialties</Label>
              <div className="grid grid-cols-2 gap-2">
                {allSpecialties.map((specialty) => (
                  <div key={specialty} className="flex items-center space-x-2">
                    <Checkbox
                      id={`specialty-${specialty}`}
                      checked={selectedSpecialties.includes(specialty)}
                      onCheckedChange={(checked) => {
                        if (checked === true) {
                          setSelectedSpecialties(prev => [...prev, specialty]);
                        } else {
                          setSelectedSpecialties(prev => prev.filter(s => s !== specialty));
                        }
                      }}
                    />
                    <Label 
                      htmlFor={`specialty-${specialty}`} 
                      className="text-sm cursor-pointer"
                    >
                      {specialty}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Online Only */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="online-only"
                checked={onlineOnly}
                onCheckedChange={(checked) => setOnlineOnly(checked === true)}
              />
              <Label htmlFor="online-only" className="text-base font-semibold">
                Show only online therapists
              </Label>
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="space-y-2">
                <Label className="text-base font-semibold">Active Filters</Label>
                <div className="flex flex-wrap gap-2">
                  {searchQuery && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Search: "{searchQuery}"
                      <button 
                        className="ml-2 hover:text-red-500" 
                        onClick={() => setSearchQuery("")}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {selectedLocation !== "all" && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Location: {selectedLocation}
                      <button 
                        className="ml-2 hover:text-red-500" 
                        onClick={() => setSelectedLocation("all")}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {(priceRange[0] !== 0 || priceRange[1] !== 200) && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Price: ${priceRange[0]}-${priceRange[1]}
                      <button 
                        className="ml-2 hover:text-red-500" 
                        onClick={() => setPriceRange([0, 200])}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {minRating > 0 && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Rating: {minRating}+ stars
                      <button 
                        className="ml-2 hover:text-red-500" 
                        onClick={() => setMinRating(0)}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {selectedSpecialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="px-3 py-1">
                      {specialty}
                      <button 
                        className="ml-2 hover:text-red-500" 
                        onClick={() => setSelectedSpecialties(prev => prev.filter(s => s !== specialty))}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                  {onlineOnly && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Online Only
                      <button 
                        className="ml-2 hover:text-red-500" 
                        onClick={() => setOnlineOnly(false)}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className={`flex ${
            isMobile ? 'flex-col gap-4' : 'justify-between'
          } pt-4 border-t ${isMobile ? 'p-4' : ''}`}>
            <div className={`${isMobile ? 'text-base' : 'text-sm'} text-gray-500 ${
              isMobile ? 'text-center' : ''
            }`}>
              Showing {filteredTherapists.length} of {mockTherapists.length} therapists
            </div>
            <div className={`flex gap-3 ${isMobile ? 'w-full' : ''}`}>
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(false)}
                className={`${
                  isMobile 
                    ? 'flex-1 h-12 mobile-touch-friendly' 
                    : ''
                }`}
              >
                Close
              </Button>
              <Button 
                onClick={() => setShowFilters(false)}
                className={`${
                  isMobile 
                    ? 'flex-1 h-12 mobile-touch-friendly' 
                    : ''
                }`}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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

      {/* Mobile Navigation */}
      {isMobile && (
        <MobileNavigation 
          isDarkMode={isDarkMode}
          className="mobile-bottom-nav"
        />
      )}
    </div>
  );
};

export default Dashboard;
