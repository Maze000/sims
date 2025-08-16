import { useMemo, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Clock3, Filter } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Importar todas las imágenes de masajes
import hotStoneImage from "@/assets/numassage/service hot stone.jpg";
import thaiImage from "@/assets/numassage/Thai Massage.png";
import deepTissueImage from "@/assets/numassage/Deep Tissue Massage.png";
import relaxationImage from "@/assets/numassage/Relaxation Massage.png";
import footReflexologyImage from "@/assets/numassage/Foot Reflexology Massage.png";
import neckShoulderImage from "@/assets/numassage/Neck & Shoulder Massage.png";
import classicImage from "@/assets/numassage/Classic Massage.png";
import faceMaskImage from "@/assets/numassage/Body Massage with Face Mask.png";
import combinationImage from "@/assets/numassage/Combination Massage.png";
import thaiRoyalAImage from "@/assets/numassage/Auckland Thai Royal Package A-.png";
import thaiRoyalBImage from "@/assets/numassage/Auckland Thai Royal Package B.png";
import thaiPackagesImage from "@/assets/numassage/Auckland Thai Packages (A & B)-.png";

// Componente para mostrar la imagen correspondiente a cada servicio
const ServiceImage = ({ serviceType, serviceName }: { serviceType: string; serviceName: string }) => {
  const getServiceImage = (type: string, name: string) => {
    // Mapeo específico para cada servicio
    switch (name.toLowerCase()) {
      case 'hot stone massage':
        return hotStoneImage;
      case 'thai massage':
        return thaiImage;
      case 'deep tissue massage':
        return deepTissueImage;
      case 'relaxation massage':
        return relaxationImage;
      case 'foot reflexology massage':
        return footReflexologyImage;
      case 'neck & shoulder massage':
        return neckShoulderImage;
      case 'classic massage':
        return classicImage;
      case 'body massage with face mask':
        return faceMaskImage;
      case 'combination massage':
        return combinationImage;
      case 'auckland thai royal package a':
        return thaiRoyalAImage;
      case 'auckland thai royal package b':
        return thaiRoyalBImage;
      case 'auckland thai packages (a & b)':
        return thaiPackagesImage;
      default:
        // Fallback para servicios no mapeados
        if (type.toLowerCase().includes('package')) {
          return thaiPackagesImage;
        } else if (type.toLowerCase().includes('thai')) {
          return thaiImage;
        } else if (type.toLowerCase().includes('therapeutic')) {
          return deepTissueImage;
        } else if (type.toLowerCase().includes('relaxation')) {
          return relaxationImage;
        } else {
          return classicImage;
        }
    }
  };

  const imageSrc = getServiceImage(serviceType, serviceName);

  return (
    <div className="w-full h-40 sm:h-44 bg-gradient-to-br from-muted/20 to-muted/10 rounded-t-lg">
      <img
        src={imageSrc}
        alt={`${serviceName} service`}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>
  );
};

export type Service = {
  id: string;
  name: string;
  category: string;
  durations: { label: string; minutes: number; price: number }[];
  description: string;
};

const SERVICES: Service[] = [
  {
    id: "hot-stone",
    name: "Hot Stone Massage",
    category: "Therapeutic",
    description: "Deep relaxation using heated basalt stones to ease muscle tension.",
    durations: [
      { label: "60 min", minutes: 60, price: 109 },
      { label: "90 min", minutes: 90, price: 145 },
      { label: "120 min", minutes: 120, price: 175 },
    ],
  },
  {
    id: "thai-royal-a",
    name: "Auckland Thai Royal Package A",
    category: "Package",
    description: "A regal Thai-inspired ritual blending acupressure and stretch.",
    durations: [
      { label: "90 min", minutes: 90, price: 159 },
    ],
  },
  {
    id: "thai-royal-b",
    name: "Auckland Thai Royal Package B",
    category: "Package",
    description: "Premium Thai ritual with aromatic oils and head massage.",
    durations: [
      { label: "120 min", minutes: 120, price: 199 },
    ],
  },
  {
    id: "relaxation",
    name: "Relaxation Massage",
    category: "Relaxation",
    description: "Gentle, flowing strokes to calm the mind and body.",
    durations: [
      { label: "60 min", minutes: 60, price: 95 },
      { label: "90 min", minutes: 90, price: 129 },
      { label: "120 min", minutes: 120, price: 159 },
    ],
  },
  {
    id: "deep-tissue",
    name: "Deep Tissue Massage",
    category: "Therapeutic",
    description: "Focused pressure to target chronic tension and knots.",
    durations: [
      { label: "60 min", minutes: 60, price: 119 },
      { label: "90 min", minutes: 90, price: 155 },
      { label: "120 min", minutes: 120, price: 189 },
    ],
  },
  {
    id: "thai",
    name: "Thai Massage",
    category: "Therapeutic",
    description: "Traditional Thai stretching and pressure techniques.",
    durations: [
      { label: "60 min", minutes: 60, price: 109 },
      { label: "90 min", minutes: 90, price: 139 },
      { label: "120 min", minutes: 120, price: 169 },
    ],
  },
  {
    id: "combination",
    name: "Combination Massage",
    category: "Therapeutic",
    description: "Personalized fusion of techniques for balanced relief.",
    durations: [
      { label: "60 min", minutes: 60, price: 109 },
      { label: "90 min", minutes: 90, price: 139 },
      { label: "120 min", minutes: 120, price: 169 },
    ],
  },
  {
    id: "foot-reflexology",
    name: "Foot Reflexology Massage",
    category: "Specialty",
    description: "Targeted foot therapy to stimulate relaxation across the body.",
    durations: [
      { label: "20 min", minutes: 20, price: 39 },
      { label: "30 min", minutes: 30, price: 55 },
    ],
  },
  {
    id: "neck-shoulder",
    name: "Neck & Shoulder Massage",
    category: "Specialty",
    description: "Focused relief for desk tension and postural stress.",
    durations: [
      { label: "20 min", minutes: 20, price: 39 },
      { label: "30 min", minutes: 30, price: 55 },
    ],
  },
  {
    id: "classic",
    name: "Classic Massage",
    category: "Relaxation",
    description: "Timeless full-body massage for overall wellbeing.",
    durations: [
      { label: "60 min", minutes: 60, price: 99 },
      { label: "90 min", minutes: 90, price: 129 },
      { label: "120 min", minutes: 120, price: 159 },
    ],
  },
  {
    id: "face-mask",
    name: "Body Massage with Face Mask",
    category: "Relaxation",
    description: "Luxurious body massage followed by a soothing face mask.",
    durations: [
      { label: "60 min", minutes: 60, price: 119 },
      { label: "90 min", minutes: 90, price: 149 },
      { label: "120 min", minutes: 120, price: 179 },
    ],
  },
  {
    id: "thai-packages",
    name: "Auckland Thai Packages (A & B)",
    category: "Package",
    description: "Exclusive Thai combinations for deep relaxation and vitality.",
    durations: [
      { label: "90-120 min", minutes: 120, price: 199 },
    ],
  },
];

