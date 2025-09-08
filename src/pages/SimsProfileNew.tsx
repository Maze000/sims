import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Star, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Share2,
  Heart,
  Shield,
  Award,
  Users,
  DollarSign,
  Send
} from "lucide-react";
import { mockProviders } from "@/data/mockProviders";

const SimsProfileNew = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [contactForm, setContactForm] = useState({
    name: '',
    contact: '',
    message: ''
  });
  const [contactType, setContactType] = useState<'phone' | 'email'>('phone');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Find the provider by ID
  const provider = mockProviders.find(p => p.id === id);

  if (!provider) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Provider not found</h1>
          <p className="text-gray-600 mb-6">The provider you're looking for doesn't exist.</p>
          <Button 
            onClick={() => navigate('/explore')} 
            style={{
              background: '#FF6B35',
              color: 'white',
              border: 'none',
              borderRadius: '1rem',
              padding: '0.5rem 1rem',
              fontWeight: 'bold',
              transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(-1px) scale(1.005)';
              (e.target as HTMLElement).style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(0) scale(1)';
              (e.target as HTMLElement).style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            }}
          >
            Back to Explore
          </Button>
        </div>
      </div>
    );
  }

  const sim = {
    id: provider.id,
    name: provider.name,
    avatar: provider.image,
    rating: provider.rating,
    reviewsCount: provider.reviews,
    location: provider.location,
    verified: true,
    yearsExperience: parseInt(provider.experience.split(' ')[0]),
    totalSessions: provider.reviews * 3, // Estimate
    specialties: provider.services,
    languages: provider.languages,
    phone: "+64 9 123 4567", // Mock phone
    email: `${provider.name.toLowerCase().replace(' ', '.')}@sims.com`, // Mock email
    description: provider.description,
    certifications: [
      `${provider.specialization} Certification - Professional Institute`,
      "First Aid Certification - Red Cross",
      "Professional Development - Industry Standards"
    ],
    services: provider.services.map((service, index) => ({
      id: (index + 1).toString(),
      name: service,
        duration: "60 min",
      price: parseInt(provider.price),
      description: `Professional ${service.toLowerCase()} service`,
    })),
    availability: {
      "2025-01-20": ["09:00", "11:00", "14:00", "16:00"],
      "2025-01-21": ["10:00", "13:00", "15:00", "17:00"],
      "2025-01-22": ["09:00", "12:00", "14:30", "16:30"]
    },
    reviewsList: [
      {
        id: "1",
        author: "Anna M.",
        rating: 5,
        date: "2025-01-15",
        comment: "Excellent professional, very dedicated and the massage was incredible. Highly recommended."
      },
      {
        id: "2",
        author: "Chris R.",
        rating: 5,
        date: "2025-01-10",
        comment: "Sarah has magic hands. The deep tissue massage was exactly what I needed."
      },
      {
        id: "3",
        author: "Lucy P.",
        rating: 4,
        date: "2025-01-05",
        comment: "Very good experience, relaxing atmosphere and professional technique."
      }
    ]
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    // console.log('Contact request:', {
    //   providerId: provider?.id,
    //   providerName: provider?.name,
    //   ...contactForm,
    //   contactType
    // });
    setIsSubmitted(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleContactType = () => {
    setContactType(prev => prev === 'phone' ? 'email' : 'phone');
    setContactForm(prev => ({
      ...prev,
      contact: ''
    }));
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()} 
              style={{
                background: 'transparent',
                color: '#FF6B35',
                border: '2px solid #FF6B35',
                borderRadius: '1rem',
                padding: '0.5rem 1rem',
                fontWeight: 'bold',
                transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = 'rgba(255, 107, 53, 0.1)';
                (e.target as HTMLElement).style.borderColor = '#FF6B35';
                (e.target as HTMLElement).style.color = '#FF6B35';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = 'transparent';
                (e.target as HTMLElement).style.borderColor = '#FF6B35';
                (e.target as HTMLElement).style.color = '#FF6B35';
              }}
            >
              ← Back
            </Button>
            <h1 className="text-2xl font-bold" style={{color: '#FF6B35'}}>
              <span className="logo-sims">SIMS</span>
            </h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Profile Card */}
            <Card className="toy-card">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={sim.avatar} />
                      <AvatarFallback className="text-2xl">{sim.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {sim.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1">
                        <Shield className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-2xl font-bold">{sim.name}</h1>
                      {sim.verified && (
                        <Badge className="bg-green-100 text-green-800">Verified</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {sim.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {sim.yearsExperience} years exp.
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{sim.rating}</span>
                      </div>
                      <span className="text-gray-600">({sim.reviewsCount} reviews)</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {sim.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {['One-on-One Service', 'Home Visit', 'Consultation'].map((serviceType) => (
                        <Badge key={serviceType} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                          {serviceType}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{sim.description}</p>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="services" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>
              
              <TabsContent value="services" className="space-y-4 max-h-96 overflow-y-auto scrollable">
                {sim.services.map((service) => (
                  <Card key={service.id} className="toy-card">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                          <p className="text-gray-600 mb-3">{service.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {service.duration}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="about" className="space-y-4 max-h-96 overflow-y-auto scrollable">
                <Card className="toy-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{sim.description}</p>
                    </CardContent>
                  </Card>

                <Card className="toy-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {sim.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="toy-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Languages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {sim.languages.map((language) => (
                        <Badge key={language} variant="outline">{language}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Contact Sidebar */}
          <div className="space-y-6">
            {/* Contact Request Card */}
            <Card className="toy-card">
               <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Request Contact
                 </CardTitle>
               </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Request Sent!</h3>
                    <p className="text-sm text-gray-600">
                      {sim.name} will contact you soon to discuss your needs and schedule.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={contactForm.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        className="toy-input"
                      />
                 </div>
                 
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="contact">Contact Information</Label>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${contactType === 'phone' ? 'font-medium' : 'text-gray-500'}`} style={{color: contactType === 'phone' ? '#FF6B35' : '#6B7280'}}>
                            Phone
                          </span>
                          <button
                            type="button"
                            onClick={toggleContactType}
                            className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                contactType === 'email' ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                          <span className={`text-sm ${contactType === 'email' ? 'font-medium' : 'text-gray-500'}`} style={{color: contactType === 'email' ? '#FF6B35' : '#6B7280'}}>
                            Email
                          </span>
                   </div>
                      </div>
                      <Input
                        id="contact"
                        type={contactType === 'phone' ? 'tel' : 'email'}
                        placeholder={contactType === 'phone' ? 'Enter your phone number' : 'Enter your email address'}
                        value={contactForm.contact}
                        onChange={(e) => handleInputChange('contact', e.target.value)}
                        required
                        className="toy-input"
                      />
                 </div>
                 
                    <div className="space-y-2">
                      <Label htmlFor="message">Service Details</Label>
                      <Textarea
                        id="message"
                        placeholder="Describe the service you need and any specific requirements..."
                        value={contactForm.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                        rows={4}
                        className="toy-input"
                      />
                 </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      style={{
                        background: '#FF6B35',
                        color: 'white',
                        border: 'none',
                        borderRadius: '1rem',
                        padding: '0.75rem 1rem',
                        fontWeight: 'bold',
                        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.transform = 'translateY(-1px) scale(1.005)';
                        (e.target as HTMLElement).style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.transform = 'translateY(0) scale(1)';
                        (e.target as HTMLElement).style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                      }}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Request
                    </Button>
                    
                    <p className="text-xs text-gray-500 text-center">
                      {sim.name} will contact you directly to discuss details and schedule.
                    </p>
                  </form>
                )}
               </CardContent>
             </Card>

            {/* Provider Info Card */}
            <Card className="toy-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Provider Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{sim.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{sim.yearsExperience} years experience</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{sim.rating} ({sim.reviewsCount} reviews)</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SimsProfileNew;
