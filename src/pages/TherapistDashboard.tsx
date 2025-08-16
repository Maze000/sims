import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  DollarSign, 
  Users, 
  Star, 
  TrendingUp,
  Clock,
  MessageSquare,
  Settings,
  Eye,
  Edit,
  Plus,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react";

const TherapistDashboard = () => {
  const navigate = useNavigate();
  const [profileStatus] = useState("pending"); // pending, approved, rejected

  const therapistData = {
    name: "Sarah Mitchell",
    avatar: "/placeholder.svg",
    rating: 4.9,
    totalReviews: 234,
    totalBookings: 1250,
    monthlyEarnings: 4200,
    profileViews: 1890,
    responseRate: 98,
    status: profileStatus
  };

  const upcomingBookings = [
    {
      id: "1",
      clientName: "Anna M.",
      service: "Relaxation Massage",
      date: "2025-01-20",
      time: "14:00",
      duration: "60 min",
      price: 120,
      status: "confirmed"
    },
    {
      id: "2",
      clientName: "Chris R.",
      service: "Deep Tissue Massage",
      date: "2025-01-20",
      time: "16:00",
      duration: "75 min",
      price: 150,
      status: "confirmed"
    },
    {
      id: "3",
      clientName: "Lucy P.",
      service: "Aromatherapy Massage",
      date: "2025-01-21",
      time: "10:00",
      duration: "90 min",
      price: 180,
      status: "pending"
    }
  ];

  const recentReviews = [
    {
      id: "1",
      clientName: "Michael K.",
      rating: 5,
      comment: "Excellent massage, very professional and relaxing.",
      date: "2025-01-15",
      service: "Sports Massage"
    },
    {
      id: "2",
      clientName: "Emma W.",
      rating: 5,
      comment: "Sarah has amazing technique. Highly recommend!",
      date: "2025-01-12",
      service: "Deep Tissue"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800"><AlertCircle className="w-3 h-3 mr-1" />Under Review</Badge>;
      case "approved":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-purple-600">
              <span className="logo-nu">NU</span>
              <span className="logo-massage">massage</span>
            </h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Avatar>
                <AvatarImage src={therapistData.avatar} />
                <AvatarFallback>{therapistData.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Status Alert */}
        {profileStatus === "pending" && (
          <Card className="mb-6 bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <div>
                  <h3 className="font-medium text-yellow-800">Profile Under Review</h3>
                  <p className="text-sm text-yellow-700">
                    Your therapist profile is being reviewed. We'll notify you within 24-48 hours once approved.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={therapistData.avatar} />
              <AvatarFallback className="text-xl">{therapistData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold">Welcome back, {therapistData.name.split(' ')[0]}!</h2>
                {getStatusBadge(therapistData.status)}
              </div>
              <p className="text-gray-600">Here's your therapist dashboard overview</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Monthly Earnings</p>
                  <p className="text-2xl font-bold text-green-600">${therapistData.monthlyEarnings}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold">{therapistData.totalBookings}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex items-center mt-2 text-sm text-blue-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8 this week
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Average Rating</p>
                  <div className="flex items-center gap-1">
                    <p className="text-2xl font-bold">{therapistData.rating}</p>
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="text-sm text-gray-600 mt-2">
                {therapistData.totalReviews} reviews
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Profile Views</p>
                  <p className="text-2xl font-bold">{therapistData.profileViews}</p>
                </div>
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
              <div className="flex items-center mt-2 text-sm text-purple-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +24 today
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Upcoming Bookings</span>
                      <Button size="sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        View Calendar
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingBookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="text-sm text-gray-600">
                                {new Date(booking.date).toLocaleDateString('en-NZ', { month: 'short' })}
                              </div>
                              <div className="text-lg font-bold">
                                {new Date(booking.date).getDate()}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium">{booking.clientName}</h4>
                              <p className="text-sm text-gray-600">{booking.service}</p>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                {booking.time} • {booking.duration}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">${booking.price}</div>
                            <Badge variant={booking.status === "confirmed" ? "default" : "secondary"} className="text-xs">
                              {booking.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start">
                      <Plus className="w-4 h-4 mr-2" />
                      Block Time Off
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Edit className="w-4 h-4 mr-2" />
                      Update Availability
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message Clients
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{review.clientName}</h4>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <div>{review.date}</div>
                          <div>{review.service}</div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>This Month's Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    ${therapistData.monthlyEarnings}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">+12% from last month</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completed bookings:</span>
                      <span>42 sessions</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Average per session:</span>
                      <span>${Math.round(therapistData.monthlyEarnings / 42)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Platform fee (5%):</span>
                      <span>-${Math.round(therapistData.monthlyEarnings * 0.05)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Next payout</p>
                      <p className="font-medium">January 25, 2025</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Bank account</p>
                      <p className="font-medium">ANZ ***1234</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Update Payment Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Profile Management</span>
                  <Button size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Profile Status</h4>
                    {getStatusBadge(therapistData.status)}
                    {profileStatus === "pending" && (
                      <p className="text-sm text-gray-600 mt-2">
                        Your profile is currently under review. You'll be notified once it's approved.
                      </p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Profile Completion</h4>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">85% complete</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-sm mb-2">Profile Views</h5>
                      <p className="text-2xl font-bold">{therapistData.profileViews}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-2">Response Rate</h5>
                      <p className="text-2xl font-bold">{therapistData.responseRate}%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TherapistDashboard;
