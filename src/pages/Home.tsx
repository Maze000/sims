import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/Header";
import HeaderMaind from "@/components/HeaderMaind";
import { useMobile } from "@/hooks/use-mobile";
import { 
  MapPin, 
  Star, 
  Calendar, 
  RotateCcw,
  Home as HomeIcon,
  User, 
  ShoppingBag,
  Send,
  Compass,
  Heart, 
  Bookmark, 
  Share2
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { isMobile } = useMobile();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Sample therapist data
  const allTherapists = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Therapeutic Massage",
      rating: 4.9,
      reviews: 127,
      location: "Auckland",
      price: 85,
      avatar: "/placeholder.svg",
      isOnline: true,
      description: "Therapeutic massage specialist, 8+ years experience."
    },
    {
      id: 2,
      name: "Mark Thompson",
      specialty: "Sports Massage",
      rating: 4.8,
      reviews: 89,
      location: "Wellington",
      price: 75,
      avatar: "/placeholder.svg",
      isOnline: false,
      description: "Sports massage expert for athletic recovery."
    },
    {
      id: 3,
      name: "Lisa Chen",
      specialty: "Relaxation Therapy",
      rating: 4.9,
      reviews: 203,
      location: "Christchurch",
      price: 90,
      avatar: "/placeholder.svg", 
      isOnline: true,
      description: "Stress relief and relaxation therapy specialist."
    },
    {
      id: 4,
      name: "James Wilson",
      specialty: "Deep Tissue",
      rating: 4.7,
      reviews: 156,
      location: "Hamilton",
      price: 80,
      avatar: "/placeholder.svg",
      isOnline: true,
      description: "Deep tissue massage and pain management expert."
    }
  ];

  const getRandomTherapists = () => {
    const shuffled = [...allTherapists].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  const [therapists, setTherapists] = useState(() => getRandomTherapists());
  const [favorites, setFavorites] = useState<number[]>([]);

  const refreshTherapists = () => {
    setTherapists(getRandomTherapists());
    setRefreshKey(prev => prev + 1);
  };

  const toggleFavorite = (therapistId: number) => {
    setFavorites(prev => 
      prev.includes(therapistId) 
        ? prev.filter(id => id !== therapistId)
        : [...prev, therapistId]
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' 
        : 'bg-gradient-to-br from-purple-50 via-white to-pink-50'
    }`}>
      <HeaderMaind isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} currentPage="home" />

      {/* Main Content */}
      <div className={`max-w-7xl mx-auto py-4 sm:py-8 ${isMobile ? 'px-4 pb-24' : 'px-3 sm:px-6 lg:px-8'}`}>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className={`${isMobile ? 'hidden' : 'lg:w-64 flex-shrink-0'}`}>
            <div className={`backdrop-blur-sm rounded-lg shadow-lg border transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gray-800/80 border-purple-800' 
                : 'bg-white/80 border-purple-200'
            }`}>
              <div className="p-4">
                <div className="space-y-4">
                  <Button 
                    className={`w-full justify-start text-sm font-medium transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-purple-900/50 text-purple-400 hover:bg-purple-800/50' 
                        : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                    }`}
                  >
                    <HomeIcon className="h-4 w-4 mr-2" />
                    Home
                  </Button>

                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start text-sm transition-colors duration-300 ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={() => navigate("/profile")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    My Profile
                  </Button>

                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start text-sm transition-colors duration-300 ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Purchased
                  </Button>

                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start text-sm transition-colors duration-300 ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={() => navigate("/messages")}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Messages
                  </Button>

                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start text-sm transition-colors duration-300 ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={() => navigate("/therapists/featured")}
                  >
                    <Compass className="h-4 w-4 mr-2" />
                    Explore
                  </Button>

                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start text-sm transition-colors duration-300 ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Subscriptions
                  </Button>

                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start text-sm transition-colors duration-300 ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Bookmark className="h-4 w-4 mr-2" />
                    Bookmarks
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className={`backdrop-blur-sm rounded-lg shadow-lg border transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gray-800/80 border-purple-800' 
                : 'bg-white/80 border-purple-200'
            }`}>
              <div className="p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className={`text-xl font-medium mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  No posts yet
                </h2>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Explore Creators */}
          <div className="lg:w-80 flex-shrink-0">
            <div className={`backdrop-blur-sm rounded-lg shadow-lg border transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gray-800/80 border-purple-800' 
                : 'bg-white/80 border-purple-200'
            }`}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`font-semibold transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>
                    Explore Creators
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={refreshTherapists}
                    className={`p-1 transition-colors duration-300 ${
                      isDarkMode ? 'hover:bg-purple-800/50' : 'hover:bg-purple-100'
                    }`}
                  >
                    <RotateCcw className="h-4 w-4 text-purple-600" />
                  </Button>
                </div>

                <div className="space-y-4" key={refreshKey}>
                  {therapists.map((therapist) => (
                                        <div 
                      key={therapist.id}
                      className={`p-3 rounded-lg border transition-all duration-300 hover:shadow-lg cursor-pointer ${
                        isDarkMode 
                          ? 'border-purple-700/50 bg-gray-900/50 hover:border-purple-600' 
                          : 'border-purple-200/50 bg-purple-50/50 hover:border-purple-300'
                      }`}
                      onClick={() => navigate(`/therapist/${therapist.id}`)}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={therapist.avatar} />
                              <AvatarFallback>{therapist.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                              therapist.isOnline ? 'bg-green-500' : 'bg-gray-400'
                            }`} />
                          </div>
                          <div>
                            <h4 className={`font-semibold text-sm transition-colors duration-300 ${
                              isDarkMode ? 'text-gray-200' : 'text-gray-900'
                            }`}>
                              {therapist.name}
                            </h4>
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <MapPin className="w-3 h-3" />
                              {therapist.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(therapist.id);
                            }}
                            className="p-0.5 h-auto"
                          >
                            <Heart 
                              className={`w-3.5 h-3.5 ${
                                favorites.includes(therapist.id) 
                                  ? 'fill-red-500 text-red-500' 
                                  : 'text-gray-400'
                              }`} 
                            />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="p-0.5 h-auto"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Share2 className="w-3.5 h-3.5 text-gray-400" />
                          </Button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium text-xs">{therapist.rating}</span>
                            <span className="text-xs text-gray-600">
                              ({therapist.reviews})
                            </span>
                          </div>
                          <div className="text-xs font-bold text-purple-600">
                            ${therapist.price}
                          </div>
                        </div>

                        <div className={`text-xs transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {therapist.specialty}
                        </div>

                        <p className={`text-xs line-clamp-1 transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {therapist.description}
                        </p>

                        <div className="pt-1">
                          <Button 
                            size="sm" 
                            className="bg-purple-600 hover:bg-purple-700 text-xs px-2 py-1 h-6 w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/therapist/${therapist.id}`);
                            }}
                          >
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;