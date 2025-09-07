import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, XCircle, Phone, Mail, FileText, Users, Eye, Lock } from 'lucide-react';

const SafetyGuidelines = () => {
  const navigate = useNavigate();

  const safetyTips = [
    {
      category: 'Before Meeting',
      icon: Eye,
      color: 'blue',
      tips: [
        'Verify the provider\'s identity and qualifications',
        'Check reviews and ratings from other clients',
        'Confirm the service details and pricing upfront',
        'Share your location with a trusted friend or family member',
        'Meet in a public place for initial consultations when possible'
      ]
    },
    {
      category: 'During Service',
      icon: Users,
      color: 'green',
      tips: [
        'Trust your instincts - if something feels wrong, speak up',
        'Keep your phone charged and accessible',
        'Don\'t share personal financial information',
        'Ensure the service matches what was agreed upon',
        'Ask questions if you\'re unsure about anything'
      ]
    },
    {
      category: 'After Service',
      icon: CheckCircle,
      color: 'purple',
      tips: [
        'Leave honest reviews to help other clients',
        'Report any issues or concerns immediately',
        'Keep records of your interactions',
        'Follow up on any promises made by the provider',
        'Contact support if you need assistance'
      ]
    }
  ];

  const redFlags = [
    'Asking for payment before meeting or providing service',
    'Refusing to provide identification or qualifications',
    'Pressuring you to make quick decisions',
    'Asking for personal financial information',
    'Behaving inappropriately or unprofessionally',
    'Not following through on agreed services',
    'Requesting to meet in isolated or unsafe locations'
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
            }}>Safety Guidelines</span>
          </h1>
          <p className="text-center text-gray-600">Your safety is our top priority</p>
          
          {/* Platform Disclaimer */}
          <Card className="mb-6 shadow-lg border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center mb-3">
                <AlertTriangle className="w-6 h-6 text-orange-600 mr-2" />
                <h3 className="text-lg font-bold text-orange-800">Platform Notice</h3>
              </div>
              <p className="text-orange-700 text-sm">
                <strong>SIMS is a connection platform only.</strong> We provide safety guidelines but are not responsible for services provided or interactions between users.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Safety Overview */}
        <Card className="mb-8 shadow-lg border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-green-800">Safety First</h2>
            </div>
            <p className="text-green-700 leading-relaxed">
              At SIMS Marketplace, we take safety seriously. All service providers undergo identity verification, 
              and we provide tools and guidelines to help you stay safe while using our platform. Remember: 
              your safety is more important than any service.
            </p>
          </CardContent>
        </Card>

        {/* Safety Tips by Category */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {safetyTips.map((section, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <section.icon className={`w-6 h-6 mr-3 text-${section.color}-600`} />
                  {section.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Red Flags */}
        <Card className="mb-8 shadow-lg border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center text-red-800">
              <AlertTriangle className="w-6 h-6 mr-3" />
              Warning Signs to Watch For
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 mb-4">
              If you encounter any of these red flags, stop the interaction immediately and contact our support team:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {redFlags.map((flag, index) => (
                <div key={index} className="flex items-start">
                  <XCircle className="w-4 h-4 text-red-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-sm text-red-700">{flag}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Provider Verification */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="w-6 h-6 mr-3 text-blue-600" />
              How We Verify Providers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-700">Identity Verification</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Government-issued ID verification</li>
                  <li>• Professional license validation</li>
                  <li>• Background check requirements</li>
                  <li>• Contact information verification</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-green-700">Ongoing Monitoring</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Regular review of client feedback</li>
                  <li>• Continuous qualification updates</li>
                  <li>• Safety incident tracking</li>
                  <li>• Platform usage monitoring</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* Additional Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Additional Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/help')}
              >
                <FileText className="w-4 h-4 mr-2" />
                Help Center
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/contact')}
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/report')}
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Report Safety Issue
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-600" />
                Safety Commitment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-4">
                We're committed to maintaining a safe platform for everyone. If you experience 
                any safety concerns, we will investigate immediately and take appropriate action.
              </p>
              <div className="text-center">
                <Button 
                  onClick={() => navigate('/report')}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Report Safety Issue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SafetyGuidelines;
