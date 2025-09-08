import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MapPin, Clock, DollarSign, Heart, Eye } from 'lucide-react';
import { serviceCategories } from '@/data/categories';
import Footer from '@/components/Footer';


// KiwiSilhouette Component
const KiwiSilhouette = ({ size = 80, className = "" }: { size?: number; className?: string }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Kiwi head */}
      <ellipse cx="50" cy="50" rx="30" ry="25" fill="hsl(var(--primary))"/>
      {/* Kiwi beak - long and prominent */}
      <ellipse cx="50" cy="35" rx="20" ry="6" fill="hsl(var(--highlight))" transform="rotate(-15 50 35)"/>
      {/* Kiwi eyes - clearly visible */}
      <circle cx="42" cy="45" r="4" fill="white"/>
      <circle cx="58" cy="45" r="4" fill="white"/>
      <circle cx="42" cy="45" r="2" fill="hsl(var(--foreground))"/>
      <circle cx="58" cy="45" r="2" fill="hsl(var(--foreground))"/>
    </svg>
  );
};

const Home = () => {
  const navigate = useNavigate();

  // Mock data for service providers
  const featuredProviders = [
    {
      id: '1',
      name: 'Sarah Mitchell',
      specialization: 'Personal Trainer',
      category: 'health-wellness',
      location: 'Auckland Central',
      rating: 4.8,
      reviews: 127,
      price: '80',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
      available: true
    },
    {
      id: '2',
      name: 'David Chen',
      specialization: 'Guitar Teacher',
      category: 'education-development',
      location: 'Wellington CBD',
      rating: 4.9,
      reviews: 89,
      price: '95',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      available: true
    },
    {
      id: '3',
      name: 'Emma Wilson',
      specialization: 'Massage Therapist',
      category: 'health-wellness',
      location: 'Christchurch',
      rating: 4.7,
      reviews: 156,
      price: '75',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      available: true
    }
  ];

  return (
    <div className="pt-14 sm:pt-16 md:pt-20 min-h-screen relative overflow-hidden" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234CAF50' fill-opacity='0.2'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1.5'/%3E%3Ccircle cx='50' cy='15' r='1'/%3E%3Ccircle cx='15' cy='45' r='1.5'/%3E%3Ccircle cx='45' cy='50' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    }}>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 relative">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 relative z-10">
          {/* Kiwi Silhouette */}
          <div className="flex justify-center mb-4">
            <KiwiSilhouette size={80} className="animate-koru-spin" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-3 sm:mb-4 md:mb-6 font-extrabold" style={{color: '#FF6B35'}}>
            Sims Marketplace
          </h1>
          <h2 className="title-secondary text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 md:mb-8">
            Find Your Provider
          </h2>
          <p className="text-descriptive text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto px-2">
            Connect directly with local service providers. 
            No booking fees, no middleman, just direct contact with the people who can help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center px-2">
            <Button 
              size="lg" 
              className="btn-plastic btn-plastic-kiwi px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base touch-target"
              onClick={() => navigate('/explore')}
            >
              Browse Providers
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base touch-target"
              style={{
                background: 'transparent',
                border: '2px solid #3BAFDA',
                color: '#3BAFDA',
                borderRadius: '1rem',
                transition: 'all 0.6s ease'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = 'rgba(59, 175, 218, 0.1)';
                (e.target as HTMLElement).style.borderColor = '#3BAFDA';
                (e.target as HTMLElement).style.color = '#3BAFDA';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = 'transparent';
                (e.target as HTMLElement).style.borderColor = '#3BAFDA';
                (e.target as HTMLElement).style.color = '#3BAFDA';
              }}
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          <div className="card-collectible text-center">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2" style={{color: 'hsl(var(--primary))'}}>500+</div>
            <div className="text-xs sm:text-sm md:text-base font-bold" style={{color: 'hsl(var(--foreground))'}}>Active Providers</div>
          </div>
          <div className="card-collectible card-collectible-featured text-center">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2" style={{color: 'hsl(var(--secondary))'}}>2,000+</div>
            <div className="text-xs sm:text-sm md:text-base font-bold" style={{color: 'hsl(var(--foreground))'}}>Services Listed</div>
          </div>
          <div className="card-collectible card-collectible-premium text-center sm:col-span-2 md:col-span-1 animate-glow-pulse">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2" style={{color: 'hsl(var(--highlight))'}}>50+</div>
            <div className="text-xs sm:text-sm md:text-base font-bold" style={{color: 'hsl(var(--foreground))'}}>Cities Covered</div>
          </div>
        </div>

        {/* Service Categories */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h2 className="title-secondary text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 md:mb-8 text-center">
            Browse by Category
          </h2>
          <p className="text-descriptive text-sm sm:text-base text-center mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Find exactly what you're looking for by browsing our service categories
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {serviceCategories.slice(0, 8).map((category) => (
              <Card key={category.id} className="card-collectible cursor-pointer smooth-hover" onClick={() => navigate('/explore')}>
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl mb-2">{category.icon}</div>
                  <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-1" style={{color: 'hsl(var(--foreground))'}}>{category.name}</h3>
                  <p className="text-xs hidden sm:block" style={{color: 'hsl(var(--muted-foreground))'}}>{category.services.length} services</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Service Providers */}
        <div>
          <h2 className="title-secondary text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 md:mb-8 text-center">
            Popular Providers
          </h2>
          <p className="text-descriptive text-sm sm:text-base text-center mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Check out some of our most popular service providers
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {featuredProviders.map((provider) => (
              <Card key={provider.id} className="card-collectible cursor-pointer">
                <CardHeader className="pb-2 sm:pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <img 
                        src={provider.image} 
                        alt={provider.name}
                        className="avatar-plastic w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16"
                      />
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-sm sm:text-base md:text-lg truncate">{provider.name}</CardTitle>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{provider.specialization}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 sm:w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-xs sm:text-sm font-medium">{provider.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                      <MapPin className="w-3 h-3 sm:w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{provider.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                      <Clock className="w-3 h-3 sm:w-4 h-4 flex-shrink-0" />
                      <span>{provider.reviews} reviews</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        provider.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {provider.available ? 'Available' : 'Not Available'}
                      </span>
                    </div>
                    <Button 
                      className={`w-full mt-2 sm:mt-3 text-xs sm:text-sm touch-target ${provider.available ? 'btn-plastic btn-plastic-kiwi' : 'btn-plastic btn-plastic-ghost'}`}
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
        </div>

        {/* CTA Section */}
        <div className="text-center mt-8 sm:mt-12 md:mt-16">
          <h3 className="title-secondary text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 md:mb-4">
            Ready to Start Your Service?
          </h3>
          <p className="text-descriptive text-xs sm:text-sm md:text-base mb-3 sm:mb-4 md:mb-6 px-2">
            Create your profile and start connecting with customers today. It's free to list your services.
          </p>
          <Button 
            size="lg" 
            variant="outline"
            className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base touch-target"
            style={{
              background: '#3BAFDA',
              border: '2px solid #3BAFDA',
              color: 'white',
              borderRadius: '1rem',
              transition: 'all 0.6s ease',
              boxShadow: 'none'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = 'transparent';
              (e.target as HTMLElement).style.borderColor = '#3BAFDA';
              (e.target as HTMLElement).style.color = '#3BAFDA';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = '#3BAFDA';
              (e.target as HTMLElement).style.borderColor = '#3BAFDA';
              (e.target as HTMLElement).style.color = 'white';
            }}
            onClick={() => navigate('/login')}
          >
            List Your Services
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;