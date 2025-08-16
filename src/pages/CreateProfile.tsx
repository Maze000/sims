import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Upload, 
  Plus, 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Award,
  Clock,
  DollarSign,
  FileText,
  Camera,
  CheckCircle
} from "lucide-react";

const specialtyOptions = [
  "Relaxation Massage", "Deep Tissue", "Sports Massage", "Aromatherapy", 
  "Hot Stone Massage", "Swedish Massage", "Thai Massage", "Shiatsu",
  "Pregnancy Massage", "Lymphatic Drainage", "Reflexology", "Trigger Point Therapy",
  "Remedial Therapy", "Acupressure", "Cupping Therapy", "Myofascial Release"
];

const qualificationOptions = [
  "Certificate in Massage Therapy", "Diploma in Remedial Massage", 
  "Bachelor of Health Science (Massage)", "Aromatherapy Certification",
  "Sports Massage Certification", "Pregnancy Massage Certification",
  "Deep Tissue Specialisation", "Thai Massage Certification",
  "Shiatsu Practitioner", "Lymphatic Drainage Certification"
];

const CreateProfile = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileCreated, setProfileCreated] = useState(false);

  // Form data
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    bio: "",
    profilePhoto: null as File | null
  });

  const [professionalInfo, setProfessionalInfo] = useState({
    yearsExperience: "",
    specialties: [] as string[],
    qualifications: [] as string[],
    languages: [] as string[],
    workingHours: {
      monday: { start: "", end: "", available: false },
      tuesday: { start: "", end: "", available: false },
      wednesday: { start: "", end: "", available: false },
      thursday: { start: "", end: "", available: false },
      friday: { start: "", end: "", available: false },
      saturday: { start: "", end: "", available: false },
      sunday: { start: "", end: "", available: false }
    }
  });

  const [services, setServices] = useState([
    { name: "", duration: "", price: "", description: "" }
  ]);

  const [verification, setVerification] = useState({
    identityDocument: null as File | null,
    qualificationCertificates: [] as File[],
    insuranceCertificate: null as File | null,
    agreedToTerms: false,
    agreedToBackground: false
  });

  const addSpecialty = (specialty: string) => {
    if (!professionalInfo.specialties.includes(specialty)) {
      setProfessionalInfo(prev => ({
        ...prev,
        specialties: [...prev.specialties, specialty]
      }));
    }
  };

  const removeSpecialty = (specialty: string) => {
    setProfessionalInfo(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }));
  };

  const addQualification = (qualification: string) => {
    if (!professionalInfo.qualifications.includes(qualification)) {
      setProfessionalInfo(prev => ({
        ...prev,
        qualifications: [...prev.qualifications, qualification]
      }));
    }
  };

  const removeQualification = (qualification: string) => {
    setProfessionalInfo(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter(q => q !== qualification)
    }));
  };

  const addService = () => {
    setServices(prev => [...prev, { name: "", duration: "", price: "", description: "" }]);
  };

  const removeService = (index: number) => {
    setServices(prev => prev.filter((_, i) => i !== index));
  };

  const updateService = (index: number, field: string, value: string) => {
    setServices(prev => prev.map((service, i) => 
      i === index ? { ...service, [field]: value } : service
    ));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      if (parent === 'personalInfo') {
        setPersonalInfo(prev => ({ ...prev, [child]: file }));
      } else if (parent === 'verification') {
        setVerification(prev => ({ ...prev, [child]: file }));
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setProfileCreated(true);
      
      // Redirect after showing success message
      setTimeout(() => {
        navigate("/dashboard", { 
          state: { message: "Profile created successfully! We'll review it within 24-48 hours." }
        });
      }, 3000);
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (profileCreated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-700 mb-2">Profile Created!</h2>
            <p className="text-gray-600 mb-4">
              Your therapist profile has been submitted for review.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              We'll review your application within 24-48 hours and notify you via email once approved.
            </p>
            <div className="animate-pulse text-purple-600">
              Redirecting to dashboard...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-purple-600">
              <span className="logo-nu">NU</span>
              <span className="logo-massage">massage</span>
            </h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-6">Create Your Therapist Profile</h2>
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-16 h-1 mx-2 ${
                      currentStep > step ? 'bg-purple-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600 max-w-md mx-auto">
              <span>Personal</span>
              <span>Professional</span>
              <span>Services</span>
              <span>Verification</span>
            </div>
          </div>

          {/* Form Steps */}
          <Card>
            <CardContent className="p-8">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">Personal Information</h3>
                    <p className="text-gray-600">Tell us about yourself</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={personalInfo.firstName}
                        onChange={(e) => setPersonalInfo(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={personalInfo.lastName}
                        onChange={(e) => setPersonalInfo(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+64 21 123 4567"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={personalInfo.address}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, address: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Select value={personalInfo.city} onValueChange={(value) => setPersonalInfo(prev => ({ ...prev, city: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your city" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auckland">Auckland</SelectItem>
                          <SelectItem value="wellington">Wellington</SelectItem>
                          <SelectItem value="christchurch">Christchurch</SelectItem>
                          <SelectItem value="hamilton">Hamilton</SelectItem>
                          <SelectItem value="tauranga">Tauranga</SelectItem>
                          <SelectItem value="dunedin">Dunedin</SelectItem>
                          <SelectItem value="palmerston-north">Palmerston North</SelectItem>
                          <SelectItem value="napier">Napier</SelectItem>
                          <SelectItem value="nelson">Nelson</SelectItem>
                          <SelectItem value="rotorua">Rotorua</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="region">Region *</Label>
                      <Select value={personalInfo.region} onValueChange={(value) => setPersonalInfo(prev => ({ ...prev, region: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="northland">Northland</SelectItem>
                          <SelectItem value="auckland">Auckland</SelectItem>
                          <SelectItem value="waikato">Waikato</SelectItem>
                          <SelectItem value="bay-of-plenty">Bay of Plenty</SelectItem>
                          <SelectItem value="gisborne">Gisborne</SelectItem>
                          <SelectItem value="hawkes-bay">Hawke's Bay</SelectItem>
                          <SelectItem value="taranaki">Taranaki</SelectItem>
                          <SelectItem value="manawatu-whanganui">Manawatu-Whanganui</SelectItem>
                          <SelectItem value="wellington">Wellington</SelectItem>
                          <SelectItem value="tasman">Tasman</SelectItem>
                          <SelectItem value="nelson">Nelson</SelectItem>
                          <SelectItem value="marlborough">Marlborough</SelectItem>
                          <SelectItem value="west-coast">West Coast</SelectItem>
                          <SelectItem value="canterbury">Canterbury</SelectItem>
                          <SelectItem value="otago">Otago</SelectItem>
                          <SelectItem value="southland">Southland</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Professional Bio *</Label>
                    <Textarea
                      id="bio"
                      value={personalInfo.bio}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell potential clients about your background, experience, and approach to massage therapy..."
                      rows={4}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">{personalInfo.bio.length}/500 characters</p>
                  </div>

                  <div>
                    <Label htmlFor="profilePhoto">Profile Photo</Label>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                        <Camera className="w-8 h-8 text-gray-400" />
                      </div>
                      <div>
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Photo
                        </Button>
                        <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Professional Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">Professional Information</h3>
                    <p className="text-gray-600">Your qualifications and expertise</p>
                  </div>

                  <div>
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <Select value={professionalInfo.yearsExperience} onValueChange={(value) => setProfessionalInfo(prev => ({ ...prev, yearsExperience: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select years of experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="11-15">11-15 years</SelectItem>
                        <SelectItem value="more-than-15">More than 15 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Specialties *</Label>
                    <p className="text-sm text-gray-600 mb-2">Select your areas of expertise</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                      {specialtyOptions.map((specialty) => (
                        <Button
                          key={specialty}
                          type="button"
                          variant={professionalInfo.specialties.includes(specialty) ? "default" : "outline"}
                          size="sm"
                          className="justify-start text-xs"
                          onClick={() => {
                            if (professionalInfo.specialties.includes(specialty)) {
                              removeSpecialty(specialty);
                            } else {
                              addSpecialty(specialty);
                            }
                          }}
                        >
                          {specialty}
                        </Button>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {professionalInfo.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 ml-1"
                            onClick={() => removeSpecialty(specialty)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Qualifications *</Label>
                    <p className="text-sm text-gray-600 mb-2">Select your certifications and qualifications</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                      {qualificationOptions.map((qualification) => (
                        <Button
                          key={qualification}
                          type="button"
                          variant={professionalInfo.qualifications.includes(qualification) ? "default" : "outline"}
                          size="sm"
                          className="justify-start text-xs"
                          onClick={() => {
                            if (professionalInfo.qualifications.includes(qualification)) {
                              removeQualification(qualification);
                            } else {
                              addQualification(qualification);
                            }
                          }}
                        >
                          {qualification}
                        </Button>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {professionalInfo.qualifications.map((qualification) => (
                        <Badge key={qualification} variant="secondary" className="text-xs">
                          {qualification}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 ml-1"
                            onClick={() => removeQualification(qualification)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Languages Spoken</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                      {["English", "Māori", "Mandarin", "Hindi", "Spanish", "French", "Japanese", "Korean"].map((language) => (
                        <div key={language} className="flex items-center space-x-2">
                          <Checkbox
                            id={language}
                            checked={professionalInfo.languages.includes(language)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setProfessionalInfo(prev => ({
                                  ...prev,
                                  languages: [...prev.languages, language]
                                }));
                              } else {
                                setProfessionalInfo(prev => ({
                                  ...prev,
                                  languages: prev.languages.filter(l => l !== language)
                                }));
                              }
                            }}
                          />
                          <Label htmlFor={language} className="text-sm">{language}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Services & Pricing */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">Services & Pricing</h3>
                    <p className="text-gray-600">Define your services and rates</p>
                  </div>

                  <div className="space-y-4">
                    {services.map((service, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">Service {index + 1}</h4>
                          {services.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeService(index)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Service Name *</Label>
                            <Input
                              value={service.name}
                              onChange={(e) => updateService(index, 'name', e.target.value)}
                              placeholder="e.g., Relaxation Massage"
                              required
                            />
                          </div>
                          <div>
                            <Label>Duration *</Label>
                            <Select value={service.duration} onValueChange={(value) => updateService(index, 'duration', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="30">30 minutes</SelectItem>
                                <SelectItem value="45">45 minutes</SelectItem>
                                <SelectItem value="60">60 minutes</SelectItem>
                                <SelectItem value="75">75 minutes</SelectItem>
                                <SelectItem value="90">90 minutes</SelectItem>
                                <SelectItem value="120">120 minutes</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <Label>Price (NZD) *</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              type="number"
                              value={service.price}
                              onChange={(e) => updateService(index, 'price', e.target.value)}
                              placeholder="120"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <Label>Description</Label>
                          <Textarea
                            value={service.description}
                            onChange={(e) => updateService(index, 'description', e.target.value)}
                            placeholder="Describe what this service includes..."
                            rows={2}
                          />
                        </div>
                      </Card>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addService}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Another Service
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Verification */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">Verification & Documents</h3>
                    <p className="text-gray-600">Upload required documents for verification</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label>Identity Document *</Label>
                      <p className="text-sm text-gray-600 mb-2">Upload a copy of your driver's license or passport</p>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Identity Document
                        </Button>
                        <p className="text-xs text-gray-500 mt-2">PDF, JPG, PNG up to 10MB</p>
                      </div>
                    </div>

                    <div>
                      <Label>Qualification Certificates *</Label>
                      <p className="text-sm text-gray-600 mb-2">Upload your massage therapy qualifications</p>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Award className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Certificates
                        </Button>
                        <p className="text-xs text-gray-500 mt-2">PDF, JPG, PNG up to 10MB each</p>
                      </div>
                    </div>

                    <div>
                      <Label>Professional Indemnity Insurance *</Label>
                      <p className="text-sm text-gray-600 mb-2">Current insurance certificate</p>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Insurance Certificate
                        </Button>
                        <p className="text-xs text-gray-500 mt-2">PDF, JPG, PNG up to 10MB</p>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="terms"
                          checked={verification.agreedToTerms}
                          onCheckedChange={(checked) => setVerification(prev => ({ ...prev, agreedToTerms: checked as boolean }))}
                          required
                        />
                        <Label htmlFor="terms" className="text-sm leading-relaxed">
                          I agree to the <a href="#" className="text-purple-600 hover:underline">Terms of Service</a> and <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>
                        </Label>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="background"
                          checked={verification.agreedToBackground}
                          onCheckedChange={(checked) => setVerification(prev => ({ ...prev, agreedToBackground: checked as boolean }))}
                          required
                        />
                        <Label htmlFor="background" className="text-sm leading-relaxed">
                          I consent to background checks and understand that my profile will be reviewed before approval
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                
                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !verification.agreedToTerms || !verification.agreedToBackground}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Submitting...
                      </div>
                    ) : (
                      "Submit Profile"
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
