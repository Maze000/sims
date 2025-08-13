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
    <section className="py-14" aria-label="Testimonials">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-3xl font-display">What Clients Say</h2>
            <p className="text-muted-foreground flex items-center gap-2">
              <span className="flex text-gold-foreground">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </span>
              4.9/5 overall rating
            </p>
          </div>
        </div>
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {TESTIMONIALS.map((t) => (
              <CarouselItem key={t.id} className="md:basis-1/2 lg:basis-1/3">
                <figure className="rounded-lg border bg-card p-6 shadow-sm">
                  <blockquote className="text-muted-foreground">“{t.text}”</blockquote>
                  <figcaption className="mt-4 font-medium">{t.name}</figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
