import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Bell, 
  Shield, 
  Globe, 
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  X
} from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('notifications');
  
  // console.log('Current activeTab:', activeTab);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    contactRequestAlerts: true,
    profileViewAlerts: true,
    weeklyUpdates: false
  });


  const [passwordSettings, setPasswordSettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });


  const updateNotificationSettings = (field: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }));
  };


  const updatePasswordSettings = (field: string, value: string) => {
    setPasswordSettings(prev => ({ ...prev, [field]: value }));
  };


  const handleSavePassword = () => {
    // TODO: Implement API call to change password
    // This will be implemented when backend is ready
    // console.log('Changing password:', passwordSettings);
  };

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'devices', label: 'Devices', icon: Smartphone }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Manage your account preferences and settings. For personal information, visit your <a href="/profile" className="text-orange-600 hover:text-orange-700 underline">Profile</a>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        // console.log('Clicking tab:', tab.id, 'Current activeTab:', activeTab);
                        setActiveTab(tab.id);
                        // console.log('After setActiveTab, activeTab should be:', tab.id);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 text-left transition-colors rounded-md ${
                        activeTab === tab.id 
                          ? 'bg-orange-50 border-r-2 border-orange-600' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${activeTab === tab.id ? 'text-orange-600' : 'text-gray-500'}`} />
                      <span className={`text-sm sm:text-base font-medium ${activeTab === tab.id ? 'text-orange-600' : 'text-gray-700'}`}>
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                  Notification Preferences
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Control how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm sm:text-base font-medium">Email Notifications</Label>
                      <p className="text-xs sm:text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => updateNotificationSettings('emailNotifications', checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm sm:text-base font-medium">Push Notifications</Label>
                      <p className="text-xs sm:text-sm text-gray-600">Receive push notifications on your device</p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => updateNotificationSettings('pushNotifications', checked)}
                    />
                  </div>

                  <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm sm:text-base font-medium">Contact Request Alerts</Label>
                        <p className="text-xs sm:text-sm text-gray-600">Get notified when someone requests contact</p>
                      </div>
                      <Switch
                        checked={notificationSettings.contactRequestAlerts}
                        onCheckedChange={(checked) => updateNotificationSettings('contactRequestAlerts', checked)}
                      />
                    </div>

                  <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm sm:text-base font-medium">Profile View Alerts</Label>
                        <p className="text-xs sm:text-sm text-gray-600">Notify when someone views your profile</p>
                      </div>
                      <Switch
                        checked={notificationSettings.profileViewAlerts}
                        onCheckedChange={(checked) => updateNotificationSettings('profileViewAlerts', checked)}
                      />
                    </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm sm:text-base font-medium">Marketing Emails</Label>
                      <p className="text-xs sm:text-sm text-gray-600">Receive promotional and marketing content</p>
                    </div>
                    <Switch
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={(checked) => updateNotificationSettings('marketingEmails', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6 sm:space-y-8">
              {/* Password Change */}
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
                    Change Password
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-xs sm:text-sm font-medium">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={passwordSettings.currentPassword}
                        onChange={(e) => updatePasswordSettings('currentPassword', e.target.value)}
                        className="pr-10 text-sm sm:text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-xs sm:text-sm font-medium">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordSettings.newPassword}
                        onChange={(e) => updatePasswordSettings('newPassword', e.target.value)}
                        className="pr-10 text-sm sm:text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-xs sm:text-sm font-medium">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={passwordSettings.confirmPassword}
                        onChange={(e) => updatePasswordSettings('confirmPassword', e.target.value)}
                        className="pr-10 text-sm sm:text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSavePassword} className="text-sm sm:text-base touch-target">
                      <Save className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}


          {/* Device Settings */}
          {activeTab === 'devices' && (
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />
                  Device Management
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Manage your connected devices and sessions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="text-center py-8 sm:py-12">
                  <Smartphone className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Device Management</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    View and manage your connected devices and active sessions
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    Coming soon...
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