const DURATION_OPTIONS = ["All", "20-30", "60", "90", "120"] as const;

type DurationFilter = typeof DURATION_OPTIONS[number];

function matchesDuration(service: Service, filter: DurationFilter) {
  if (filter === "All") return true;
  if (filter === "20-30") return service.durations.some((d) => d.minutes <= 30);
  const v = parseInt(filter, 10);
  return service.durations.some((d) => d.minutes === v);
}

const BookingDialog = ({ service }: { service: Service }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("10:00");
  const [duration, setDuration] = useState(service.durations[0]);
  const [step, setStep] = useState<'booking' | 'customer' | 'payment' | 'confirmation'>('booking');
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const handleBookingSubmit = () => {
    if (!date || !time || !duration) {
      toast({
        title: "Missing information",
        description: "Please select date, time and duration.",
        variant: "destructive"
      });
      return;
    }
    setStep('customer');
  };

  const handleCustomerSubmit = () => {
    if (!customerData.name || !customerData.email || !customerData.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all customer details.",
        variant: "destructive"
      });
      return;
    }
    setStep('payment');
  };

  const handlePaymentSubmit = () => {
    if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.cardholderName) {
      toast({
        title: "Missing information",
        description: "Please fill in all payment details.",
        variant: "destructive"
      });
      return;
    }
    setStep('confirmation');
  };

  const resetBooking = () => {
    setStep('booking');
    setDate(undefined);
    setTime("10:00");
    setDuration(service.durations[0]);
    setCustomerData({ name: '', email: '', phone: '' });
    setPaymentData({ cardNumber: '', expiryDate: '', cvv: '', cardholderName: '' });
  };

  const closeDialog = () => {
    setOpen(false);
    resetBooking();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="cta" 
          aria-label={`Book ${service.name}`}
          className="touch-target mobile-transition w-full sm:w-auto"
        >
          Book Now
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            {step === 'booking' && `Book ${service.name}`}
            {step === 'customer' && 'Customer Information'}
            {step === 'payment' && 'Payment Details'}
            {step === 'confirmation' && 'Booking Confirmed'}
          </DialogTitle>
        </DialogHeader>

        {/* Step 1: Booking Details */}
        {step === 'booking' && (
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start touch-target">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Time</label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger aria-label="Select a time" className="touch-target">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {["10:00", "11:30", "13:00", "15:00", "17:30"].map((t) => (
                      <SelectItem key={t} value={t}>
                        <div className="flex items-center gap-2">
                          <Clock3 className="h-4 w-4" /> {t}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Duration</label>
              <Select value={duration.label} onValueChange={(val) => setDuration(service.durations.find((d) => d.label === val) || service.durations[0])}>
                <SelectTrigger aria-label="Select duration" className="touch-target">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {service.durations.map((d) => (
                    <SelectItem key={d.label} value={d.label}>{d.label} — NZD ${d.price}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2">
              <Button variant="ghost" onClick={closeDialog} className="touch-target mobile-transition">Cancel</Button>
              <Button variant="cta" onClick={handleBookingSubmit} className="touch-target mobile-transition">Continue</Button>
            </div>
          </div>
        )}

        {/* Step 2: Customer Information */}
        {step === 'customer' && (
          <div className="grid gap-4">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  value={customerData.name}
                  onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={customerData.email}
                  onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Phone Number</label>
                <input
                  type="tel"
                  value={customerData.phone}
                  onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-2 pt-2">
              <Button variant="outline" onClick={() => setStep('booking')} className="touch-target mobile-transition">Back</Button>
              <Button variant="ghost" onClick={closeDialog} className="touch-target mobile-transition">Cancel</Button>
              <Button variant="cta" onClick={handleCustomerSubmit} className="touch-target mobile-transition">Continue to Payment</Button>
            </div>
          </div>
        )}

        {/* Step 3: Payment Details */}
        {step === 'payment' && (
          <div className="grid gap-4">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Card Number</label>
                <input
                  type="text"
                  value={paymentData.cardNumber}
                  onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">Expiry Date</label>
                  <input
                    type="text"
                    value={paymentData.expiryDate}
                    onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">CVV</label>
                  <input
                    type="text"
                    value={paymentData.cvv}
                    onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Cardholder Name</label>
                <input
                  type="text"
                  value={paymentData.cardholderName}
                  onChange={(e) => setPaymentData({...paymentData, cardholderName: e.target.value})}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="Name on card"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-2 pt-2">
              <Button variant="outline" onClick={() => setStep('customer')} className="touch-target mobile-transition">Back</Button>
              <Button variant="ghost" onClick={closeDialog} className="touch-target mobile-transition">Cancel</Button>
              <Button variant="cta" onClick={handlePaymentSubmit} className="touch-target mobile-transition">Complete Payment</Button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 'confirmation' && (
          <div className="grid gap-4 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-green-600">Thank you!</h3>
              <p className="text-muted-foreground">
                We have sent a booking confirmation email to your email address.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg text-sm">
                <p><strong>Service:</strong> {service.name}</p>
                <p><strong>Date:</strong> {date ? format(date, "PPP") : ""}</p>
                <p><strong>Time:</strong> {time}</p>
                <p><strong>Duration:</strong> {duration.label}</p>
                <p><strong>Customer:</strong> {customerData.name}</p>
              </div>
            </div>

            <div className="flex justify-center gap-2 pt-2">
              <Button variant="ghost" onClick={closeDialog} className="touch-target mobile-transition">Close</Button>
              <Button variant="cta" onClick={resetBooking} className="touch-target mobile-transition">Book Another Service</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const ServicesGrid = () => {
  const [category, setCategory] = useState<string>("All");
  const [durationFilter, setDurationFilter] = useState<DurationFilter>("All");
  const [maxPrice, setMaxPrice] = useState(220);
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => ["All", ...Array.from(new Set(SERVICES.map((s) => s.category)))], []);

  const filtered = useMemo(() => {
    return SERVICES.filter((s) => (category === "All" || s.category === category))
      .filter((s) => matchesDuration(s, durationFilter))
      .filter((s) => s.durations.some((d) => d.price <= maxPrice));
  }, [category, durationFilter, maxPrice]);

  return (
    <section id="services" className="py-8 md:py-14">
      <div className="container mx-auto px-4">
        <header className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-display">Our Services</h2>
            <p className="text-muted-foreground">Explore our range of premium treatments.</p>
          </div>
          
          {/* Mobile filter toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden touch-target mobile-transition flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </header>

        {/* Mobile filters */}
        <div className={cn(
          "mb-6 md:mb-8 grid gap-4 transition-all duration-300 ease-in-out",
          showFilters ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 md:grid-rows-[1fr] md:opacity-100"
        )}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label className="mb-2 block text-sm font-medium">Type</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger aria-label="Filter by type" className="touch-target">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Duration</label>
              <Select value={durationFilter} onValueChange={(v: DurationFilter) => setDurationFilter(v)}>
                <SelectTrigger aria-label="Filter by duration" className="touch-target">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  {DURATION_OPTIONS.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2 lg:col-span-2">
                              <label className="mb-2 block text-sm font-medium">Max Price: NZD ${maxPrice}</label>
              <Slider 
                value={[maxPrice]} 
                max={220} 
                min={39} 
                step={1} 
                onValueChange={(v) => setMaxPrice(v[0] ?? 220)}
                className="touch-target"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mobile-grid">
          {filtered.map((s) => (
            <Card key={s.id} className="hover:shadow-lg transition-shadow mobile-transition flex flex-col h-full">
              <ServiceImage serviceType={s.category} serviceName={s.name} />
              <CardHeader className="pb-3">
                <CardTitle className="text-lg sm:text-xl leading-tight break-words">{s.name}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 pb-3 flex-1">
                <p className="text-sm text-muted-foreground leading-relaxed break-words">{s.description}</p>
                <ul className="text-sm space-y-1">
                  {s.durations.map((d) => (
                    <li key={d.label} className="flex justify-between items-center">
                      <span className="break-words">{d.label}</span>
                      <span className="font-medium">NZD ${d.price}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-0 mt-auto">
                <span className="text-sm opacity-80 bg-muted/50 px-2 py-1 rounded-md break-words">{s.category}</span>
                <BookingDialog service={s} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
