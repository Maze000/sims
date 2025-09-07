import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const CookiePolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
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
            }}>Cookie Policy</span>
          </h1>
          <p className="text-center text-gray-600">Last updated: January 2024</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">How We Use Cookies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-sm sm:text-base">
            <p>
              This Cookie Policy explains how Sims Marketplace uses cookies and similar technologies when you visit our website. By using our service, you consent to the use of cookies as described in this policy.
            </p>

            <div>
              <h3 className="text-lg font-semibold mb-3">What Are Cookies?</h3>
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Types of Cookies We Use</h3>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Essential Cookies</h4>
                <p className="mb-2">These cookies are necessary for the website to function properly. They include:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Authentication cookies to keep you logged in</li>
                  <li>Security cookies to protect against fraud</li>
                  <li>Session cookies to maintain your preferences</li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Functional Cookies</h4>
                <p className="mb-2">These cookies enhance your experience by:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Remembering your language preferences</li>
                  <li>Storing your search filters and settings</li>
                  <li>Maintaining your dashboard preferences</li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Analytics Cookies</h4>
                <p className="mb-2">These cookies help us understand how you use our website:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Page views and user interactions</li>
                  <li>Popular services and categories</li>
                  <li>Performance metrics and error tracking</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Marketing Cookies</h4>
                <p className="mb-2">These cookies are used to deliver relevant advertisements:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Personalized service recommendations</li>
                  <li>Retargeting for relevant providers</li>
                  <li>Campaign performance tracking</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Third-Party Cookies</h3>
              <p className="mb-3">We may use third-party services that set their own cookies:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Stripe:</strong> For secure payment processing</li>
                <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                <li><strong>Social Media Platforms:</strong> For sharing and social features</li>
                <li><strong>Maps Services:</strong> For location-based features</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Managing Your Cookie Preferences</h3>
              <p className="mb-3">You have several options for managing cookies:</p>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Browser Settings</h4>
                <p className="mb-2">Most web browsers allow you to control cookies through their settings. You can:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Block all cookies</li>
                  <li>Block third-party cookies only</li>
                  <li>Delete existing cookies</li>
                  <li>Set preferences for specific websites</li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Cookie Consent</h4>
                <p>
                  When you first visit our website, you'll see a cookie consent banner. You can choose which types of cookies to accept or reject. You can change your preferences at any time through your account settings.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Opt-Out Links</h4>
                <p className="mb-2">For specific third-party services:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
                  <li><a href="https://www.facebook.com/ads/preferences" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Facebook Ad Preferences</a></li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Impact of Disabling Cookies</h3>
              <p className="mb-3">If you choose to disable cookies, some features of our website may not work properly:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You may need to log in repeatedly</li>
                <li>Your preferences and settings won't be saved</li>
                <li>Some interactive features may not function</li>
                <li>Personalized recommendations may not be available</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Cookie Retention</h3>
              <p>
                Different cookies have different lifespans:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent cookies:</strong> Remain for a set period (typically 30 days to 2 years)</li>
                <li><strong>Authentication cookies:</strong> Expire based on your login session</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Updates to This Policy</h3>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website.
              </p>
            </div>

            <div className="pt-6 border-t">
              <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
              <p className="mb-4">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <Button onClick={() => navigate('/contact')} className="bg-orange-600 hover:bg-orange-700">
                Contact Us
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CookiePolicy;
