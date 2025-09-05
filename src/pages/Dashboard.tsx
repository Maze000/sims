import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  MessageSquare, 
  Crown, 
  Calendar, 
  Star, 
  MapPin, 
  Phone, 
  Mail,
  Settings,
  LogOut
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigateToMembership = () => {
    navigate('/membership');
  };

  const handleNavigateToTherapistDashboard = () => {
    navigate('/therapist-dashboard');
  };

  const handleNavigateToCreateProfile = () => {
    navigate('/create-profile');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Welcome Section */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName}!
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 sm:mt-2">
            Manage your {user?.userType === 'therapist' ? 'therapist profile' : 'wellness journey'} and connect with others
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleNavigateToMembership}>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Membership</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">Active</p>
                </div>
                <Crown className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Messages</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">3</p>
                </div>
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          {user?.userType === 'client' && (
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleNavigateToCreateProfile}>
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">¿Eres Terapeuta?</p>
                    <p className="text-xs sm:text-sm md:text-lg font-bold text-purple-600">Registrarse como Terapeuta</p>
                  </div>
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Appointments</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-purple-600">2</p>
                </div>
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Rating</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-600">4.8</p>
                </div>
                <Star className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4 md:space-y-6">
            {/* Profile Section */}
            <Card>
              <CardHeader className="p-3 sm:p-4 md:p-6">
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
                  <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  <div>
                    <Label className="text-xs sm:text-sm font-medium text-gray-600">Full Name</Label>
                    <p className="text-xs sm:text-sm md:text-base font-medium">{user?.firstName} {user?.lastName}</p>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm font-medium text-gray-600">Email</Label>
                    <p className="text-xs sm:text-sm md:text-base font-medium">{user?.email}</p>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm font-medium text-gray-600">User Type</Label>
                    <Badge variant={user?.userType === 'therapist' ? 'default' : 'secondary'} className="text-xs sm:text-sm">
                      {user?.userType === 'therapist' ? 'Therapist' : 'Client'}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm font-medium text-gray-600">Verification Status</Label>
                    <Badge variant={user?.isVerified ? 'default' : 'secondary'} className="text-xs sm:text-sm">
                      {user?.isVerified ? 'Verified' : 'Pending'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader className="p-3 sm:p-4 md:p-6">
                <CardTitle className="text-sm sm:text-base md:text-lg">Recent Activity</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Your latest interactions and updates</CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm md:text-base font-medium">Profile updated</p>
                      <p className="text-xs sm:text-sm text-gray-600">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm md:text-base font-medium">New message received</p>
                      <p className="text-xs sm:text-sm text-gray-600">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm md:text-base font-medium">Appointment scheduled</p>
                      <p className="text-xs sm:text-sm text-gray-600">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader className="p-3 sm:p-4 md:p-6">
                <CardTitle className="text-sm sm:text-base md:text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3">
                {user?.userType === 'therapist' ? (
                  <Button 
                    onClick={handleNavigateToTherapistDashboard} 
                    className="w-full justify-start text-xs sm:text-sm touch-target"
                    variant="outline"
                  >
                    <User className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                    Manage Profile
                  </Button>
                                 ) : (
                   <Button 
                     onClick={handleNavigateToCreateProfile} 
                     className="w-full justify-start text-xs sm:text-sm touch-target"
                     variant="outline"
                   >
                     <User className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                     Register as Therapist
                   </Button>
                 )}
                
                <Button 
                  onClick={handleNavigateToMembership} 
                  className="w-full justify-start text-xs sm:text-sm touch-target"
                  variant="outline"
                >
                  <Crown className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                  Manage Membership
                </Button>
                
                <Button className="w-full justify-start text-xs sm:text-sm touch-target" variant="outline">
                  <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                  View Messages
                </Button>
                
                <Button className="w-full justify-start text-xs sm:text-sm touch-target" variant="outline">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                  Schedule Session
                </Button>
              </CardContent>
            </Card>

            {/* Membership Status */}
            <Card>
              <CardHeader className="p-3 sm:p-4 md:p-6">
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
                  <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                  Membership Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className="text-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 mb-1 sm:mb-2">Free Trial</div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 md:mb-4">14 days remaining</p>
                  <Button 
                    onClick={handleNavigateToMembership} 
                    className="w-full text-xs sm:text-sm touch-target"
                    size="sm"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader className="p-3 sm:p-4 md:p-6">
                <CardTitle className="text-sm sm:text-base md:text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm truncate">{user?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">Auckland, New Zealand</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">+64 21 123 4567</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for labels
const Label: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <label className={`block text-xs sm:text-sm font-medium text-gray-700 ${className || ''}`}>
    {children}
  </label>
);

export default Dashboard;
