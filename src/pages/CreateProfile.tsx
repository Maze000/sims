import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ArrowLeft,
  Wrench,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  DollarSign,
  Save
} from 'lucide-react';

const CreateProfile = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    
    // Professional Info
    specialization: '',
    experience: '',
    certifications: '',
    bio: '',
    
    // Services
    services: [] as string[],
    servicePrices: {} as Record<string, string>,
    
    // Availability
    availability: {
      monday: { available: false, startTime: '09:00', endTime: '17:00' },
      tuesday: { available: false, startTime: '09:00', endTime: '17:00' },
      wednesday: { available: false, startTime: '09:00', endTime: '17:00' },
      thursday: { available: false, startTime: '09:00', endTime: '17:00' },
      friday: { available: false, startTime: '09:00', endTime: '17:00' },
      saturday: { available: false, startTime: '09:00', endTime: '17:00' },
      sunday: { available: false, startTime: '09:00', endTime: '17:00' }
    },
    
    // Contact & Location
    address: '',
    city: '',
    postalCode: '',
    website: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      linkedin: ''
    }
  });

  const specializations = [
    'Therapeutic Massage',
    'Sports Massage',
    'Deep Tissue Massage',
    'Swedish Massage',
    'Thai Massage',
    'Hot Stone Massage',
    'Aromatherapy Massage',
    'Reflexology',
    'Shiatsu',
    'Other'
  ];

  const serviceTypes = [
    'Relaxation Massage',
    'Therapeutic Massage',
    'Sports Massage',
    'Deep Tissue Massage',
    'Swedish Massage',
    'Thai Massage',
    'Hot Stone Massage',
    'Aromatherapy Massage',
    'Couples Massage',
    'Prenatal Massage'
  ];

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateAvailability = (day: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day as keyof typeof prev.availability],
          [field]: value
        }
      }
    }));
  };

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const updateServicePrice = (service: string, price: string) => {
    setFormData(prev => ({
      ...prev,
      servicePrices: {
        ...prev.servicePrices,
        [service]: price
      }
    }));
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    // TODO: Implement API call to create therapist profile
    console.log('Creating therapist profile:', formData);
    navigate('/therapist-dashboard');
  };

  const renderStepIndicator = () => (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center justify-center space-x-2 sm:space-x-4">
        {[1, 2, 3, 4].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
              stepNumber <= step
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}>
              {stepNumber}
            </div>
            {stepNumber < 4 && (
              <div className={`w-8 sm:w-12 h-0.5 mx-2 ${
                stepNumber < step ? 'bg-purple-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-2 sm:mt-3">
        <p className="text-xs sm:text-sm text-gray-600">
          Step {step} of 4: {
            step === 1 ? 'Basic Information' :
            step === 2 ? 'Professional Details' :
            step === 3 ? 'Services & Pricing' :
            'Availability & Contact'
          }
        </p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Create Therapist Profile</h1>
            <p className="text-sm sm:text-base text-gray-600">
              Set up your professional profile to start connecting with clients
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="text-sm sm:text-base touch-target"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>

      {renderStepIndicator()}

      {/* Step 1: Basic Information */}
      {step === 1 && (
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />
              Basic Information
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Tell us about yourself and your professional background
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-xs sm:text-sm font-medium">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  className="text-sm sm:text-base"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-xs sm:text-sm font-medium">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  className="text-sm sm:text-base"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs sm:text-sm font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="text-sm sm:text-base"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs sm:text-sm font-medium">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="text-sm sm:text-base"
                  placeholder="+64 21 123 4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-xs sm:text-sm font-medium">City/Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => updateFormData('location', e.target.value)}
                  className="text-sm sm:text-base"
                  placeholder="Auckland, New Zealand"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialization" className="text-xs sm:text-sm font-medium">Primary Specialization</Label>
              <Select value={formData.specialization} onValueChange={(value) => updateFormData('specialization', value)}>
                <SelectTrigger className="text-sm sm:text-base">
                  <SelectValue placeholder="Select your primary specialization" />
                </SelectTrigger>
                <SelectContent>
                  {specializations.map((spec) => (
                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="experience" className="text-xs sm:text-sm font-medium">Years of Experience</Label>
                <Input
                  id="experience"
                  type="number"
                  value={formData.experience}
                  onChange={(e) => updateFormData('experience', e.target.value)}
                  className="text-sm sm:text-base"
                  placeholder="5"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="certifications" className="text-xs sm:text-sm font-medium">Certifications</Label>
                <Input
                  id="certifications"
                  value={formData.certifications}
                  onChange={(e) => updateFormData('certifications', e.target.value)}
                  className="text-sm sm:text-base"
                  placeholder="e.g., NZQA Level 5"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-xs sm:text-sm font-medium">Professional Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => updateFormData('bio', e.target.value)}
                rows={4}
                className="text-sm sm:text-base"
                placeholder="Tell clients about your experience, approach, and what makes you unique..."
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Professional Details */}
      {step === 2 && (
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Star className="w-5 h-5 sm:w-6 sm:h-6" />
              Professional Details
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Add your qualifications, training, and professional achievements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Label className="text-xs sm:text-sm font-medium">Additional Specializations</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {specializations.slice(0, 8).map((spec) => (
                  <div key={spec} className="flex items-center space-x-2">
                    <Checkbox
                      id={spec}
                      checked={formData.specialization === spec}
                      onCheckedChange={() => updateFormData('specialization', spec)}
                    />
                    <Label htmlFor={spec} className="text-xs sm:text-sm">{spec}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="text-xs sm:text-sm font-medium">Website (Optional)</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => updateFormData('website', e.target.value)}
                className="text-sm sm:text-base"
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs sm:text-sm font-medium">Social Media (Optional)</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook" className="text-xs sm:text-sm">Facebook</Label>
                  <Input
                    id="facebook"
                    value={formData.socialMedia.facebook}
                    onChange={(e) => updateFormData('socialMedia', { ...formData.socialMedia, facebook: e.target.value })}
                    className="text-sm sm:text-base"
                    placeholder="Username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram" className="text-xs sm:text-sm">Instagram</Label>
                  <Input
                    id="instagram"
                    value={formData.socialMedia.instagram}
                    onChange={(e) => updateFormData('socialMedia', { ...formData.socialMedia, instagram: e.target.value })}
                    className="text-sm sm:text-base"
                    placeholder="Username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-xs sm:text-sm">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={formData.socialMedia.linkedin}
                    onChange={(e) => updateFormData('socialMedia', { ...formData.socialMedia, linkedin: e.target.value })}
                    className="text-sm sm:text-base"
                    placeholder="Profile URL"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Services & Pricing */}
      {step === 3 && (
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />
              Services & Pricing
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Define your services and set competitive pricing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Label className="text-xs sm:text-sm font-medium">Select Your Services</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {serviceTypes.map((service) => (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox
                      id={service}
                      checked={formData.services.includes(service)}
                      onCheckedChange={() => toggleService(service)}
                    />
                    <Label htmlFor={service} className="text-xs sm:text-sm">{service}</Label>
                  </div>
                ))}
              </div>
            </div>

            {formData.services.length > 0 && (
              <div className="space-y-4">
                <Label className="text-xs sm:text-sm font-medium">Set Prices for Selected Services</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {formData.services.map((service) => (
                    <div key={service} className="space-y-2">
                      <Label htmlFor={`price-${service}`} className="text-xs sm:text-sm">{service}</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          id={`price-${service}`}
                          type="number"
                          value={formData.servicePrices[service] || ''}
                          onChange={(e) => updateServicePrice(service, e.target.value)}
                          className="pl-8 text-sm sm:text-base"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 4: Availability & Contact */}
      {step === 4 && (
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
              Availability & Contact
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Set your working hours and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Label className="text-xs sm:text-sm font-medium">Working Hours</Label>
              <div className="space-y-3 sm:space-y-4">
                {Object.entries(formData.availability).map(([day, schedule]) => (
                  <div key={day} className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-20 sm:w-24">
                      <Label className="text-xs sm:text-sm capitalize">{day}</Label>
                    </div>
                    <Checkbox
                      id={`available-${day}`}
                      checked={schedule.available}
                      onCheckedChange={(checked) => updateAvailability(day, 'available', checked)}
                    />
                    {schedule.available && (
                      <div className="flex items-center space-x-2">
                        <Input
                          type="time"
                          value={schedule.startTime}
                          onChange={(e) => updateAvailability(day, 'startTime', e.target.value)}
                          className="w-24 sm:w-28 text-xs sm:text-sm"
                        />
                        <span className="text-xs sm:text-sm text-gray-500">to</span>
                        <Input
                          type="time"
                          value={schedule.endTime}
                          onChange={(e) => updateAvailability(day, 'endTime', e.target.value)}
                          className="w-24 sm:w-28 text-xs sm:text-sm"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-xs sm:text-sm font-medium">Street Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData('address', e.target.value)}
                className="text-sm sm:text-base"
                placeholder="123 Main Street"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-xs sm:text-sm font-medium">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                  className="text-sm sm:text-base"
                  placeholder="Auckland"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode" className="text-xs sm:text-sm font-medium">Postal Code</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => updateFormData('postalCode', e.target.value)}
                  className="text-sm sm:text-base"
                  placeholder="1010"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6 sm:mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={step === 1}
          className="text-sm sm:text-base touch-target"
        >
          Previous
        </Button>
        
        {step < 4 ? (
          <Button onClick={nextStep} className="text-sm sm:text-base touch-target">
            Next Step
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="text-sm sm:text-base touch-target">
            <Save className="w-4 h-4 mr-2" />
            Create Profile
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateProfile;
