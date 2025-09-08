import { useState } from 'react';
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
  Filter,
  X,
  SlidersHorizontal
} from 'lucide-react';
import { mockProviders, ServiceProvider } from '@/data/mockProviders';
import { serviceCategories } from '@/data/categories';

const ExploreSims = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Use mock providers data
  const providers = mockProviders;

  // Get unique specializations from providers
  const specializations = [...new Set(providers.map(p => p.specialization))];

  // Get unique locations from providers
  const locations = [...new Set(providers.map(p => p.location))];

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || provider.category === selectedCategory;
    const matchesLocation = !selectedLocation || provider.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedLocation('');
    setSearchTerm('');
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{color: '#FF6B35'}}>Explore Sims</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Find the perfect service provider for your needs
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search providers by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="toy-input pl-10 text-sm sm:text-base"
            />
          </div>

          {/* Filter Toggle Button */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm sm:text-base touch-target"
            style={{
              background: '#FF6B35',
              color: 'white',
              border: 'none',
              borderRadius: '1rem',
              padding: '0.5rem 1rem',
              fontWeight: 'bold',
              transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(-1px) scale(1.005)';
              (e.target as HTMLElement).style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(0) scale(1)';
              (e.target as HTMLElement).style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            }}
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
              {/* Category Filter */}
              <div>
                <Label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 block">
                  Category
                </Label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="toy-input w-full px-3 py-2 text-sm sm:text-base"
                >
                  <option value="">All Categories</option>
                  {serviceCategories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
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
                  className="toy-input w-full px-3 py-2 text-sm sm:text-base"
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
          {filteredProviders.length} provider{filteredProviders.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Providers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredProviders.map((provider) => (
          <Card key={provider.id} className="toy-card hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3 sm:pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-sm sm:text-base truncate">{provider.name}</CardTitle>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{provider.specialization}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 sm:w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-xs sm:text-sm font-medium">{provider.rating}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                  <MapPin className="w-3 h-3 sm:w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{provider.location}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                  <Clock className="w-3 h-3 sm:w-4 h-4 flex-shrink-0" />
                  <span>{provider.experience} experience</span>
                </div>
                
              </div>

              {/* Languages */}
              <div className="flex flex-wrap gap-1">
                {provider.languages.map((language) => (
                  <Badge key={language} variant="secondary" className="text-xs">
                    {language}
                  </Badge>
                ))}
              </div>

              {/* Price and Availability */}
              <div className="space-y-2">
                {/* Lowest Price */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold" style={{color: '#FF6B35'}}>
                    From ${Math.min(...provider.services.map(s => s.price))}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    provider.available
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {provider.available ? 'Available' : 'Not Available'}
                  </span>
                </div>
                
                {/* View Profile Button */}
                <Button
                  className="text-xs sm:text-sm touch-target w-full mt-2"
                  style={{
                    background: '#FF6B35',
                    color: 'white',
                    border: 'none',
                    borderRadius: '1rem',
                    padding: '0.5rem 1rem',
                    fontWeight: 'bold',
                    transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.transform = 'translateY(-1px) scale(1.005)';
                    (e.target as HTMLElement).style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.transform = 'translateY(0) scale(1)';
                    (e.target as HTMLElement).style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                  }}
                  variant={provider.available ? "default" : "outline"}
                  disabled={!provider.available}
                  onClick={() => navigate(`/sims/${provider.id}`)}
                >
                  {provider.available ? 'View Profile' : 'Not Available'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredProviders.length === 0 && (
        <div className="text-center py-12 sm:py-16">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">No providers found</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            Try adjusting your search criteria or filters
          </p>
          <Button 
            onClick={clearFilters} 
            variant="outline" 
            className="text-sm sm:text-base touch-target"
            style={{
              background: 'transparent',
              color: '#FF6B35',
              border: '2px solid #FF6B35',
              borderRadius: '1rem',
              padding: '0.5rem 1rem',
              fontWeight: 'bold',
              transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(109, 190, 69, 0.1)';
              (e.target as HTMLElement).style.borderColor = '#FF6B35';
              (e.target as HTMLElement).style.color = '#FF6B35';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = 'transparent';
              (e.target as HTMLElement).style.borderColor = '#FF6B35';
              (e.target as HTMLElement).style.color = '#FF6B35';
            }}
          >
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

export default ExploreSims;
