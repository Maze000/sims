import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MapPin, Clock, DollarSign } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  // Mock data for therapists
  const featuredTherapists = [
    {
      id: '1',
      name: 'María González',
      specialization: 'Therapeutic Massage',
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
      specialization: 'Sports Massage',
      location: 'Wellington CBD',
      rating: 4.9,
      reviews: 89,
      price: '95',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      available: true
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
      available: false
    }
  ];

  return (
    <div className="pt-14 sm:pt-16 md:pt-20 min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
            Find the <span className="text-purple-600">Best Therapist</span> for You
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto px-2">
            We connect clients with certified professional therapists in New Zealand. 
            Enjoy therapeutic, relaxing and sports massages of the highest quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center px-2">
            <Button 
              size="lg" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base touch-target"
              onClick={() => navigate('/explore')}
            >
              Explore Therapists
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base touch-target"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600 mb-1 sm:mb-2">500+</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600">Certified Therapists</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600 mb-1 sm:mb-2">10,000+</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600">Satisfied Clients</div>
          </div>
          <div className="text-center sm:col-span-2 md:col-span-1">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600 mb-1 sm:mb-2">50+</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600">Cities Covered</div>
          </div>
        </div>

        {/* Featured Therapists */}
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 text-center">
            Featured Therapists
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {featuredTherapists.map((therapist) => (
              <Card key={therapist.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-2 sm:pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <img 
                        src={therapist.image} 
                        alt={therapist.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-sm sm:text-base md:text-lg truncate">{therapist.name}</CardTitle>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{therapist.specialization}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 sm:w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-xs sm:text-sm font-medium">{therapist.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                      <MapPin className="w-3 h-3 sm:w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{therapist.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                      <Clock className="w-3 h-3 sm:w-4 h-4 flex-shrink-0" />
                      <span>{therapist.reviews} reviews</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-3 h-3 sm:w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm font-semibold">${therapist.price}/hour</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        therapist.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {therapist.available ? 'Available' : 'Not Available'}
                      </span>
                    </div>
                    <Button 
                      className="w-full mt-2 sm:mt-3 text-xs sm:text-sm touch-target"
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
        </div>

        {/* CTA Section */}
        <div className="text-center mt-8 sm:mt-12 md:mt-16">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
            Are you a Professional Therapist?
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4 md:mb-6 px-2">
            Join our platform and connect with clients looking for your services
          </p>
          <Button 
            size="lg" 
            variant="outline"
            className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base touch-target"
            onClick={() => navigate('/login')}
          >
            Register as Therapist
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;