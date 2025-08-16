import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  DollarSign,
  SlidersHorizontal,
  Grid,
  Map as MapIcon
} from "lucide-react";

// Mock data for therapists
const mockTherapists = [
  {
    id: 1,
    name: "Sarah Johnson",
    specialty: "Deep Tissue Massage",
    rating: 4.9,
    reviewsCount: 156,
    price: 120,
    location: "Auckland",
    distance: "2.3 km",
    image: "/placeholder.svg",
    isVerified: true,
    experience: 8,
    languages: ["English", "Māori"],
    availableWeekend: true,
    homeVisits: true,
    onlineConsultation: false
  },
  {
    id: 2,
    name: "Michael Chen",
    specialty: "Thai Massage",
    rating: 4.8,
    reviewsCount: 203,
    price: 100,
    location: "Wellington",
    distance: "1.8 km",
    image: "/placeholder.svg",
    isVerified: true,
    experience: 12,
    languages: ["English", "Mandarin"],
    availableWeekend: false,
    homeVisits: false,
    onlineConsultation: true
  },
  {
    id: 3,
    name: "Emma Wilson",
    specialty: "Swedish Massage",
    rating: 4.7,
    reviewsCount: 89,
    price: 90,
    location: "Christchurch",
    distance: "3.1 km",
    image: "/placeholder.svg",
    isVerified: false,
    experience: 5,
    languages: ["English"],
    availableWeekend: true,
    homeVisits: true,
    onlineConsultation: false
  }
];

