import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Calendar,
  Clock,
  DollarSign,
  Edit3,
  Eye,
  MessageSquare,
  Star,
  TrendingUp,
  Users,
  MapPin,
  Phone,
  Mail,
  Settings,
  Plus
} from 'lucide-react';

const TherapistDashboard = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [showAllRequests, setShowAllRequests] = useState(false);

  // Mock data
  const stats = {
    totalEarnings: 2840,
    totalSessions: 47,
    averageRating: 4.8,
    totalClients: 23
  };

  const allContactRequests = [
    {
      id: '1',
      clientName: 'Sarah Johnson',
      service: 'Personal Training Service',
      timeAgo: '2 hours ago'
    },
    {
      id: '2',
      clientName: 'Mike Chen',
      service: 'Guitar Lessons',
      timeAgo: '1 day ago'
    },
    {
      id: '3',
      clientName: 'Emma Wilson',
      service: 'Photography Session',
      timeAgo: '3 days ago'
    },
    {
      id: '4',
      clientName: 'David Brown',
      service: 'Home Cleaning',
      timeAgo: '5 days ago'
    },
    {
      id: '5',
      clientName: 'Lisa Davis',
      service: 'Dog Walking',
      timeAgo: '1 week ago'
    },
    {
      id: '6',
      clientName: 'Alex Thompson',
      service: 'Tutoring - Mathematics',
      timeAgo: '1 week ago'
    },
    {
      id: '7',
      clientName: 'Maria Garcia',
      service: 'Graphic Design',
      timeAgo: '2 weeks ago'
    },
    {
      id: '8',
      clientName: 'John Smith',
      service: 'IT Support',
      timeAgo: '2 weeks ago'
    }
  ];

  const upcomingSessions = [
    {
      id: '1',
      clientName: 'David Brown',
      service: 'Sports Massage',
      date: '2024-01-18',
      time: '09:00',
      duration: '60 min'
    },
    {
      id: '2',
      clientName: 'Lisa Davis',
      service: 'Hot Stone Massage',
      date: '2024-01-19',
      time: '11:00',
      duration: '90 min'
    }
  ];

  const recentReviews = [
    {
      id: '1',
      clientName: 'Alex Thompson',
      rating: 5,
      comment: 'Excellent therapeutic massage. Really helped with my back pain.',
      date: '2024-01-14'
    },
    {
      id: '2',
      clientName: 'Maria Garcia',
      rating: 5,
      comment: 'Very professional and skilled. Highly recommend!',
      date: '2024-01-13'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Service Provider Dashboard</h1>
              <p className="text-sm sm:text-base text-gray-600">
                Manage your profile and track your visibility
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-0">
              <Button
                variant="outline"
                onClick={() => navigate('/create-profile')}
                className="text-sm sm:text-base touch-target"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button
                onClick={() => navigate('/profile-stats')}
                className="text-sm sm:text-base touch-target"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                View Stats
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Profile Views</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-pink-600">1,247</p>
                </div>
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Contact Requests</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">23</p>
                </div>
                <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Average Rating</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-600">{stats.averageRating}</p>
                </div>
                <Star className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-600 fill-current" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
            {/* Recent Contact Requests */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg sm:text-xl">Recent Contact Requests</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs sm:text-sm touch-target"
                    onClick={() => setShowAllRequests(!showAllRequests)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {showAllRequests ? 'Show Less' : 'View All'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className={`space-y-3 sm:space-y-4 ${showAllRequests ? 'max-h-96 overflow-y-auto' : ''}`}>
                  {(showAllRequests ? allContactRequests : allContactRequests.slice(0, 3)).map((request) => (
                    <div key={request.id} className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm sm:text-base">{request.clientName}</p>
                          <p className="text-xs sm:text-sm text-gray-600">{request.service}</p>
                          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{request.timeAgo}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl">Recent Reviews</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  What your clients are saying
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className="space-y-4 sm:space-y-6">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4 sm:pb-6 last:border-b-0">
                      <div className="flex items-start justify-between mb-2 sm:mb-3">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                            <AvatarFallback className="bg-purple-100 text-purple-600 text-xs sm:text-sm">
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
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">

            {/* Contact Information */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2 sm:space-x-3 text-sm sm:text-base">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-700">Auckland, New Zealand</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 text-sm sm:text-base">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-700">+64 21 123 4567</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 text-sm sm:text-base">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-700">therapist@example.com</span>
                </div>
              </CardContent>
            </Card>

            {/* Profile Status */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl">Profile Status</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Your profile completion
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-gray-600">Profile Complete</span>
                    <span className="text-sm sm:text-base font-semibold text-green-600">95%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-gray-600">Services Listed</span>
                    <span className="text-sm sm:text-base font-semibold">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-gray-600">Profile Verified</span>
                    <span className="text-sm sm:text-base font-semibold text-green-600">Yes</span>
                  </div>
                </div>
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
                  <Button className="w-full text-sm sm:text-base touch-target" variant="outline">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Complete Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistDashboard;
