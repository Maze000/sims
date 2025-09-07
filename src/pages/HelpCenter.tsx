import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, MessageCircle, Phone, Mail, FileText, Shield, CreditCard, User, Settings, AlertTriangle } from 'lucide-react';

const HelpCenter = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: User,
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'Click "Sign Up" on our homepage and enter your email and password. You can then complete your profile and start using our platform.'
        },
        {
          question: 'What types of services can I find?',
          answer: 'We offer a wide range of services including health & wellness, beauty & aesthetics, personal care, education, creative services, home assistance, sports activities, and technology support.'
        },
        {
          question: 'How do I find service providers in my area?',
          answer: 'Use our search and filter options on the Explore page. You can filter by location, service type, rating, and availability.'
        }
      ]
    },
    {
      id: 'for-clients',
      title: 'For Clients',
      icon: MessageCircle,
      questions: [
        {
          question: 'How do I contact a service provider?',
          answer: 'Click on a provider\'s profile and use the contact form. They will receive your message and can respond directly to arrange services.'
        },
        {
          question: 'Are there any booking fees?',
          answer: 'No! We don\'t charge booking fees. You only pay the service provider directly for their services.'
        },
        {
          question: 'How do I leave a review?',
          answer: 'After using a service, you can leave a review on the provider\'s profile page. Reviews help other clients make informed decisions.'
        }
      ]
    },
    {
      id: 'for-providers',
      title: 'For Service Providers',
      icon: Settings,
      questions: [
        {
          question: 'How do I list my services?',
          answer: 'Create a provider account and complete your profile. You can then add your services, set your rates, and manage your availability.'
        },
        {
          question: 'How does the visibility fee work?',
          answer: 'You pay a daily fee to keep your services visible to clients. The longer you commit, the better the daily rate. Payments are processed securely through Stripe.'
        },
        {
          question: 'How do I manage my bookings?',
          answer: 'Use your provider dashboard to view messages, manage your availability, and track your service listings.'
        }
      ]
    },
    {
      id: 'payments',
      title: 'Payments & Billing',
      icon: CreditCard,
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, debit cards, Apple Pay, Google Pay, and bank transfers through our secure Stripe integration.'
        },
        {
          question: 'When do I get paid as a provider?',
          answer: 'You set your own rates and collect payment directly from clients. We only charge the visibility fee to keep your services listed.'
        },
        {
          question: 'Is my payment information secure?',
          answer: 'Yes! All payments are processed through Stripe, which is PCI DSS compliant and uses bank-level security.'
        }
      ]
    },
    {
      id: 'safety',
      title: 'Safety & Security',
      icon: Shield,
      questions: [
        {
          question: 'How do you verify service providers?',
          answer: 'We require identity verification including licenses, certifications, and professional qualifications before providers can list services.'
        },
        {
          question: 'What if I have a problem with a service?',
          answer: 'Contact our support team immediately. We take all reports seriously and will investigate any issues with service quality or safety.'
        },
        {
          question: 'How do you protect my personal information?',
          answer: 'We use SSL encryption, secure data storage, and never share your personal information without your consent. See our Privacy Policy for details.'
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.questions.some(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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
            }}>Help Center</span>
          </h1>
          <p className="text-center text-gray-600 mb-6">Find answers to your questions</p>
          
          {/* Platform Disclaimer */}
          <Card className="mb-6 shadow-lg border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center mb-3">
                <AlertTriangle className="w-6 h-6 text-orange-600 mr-2" />
                <h3 className="text-lg font-bold text-orange-800">Platform Notice</h3>
              </div>
              <p className="text-orange-700 text-sm">
                <strong>SIMS is a connection platform only.</strong> We facilitate connections but are not responsible for services provided or payments made between users.
              </p>
            </CardContent>
          </Card>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-lg py-3"
              />
            </div>
          </div>
        </div>


        {/* FAQ Categories */}
        <div className="space-y-6">
          {filteredCategories.map((category) => (
            <Card key={category.id} className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <category.icon className="w-6 h-6 mr-3 text-orange-600" />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.questions.map((faq, index) => (
                    <div key={index} className="border-l-4 border-orange-200 pl-4">
                      <h4 className="font-semibold text-gray-800 mb-2">{faq.question}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {searchQuery && filteredCategories.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-gray-600 mb-4">Try different keywords or contact our support team</p>
              <Button onClick={() => navigate('/contact')}>
                Contact Support
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Still Need Help */}
        <Card className="mt-8 bg-gradient-to-r from-orange-50 to-blue-50 border-orange-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold mb-4">Still need help?</h3>
            <p className="text-gray-600 mb-6">Our support team is here to help you 24/7</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/contact')} className="bg-orange-600 hover:bg-orange-700">
                <Mail className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
              <Button variant="outline" onClick={() => navigate('/report')}>
                <FileText className="w-4 h-4 mr-2" />
                Report Issue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpCenter;