const ExploreTherapists = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [experienceRange, setExperienceRange] = useState([0, 20]);
  const [availableWeekend, setAvailableWeekend] = useState(false);
  const [homeVisits, setHomeVisits] = useState(false);
  const [onlineConsultation, setOnlineConsultation] = useState(false);
  const [maxDistance, setMaxDistance] = useState(25);
  const [genderPreference, setGenderPreference] = useState("any");
  const [ageRange, setAgeRange] = useState([20, 70]);
  const [newTherapists, setNewTherapists] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const cities = ["Auckland", "Wellington", "Christchurch", "Hamilton", "Tauranga"];
  const specialties = ["Deep Tissue Massage", "Thai Massage", "Swedish Massage", "Hot Stone Massage", "Sports Massage"];

  const filteredTherapists = useMemo(() => {
    let filtered = mockTherapists.filter(therapist => {
      // Search query filter
      if (searchQuery && !therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !therapist.specialty.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // City filter
      if (selectedCity !== "all" && therapist.location !== selectedCity) {
        return false;
      }

      // Price range filter
      if (therapist.price < priceRange[0] || therapist.price > priceRange[1]) {
        return false;
      }

      // Specialty filter
      if (selectedSpecialties.length > 0 && !selectedSpecialties.includes(therapist.specialty)) {
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
      case "experience":
        filtered.sort((a, b) => b.experience - a.experience);
        break;
      case "reviews":
        filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
    }

    return filtered;
  }, [searchQuery, selectedCity, sortBy, priceRange, selectedSpecialties]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedCity !== "all") count++;
    if (priceRange[0] !== 0 || priceRange[1] !== 300) count++;
    if (selectedSpecialties.length > 0) count++;
    if (selectedLanguages.length > 0) count++;
    if (experienceRange[0] !== 0 || experienceRange[1] !== 20) count++;
    if (availableWeekend) count++;
    if (homeVisits) count++;
    if (onlineConsultation) count++;
    if (maxDistance !== 25) count++;
    if (genderPreference !== "any") count++;
    if (ageRange[0] !== 20 || ageRange[1] !== 70) count++;
    if (newTherapists) count++;
    if (minRating > 0) count++;
    return count;
  }, [searchQuery, selectedCity, priceRange, selectedSpecialties, selectedLanguages, experienceRange, availableWeekend, homeVisits, onlineConsultation, maxDistance, genderPreference, ageRange, newTherapists, minRating]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCity("all");
    setPriceRange([0, 300]);
    setSelectedSpecialties([]);
    setSelectedLanguages([]);
    setExperienceRange([0, 20]);
    setAvailableWeekend(false);
    setHomeVisits(false);
    setOnlineConsultation(false);
    setMaxDistance(25);
    setGenderPreference("any");
    setAgeRange([20, 70]);
    setNewTherapists(false);
    setMinRating(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                ← Back to Dashboard
              </Button>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Explore Therapists</h1>
            <div></div>
          </div>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search therapists or specialties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 w-full text-lg"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {/* City Filter */}
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="distance">Nearest First</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
              </SelectContent>
            </Select>

            {/* Filters Button */}
            <Button 
              variant="outline" 
              className="relative"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>

            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("map")}
              >
                <MapIcon className="w-4 h-4" />
              </Button>
            </div>

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
              <Button variant="outline" onClick={clearAllFilters}>
                Clear All ({activeFiltersCount})
              </Button>
            )}
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {searchQuery && (
                <Badge variant="secondary" className="px-3 py-1">
                  Search: "{searchQuery}"
                  <button 
                    className="ml-2 hover:text-red-500" 
                    onClick={() => setSearchQuery("")}
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedCity !== "all" && (
                <Badge variant="secondary" className="px-3 py-1">
                  City: {selectedCity}
                  <button 
                    className="ml-2 hover:text-red-500" 
                    onClick={() => setSelectedCity("all")}
                  >
                    ×
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
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

            {/* Advanced Filters Modal */}
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto scrollable">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Advanced Filters</span>
              {activeFiltersCount > 0 && (
                <Button variant="outline" size="sm" onClick={clearAllFilters}>
                  Clear All ({activeFiltersCount})
                </Button>
              )}
            </DialogTitle>
            <DialogDescription>
              Find your perfect massage therapist with advanced filtering options
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Quick Filter Presets */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Quick Filters</Label>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedSpecialties(["Deep Tissue Massage"]);
                    setPriceRange([100, 150]);
                  }}
                >
                  Deep Tissue Specialists
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setMinRating(4.5);
                    setOnlineConsultation(true);
                  }}
                >
                  Top Rated + Online
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setAvailableWeekend(true);
                    setHomeVisits(true);
                  }}
                >
                  Weekend + Home Visits
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setNewTherapists(true);
                    setPriceRange([50, 100]);
                  }}
                >
                  New & Affordable
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Price Range */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={300}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>$0</span>
                    <span>$300+</span>
                  </div>
                </div>

                {/* Experience Range */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    Experience: {experienceRange[0]} - {experienceRange[1]} years
                  </Label>
                  <Slider
                    value={experienceRange}
                    onValueChange={setExperienceRange}
                    max={20}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>0 years</span>
                    <span>20+ years</span>
                  </div>
                </div>

                {/* Maximum Distance */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    Maximum Distance: {maxDistance} km
                  </Label>
                  <Slider
                    value={[maxDistance]}
                    onValueChange={(value) => setMaxDistance(value[0])}
                    max={50}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>1 km</span>
                    <span>50+ km</span>
                  </div>
                </div>

                {/* Languages */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Languages</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["English", "Māori", "Mandarin", "Spanish", "French", "German"].map((language) => (
                      <div key={language} className="flex items-center space-x-2">
                        <Checkbox
                          id={`language-${language}`}
                          checked={selectedLanguages.includes(language)}
                          onCheckedChange={(checked) => {
                            if (checked === true) {
                              setSelectedLanguages(prev => [...prev, language]);
                            } else {
                              setSelectedLanguages(prev => prev.filter(l => l !== language));
                            }
                          }}
                        />
                        <Label htmlFor={`language-${language}`} className="text-sm cursor-pointer">
                          {language}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Availability Options */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Availability</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="weekend-availability"
                        checked={availableWeekend}
                        onCheckedChange={(checked) => setAvailableWeekend(checked === true)}
                      />
                      <Label htmlFor="weekend-availability">Available Weekends</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="new-therapists"
                        checked={newTherapists}
                        onCheckedChange={(checked) => setNewTherapists(checked === true)}
                      />
                      <Label htmlFor="new-therapists">New Therapists (joined recently)</Label>
                    </div>
                  </div>
                </div>

                {/* Service Options */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Service Options</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="home-visits"
                        checked={homeVisits}
                        onCheckedChange={(checked) => setHomeVisits(checked === true)}
                      />
                      <Label htmlFor="home-visits">Home Visits Available</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="online-consultation"
                        checked={onlineConsultation}
                        onCheckedChange={(checked) => setOnlineConsultation(checked === true)}
                      />
                      <Label htmlFor="online-consultation">Online Consultation</Label>
                    </div>
                  </div>
                </div>

                {/* Gender Preference */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Gender Preference</Label>
                  <Select value={genderPreference} onValueChange={setGenderPreference}>
                    <SelectTrigger>
                      <SelectValue placeholder="No preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">No Preference</SelectItem>
                      <SelectItem value="female">Female Therapists</SelectItem>
                      <SelectItem value="male">Male Therapists</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Age Range */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    Age Range: {ageRange[0]} - {ageRange[1]} years
                  </Label>
                  <Slider
                    value={ageRange}
                    onValueChange={setAgeRange}
                    max={70}
                    min={20}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>20</span>
                    <span>70+</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="space-y-2 pt-4 border-t">
                <Label className="text-base font-semibold">Active Filters ({activeFiltersCount})</Label>
                <div className="flex flex-wrap gap-2">
                  {searchQuery && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Search: "{searchQuery}"
                      <button 
                        className="ml-2 hover:text-red-500" 
                        onClick={() => setSearchQuery("")}
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {selectedCity !== "all" && (
                    <Badge variant="secondary" className="px-3 py-1">
                      City: {selectedCity}
                      <button 
                        className="ml-2 hover:text-red-500" 
                        onClick={() => setSelectedCity("all")}
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {(priceRange[0] !== 0 || priceRange[1] !== 300) && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Price: ${priceRange[0]}-${priceRange[1]}
                      <button 
                        className="ml-2 hover:text-red-500" 
                        onClick={() => setPriceRange([0, 300])}
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {selectedLanguages.length > 0 && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Languages: {selectedLanguages.length}
                      <button 
                        className="ml-2 hover:text-red-500" 
                        onClick={() => setSelectedLanguages([])}
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {availableWeekend && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Weekend Available
                      <button 
                        className="ml-2 hover:text-red-500" 
                        onClick={() => setAvailableWeekend(false)}
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {homeVisits && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Home Visits
                      <button 
                        className="ml-2 hover:text-red-500" 
                        onClick={() => setHomeVisits(false)}
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {onlineConsultation && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Online Consultation
                      <button 
                        className="ml-2 hover:text-red-500" 
                        onClick={() => setOnlineConsultation(false)}
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-gray-500">
              Showing {filteredTherapists.length} of {mockTherapists.length} therapists
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowFilters(false)}>
                Close
              </Button>
              <Button onClick={() => setShowFilters(false)} className="bg-purple-600 hover:bg-purple-700">
                Apply Filters
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {filteredTherapists.length} Therapists Found
          </h2>
          <p className="text-gray-600">
            Showing the best massage therapists in your area
          </p>
          

        </div>

        {/* Therapists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTherapists.map((therapist) => (
            <Card 
              key={therapist.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/therapist/${therapist.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={therapist.image} alt={therapist.name} />
                    <AvatarFallback>{therapist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {therapist.name}
                      </h3>
                      {therapist.isVerified && (
                        <Badge className="bg-green-100 text-green-800">Verified</Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{therapist.specialty}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        {therapist.rating} ({therapist.reviewsCount})
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {therapist.distance}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-lg font-semibold text-purple-600">
                        <DollarSign className="w-4 h-4" />
                        {therapist.price}
                      </div>
                      <Button size="sm">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTherapists.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No therapists found matching your criteria.</p>
            <Button onClick={clearAllFilters} className="mt-4">
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreTherapists;
