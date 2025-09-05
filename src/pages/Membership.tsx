import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap, Shield, Users, Clock } from 'lucide-react';

const Membership = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const plans = [
    {
      id: 'free',
      name: 'Free Trial',
      price: 0,
      duration: '2 weeks',
      description: 'Perfect for trying out our platform',
      features: [
        'Access to basic therapist profiles',
        'Limited message sending (5 messages)',
        'Basic search functionality',
        'Standard customer support'
      ],
      popular: false,
      trial: true
    },
    {
      id: 'monthly',
      name: 'Monthly Premium',
      price: 19.99,
      duration: 'per month',
      description: 'Full access to all premium features',
      features: [
        'Unlimited therapist access',
        'Unlimited messaging',
        'Advanced search & filters',
        'Priority customer support',
        'Exclusive therapist recommendations',
        'Booking management tools',
        'Health & wellness tips'
      ],
      popular: true,
      trial: false
    },
    {
      id: 'annual',
      name: 'Annual Premium',
      price: 199.99,
      duration: 'per year',
      description: 'Best value with 2 months free',
      features: [
        'All monthly features included',
        '2 months free (save $40)',
        'Early access to new features',
        'VIP customer support',
        'Exclusive wellness content',
        'Member-only events access'
      ],
      popular: false,
      trial: false
    }
  ];

  const currentPlan = {
    name: 'Monthly Premium',
    status: 'active',
    nextBilling: '2024-02-15',
    price: 19.99,
    features: [
      'Unlimited therapist access',
      'Unlimited messaging',
      'Advanced search & filters',
      'Priority customer support'
    ]
  };

  const billingHistory = [
    {
      id: '1',
      date: '2024-01-15',
      amount: 19.99,
      status: 'paid',
      description: 'Monthly Premium Subscription'
    },
    {
      id: '2',
      date: '2023-12-15',
      amount: 19.99,
      status: 'paid',
      description: 'Monthly Premium Subscription'
    },
    {
      id: '3',
      date: '2023-11-15',
      amount: 19.99,
      status: 'paid',
      description: 'Monthly Premium Subscription'
    }
  ];

  const handlePlanChange = (planId: string) => {
    setSelectedPlan(planId);
    // TODO: Implement plan change logic
    console.log('Changing to plan:', planId);
  };

  const handleCancelSubscription = () => {
    // TODO: Implement cancellation logic
    console.log('Cancelling subscription');
  };

  const handleReactivateSubscription = () => {
    // TODO: Implement reactivation logic
    console.log('Reactivating subscription');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Membership & Billing</h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your subscription and access premium features
          </p>
        </div>

        {/* Current Plan Status */}
        <div className="mb-6 sm:mb-8">
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg sm:text-xl">Current Plan</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Your active subscription details
                  </CardDescription>
                </div>
                <Badge
                  variant={currentPlan.status === 'active' ? 'default' : 'secondary'}
                  className="text-xs sm:text-sm"
                >
                  {currentPlan.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Plan Name</p>
                  <p className="text-sm sm:text-base font-semibold">{currentPlan.name}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Price</p>
                  <p className="text-sm sm:text-base font-semibold">${currentPlan.price}/month</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Next Billing</p>
                  <p className="text-sm sm:text-base font-semibold">
                    {new Date(currentPlan.nextBilling).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Status</p>
                  <p className="text-sm sm:text-base font-semibold capitalize">{currentPlan.status}</p>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                <h4 className="font-medium text-sm sm:text-base mb-3">Your Plan Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {currentPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm sm:text-base">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  onClick={handleCancelSubscription}
                  className="text-sm sm:text-base touch-target"
                >
                  Cancel Subscription
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReactivateSubscription}
                  className="text-sm sm:text-base touch-target"
                >
                  Reactivate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Plans */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Available Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative ${
                  plan.popular ? 'ring-2 ring-purple-600 shadow-lg' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-600 text-white text-xs sm:text-sm px-3 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                {plan.trial && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-600 text-white text-xs sm:text-sm px-3 py-1">
                      Free Trial
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-3 sm:pb-4 pt-6 sm:pt-8">
                  <CardTitle className="text-lg sm:text-xl">{plan.name}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">{plan.description}</CardDescription>
                  <div className="mt-2 sm:mt-3">
                    <span className="text-2xl sm:text-3xl font-bold">
                      ${plan.price}
                    </span>
                    <span className="text-sm sm:text-base text-gray-600 ml-1">
                      {plan.duration}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="p-3 sm:p-4 md:p-6">
                  <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm sm:text-base">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full text-sm sm:text-base touch-target ${
                      plan.id === 'free' ? 'bg-gray-600 hover:bg-gray-700' : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                    onClick={() => handlePlanChange(plan.id)}
                    disabled={plan.id === currentPlan.name.toLowerCase().replace(' ', '-')}
                  >
                    {plan.id === 'free' ? 'Start Free Trial' : 
                     plan.id === currentPlan.name.toLowerCase().replace(' ', '-') ? 'Current Plan' : 
                     'Choose Plan'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Billing History */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Billing History</h2>
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl">Recent Transactions</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Your payment history and invoices
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="space-y-3 sm:space-y-4">
                {billingHistory.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm sm:text-base">{transaction.description}</p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm sm:text-base font-semibold text-green-600">
                        ${transaction.amount}
                      </p>
                      <Badge
                        variant={transaction.status === 'paid' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Plan Comparison */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Plan Comparison</h2>
          <Card>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm sm:text-base">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium">Feature</th>
                      <th className="text-center py-2 sm:py-3 px-2 sm:px-4 font-medium">Free Trial</th>
                      <th className="text-center py-2 sm:py-3 px-2 sm:px-4 font-medium">Monthly</th>
                      <th className="text-center py-2 sm:py-3 px-2 sm:px-4 font-medium">Annual</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Therapist Access</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">Limited</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">Unlimited</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Messaging</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">5 messages</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">Unlimited</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Search & Filters</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">Basic</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">Advanced</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">Advanced</td>
                    </tr>
                    <tr>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Customer Support</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">Standard</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">Priority</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">VIP</td>
                    </tr>
                    <tr>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Exclusive Content</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">No</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">Yes</td>
                      <td className="text-center py-2 sm:py-3 px-2 sm:px-4">Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl">Can I cancel anytime?</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6">
                <p className="text-sm sm:text-base text-gray-600">
                  Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl">What happens after the free trial?</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6">
                <p className="text-sm sm:text-base text-gray-600">
                  After your 2-week free trial, you'll automatically be charged for the monthly premium plan unless you cancel.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl">Can I change plans?</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6">
                <p className="text-sm sm:text-base text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl">Is there a refund policy?</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6">
                <p className="text-sm sm:text-base text-gray-600">
                  We offer a 30-day money-back guarantee for all paid plans. Contact our support team for assistance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
