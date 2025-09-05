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

  // Mock data
  const stats = {
    totalEarnings: 2840,
    totalSessions: 47,
    averageRating: 4.8,
    totalClients: 23
  };

  const recentBookings = [
    {
      id: '1',
      clientName: 'Sarah Johnson',
      service: 'Therapeutic Massage',
      date: '2024-01-15',
      time: '14:00',
      status: 'confirmed',
      amount: 120
    },
    {
      id: '2',
      clientName: 'Mike Chen',
      service: 'Deep Tissue Massage',
      date: '2024-01-16',
      time: '10:00',
      status: 'pending',
      amount: 140
    },
    {
      id: '3',
      clientName: 'Emma Wilson',
      service: 'Relaxation Massage',
      date: '2024-01-17',
      time: '16:00',
      status: 'confirmed',
      amount: 100
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Therapist Dashboard</h1>
              <p className="text-sm sm:text-base text-gray-600">
                Manage your practice and track your performance
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
                onClick={() => navigate('/messages')}
                className="text-sm sm:text-base touch-target"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                View Messages
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Total Earnings</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">${stats.totalEarnings}</p>
                </div>
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Total Sessions</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">{stats.totalSessions}</p>
                </div>
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-600" />
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

          <Card>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Total Clients</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-purple-600">{stats.totalClients}</p>
                </div>
                <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
            {/* Recent Bookings */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg sm:text-xl">Recent Bookings</CardTitle>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm touch-target">
                    <Eye className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm sm:text-base">{booking.clientName}</p>
                          <p className="text-xs sm:text-sm text-gray-600">{booking.service}</p>
                          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{new Date(booking.date).toLocaleDateString()}</span>
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                            <span>{booking.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={`text-xs ${getStatusColor(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </Badge>
                        <p className="text-sm sm:text-base font-semibold text-green-600 mt-1">
                          ${booking.amount}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Sessions */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl">Upcoming Sessions</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Your next scheduled appointments
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-3 sm:p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm sm:text-base">{session.clientName}</p>
                          <p className="text-xs sm:text-sm text-gray-600">{session.service}</p>
                          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{new Date(session.date).toLocaleDateString()}</span>
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                            <span>{session.time} ({session.duration})</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs sm:text-sm touch-target">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message
                      </Button>
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
            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3">
                <Button
                  onClick={() => navigate('/create-profile')}
                  className="w-full justify-start text-sm sm:text-base touch-target"
                  variant="outline"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button
                  onClick={() => navigate('/messages')}
                  className="w-full justify-start text-sm sm:text-base touch-target"
                  variant="outline"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  View Messages
                </Button>
                <Button
                  onClick={() => navigate('/explore')}
                  className="w-full justify-start text-sm sm:text-base touch-target"
                  variant="outline"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View My Profile
                </Button>
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

            {/* Performance Insights */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl">Performance Insights</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  This week's performance
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-gray-600">Sessions</span>
                    <span className="text-sm sm:text-base font-semibold">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-gray-600">Earnings</span>
                    <span className="text-sm sm:text-base font-semibold text-green-600">$640</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-gray-600">New Clients</span>
                    <span className="text-sm sm:text-base font-semibold">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-gray-600">Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm sm:text-base font-semibold">4.9</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center text-xs sm:text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    +12% from last week
                  </div>
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
