import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
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
            }}>Privacy Policy</span>
          </h1>
          <p className="text-center text-gray-600">Last updated: January 2024</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">Your Privacy Matters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-sm sm:text-base">
            <p>
              At Sims Marketplace, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
            </p>

            <div>
              <h3 className="text-lg font-semibold mb-3">1. Information We Collect</h3>
              <p className="mb-3">We collect information you provide directly to us, such as:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email address and password for account creation</li>
                <li>Profile information (for service providers)</li>
                <li>Service listings and descriptions</li>
                <li>Payment information (processed securely through Stripe)</li>
                <li>Communications between users</li>
                <li>Reviews and ratings</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">2. How We Use Your Information</h3>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and maintain our service</li>
                <li>Process payments and manage visibility fees</li>
                <li>Facilitate communication between clients and service providers</li>
                <li>Improve our platform and user experience</li>
                <li>Send important updates about your account</li>
                <li>Ensure platform safety and prevent fraud</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">3. Information Sharing</h3>
              <p className="mb-3">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>With service providers you choose to contact (to facilitate connections)</li>
                <li>With payment processors (Stripe) for visibility fee processing only</li>
                <li>When required by law or to protect our rights</li>
                <li>With your explicit consent</li>
              </ul>
              <p className="mt-3 text-sm text-gray-600">
                <strong>Note:</strong> We facilitate connections between users but are not responsible for how they use shared information or any subsequent interactions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">4. Data Security</h3>
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>SSL encryption for data transmission</li>
                <li>Secure password storage</li>
                <li>Regular security audits</li>
                <li>PCI DSS compliance for payment processing</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">5. Your Rights</h3>
              <p className="mb-3">Under New Zealand privacy law, you have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your account and data</li>
                <li>Opt out of marketing communications</li>
                <li>Withdraw consent for data processing</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">6. Cookies and Tracking</h3>
              <p>
                We use cookies and similar technologies to enhance your experience on our platform. These help us remember your preferences, analyze site traffic, and improve our services. You can control cookie settings through your browser preferences.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">7. Data Retention</h3>
              <p>
                We retain your personal information only as long as necessary to provide our services and comply with legal obligations. When you delete your account, we will remove your personal data within 30 days, except where we are required to retain it for legal or regulatory purposes.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">8. Children's Privacy</h3>
              <p>
                Our service is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">9. Changes to This Policy</h3>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </div>

            <div className="pt-6 border-t">
              <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
              <p className="mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
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

export default PrivacyPolicy;
