import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Users, Search, MessageCircle, CreditCard, Shield, CheckCircle, Star, Clock, DollarSign } from 'lucide-react';

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      step: 1,
      title: 'Browse & Search',
      description: 'Find service providers in your area using our search and filter options',
      icon: Search,
      color: 'blue',
      details: [
        'Search by service type, location, or provider name',
        'Filter by availability, ratings, and price range',
        'View detailed provider profiles and reviews',
        'Check provider qualifications and certifications'
      ]
    },
    {
      step: 2,
      title: 'Contact Provider',
      description: 'Reach out directly to service providers through our secure messaging system',
      icon: MessageCircle,
      color: 'green',
      details: [
        'Use the contact form on provider profiles',
        'Ask questions about services and pricing',
        'Discuss specific requirements and availability',
        'Arrange meeting times and locations'
      ]
    },
    {
      step: 3,
      title: 'Agree & Pay',
      description: 'Work directly with the provider to agree on services and payment terms',
      icon: CreditCard,
      color: 'purple',
      details: [
        'Negotiate service terms and pricing',
        'Agree on payment method and schedule',
        'No platform fees - pay providers directly',
        'Secure payment processing available'
      ]
    },
    {
      step: 4,
      title: 'Receive Service',
      description: 'Get your service delivered and leave feedback to help others',
      icon: CheckCircle,
      color: 'orange',
      details: [
        'Receive professional service delivery',
        'Leave honest reviews and ratings',
        'Help build the community reputation',
        'Book repeat services easily'
      ]
    }
  ];

  const features = [
    {
      title: 'No Booking Fees',
      description: 'We don\'t charge booking fees. You only pay the service provider directly.',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Verified Providers',
      description: 'All service providers undergo identity verification and qualification checks.',
      icon: Shield,
      color: 'blue'
    },
    {
      title: 'Direct Communication',
      description: 'Communicate directly with providers without intermediaries.',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Community Reviews',
      description: 'Read reviews from real clients to make informed decisions.',
      icon: Star,
      color: 'orange'
    }
  ];

  const providerSteps = [
    {
      step: 1,
      title: 'Create Profile',
      description: 'Set up your professional profile with qualifications and services',
      icon: Users,
      color: 'blue'
    },
    {
      step: 2,
      title: 'Pay for Visibility',
      description: 'Choose your visibility period and pay daily fees to be seen by clients',
      icon: CreditCard,
      color: 'green'
    },
    {
      step: 3,
      title: 'Receive Inquiries',
      description: 'Get contacted by potential clients interested in your services',
      icon: MessageCircle,
      color: 'purple'
    },
    {
      step: 4,
      title: 'Deliver & Earn',
      description: 'Provide services and collect payment directly from clients',
      icon: CheckCircle,
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">
            <span style={{
              color: '#FF6B35',
              fontFamily: 'Orbitron, Rajdhani, monospace',
              fontWeight: '900',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>How It Works</span>
          </h1>
          <p className="text-center text-gray-600">Simple, direct, and transparent service marketplace</p>
        </div>

        {/* Platform Notice */}
        <Card className="mb-8 shadow-lg border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <Shield className="w-6 h-6 text-orange-600 mr-2" />
              <h3 className="text-lg font-bold text-orange-800">Platform Notice</h3>
            </div>
            <p className="text-orange-700 text-sm">
              <strong>SIMS is a connection platform only.</strong> We facilitate connections between service providers and clients but are not responsible for services provided or payments made between users.
            </p>
          </CardContent>
        </Card>

        {/* For Clients Section */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            <span className="text-blue-600">For Clients</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {steps.map((step, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-${step.color}-100`}>
                    <step.icon className={`w-8 h-8 text-${step.color}-600`} />
                  </div>
                  <div className={`w-8 h-8 mx-auto mb-2 rounded-full bg-${step.color}-600 text-white flex items-center justify-center text-sm font-bold`}>
                    {step.step}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 text-center">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            Why Choose SIMS?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-lg text-center hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center bg-${feature.color}-100`}>
                    <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* For Providers Section */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            <span className="text-green-600">For Service Providers</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {providerSteps.map((step, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-${step.color}-100`}>
                    <step.icon className={`w-8 h-8 text-${step.color}-600`} />
                  </div>
                  <div className={`w-8 h-8 mx-auto mb-2 rounded-full bg-${step.color}-600 text-white flex items-center justify-center text-sm font-bold`}>
                    {step.step}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 text-center">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pricing Model */}
        <Card className="mb-8 shadow-lg border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <DollarSign className="w-6 h-6 mr-3" />
              Our Pricing Model
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-700">For Clients</h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• No booking fees or hidden charges</li>
                  <li>• Pay providers directly for services</li>
                  <li>• Transparent pricing from providers</li>
                  <li>• Free to browse and contact providers</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-green-700">For Providers</h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Pay daily visibility fees to be seen</li>
                  <li>• Set your own service rates</li>
                  <li>• Keep 100% of client payments</li>
                  <li>• Flexible visibility periods</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-gray-600 mb-6">Join thousands of users who trust SIMS for their service needs</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/explore')} 
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Search className="w-4 h-4 mr-2" />
              Find Services
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/create-profile')}
              className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              <Users className="w-4 h-4 mr-2" />
              List Your Services
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
