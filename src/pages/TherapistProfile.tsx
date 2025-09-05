import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  DollarSign,
  MessageSquare,
  Calendar,
  Phone,
  Mail,
  Globe,
  Facebook,
  Instagram,
  Linkedin,
  CheckCircle,
  XCircle
} from 'lucide-react';

const TherapistProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('services');

  // Mock data for therapist
  const therapist = {
    id: '1',
    name: 'María González',
    specialization: 'Therapeutic Massage',
    location: 'Auckland Central',
    rating: 4.8,
    reviewsCount: 127,
    experience: '8 years',
    languages: ['English', 'Spanish'],
    bio: 'Professional massage therapist with over 8 years of experience specializing in therapeutic and deep tissue massage. I help clients relieve pain, reduce stress, and improve their overall well-being through personalized massage therapy sessions.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    available: true,
    services: [
      {
        id: '1',
        name: 'Relaxation Massage',
        description: 'A gentle, flowing massage that promotes relaxation and reduces stress. Perfect for those looking to unwind and rejuvenate.',
        price: 80,
        duration: '60 min'
      },
      {
        id: '2',
        name: 'Therapeutic Massage',
        description: 'Targeted massage therapy to address specific muscle tension, pain, and mobility issues. Ideal for chronic pain relief.',
        price: 100,
        duration: '60 min'
      },
      {
        id: '3',
        name: 'Deep Tissue Massage',
        description: 'Intensive massage targeting deep muscle layers to release chronic tension and improve range of motion.',
        price: 120,
        duration: '75 min'
      },
      {
        id: '4',
        name: 'Sports Massage',
        description: 'Specialized massage for athletes and active individuals to improve performance, prevent injuries, and aid recovery.',
        price: 110,
        duration: '60 min'
      }
    ],
    availability: {
      monday: { available: true, startTime: '09:00', endTime: '17:00' },
      tuesday: { available: true, startTime: '09:00', endTime: '17:00' },
      wednesday: { available: true, startTime: '09:00', endTime: '17:00' },
      thursday: { available: true, startTime: '09:00', endTime: '17:00' },
      friday: { available: true, startTime: '09:00', endTime: '17:00' },
      saturday: { available: true, startTime: '10:00', endTime: '16:00' },
      sunday: { available: false, startTime: '', endTime: '' }
    },
    reviewsList: [
      {
        id: '1',
        clientName: 'Sarah Johnson',
        rating: 5,
        comment: 'María is absolutely amazing! Her therapeutic massage helped me recover from a sports injury much faster than expected. Very professional and skilled.',
        date: '2024-01-10'
      },
      {
        id: '2',
        clientName: 'Mike Chen',
        rating: 5,
        comment: 'Best massage therapist I\'ve ever been to. Her deep tissue massage is incredible and she really knows how to target problem areas.',
        date: '2024-01-08'
      },
      {
        id: '3',
        clientName: 'Emma Wilson',
        rating: 4,
        comment: 'Great experience! María is very professional and the relaxation massage was exactly what I needed. Will definitely book again.',
        date: '2024-01-05'
      }
    ],
    contact: {
      phone: '+64 21 123 4567',
      email: 'maria.gonzalez@example.com',
      website: 'www.mariamassage.co.nz'
    },
    socialMedia: {
      facebook: 'mariamassageauckland',
      instagram: 'mariamassage_nz',
      linkedin: 'maria-gonzalez-massage'
    }
  };

  const availableDays = Object.entries(therapist.availability)
    .filter(([_, schedule]) => schedule.available)
    .map(([day, _]) => day.charAt(0).toUpperCase() + day.slice(1));

  const handleSendMessage = () => {
    navigate('/messages');
  };

  const handleBookSession = () => {
    // This would typically open a booking modal or redirect to booking page
    console.log('Booking session with:', therapist.name);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-sm sm:text-base touch-target"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Therapist Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <Avatar className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40">
                <AvatarImage src={therapist.image} alt={therapist.name} />
                <AvatarFallback className="text-2xl sm:text-3xl md:text-4xl bg-purple-600 text-white">
                  {therapist.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {therapist.name}
                  </h1>
                  <p className="text-lg sm:text-xl text-purple-600 font-medium mb-2">
                    {therapist.specialization}
                  </p>
                  <div className="flex items-center space-x-2 sm:space-x-4 text-sm sm:text-base text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{therapist.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{therapist.experience} experience</span>
                    </div>
                  </div>
                </div>

                {/* Rating and Status */}
                <div className="flex flex-col items-end space-y-2 sm:space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            i < Math.floor(therapist.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm sm:text-base font-medium text-gray-900">
                      {therapist.rating}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {therapist.reviewsCount} reviews
                  </p>
                  <Badge
                    variant={therapist.available ? "default" : "secondary"}
                    className="text-xs sm:text-sm"
                  >
                    {therapist.available ? 'Available' : 'Not Available'}
                  </Badge>
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
                {therapist.bio}
              </p>

              {/* Languages */}
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                {therapist.languages.map((language) => (
                  <Badge key={language} variant="outline" className="text-xs sm:text-sm">
                    {language}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  onClick={handleSendMessage}
                  className="text-sm sm:text-base touch-target"
                  size="lg"
                >
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Send Message
                </Button>
                <Button
                  variant="outline"
                  onClick={handleBookSession}
                  className="text-sm sm:text-base touch-target"
                  size="lg"
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Book Session
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="services" className="text-xs sm:text-sm">Services</TabsTrigger>
                <TabsTrigger value="reviews" className="text-xs sm:text-sm">Reviews</TabsTrigger>
                <TabsTrigger value="about" className="text-xs sm:text-sm">About</TabsTrigger>
              </TabsList>

              {/* Services Tab */}
              <TabsContent value="services" className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  {therapist.services.map((service) => (
                    <Card key={service.id}>
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex-1 mb-3 sm:mb-0">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                              {service.name}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-3">
                              {service.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm sm:text-base text-gray-500">
                              <span className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{service.duration}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <DollarSign className="w-4 h-4 text-green-600" />
                                <span className="font-semibold">${service.price}</span>
                              </span>
                            </div>
                          </div>
                          <Button
                            onClick={handleSendMessage}
                            className="text-sm sm:text-base touch-target"
                            size="sm"
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Send Message
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-4 sm:space-y-6">
                <div className="space-y-4 sm:space-y-6">
                  {therapist.reviewsList.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                          <div className="flex items-center space-x-3 sm:space-x-4">
                            <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                              <AvatarFallback className="bg-purple-100 text-purple-600 text-sm sm:text-base">
                                {review.clientName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm sm:text-base">{review.clientName}</p>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs sm:text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm sm:text-base text-gray-700">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* About Tab */}
              <TabsContent value="about" className="space-y-4 sm:space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Professional Background</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6">
                    <div>
                      <h4 className="font-medium text-sm sm:text-base text-gray-900 mb-2">Experience</h4>
                      <p className="text-sm sm:text-base text-gray-600">{therapist.experience}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm sm:text-base text-gray-900 mb-2">Specialization</h4>
                      <p className="text-sm sm:text-base text-gray-600">{therapist.specialization}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm sm:text-base text-gray-900 mb-2">Languages</h4>
                      <div className="flex flex-wrap gap-2">
                        {therapist.languages.map((language) => (
                          <Badge key={language} variant="secondary" className="text-xs sm:text-sm">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {/* General Info */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl">General Info</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h4 className="font-medium text-sm sm:text-base text-gray-900 mb-2">Available Days</h4>
                    <div className="flex flex-wrap gap-2">
                      {availableDays.map((day) => (
                        <Badge key={day} variant="outline" className="text-xs sm:text-sm">
                          {day}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 mt-2">
                      Contact for specific hours
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2 sm:space-x-3 text-sm sm:text-base">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-700">{therapist.location}</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 text-sm sm:text-base">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-700">{therapist.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 text-sm sm:text-base">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-700">{therapist.contact.email}</span>
                </div>
                {therapist.contact.website && (
                  <div className="flex items-center space-x-2 sm:space-x-3 text-sm sm:text-base">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                    <a
                      href={`https://${therapist.contact.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700 hover:underline"
                    >
                      {therapist.contact.website}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Social Media */}
            {(therapist.socialMedia.facebook || therapist.socialMedia.instagram || therapist.socialMedia.linkedin) && (
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-lg sm:text-xl">Social Media</CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 md:p-6">
                  <div className="flex space-x-3 sm:space-x-4">
                    {therapist.socialMedia.facebook && (
                      <a
                        href={`https://facebook.com/${therapist.socialMedia.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                      </a>
                    )}
                    {therapist.socialMedia.instagram && (
                      <a
                        href={`https://instagram.com/${therapist.socialMedia.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-700"
                      >
                        <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                      </a>
                    )}
                    {therapist.socialMedia.linkedin && (
                      <a
                        href={`https://linkedin.com/in/${therapist.socialMedia.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:text-blue-800"
                      >
                        <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistProfile;
