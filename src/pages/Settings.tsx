import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Bell, 
  Shield, 
  User, 
  Globe, 
  Palette, 
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  X
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileSettings, setProfileSettings] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+64 21 123 4567',
    location: 'Auckland, New Zealand',
    bio: 'Wellness enthusiast looking for quality massage therapy.'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    appointmentReminders: true,
    newMessageAlerts: true,
    weeklyUpdates: false
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    showOnlineStatus: true,
    dataSharing: false
  });

  const [passwordSettings, setPasswordSettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const updateProfileSettings = (field: string, value: string) => {
    setProfileSettings(prev => ({ ...prev, [field]: value }));
  };

  const updateNotificationSettings = (field: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }));
  };

  const updatePrivacySettings = (field: string, value: string | boolean) => {
    setPrivacySettings(prev => ({ ...prev, [field]: value }));
  };

  const updatePasswordSettings = (field: string, value: string) => {
    setPasswordSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    // TODO: Implement API call to save profile settings
    console.log('Saving profile settings:', profileSettings);
  };

  const handleSavePassword = () => {
    // TODO: Implement API call to change password
    console.log('Changing password:', passwordSettings);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'devices', label: 'Devices', icon: Smartphone }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Manage your account preferences and settings
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
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-base font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <User className="w-5 h-5 sm:w-6 sm:h-6" />
                  Profile Settings
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Update your personal information and profile details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-xs sm:text-sm font-medium">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileSettings.firstName}
                      onChange={(e) => updateProfileSettings('firstName', e.target.value)}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-xs sm:text-sm font-medium">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileSettings.lastName}
                      onChange={(e) => updateProfileSettings('lastName', e.target.value)}
                      className="text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs sm:text-sm font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileSettings.email}
                    onChange={(e) => updateProfileSettings('email', e.target.value)}
                    className="text-sm sm:text-base"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs sm:text-sm font-medium">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profileSettings.phone}
                      onChange={(e) => updateProfileSettings('phone', e.target.value)}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-xs sm:text-sm font-medium">Location</Label>
                    <Input
                      id="location"
                      value={profileSettings.location}
                      onChange={(e) => updateProfileSettings('location', e.target.value)}
                      className="text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-xs sm:text-sm font-medium">Bio</Label>
                  <textarea
                    id="bio"
                    value={profileSettings.bio}
                    onChange={(e) => updateProfileSettings('bio', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile} className="text-sm sm:text-base touch-target">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

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
                      <Label className="text-sm sm:text-base font-medium">Appointment Reminders</Label>
                      <p className="text-xs sm:text-sm text-gray-600">Get reminded about upcoming appointments</p>
                    </div>
                    <Switch
                      checked={notificationSettings.appointmentReminders}
                      onCheckedChange={(checked) => updateNotificationSettings('appointmentReminders', checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm sm:text-base font-medium">New Message Alerts</Label>
                      <p className="text-xs sm:text-sm text-gray-600">Notify when you receive new messages</p>
                    </div>
                    <Switch
                      checked={notificationSettings.newMessageAlerts}
                      onCheckedChange={(checked) => updateNotificationSettings('newMessageAlerts', checked)}
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

          {/* Privacy & Security Settings */}
          {activeTab === 'privacy' && (
            <div className="space-y-6 sm:space-y-8">
              {/* Privacy Settings */}
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                    Privacy Settings
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Control your profile visibility and data sharing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm sm:text-base font-medium">Profile Visibility</Label>
                        <p className="text-xs sm:text-sm text-gray-600">Who can see your profile</p>
                      </div>
                      <select
                        value={privacySettings.profileVisibility}
                        onChange={(e) => updatePrivacySettings('profileVisibility', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="public">Public</option>
                        <option value="therapists">Therapists Only</option>
                        <option value="private">Private</option>
                      </select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm sm:text-base font-medium">Show Email Address</Label>
                        <p className="text-xs sm:text-sm text-gray-600">Display your email on your profile</p>
                      </div>
                      <Switch
                        checked={privacySettings.showEmail}
                        onCheckedChange={(checked) => updatePrivacySettings('showEmail', checked)}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm sm:text-base font-medium">Show Phone Number</Label>
                        <p className="text-xs sm:text-sm text-gray-600">Display your phone on your profile</p>
                      </div>
                      <Switch
                        checked={privacySettings.showPhone}
                        onCheckedChange={(checked) => updatePrivacySettings('showPhone', checked)}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm sm:text-base font-medium">Allow Messages</Label>
                        <p className="text-xs sm:text-sm text-gray-600">Let others send you messages</p>
                      </div>
                      <Switch
                        checked={privacySettings.allowMessages}
                        onCheckedChange={(checked) => updatePrivacySettings('allowMessages', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

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

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Palette className="w-5 h-5 sm:w-6 sm:h-6" />
                  Appearance
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Customize how the app looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="text-center py-8 sm:py-12">
                  <Palette className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Appearance Settings</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Customize your app experience with themes and display options
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    Coming soon...
                  </p>
                </div>
              </CardContent>
            </Card>
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
