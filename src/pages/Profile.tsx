import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Camera, Save, X, User, Mail, Phone, MapPin, Edit3, FileText } from 'lucide-react';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: (user as { phone?: string })?.phone || '',
    location: (user as { location?: string })?.location || '',
    bio: (user as { bio?: string })?.bio || ''
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSave = async () => {
    try {
      // Simulate API call to update user profile
      await updateUser(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: (user as { phone?: string })?.phone || '',
      location: (user as { location?: string })?.location || '',
      bio: (user as { bio?: string })?.bio || ''
    });
    setIsEditing(false);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Manage your personal information and account settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Column - Profile Picture */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center pb-4 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl">Profile Photo</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="relative inline-block">
                <Avatar className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-4">
                  <AvatarImage 
                    src={previewUrl || user?.avatar} 
                    alt={`${user?.firstName} ${user?.lastName}`} 
                  />
                  <AvatarFallback className="text-2xl sm:text-3xl md:text-4xl bg-purple-600 text-white">
                    {user?.firstName?.charAt(0) || user?.lastName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                
                {isEditing && (
                  <div className="absolute bottom-2 right-2">
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors">
                        <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>

              {isEditing && (
                <div className="space-y-2 sm:space-y-3">
                  <Button 
                    onClick={handleSave}
                    className="w-full text-sm sm:text-base touch-target"
                    disabled={!selectedFile}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Photo
                  </Button>
                  {selectedFile && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl(null);
                      }}
                      className="w-full text-sm sm:text-base touch-target"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Profile Information */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 sm:pb-6">
              <div>
                <CardTitle className="text-lg sm:text-xl">Personal Information</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Update your personal details and contact information
                </CardDescription>
              </div>
              <Button
                variant={isEditing ? "outline" : "default"}
                onClick={() => setIsEditing(!isEditing)}
                className="text-sm sm:text-base touch-target"
              >
                {isEditing ? (
                  <>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-xs sm:text-sm font-medium">
                    <User className="w-4 h-4 inline mr-2" />
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    disabled={!isEditing}
                    className="text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-xs sm:text-sm font-medium">
                    <User className="w-4 h-4 inline mr-2" />
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    disabled={!isEditing}
                    className="text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs sm:text-sm font-medium">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  disabled={!isEditing}
                  className="text-sm sm:text-base"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs sm:text-sm font-medium">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    disabled={!isEditing}
                    className="text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-xs sm:text-sm font-medium">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => updateFormData('location', e.target.value)}
                    disabled={!isEditing}
                    className="text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Bio field - Only for service providers */}
              {user?.userType === 'service_provider' && (
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-xs sm:text-sm font-medium">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Professional Bio
                  </Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => updateFormData('bio', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Tell clients about your experience, specialties, and approach..."
                    rows={4}
                    className="text-sm sm:text-base"
                  />
                  <p className="text-xs text-gray-500">
                    This will appear in your service listings and profile to help clients understand your expertise.
                  </p>
                </div>
              )}

              {isEditing && (
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
                  <Button 
                    onClick={handleSave}
                    className="flex-1 text-sm sm:text-base touch-target"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleCancel}
                    className="flex-1 text-sm sm:text-base touch-target"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card className="mt-6 sm:mt-8">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Account Information</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Your account details and profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label className="text-xs sm:text-sm font-medium text-gray-600">User Type</Label>
                  <p className="text-sm sm:text-base font-medium mt-1">
                    {user?.userType === 'therapist' ? 'Therapist' : 'Client'}
                  </p>
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-medium text-gray-600">Member Since</Label>
                  <p className="text-sm sm:text-base font-medium mt-1">
                    {(user as any)?.createdAt ? new Date((user as any).createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-medium text-gray-600">Verification Status</Label>
                  <p className="text-sm sm:text-base font-medium mt-1">
                    {user?.isVerified ? 'Verified' : 'Pending'}
                  </p>
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-medium text-gray-600">Last Updated</Label>
                  <p className="text-sm sm:text-base font-medium mt-1">
                    {(user as any)?.updatedAt ? new Date((user as any).updatedAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
