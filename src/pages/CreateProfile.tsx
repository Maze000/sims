import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
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
  Save,
  Users,
  Heart,
  Zap,
  Shield,
  Globe,
  Trophy,
  Sparkles,
  Briefcase,
  Info
} from 'lucide-react';

const CreateProfile = () => {
  const navigate = useNavigate();
  const { becomeServiceProvider } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [step, setStep] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>('');
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
    certifications: [''] as string[],
    languages: '',
    bio: '',
    
    // Services
    services: [] as string[],
    servicePrices: {} as Record<string, string>,
    serviceDescription: '',
    initialServices: [] as Array<{name: string, duration: string, description: string}>,
    
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
    serviceArea: '',
    generalAvailability: '',
    website: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      linkedin: ''
    },
    
    // Identity Verification
    identityVerification: {
      documentType: '',
      documentNumber: '',
      documentFile: null as File | null,
      isVerified: false
    },
    
    // Payment for Visibility
    paymentForVisibility: {
      selectedDays: 30,
      totalPrice: 20.00,
      paymentMethod: '',
      isPaid: false
    }
  });

  const specializations = [
    'Health & Wellness',
    'Beauty & Aesthetics',
    'Personal Care & Assistance',
    'Education & Development',
    'Creative Services & Entertainment',
    'Home & Practical Assistance',
    'Sports & Physical Activities',
    'Technology & Digital Support',
    'Other'
  ];

  const serviceTypes = [
    'Consultation',
    'One-on-One Service',
    'Group Service',
    'Online Service',
    'Home Visit',
    'Workshop',
    'Training Session',
    'Creative Project',
    'Technical Support',
    'Custom Service'
  ];

  const updateFormData = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateCertification = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => i === index ? value : cert)
    }));
  };

  const addCertification = () => {
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, '']
    }));
  };

  const removeCertification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const addInitialService = () => {
    setFormData(prev => ({
      ...prev,
      initialServices: [...prev.initialServices, { name: '', duration: '', description: '' }]
    }));
  };

  const removeInitialService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      initialServices: prev.initialServices.filter((_, i) => i !== index)
    }));
  };

  const updateInitialService = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      initialServices: prev.initialServices.map((service, i) => 
        i === index ? { ...service, [field]: value } : service
      )
    }));
  };

  const updateAvailability = (day: string, field: string, value: string | boolean) => {
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

  const updateIdentityVerification = (field: string, value: string | File | boolean) => {
    setFormData(prev => ({
      ...prev,
      identityVerification: {
        ...prev.identityVerification,
        [field]: value
      }
    }));
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateIdentityVerification('documentFile', file);
    }
  };

  const updatePaymentForVisibility = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      paymentForVisibility: {
        ...prev.paymentForVisibility,
        [field]: value
      }
    }));
  };

  const calculatePrice = (days: number) => {
    const basePrice = 0.67; // NZD per day
    let totalPrice = days * basePrice;
    
    // Apply discounts for longer periods
    if (days >= 90) {
      totalPrice *= 0.8; // 20% off for 3+ months
    } else if (days >= 30) {
      totalPrice *= 0.9; // 10% off for 1+ month
    }
    
    return Math.round(totalPrice * 100) / 100; // Round to 2 decimal places
  };

  const handleDaysChange = (days: number) => {
    const totalPrice = calculatePrice(days);
    updatePaymentForVisibility('selectedDays', days);
    updatePaymentForVisibility('totalPrice', totalPrice);
  };

  // Initialize payment intent when component mounts
  React.useEffect(() => {
    if (step === 3) {
      createPaymentIntent();
    }
  }, [step]);

  const createPaymentIntent = async () => {
    try {
      // For demo purposes, create a mock client secret
      // In production, this would come from your backend
      const mockClientSecret = `pi_mock_${Date.now()}_secret_mock`;
      setClientSecret(mockClientSecret);
    } catch (error) {
      console.error('Error creating payment intent:', error);
    }
  };

  const handlePayment = async () => {
    if (!stripe || !elements) {
      return;
    }

    setPaymentLoading(true);

    try {
      // For demo purposes, simulate successful payment
      // In production, this would use the real Stripe API
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      // Payment succeeded
      updatePaymentForVisibility('isPaid', true);
      updatePaymentForVisibility('paymentMethod', 'stripe');
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setPaymentLoading(false);
    }
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else if (step === 1) {
      // Go back to the initial screen (Step 0)
      setStep(0);
    }
  };

  const handleSubmit = async () => {
    try {
      // TODO: Implement API call to create service provider profile
      console.log('Creating service provider profile:', formData);
      
      // Update user type to service provider
      await becomeServiceProvider();
      
      // Redirect to service provider dashboard
    navigate('/therapist-dashboard');
    } catch (error) {
      console.error('Error creating profile:', error);
      // Fallback to regular dashboard
      navigate('/dashboard');
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center justify-center space-x-2 sm:space-x-4">
        {/* Step 0: Start */}
        <div className="flex items-center">
          <div 
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
              step === 0 || step > 0
                ? 'text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
            style={{
              backgroundColor: step === 0 || step > 0 ? '#FF6B35' : '#E5E7EB'
            }}
          >
            Start
          </div>
          <div 
            className={`w-8 sm:w-12 h-0.5 mx-2 ${
              step > 0 ? '' : 'bg-gray-200'
            }`}
            style={{
              backgroundColor: step > 0 ? '#FF6B35' : '#E5E7EB'
            }}
          />
        </div>
        
        {/* Steps 1-4 */}
        {[1, 2, 3, 4].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div 
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
              stepNumber <= step
                  ? 'text-white'
                : 'bg-gray-200 text-gray-600'
              }`}
              style={{
                backgroundColor: stepNumber <= step ? '#FF6B35' : '#E5E7EB'
              }}
            >
              {stepNumber}
            </div>
            {stepNumber < 4 && (
              <div 
                className={`w-8 sm:w-12 h-0.5 mx-2 ${
                  stepNumber < step ? '' : 'bg-gray-200'
                }`}
                style={{
                  backgroundColor: stepNumber < step ? '#FF6B35' : '#E5E7EB'
                }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-2 sm:mt-3">
        <p className="text-xs sm:text-sm text-gray-600">
          {step === 0 ? 'Step 0 of 4: Welcome' :
            step === 1 ? 'Step 1 of 4: Basic Information' :
            step === 2 ? 'Step 2 of 4: Professional Details' :
            step === 3 ? 'Step 3 of 4: Services & Location' :
            'Step 4 of 4: Payment for Visibility'
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Create Service Provider Profile</h1>
            <p className="text-sm sm:text-base text-gray-600">
              Set up your professional profile to start connecting with clients
            </p>
          </div>
        </div>
      </div>


      {renderStepIndicator()}

      {/* Step 0: Introduction */}
      {step === 0 && (
        <Card className="mb-8 p-6 sm:p-8 bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200">
          <CardContent className="text-center">
            <div className="mb-8">
              <div className="flex justify-center space-x-4 mb-6">
                <div className="p-4 bg-orange-100 rounded-full">
                  <Users className="w-12 h-12 text-orange-600" />
                </div>
                <div className="p-4 bg-orange-100 rounded-full">
                  <Heart className="w-12 h-12 text-orange-600" />
                </div>
                <div className="p-4 bg-orange-100 rounded-full">
                  <Zap className="w-12 h-12 text-orange-600" />
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Welcome to the Sims Community! 🎉
              </h2>
              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                You're about to join New Zealand's most vibrant service provider marketplace. 
                Connect with amazing people who need your skills and expertise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="p-6 bg-white rounded-2xl shadow-lg mb-4">
                  <Shield className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Trusted Platform</h3>
                  <p className="text-gray-600">
                    Join a verified community of skilled professionals across Aotearoa
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="p-6 bg-white rounded-2xl shadow-lg mb-4">
                  <Globe className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Local Impact</h3>
                  <p className="text-gray-600">
                    Make a difference in your community by sharing your talents
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="p-6 bg-white rounded-2xl shadow-lg mb-4">
                  <Trophy className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Grow Your Business</h3>
                  <p className="text-gray-600">
                    Build your reputation and expand your client base
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-orange-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Ready to Get Started?</h3>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Let's create your professional profile in just a few simple steps. 
                This will help clients find you and understand what amazing services you offer.
              </p>
              <Button
                onClick={() => setStep(1)}
                size="lg"
                style={{
                  background: '#FF6B35',
                  color: 'white',
                  border: 'none',
                  borderRadius: '1rem',
                  padding: '1rem 3rem',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(-2px) scale(1.02)';
                  (e.target as HTMLElement).style.boxShadow = '0 20px 40px -10px rgba(0, 0, 0, 0.25)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(0) scale(1)';
                  (e.target as HTMLElement).style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                }}
              >
                <Sparkles className="w-6 h-6 mr-3" />
                Start Creating My Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 1: Basic Information */}
      {step === 1 && (
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />
              Basic Information
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Tell us about yourself and your service background
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


          </CardContent>
        </Card>
      )}

      {/* Step 2: Professional Details */}
      {step === 2 && (
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Star className="w-5 h-5 sm:w-6 sm:h-6" />
              Professional Details & Identity Verification
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Add your qualifications, training, and service achievements
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
                <Label htmlFor="languages" className="text-xs sm:text-sm font-medium">Languages Spoken</Label>
                <Input
                  id="languages"
                  value={formData.languages || ''}
                  onChange={(e) => updateFormData('languages', e.target.value)}
                  className="text-sm sm:text-base"
                  placeholder="e.g., English, Māori, Spanish"
                />
              </div>
            </div>

              <div className="space-y-2">
              <Label className="text-xs sm:text-sm font-medium">Certifications & Qualifications (Optional)</Label>
                <div className="space-y-3">
                  {formData.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={cert}
                        onChange={(e) => updateCertification(index, e.target.value)}
                        className="text-sm sm:text-base"
                        placeholder="e.g., NZQA Level 5, First Aid Certificate"
                      />
                      {formData.certifications.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeCertification(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addCertification}
                    className="text-orange-600 hover:text-orange-700"
                  >
                    + Add Another Certification
                  </Button>
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
                placeholder="Tell clients about your experience, approach, and what services you offer..."
              />
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

            {/* Identity Verification Section */}
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-orange-600" />
                <Label className="text-sm sm:text-base font-medium">Identity Verification</Label>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">
                To ensure the safety and trust of our community, we require identity verification for all service providers.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="documentType" className="text-xs sm:text-sm font-medium">Document Type</Label>
                  <Select 
                    value={formData.identityVerification.documentType} 
                    onValueChange={(value) => updateIdentityVerification('documentType', value)}
                  >
                    <SelectTrigger className="text-sm sm:text-base">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drivers-license">New Zealand Driver's License</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="national-id">National ID Card</SelectItem>
                      <SelectItem value="bank-statement">Bank Statement (with address)</SelectItem>
                      <SelectItem value="utility-bill">Utility Bill (with address)</SelectItem>
                      <SelectItem value="professional-license">Professional License/Certificate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="documentNumber" className="text-xs sm:text-sm font-medium">Document Number (Optional)</Label>
                  <Input
                    id="documentNumber"
                    value={formData.identityVerification.documentNumber}
                    onChange={(e) => updateIdentityVerification('documentNumber', e.target.value)}
                    className="text-sm sm:text-base"
                    placeholder="Enter document number if applicable"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="documentUpload" className="text-xs sm:text-sm font-medium">Upload Document</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    id="documentUpload"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleDocumentUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="documentUpload"
                    className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                  >
                    <div className="p-3 bg-orange-100 rounded-full">
                      <Shield className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">
                        {formData.identityVerification.documentFile 
                          ? formData.identityVerification.documentFile.name 
                          : 'Click to upload document'
                        }
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, JPG, PNG up to 10MB
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-4 h-4 text-orange-600" />
                  <h4 className="text-sm font-medium text-orange-800">Privacy & Security</h4>
                </div>
                <p className="text-xs text-orange-700">
                  Your documents are encrypted and stored securely. We only use them for identity verification 
                  and will never share them with third parties. Verification typically takes 1-2 business days.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Services & Offerings */}
      {step === 3 && (
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
              Services
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Select modality of the services you offer - discuss pricing directly with clients
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Label className="text-xs sm:text-sm font-medium">Select Your Modality Services</Label>
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

            {/* Location Section */}
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-orange-600" />
                <Label className="text-sm sm:text-base font-medium">Location</Label>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">
                Let clients know where you're based and how to reach you
              </p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceArea" className="text-xs sm:text-sm font-medium">Service Area</Label>
                  <Select value={formData.serviceArea || ''} onValueChange={(value) => updateFormData('serviceArea', value)}>
                    <SelectTrigger className="text-sm sm:text-base">
                      <SelectValue placeholder="Select your primary service area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Auckland">Auckland</SelectItem>
                      <SelectItem value="Wellington">Wellington</SelectItem>
                      <SelectItem value="Christchurch">Christchurch</SelectItem>
                      <SelectItem value="Hamilton">Hamilton</SelectItem>
                      <SelectItem value="Tauranga">Tauranga</SelectItem>
                      <SelectItem value="Napier-Hastings">Napier-Hastings</SelectItem>
                      <SelectItem value="Dunedin">Dunedin</SelectItem>
                      <SelectItem value="Palmerston North">Palmerston North</SelectItem>
                      <SelectItem value="Nelson">Nelson</SelectItem>
                      <SelectItem value="Rotorua">Rotorua</SelectItem>
                      <SelectItem value="New Plymouth">New Plymouth</SelectItem>
                      <SelectItem value="Whangarei">Whangarei</SelectItem>
                      <SelectItem value="Invercargill">Invercargill</SelectItem>
                      <SelectItem value="Whanganui">Whanganui</SelectItem>
                      <SelectItem value="Gisborne">Gisborne</SelectItem>
                      <SelectItem value="Online Services">Online Services (Nationwide)</SelectItem>
                      <SelectItem value="Mobile Services">Mobile Services (Multiple Areas)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-xs sm:text-sm font-medium">Street Address (Optional)</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateFormData('address', e.target.value)}
                    className="text-sm sm:text-base"
                    placeholder="123 Main Street (only if clients visit your location)"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <h4 className="text-sm font-medium text-blue-800">Contact Preferences</h4>
                  </div>
                  <p className="text-xs text-blue-700">
                    Clients will use the contact form on your profile to reach you. 
                    You can then arrange specific times and details directly with them.
                  </p>
                </div>
              </div>
            </div>

            {/* Initial Services Creation */}
              <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-xs sm:text-sm font-medium">Create Your Initial Services</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addInitialService}
                  className="text-orange-600 hover:text-orange-700"
                >
                  + Add Service
                </Button>
              </div>
              
              {formData.initialServices && formData.initialServices.length > 0 && (
                <div className="space-y-3">
                  {formData.initialServices.map((service, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900">Service {index + 1}</h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeInitialService(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor={`service-name-${index}`} className="text-xs font-medium">Service Name</Label>
                          <Input
                            id={`service-name-${index}`}
                            value={service.name}
                            onChange={(e) => updateInitialService(index, 'name', e.target.value)}
                            className="text-sm"
                            placeholder="e.g., Deep Tissue Massage"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`service-duration-${index}`} className="text-xs font-medium">Duration</Label>
                        <Input
                            id={`service-duration-${index}`}
                            value={service.duration}
                            onChange={(e) => updateInitialService(index, 'duration', e.target.value)}
                            className="text-sm"
                            placeholder="e.g., 60 minutes"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`service-description-${index}`} className="text-xs font-medium">Description</Label>
                        <Textarea
                          id={`service-description-${index}`}
                          value={service.description}
                          onChange={(e) => updateInitialService(index, 'description', e.target.value)}
                          rows={2}
                          className="text-sm"
                          placeholder="Describe what this service includes and its benefits..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {(!formData.initialServices || formData.initialServices.length === 0) && (
                <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-sm text-gray-500 mb-3">No services added yet</p>
                  <p className="text-xs text-gray-400">Click "Add Service" to create your first service offering</p>
                </div>
              )}
            </div>


            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Info className="w-4 h-4 text-orange-600" />
                <h4 className="text-sm font-medium text-orange-800">Pricing & Availability</h4>
              </div>
              <p className="text-xs text-orange-700">
                You'll discuss pricing and scheduling directly with clients who contact you. 
                This gives you flexibility to tailor your services to each client's specific needs.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Payment for Visibility & Location */}
      {step === 4 && (
        <div className="space-y-8">
          {/* Payment for Visibility Section */}
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />
                Payment for Visibility
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
                To make your services visible to clients, you need to pay for visibility. Choose how many days you want to be visible:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
              {/* Custom Days Selector */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Number of Days</Label>
                    <div className="flex items-center space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleDaysChange(Math.max(1, formData.paymentForVisibility.selectedDays - 1))}
                        disabled={formData.paymentForVisibility.selectedDays <= 1}
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        value={formData.paymentForVisibility.selectedDays}
                        onChange={(e) => handleDaysChange(parseInt(e.target.value) || 1)}
                        className="w-20 text-center"
                        min="1"
                        max="365"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleDaysChange(Math.min(365, formData.paymentForVisibility.selectedDays + 1))}
                        disabled={formData.paymentForVisibility.selectedDays >= 365}
                      >
                        +
                      </Button>
                    </div>
            </div>

                  {/* Price Display */}
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">
                        {formData.paymentForVisibility.selectedDays} day{formData.paymentForVisibility.selectedDays !== 1 ? 's' : ''} of visibility
                      </p>
                      <p className="text-3xl font-bold text-orange-600">
                        ${formData.paymentForVisibility.totalPrice.toFixed(2)} NZD
                      </p>
                      <p className="text-sm text-gray-500">
                        ${(formData.paymentForVisibility.totalPrice / formData.paymentForVisibility.selectedDays).toFixed(2)}/day
                      </p>
                      <div className="h-6 flex items-center justify-center mt-2">
                        {formData.paymentForVisibility.selectedDays >= 90 && (
                          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">20% off</span>
                        )}
                        {formData.paymentForVisibility.selectedDays >= 30 && formData.paymentForVisibility.selectedDays < 90 && (
                          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">10% off</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Select Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleDaysChange(7)}
                      className={formData.paymentForVisibility.selectedDays === 7 ? 'bg-orange-100 border-orange-300' : ''}
                    >
                      7 days
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleDaysChange(14)}
                      className={formData.paymentForVisibility.selectedDays === 14 ? 'bg-orange-100 border-orange-300' : ''}
                    >
                      14 days
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleDaysChange(30)}
                      className={formData.paymentForVisibility.selectedDays === 30 ? 'bg-orange-100 border-orange-300' : ''}
                    >
                      1 month
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleDaysChange(90)}
                      className={formData.paymentForVisibility.selectedDays === 90 ? 'bg-orange-100 border-orange-300' : ''}
                    >
                      3 months
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleDaysChange(180)}
                      className={formData.paymentForVisibility.selectedDays === 180 ? 'bg-orange-100 border-orange-300' : ''}
                    >
                      6 months
                    </Button>
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              {!formData.paymentForVisibility.isPaid && (
                <div className="max-w-6xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Left Column - Benefits */}
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 rounded-2xl p-8">
                        <div className="text-center mb-8">
                          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Sparkles className="w-10 h-10 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">Why Publish Your Services?</h3>
                          <p className="text-gray-600">Join thousands of successful service providers in New Zealand</p>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <Users className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Reach More Clients</h4>
                              <p className="text-sm text-gray-600">Get discovered by thousands of potential clients actively looking for your services across New Zealand.</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <Trophy className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Build Your Reputation</h4>
                              <p className="text-sm text-gray-600">Collect reviews and ratings from satisfied clients to build trust and credibility in your field.</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <DollarSign className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Increase Your Income</h4>
                              <p className="text-sm text-gray-600">Set your own rates and work on your schedule. Many providers see 3x more bookings within the first month.</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <Shield className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Safe & Secure</h4>
                              <p className="text-sm text-gray-600">All clients are verified and payments are processed securely. Your safety is our priority.</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <Heart className="w-6 h-6 text-pink-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Make a Difference</h4>
                              <p className="text-sm text-gray-600">Help people in your community while doing what you love. Every service makes a positive impact.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-8 bg-white border border-blue-200 rounded-xl p-4">
                          <div className="text-center">
                            <h5 className="font-semibold text-gray-900 mb-2">Join 2,500+ Active Providers</h5>
                            <p className="text-sm text-gray-600">Average rating: 4.8/5 stars</p>
                            <div className="flex justify-center mt-3">
                              {[1,2,3,4,5].map((star) => (
                                <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Column - Payment Form */}
                    <div className="bg-gradient-to-br from-white to-orange-50 border-2 border-orange-200 rounded-2xl p-8 shadow-lg">
                      <div className="text-center mb-8">
                        <div className="relative">
                          <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                            <DollarSign className="w-12 h-12 text-white" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                            <Shield className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <h4 className="text-3xl font-bold text-gray-900 mb-3">Complete Payment</h4>
                        <div className="flex items-center justify-center space-x-2 mb-4">
                          <span className="text-gray-600">Secure payment powered by</span>
                          <span className="text-purple-600 font-black text-lg tracking-wider uppercase italic" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                            Stripe
                          </span>
                        </div>
                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Shield className="w-4 h-4 text-green-600" />
                            <span>PCI Compliant</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>256-bit SSL</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span>Bank Grade</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Payment Methods Icons */}
                      <div className="flex justify-center space-x-6 mb-8">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                            <span className="text-2xl">💳</span>
                          </div>
                          <span className="text-xs text-gray-600">Card</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-2">
                            <span className="text-2xl">🍎</span>
                          </div>
                          <span className="text-xs text-gray-600">Apple Pay</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                            <span className="text-2xl">📱</span>
                          </div>
                          <span className="text-xs text-gray-600">Google Pay</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                            <span className="text-2xl">🏦</span>
                          </div>
                          <span className="text-xs text-gray-600">Bank</span>
                        </div>
                      </div>
                      
                      {/* Payment Form */}
                      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
                        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Shield className="w-5 h-5 text-green-600 mr-2" />
                          Payment Information
                        </h5>
                        
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">Card Number</Label>
              <Input
                              placeholder="1234 5678 9012 3456" 
                              className="h-12 text-lg tracking-wider border-2 focus:border-orange-400 focus:ring-orange-400"
              />
            </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">Expiry Date</Label>
                              <Input 
                                placeholder="MM/YY" 
                                className="h-12 text-center border-2 focus:border-orange-400 focus:ring-orange-400"
                              />
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">CVC</Label>
                              <Input 
                                placeholder="123" 
                                className="h-12 text-center border-2 focus:border-orange-400 focus:ring-orange-400"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">Cardholder Name</Label>
                            <Input 
                              placeholder="John Doe" 
                              className="h-12 border-2 focus:border-orange-400 focus:ring-orange-400"
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Payment Button */}
                      <Button
                        type="button"
                        className="w-full h-14 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        disabled={paymentLoading}
                        style={{
                          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '1rem',
                        }}
                        onClick={handlePayment}
                      >
                        {paymentLoading ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-3"></div>
                            Processing Payment...
              </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <DollarSign className="w-6 h-6 mr-3" />
                            Pay ${formData.paymentForVisibility.totalPrice.toFixed(2)} NZD
                          </div>
                        )}
                      </Button>
                      
                      {/* Security Info */}
                      <div className="mt-6 text-center">
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-4">
                          <Shield className="w-4 h-4 text-green-600" />
                          <span>256-bit SSL encryption</span>
                          <span>•</span>
                          <span>PCI DSS compliant</span>
                          <span>•</span>
                          <span>Powered by Stripe</span>
                        </div>
                        
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4">
                          <div className="flex items-center justify-center space-x-2 mb-2">
                            <Shield className="w-5 h-5 text-green-600" />
                            <h5 className="font-semibold text-gray-900">Bank-Level Security</h5>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            Your payment information is protected by the same security standards used by major banks. 
                            <span className="font-semibold text-purple-600">Stripe</span> processes over $1 trillion in payments annually 
                            with industry-leading fraud protection and encryption.
                          </p>
                          <div className="flex items-center justify-center space-x-4 mt-3 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span>Fraud Protected</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span>99.99% Uptime</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              <span>Global Trust</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Confirmation */}
              {formData.paymentForVisibility.isPaid && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <h4 className="text-sm font-medium text-green-800">Payment Successful!</h4>
                  </div>
                  <p className="text-xs text-green-700 mt-1">
                    Your profile will be visible for {formData.paymentForVisibility.selectedDays} days starting now.
                  </p>
                </div>
              )}

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Info className="w-4 h-4 text-orange-600" />
                  <h4 className="text-sm font-medium text-orange-800">How it works</h4>
                </div>
                <ul className="text-xs text-orange-700 space-y-1">
                  <li>• Your profile becomes visible to clients immediately after payment</li>
                  <li>• Payment is processed securely through Stripe</li>
                  <li>• Your profile automatically becomes hidden when the period expires</li>
                  <li>• You can renew anytime to maintain visibility</li>
                </ul>
            </div>
          </CardContent>
        </Card>

        </div>
      )}

      {/* Navigation Buttons - Only show when not in Step 0 */}
      {step !== 0 && (
      <div className="flex justify-between mt-6 sm:mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
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
      )}
    </div>
  );
};

export default CreateProfile;
