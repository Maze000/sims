import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Star, 
  MapPin, 
  Clock, 
  Calendar, 
  CreditCard, 
  MessageSquare, 
  Share2,
  Heart,
  Shield,
  Award,
  Users
} from "lucide-react";

const TherapistProfileNew = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);



  const therapist = {
    id: "1",
    name: "Sarah Mitchell",
    avatar: "/placeholder.svg",
    rating: 4.9,
    reviewsCount: 234,
    location: "Auckland, New Zealand",
    verified: true,
    yearsExperience: 8,
    totalSessions: 1250,
    specialties: ["Relaxation Massage", "Deep Tissue", "Aromatherapy", "Sports Massage"],
    languages: ["English", "Māori"],
    phone: "+64 9 123 4567",
    email: "sarah.mitchell@numassage.com",
    description: "Certified therapist with over 8 years of experience in therapeutic and relaxation massage. Specialising in deep relaxation techniques and muscle recovery. My approach focuses on creating a personalised experience for each client, adapting techniques to their specific needs.",
    certifications: [
      "Therapeutic Massage Certification - New Zealand Massage Institute",
      "Deep Tissue Specialisation - International Massage Academy",
      "Aromatherapy Certification - Natural Therapy Centre"
    ],
    services: [
      {
        id: "1",
        name: "Relaxation Massage",
        duration: "60 min",
        price: 120,
        description: "Gentle and relaxing massage to release tension and reduce stress"
      },
      {
        id: "2",
        name: "Deep Tissue Massage",
        duration: "75 min",
        price: 150,
        description: "Deep massage to release muscle tension and knots"
      },
      {
        id: "3",
        name: "Aromatherapy Massage",
        duration: "90 min",
        price: 180,
        description: "Relaxing massage combined with therapeutic essential oils"
      },
      {
        id: "4",
        name: "Sports Massage",
        duration: "60 min",
        price: 135,
        description: "Specific massage for athletes, focused on muscle recovery"
      }
    ],
    availability: {
      "2025-01-20": ["09:00", "11:00", "14:00", "16:00"],
      "2025-01-21": ["10:00", "13:00", "15:00", "17:00"],
      "2025-01-22": ["09:00", "12:00", "14:30", "16:30"]
    },
    reviewsList: [
      {
        id: "1",
        author: "Anna M.",
        rating: 5,
        date: "2025-01-15",
        comment: "Excellent professional, very dedicated and the massage was incredible. Highly recommended."
      },
      {
        id: "2",
        author: "Chris R.",
        rating: 5,
        date: "2025-01-10",
        comment: "Sarah has magic hands. The deep tissue massage was exactly what I needed."
      },
      {
        id: "3",
        author: "Lucy P.",
        rating: 4,
        date: "2025-01-05",
        comment: "Very good experience, relaxing atmosphere and professional technique."
      }
    ]
  };

  const handleBooking = () => {
    const selectedServiceData = therapist.services.find(s => s.id === selectedService);
    
    const bookingData = {
      therapistName: therapist.name,
      serviceName: selectedServiceData?.name,
      date: selectedDate,
      time: selectedTime,
      duration: selectedServiceData?.duration,
      price: selectedServiceData?.price,
      location: therapist.location
    };

    navigate("/payment", { state: bookingData });
    setShowBookingModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => window.history.back()}>
              ← Back
            </Button>
            <h1 className="text-2xl font-bold text-purple-600">
              <span className="logo-nu">NU</span>
              <span className="logo-massage">massage</span>
            </h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Profile Card */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={therapist.avatar} />
                      <AvatarFallback className="text-2xl">{therapist.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {therapist.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1">
                        <Shield className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-2xl font-bold">{therapist.name}</h1>
                      {therapist.verified && (
                        <Badge className="bg-green-100 text-green-800">Verified</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {therapist.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {therapist.yearsExperience} years exp.
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {therapist.totalSessions} sessions
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{therapist.rating}</span>
                      </div>
                      <span className="text-gray-600">({therapist.reviewsCount} reviews)</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {therapist.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{therapist.description}</p>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="services" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>
              
              <TabsContent value="services" className="space-y-4 max-h-96 overflow-y-auto scrollable">
                {therapist.services.map((service) => (
                  <Card key={service.id} className="card-hover">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                          <p className="text-gray-600 mb-3">{service.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {service.duration}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-purple-600 mb-2">
                            ${service.price.toLocaleString()}
                          </div>
                                                     <Button 
                             className="bg-purple-600 hover:bg-purple-700"
                             onClick={() => navigate('/messages')}
                           >
                             Send Message
                           </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                {therapist.reviewsList.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{review.author}</h4>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="about" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {therapist.certifications.map((cert, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Award className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Languages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {therapist.languages.map((language) => (
                        <Badge key={language} variant="outline">{language}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
                         <Card>
               <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                   <Calendar className="w-5 h-5" />
                   General Info
                 </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="text-sm text-gray-600 mb-3">
                   <p>Available days for consultation and booking coordination</p>
                 </div>
                 
                 <div className="space-y-3">
                   <div className="font-medium text-gray-900 mb-2">Available Days:</div>
                   <div className="flex flex-wrap gap-2">
                     {Object.keys(therapist.availability).map((date) => (
                       <div key={date} className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-full">
                         {new Date(date).toLocaleDateString('en-NZ', { 
                           weekday: 'long'
                         })}
                       </div>
                     ))}
                   </div>
                 </div>
                 
                 <div className="text-xs text-gray-500 text-center pt-2">
                   <p>Contact via message to coordinate specific times</p>
                 </div>
               </CardContent>
             </Card>

            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Booking</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>Therapist:</span>
                <span className="font-medium">{therapist.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Service:</span>
                <span className="font-medium">
                  {therapist.services.find(s => s.id === selectedService)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="font-medium">
                  {selectedDate && new Date(selectedDate).toLocaleDateString('en-NZ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Time:</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-purple-600">
                  ${therapist.services.find(s => s.id === selectedService)?.price.toLocaleString()}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Additional notes (optional)</Label>
              <Textarea 
                id="notes"
                placeholder="Mention any preferences or special conditions..."
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowBookingModal(false)}>
                Cancel
              </Button>
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={handleBooking}>
                Confirm & Pay
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TherapistProfileNew;
