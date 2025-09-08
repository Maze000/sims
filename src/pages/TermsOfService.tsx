import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
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
            }}>Terms of Service</span>
          </h1>
          <p className="text-center text-gray-600">Last updated: January 2024</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">Agreement to Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-sm sm:text-base">
            <p>
              By accessing and using Sims Marketplace ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <div>
              <h3 className="text-lg font-semibold mb-3">1. Use License</h3>
              <p className="mb-3">
                Permission is granted to temporarily download one copy of Sims Marketplace for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display</li>
                <li>attempt to reverse engineer any software contained on the website</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">2. Service Provider Responsibilities</h3>
              <p className="mb-3">
                Service providers using our platform agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and truthful information about their services</li>
                <li>Maintain professional standards and qualifications</li>
                <li>Comply with all applicable New Zealand laws and regulations</li>
                <li>Respect client privacy and confidentiality</li>
                <li>Pay required visibility fees as outlined in our pricing structure</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">3. Client Responsibilities</h3>
              <p className="mb-3">
                Clients using our platform agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate contact information</li>
                <li>Respect service providers' time and policies</li>
                <li>Pay for services as agreed with individual providers</li>
                <li>Provide honest feedback and reviews</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">4. Payment Terms</h3>
              <p className="mb-3">
                Sims Marketplace operates on a visibility fee model:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Service providers pay daily fees to maintain visibility on the platform</li>
                <li>All payments are processed securely through Stripe</li>
                <li>Visibility fees are non-refundable once services are made visible</li>
                <li>Service providers set their own rates for clients</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">5. Platform Role and Disclaimers</h3>
              <p className="mb-3">
                <strong>SIMS Marketplace is a connection platform only.</strong> We facilitate connections between service providers and clients but are not responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-3">
                <li>The quality, safety, or delivery of services provided</li>
                <li>Payments made between users</li>
                <li>Any disputes or issues between service providers and clients</li>
                <li>Verification of service provider qualifications beyond our initial screening</li>
                <li>Outcomes or results of services provided</li>
              </ul>
              <p className="mb-3">
                The materials on Sims Marketplace are provided on an 'as is' basis. Sims Marketplace makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">6. Limitations of Liability</h3>
              <p className="mb-3">
                In no event shall Sims Marketplace or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Sims Marketplace, even if Sims Marketplace or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
              <p className="mb-3">
                <strong>User-to-User Interactions:</strong> SIMS Marketplace shall not be liable for any damages, losses, or issues arising from interactions between service providers and clients, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Service quality or delivery issues</li>
                <li>Payment disputes or financial losses</li>
                <li>Personal injury or property damage</li>
                <li>Breach of contract between users</li>
                <li>Misrepresentation of services or qualifications</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">7. Governing Law</h3>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of New Zealand and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
              </p>
            </div>

            <div className="pt-6 border-t">
              <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
              <p className="mb-4">
                If you have any questions about these Terms of Service, please contact us:
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

export default TermsOfService;
