import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-md sm:max-w-lg">
        <Card className="shadow-xl border-0">
          <CardContent className="p-6 sm:p-8 text-center">
            {/* 404 Icon */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <HelpCircle className="w-10 h-10 sm:w-12 sm:h-12 text-red-600" />
            </div>

            {/* Error Message */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-2 sm:mb-3">
              404
            </h1>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3">
              Page Not Found
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>

            {/* Action Buttons */}
            <div className="space-y-3 sm:space-y-4">
              <Button
                onClick={() => navigate('/')}
                className="w-full text-sm sm:text-base touch-target"
                size="lg"
              >
                <Home className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Go to Home
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate('/explore')}
                className="w-full text-sm sm:text-base touch-target"
                size="lg"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Explore Therapists
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="w-full text-sm sm:text-base touch-target"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Go Back
              </Button>
            </div>

            {/* Help Text */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
              <p className="text-xs sm:text-sm text-gray-500 mb-2">
                Need help? Contact our support team
              </p>
              <Button
                variant="link"
                className="text-xs sm:text-sm text-purple-600 hover:text-purple-700 p-0 h-auto"
                onClick={() => navigate('/contact')}
              >
                Get Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
