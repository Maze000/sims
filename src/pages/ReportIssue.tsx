import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, AlertTriangle, FileText, Send, Shield, Mail } from 'lucide-react';

const ReportIssue = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    reporterName: '',
    reporterEmail: '',
    issueType: 'safety',
    providerName: '',
    providerId: '',
    incidentDate: '',
    location: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    alert('Thank you for your report. We take all reports seriously and will investigate within 24 hours.');
    setFormData({
      reporterName: '',
      reporterEmail: '',
      issueType: 'safety',
      providerName: '',
      providerId: '',
      incidentDate: '',
      location: '',
      description: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const issueTypes = [
    { value: 'safety', label: 'Safety Concern', description: 'Immediate safety risk or dangerous behavior' },
    { value: 'fraud', label: 'Fraud or Scam', description: 'Suspicious financial activity or false information' },
    { value: 'harassment', label: 'Harassment', description: 'Inappropriate behavior or unwanted contact' },
    { value: 'quality', label: 'Service Quality', description: 'Poor service delivery or unprofessional conduct' },
    { value: 'technical', label: 'Technical Issue', description: 'Platform bug or technical problem' },
    { value: 'other', label: 'Other', description: 'Any other issue not listed above' }
  ];


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
            }}>Report Issue</span>
          </h1>
          <p className="text-center text-gray-600">Help us maintain a safe and trustworthy platform</p>
        </div>

        {/* Platform Disclaimer */}
        <Card className="mb-8 shadow-lg border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-8 h-8 text-orange-600 mr-3" />
              <h2 className="text-xl font-bold text-orange-800">Important Disclaimer</h2>
            </div>
            <p className="text-orange-700 mb-4">
              <strong>SIMS Marketplace is a connection platform only.</strong> We facilitate connections between service providers and clients but are not responsible for the services provided, payments made, or any interactions between users. All transactions and services are between the individual parties involved.
            </p>
          </CardContent>
        </Card>

        {/* Report Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-6 h-6 mr-3 text-orange-600" />
              Issue Report Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Reporter Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Your Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reporterName">Your Name *</Label>
                    <Input
                      id="reporterName"
                      type="text"
                      placeholder="Your full name"
                      value={formData.reporterName}
                      onChange={(e) => handleInputChange('reporterName', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reporterEmail">Your Email *</Label>
                    <Input
                      id="reporterEmail"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.reporterEmail}
                      onChange={(e) => handleInputChange('reporterEmail', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Issue Type */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Issue Type *</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {issueTypes.map((type) => (
                    <label key={type.value} className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="issueType"
                        value={type.value}
                        checked={formData.issueType === type.value}
                        onChange={(e) => handleInputChange('issueType', e.target.value)}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <div className="text-sm text-gray-600">{type.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>


              {/* Provider Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Provider Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="providerName">Provider Name</Label>
                    <Input
                      id="providerName"
                      type="text"
                      placeholder="Name of the service provider"
                      value={formData.providerName}
                      onChange={(e) => handleInputChange('providerName', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="providerId">Provider ID (if known)</Label>
                    <Input
                      id="providerId"
                      type="text"
                      placeholder="Provider's profile ID"
                      value={formData.providerId}
                      onChange={(e) => handleInputChange('providerId', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Incident Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Incident Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="incidentDate">Date of Incident</Label>
                    <Input
                      id="incidentDate"
                      type="date"
                      value={formData.incidentDate}
                      onChange={(e) => handleInputChange('incidentDate', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      type="text"
                      placeholder="Where did this happen?"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Please provide a detailed description of what happened. Include specific details, times, and any relevant information..."
                  rows={6}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                />
              </div>


              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                <Send className="w-4 h-4 mr-2" />
                Submit Report
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Additional Support */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-600" />
                What Happens Next?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• We review your report within 24 hours</li>
                <li>• We may contact you for additional information</li>
                <li>• We investigate the issue thoroughly</li>
                <li>• We take appropriate action based on our findings</li>
                <li>• We follow up with you on the resolution</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-blue-600" />
                More Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
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
                onClick={() => navigate('/safety')}
              >
                <Shield className="w-4 h-4 mr-2" />
                Safety Guidelines
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;
