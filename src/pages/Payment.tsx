import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Lock, 
  Calendar, 
  MapPin, 
  Clock, 
  User,
  CheckCircle,
  ArrowLeft
} from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Booking data (normally would come from state or props)
  const bookingData = location.state || {
    therapistName: "Sarah Mitchell",
    serviceName: "Relaxation Massage",
    date: "2025-01-20",
    time: "14:00",
    duration: "60 min",
    price: 120,
    location: "Auckland, New Zealand"
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setPaymentSuccess(true);
      
      // Redirect after 3 seconds
      setTimeout(() => {
        navigate("/therapists/featured", { 
          state: { message: "Booking confirmed! We'll send you the details by email." }
        });
      }, 3000);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-700 mb-2">Payment Successful!</h2>
              <p className="text-gray-600">Your booking has been confirmed</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
              <h3 className="font-semibold mb-2">Booking details:</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div>Therapist: {bookingData.therapistName}</div>
                <div>Service: {bookingData.serviceName}</div>
                <div>Date: {new Date(bookingData.date).toLocaleDateString('en-NZ')}</div>
                <div>Time: {bookingData.time}</div>
                <div className="font-semibold text-gray-900 pt-2 border-t">
                  Total paid: ${bookingData.price.toLocaleString()}
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              You'll receive a confirmation email with all the details.
            </p>
            
            <div className="text-center">
              <div className="animate-pulse text-purple-600">
                Redirecting to dashboard...
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-purple-600">
              <span className="logo-nu">NU</span>
              <span className="logo-massage">massage</span>
            </h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Payment Information
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    All payments are processed securely
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePayment} className="space-y-4">
                    {/* Payment Method */}
                    <div>
                      <Label className="text-base font-semibold">Payment Method</Label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <Button
                          type="button"
                          variant={paymentMethod === "card" ? "default" : "outline"}
                          className="h-12 justify-start"
                          onClick={() => setPaymentMethod("card")}
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Card
                        </Button>
                        <Button
                          type="button"
                          variant={paymentMethod === "transfer" ? "default" : "outline"}
                          className="h-12 justify-start"
                          onClick={() => setPaymentMethod("transfer")}
                        >
                          <span className="w-4 h-4 mr-2 text-xs">💳</span>
                          Bank Transfer
                        </Button>
                      </div>
                    </div>

                    {paymentMethod === "card" && (
                      <>
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            required
                            className="mt-1"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              type="text"
                              placeholder="MM/YY"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                              required
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              type="text"
                              placeholder="123"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                              required
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input
                            id="cardName"
                            type="text"
                            placeholder="John Smith"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            required
                            className="mt-1"
                          />
                        </div>
                      </>
                    )}

                    {paymentMethod === "transfer" && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Bank Transfer Details</h4>
                        <div className="space-y-1 text-sm">
                          <div><strong>Bank:</strong> ANZ Bank</div>
                          <div><strong>Account Number:</strong> 01-1234-5678901-00</div>
                          <div><strong>Account Name:</strong> <span className="logo-nu">NU</span><span className="logo-massage">massage</span> Ltd</div>
                          <div><strong>Reference:</strong> Your booking ID</div>
                        </div>
                        <p className="text-xs text-gray-600 mt-3">
                          After making the transfer, send the receipt to WhatsApp +64 21 123 4567
                        </p>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-700 h-12"
                      disabled={processing}
                    >
                      {processing ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Processing...
                        </div>
                      ) : (
                        `Pay $${bookingData.price.toLocaleString()}`
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                      <Lock className="w-3 h-3" />
                      Secure payment protected by SSL
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <div className="font-semibold">{bookingData.therapistName}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {bookingData.location}
                      </div>
                    </div>
                  </div>

                  <Separator />

                                      <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service:</span>
                        <span className="font-medium">{bookingData.serviceName}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{bookingData.duration}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">
                          {new Date(bookingData.date).toLocaleDateString('en-NZ')}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{bookingData.time}</span>
                        </div>
                      </div>
                    </div>

                  <Separator />

                                      <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${bookingData.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Platform fee:</span>
                        <span>Included</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-purple-600">${bookingData.price.toLocaleString()}</span>
                      </div>
                    </div>

                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium text-green-800">Satisfaction guarantee</div>
                        <div className="text-green-700">
                          If you're not satisfied, we'll refund 100% of your money
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
