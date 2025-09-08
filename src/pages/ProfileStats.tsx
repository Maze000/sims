import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Eye, 
  MapPin, 
  Clock, 
  Users,
  Calendar,
  BarChart3
} from 'lucide-react';

const ProfileStats = () => {
  // Mock data for profile statistics
  const stats = {
    totalViews: 1247,
    weeklyViews: 89,
    monthlyViews: 324,
    viewsByDay: [
      { day: 'Mon', views: 12 },
      { day: 'Tue', views: 18 },
      { day: 'Wed', views: 15 },
      { day: 'Thu', views: 22 },
      { day: 'Fri', views: 28 },
      { day: 'Sat', views: 8 },
      { day: 'Sun', views: 6 }
    ],
    topLocations: [
      { location: 'Auckland Central', views: 456, percentage: 36.6 },
      { location: 'Auckland North', views: 234, percentage: 18.8 },
      { location: 'Auckland South', views: 189, percentage: 15.2 },
      { location: 'Auckland East', views: 156, percentage: 12.5 },
      { location: 'Auckland West', views: 123, percentage: 9.9 },
      { location: 'Other', views: 89, percentage: 7.1 }
    ],
    peakHours: [
      { hour: '9:00 AM', views: 45 },
      { hour: '10:00 AM', views: 52 },
      { hour: '11:00 AM', views: 38 },
      { hour: '2:00 PM', views: 41 },
      { hour: '3:00 PM', views: 48 },
      { hour: '4:00 PM', views: 35 }
    ],
    recentActivity: [
      { time: '2 hours ago', action: 'Profile viewed by client', location: 'Auckland Central' },
      { time: '4 hours ago', action: 'Profile viewed by client', location: 'Auckland North' },
      { time: '6 hours ago', action: 'Profile viewed by client', location: 'Auckland South' },
      { time: '1 day ago', action: 'Profile viewed by client', location: 'Auckland East' },
      { time: '1 day ago', action: 'Profile viewed by client', location: 'Auckland Central' }
    ]
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Profile Statistics</h1>
        <p className="text-gray-600 mt-2">Track your profile performance and visibility</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="toy-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-3xl font-bold" style={{color: '#FF6B35'}}>{stats.totalViews.toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8" style={{color: '#FF6B35'}} />
            </div>
          </CardContent>
        </Card>

        <Card className="toy-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-3xl font-bold text-blue-600">{stats.weeklyViews}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="toy-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-3xl font-bold text-green-600">{stats.monthlyViews}</p>
              </div>
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Views Chart */}
        <Card className="toy-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Views This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.viewsByDay.map((day) => (
                <div key={day.day} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{day.day}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full"
                        style={{backgroundColor: '#FF6B35', width: `${(day.views / 28) * 100}%`}}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{day.views}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Locations */}
        <Card className="toy-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Views by Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topLocations.map((location, index) => (
                <div key={location.location} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      #{index + 1}
                    </Badge>
                    <span className="text-sm font-medium">{location.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">{location.views}</span>
                    <span className="text-xs text-gray-500 w-12 text-right">{location.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Peak Hours */}
        <Card className="toy-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Peak Viewing Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.peakHours.map((hour) => (
                <div key={hour.hour} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{hour.hour}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(hour.views / 52) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{hour.views}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="toy-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: '#FF6B35'}}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-600">{activity.location}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileStats;
