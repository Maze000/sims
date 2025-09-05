import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  DollarSign, 
  Filter,
  X,
  SlidersHorizontal
} from 'lucide-react';

const ExploreTherapists = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for therapists
  const therapists = [
    {
      id: '1',
      name: 'María González',
      specialization: 'Therapeutic Massage',
      location: 'Auckland Central',
      rating: 4.8,
      reviews: 127,
      price: '80',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
      available: true,
      experience: '8 years',
      languages: ['English', 'Spanish']
    },
    {
      id: '2',
      name: 'David Chen',
      specialization: 'Sports Massage',
      location: 'Wellington CBD',
      rating: 4.9,
      reviews: 89,
      price: '95',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      available: true,
      experience: '12 years',
      languages: ['English', 'Mandarin']
    },
    {
      id: '3',
      name: 'Sarah Thompson',
      specialization: 'Relaxing Massage',
      location: 'Christchurch',
      rating: 4.7,
      reviews: 156,
      price: '75',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      available: false,
      experience: '5 years',
      languages: ['English']
    },
    {
      id: '4',
      name: 'Michael Rodriguez',
      specialization: 'Deep Tissue Massage',
      location: 'Hamilton',
      rating: 4.6,
      reviews: 98,
      price: '85',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      available: true,
      experience: '10 years',
      languages: ['English', 'Spanish']
    },
    {
      id: '5',
      name: 'Emma Wilson',
      specialization: 'Swedish Massage',
      location: 'Tauranga',
      rating: 4.9,
      reviews: 203,
      price: '90',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      available: true,
      experience: '15 years',
      languages: ['English', 'French']
    },
    {
      id: '6',
      name: 'James Brown',
      specialization: 'Thai Massage',
      location: 'Dunedin',
      rating: 4.5,
      reviews: 67,
      price: '70',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      available: true,
      experience: '6 years',
      languages: ['English', 'Thai']
    }
  ];

  const specializations = [
    'Therapeutic Massage',
    'Sports Massage',
    'Relaxing Massage',
    'Deep Tissue Massage',
    'Swedish Massage',
    'Thai Massage',
    'Hot Stone Massage',
    'Aromatherapy Massage'
  ];

  const locations = [
    'Auckland Central',
    'Wellington CBD',
    'Christchurch',
    'Hamilton',
    'Tauranga',
    'Dunedin',
    'Palmerston North',
    'Napier'
  ];

  const filteredTherapists = therapists.filter(therapist => {
    const matchesSearch = therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         therapist.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = !selectedSpecialization || therapist.specialization === selectedSpecialization;
    const matchesLocation = !selectedLocation || therapist.location === selectedLocation;
    
    return matchesSearch && matchesSpecialization && matchesLocation;
  });

  const clearFilters = () => {
    setSelectedSpecialization('');
    setSelectedLocation('');
    setSearchTerm('');
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Explore Therapists</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Find the perfect therapist for your needs
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search therapists by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-sm sm:text-base"
            />
          </div>

          {/* Filter Toggle Button */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm sm:text-base touch-target"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm sm:text-base font-medium">Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs sm:text-sm h-8 px-2"
              >
                Clear All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Specialization Filter */}
              <div>
                <Label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 block">
                  Specialization
                </Label>
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">All Specializations</option>
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <Label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 block">
                  Location
                </Label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4 sm:mb-6">
        <p className="text-sm sm:text-base text-gray-600">
          {filteredTherapists.length} therapist{filteredTherapists.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Therapists Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredTherapists.map((therapist) => (
          <Card key={therapist.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3 sm:pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={therapist.image}
                    alt={therapist.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-sm sm:text-base truncate">{therapist.name}</CardTitle>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{therapist.specialization}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 sm:w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-xs sm:text-sm font-medium">{therapist.rating}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                  <MapPin className="w-3 h-3 sm:w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{therapist.location}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                  <Clock className="w-3 h-3 sm:w-4 h-4 flex-shrink-0" />
                  <span>{therapist.experience} experience</span>
                </div>
                
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                  <DollarSign className="w-3 h-3 sm:w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="font-semibold">${therapist.price}/hour</span>
                </div>
              </div>

              {/* Languages */}
              <div className="flex flex-wrap gap-1">
                {therapist.languages.map((language) => (
                  <Badge key={language} variant="secondary" className="text-xs">
                    {language}
                  </Badge>
                ))}
              </div>

              {/* Availability Status */}
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  therapist.available
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {therapist.available ? 'Available' : 'Not Available'}
                </span>
                
                <Button
                  className="text-xs sm:text-sm touch-target"
                  variant={therapist.available ? "default" : "outline"}
                  disabled={!therapist.available}
                  onClick={() => navigate(`/therapist/${therapist.id}`)}
                >
                  {therapist.available ? 'View Profile' : 'Not Available'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredTherapists.length === 0 && (
        <div className="text-center py-12 sm:py-16">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">No therapists found</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            Try adjusting your search criteria or filters
          </p>
          <Button onClick={clearFilters} variant="outline" className="text-sm sm:text-base touch-target">
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

// Helper component for labels
const Label: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <label className={`block ${className || ''}`}>
    {children}
  </label>
);

export default ExploreTherapists;
