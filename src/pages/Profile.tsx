import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Camera, Save, X, User, Mail, Phone, MapPin, Edit3, FileText, Award, Plus, Trash2 } from 'lucide-react';

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

  // Mock certifications data - in real app this would come from user data
  const [certifications, setCertifications] = useState([
    { id: '1', name: 'Personal Training Certification', issuer: 'ACSM', date: '2023-01-15' },
    { id: '2', name: 'Nutrition Specialist', issuer: 'NASM', date: '2022-08-20' }
  ]);
  
  const [newCertification, setNewCertification] = useState({
    name: '',
    issuer: '',
    date: ''
  });
  const [editingCert, setEditingCert] = useState<string | null>(null);

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

  const addCertification = () => {
    if (newCertification.name && newCertification.issuer && newCertification.date) {
      const cert = {
        id: Date.now().toString(),
        ...newCertification
      };
      setCertifications(prev => [...prev, cert]);
      setNewCertification({ name: '', issuer: '', date: '' });
    }
  };

  const updateCertification = (id: string, updatedCert: any) => {
    setCertifications(prev => prev.map(cert => 
      cert.id === id ? { ...cert, ...updatedCert } : cert
    ));
    setEditingCert(null);
  };

  const deleteCertification = (id: string) => {
    setCertifications(prev => prev.filter(cert => cert.id !== id));
  };

  const startEditingCert = (cert: any) => {
    setEditingCert(cert.id);
    setNewCertification({
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date
    });
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

              {/* Certifications section - Only for service providers */}
              {user?.userType === 'service_provider' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs sm:text-sm font-medium">
                      <Award className="w-4 h-4 inline mr-2" />
                      Certifications & Diplomas
                    </Label>
                    {isEditing && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setNewCertification({ name: '', issuer: '', date: '' })}
                        className="text-xs sm:text-sm"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add New
                      </Button>
                    )}
                  </div>

                  {/* Existing certifications */}
                  <div className="space-y-3">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="border rounded-lg p-3 bg-gray-50">
                        {editingCert === cert.id ? (
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <Label className="text-xs font-medium">Certification Name</Label>
                                <Input
                                  value={newCertification.name}
                                  onChange={(e) => setNewCertification(prev => ({ ...prev, name: e.target.value }))}
                                  className="text-sm"
                                  placeholder="e.g., Personal Training Certification"
                                />
                              </div>
                              <div>
                                <Label className="text-xs font-medium">Issuing Organization</Label>
                                <Input
                                  value={newCertification.issuer}
                                  onChange={(e) => setNewCertification(prev => ({ ...prev, issuer: e.target.value }))}
                                  className="text-sm"
                                  placeholder="e.g., ACSM, NASM"
                                />
                              </div>
                            </div>
                            <div>
                              <Label className="text-xs font-medium">Date Obtained</Label>
                              <Input
                                type="date"
                                value={newCertification.date}
                                onChange={(e) => setNewCertification(prev => ({ ...prev, date: e.target.value }))}
                                className="text-sm"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => updateCertification(cert.id, newCertification)}
                                className="text-xs"
                              >
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingCert(null)}
                                className="text-xs"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-sm">{cert.name}</h4>
                              <p className="text-xs text-gray-600">{cert.issuer} • {new Date(cert.date).toLocaleDateString()}</p>
                            </div>
                            {isEditing && (
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => startEditingCert(cert)}
                                  className="text-xs p-1 h-6 w-6"
                                >
                                  <Edit3 className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => deleteCertification(cert.id)}
                                  className="text-xs p-1 h-6 w-6 text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add new certification form */}
                  {isEditing && newCertification.name === '' && newCertification.issuer === '' && newCertification.date === '' && (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs font-medium">Certification Name</Label>
                            <Input
                              value={newCertification.name}
                              onChange={(e) => setNewCertification(prev => ({ ...prev, name: e.target.value }))}
                              className="text-sm"
                              placeholder="e.g., Personal Training Certification"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-medium">Issuing Organization</Label>
                            <Input
                              value={newCertification.issuer}
                              onChange={(e) => setNewCertification(prev => ({ ...prev, issuer: e.target.value }))}
                              className="text-sm"
                              placeholder="e.g., ACSM, NASM"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs font-medium">Date Obtained</Label>
                          <Input
                            type="date"
                            value={newCertification.date}
                            onChange={(e) => setNewCertification(prev => ({ ...prev, date: e.target.value }))}
                            className="text-sm"
                          />
                        </div>
                        <Button
                          size="sm"
                          onClick={addCertification}
                          className="text-xs"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add Certification
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

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
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-medium text-gray-600">Account Status</Label>
                  <p className="text-sm sm:text-base font-medium mt-1">
                    Active
                  </p>
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-medium text-gray-600">Last Updated</Label>
                  <p className="text-sm sm:text-base font-medium mt-1">
                    {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}
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
