import { useMemo, useState } from "react";
import serviceImage from "@/assets/numassage/service-hot-stone.jpg";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Clock3 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("10:00");
  const [duration, setDuration] = useState(service.durations[0]);

  const submit = () => {
    toast({
      title: "Booking reserved",
      description: `${service.name} on ${date ? format(date, "PPP") : "(select date)"} at ${time} for ${duration.label}.`,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="cta" aria-label={`Book ${service.name}`}>Book Now</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book {service.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
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
              <label className="mb-2 block text-sm">Time</label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger aria-label="Select a time">
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
            <label className="mb-2 block text-sm">Duration</label>
            <Select value={duration.label} onValueChange={(val) => setDuration(service.durations.find((d) => d.label === val) || service.durations[0])}>
              <SelectTrigger aria-label="Select duration">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {service.durations.map((d) => (
                  <SelectItem key={d.label} value={d.label}>{d.label} — ${d.price}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="ghost">Cancel</Button>
            <Button variant="cta" onClick={submit}>Confirm</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ServicesGrid = () => {
  const [category, setCategory] = useState<string>("All");
  const [durationFilter, setDurationFilter] = useState<DurationFilter>("All");
  const [maxPrice, setMaxPrice] = useState(220);

  const categories = useMemo(() => ["All", ...Array.from(new Set(SERVICES.map((s) => s.category)))], []);

  const filtered = useMemo(() => {
    return SERVICES.filter((s) => (category === "All" || s.category === category))
      .filter((s) => matchesDuration(s, durationFilter))
      .filter((s) => s.durations.some((d) => d.price <= maxPrice));
  }, [category, durationFilter, maxPrice]);

  return (
    <section id="services" className="py-14">
      <div className="container mx-auto px-4">
        <header className="mb-6 md:mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-display">Our Services</h2>
            <p className="text-muted-foreground">Explore our range of premium treatments.</p>
          </div>
        </header>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="mb-2 block text-sm">Type</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger aria-label="Filter by type">
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
            <label className="mb-2 block text-sm">Duration</label>
            <Select value={durationFilter} onValueChange={(v: DurationFilter) => setDurationFilter(v)}>
              <SelectTrigger aria-label="Filter by duration">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                {DURATION_OPTIONS.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm">Max Price: ${maxPrice}</label>
            <Slider value={[maxPrice]} max={220} min={39} step={1} onValueChange={(v) => setMaxPrice(v[0] ?? 220)} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s) => (
            <Card key={s.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img src={serviceImage} alt={`${s.name} service`} className="h-44 w-full object-cover" loading="lazy" />
              <CardHeader>
                <CardTitle className="text-xl">{s.name}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <p className="text-sm text-muted-foreground">{s.description}</p>
                <ul className="text-sm">
                  {s.durations.map((d) => (
                    <li key={d.label}>{d.label} — ${d.price}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <span className="text-sm opacity-80">{s.category}</span>
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
