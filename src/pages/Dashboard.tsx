import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Star, MapPin, Clock, Heart, Share2, SlidersHorizontal, X, ArrowLeft } from "lucide-react";

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
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="relative flex items-center">
              {/* Mobile Home Button */}
              <Button
                variant="ghost"
                size="sm"
                className="sm:hidden absolute -left-2 p-2 rounded-full hover:bg-purple-100"
                onClick={() => navigate("/home")}
              >
                <ArrowLeft className="h-4 w-4 text-purple-600" />
              </Button>
              <h1 className="text-xl sm:text-2xl font-bold text-purple-600 ml-8 sm:ml-0">
                <span className="logo-nu">NU</span>
                <span className="logo-massage">massage</span>
              </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Button 
                variant="outline"
                size="sm"
                className="hidden sm:flex"
                onClick={() => navigate("/create-profile")}
              >
                Create Profile
              </Button>
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-6 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            Find your perfect massage therapist
          </h2>
          <p className="text-sm mb-4 max-w-xl mx-auto">
            Connect with certified massage and therapy professionals.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="sm" 
              className="bg-white text-purple-600 hover:bg-gray-100"
              onClick={() => navigate("/explore")}
            >
              Explore Therapists
            </Button>
            <Button 
              size="sm" 
              className="bg-purple-600 text-white hover:bg-purple-700 border-purple-600"
              onClick={() => navigate("/create-profile")}
            >
              Are you a Therapist?
            </Button>
          </div>
        </div>
      </section>

      {/* Therapists Grid */}
      <section className="py-4 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              All Therapists ({filteredTherapists.length})
            </h3>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-8">
            {filteredTherapists.map((therapist) => (
              <Card key={therapist.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={therapist.avatar} />
                          <AvatarFallback>{therapist.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
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
                        className="p-1 h-auto"
                      >
                        <Heart 
                          className={`w-4 h-4 ${
                            favorites.includes(therapist.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-gray-400'
                          }`} 
                        />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-1 h-auto">
                        <Share2 className="w-4 h-4 text-gray-400" />
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
        </div>
      </section>

      {/* Filters Modal */}
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto scrollable">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Filter Therapists</span>
              {activeFiltersCount > 0 && (
                <Button variant="outline" size="sm" onClick={clearAllFilters}>
                  Clear All ({activeFiltersCount})
                </Button>
              )}
            </DialogTitle>
            <DialogDescription>
              Refine your search to find the perfect therapist
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="search" className="text-base font-semibold">Search</Label>
              <Input
                id="search"
                type="text"
                placeholder="Search by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

          <div className="flex justify-between pt-4 border-t">
            <div className="text-sm text-gray-500">
              Showing {filteredTherapists.length} of {mockTherapists.length} therapists
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowFilters(false)}>
                Close
              </Button>
              <Button onClick={() => setShowFilters(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
