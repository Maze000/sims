import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Emily R.",
    text: "The best massage experience I've had. Calm, professional, and so rejuvenating!",
  },
  { id: 2, name: "Liam T.", text: "Deep tissue session released months of tension. Highly recommend." },
  { id: 3, name: "Sophie M.", text: "Beautiful spa, friendly staff, and truly luxurious treatments." },
];

const TestimonialsSlider = () => {
  return (
    <section className="py-8 md:py-14" aria-label="Testimonials">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-8 text-center sm:text-left">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl sm:text-3xl font-display text-pink-vibrant mb-2">What Clients Say</h2>
            <p className="text-muted-foreground flex items-center justify-center sm:justify-start gap-2">
              <span className="flex text-yellow-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-gold text-yellow-gold" />
                ))}
              </span>
              4.9/5 overall rating
            </p>
          </div>
        </div>
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {TESTIMONIALS.map((t) => (
              <CarouselItem key={t.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
                <figure className="rounded-lg border bg-card p-4 sm:p-6 shadow-sm mobile-transition">
                  <blockquote className="text-muted-foreground text-sm sm:text-base leading-relaxed">"{t.text}"</blockquote>
                  <figcaption className="mt-4 font-medium text-sm sm:text-base">{t.name}</figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex touch-target" />
          <CarouselNext className="hidden sm:flex touch-target" />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
