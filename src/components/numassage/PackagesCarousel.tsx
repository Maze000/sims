import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const packages = [
  { id: "lux-1", title: "Seasonal Glow Package", desc: "Body massage + face mask + aromatherapy.", price: 189 },
  { id: "duo-1", title: "Couple's Serenity", desc: "Side-by-side relaxation massage.", price: 249 },
  { id: "royal-1", title: "Royal Revive", desc: "Thai stretch + deep tissue focus.", price: 209 },
];

const PackagesCarousel = () => {
  return (
    <section id="packages" className="py-8 md:py-14 bg-gradient-yellow-orange/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 md:mb-8 text-center sm:text-left">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl sm:text-3xl font-display mb-2">Special Packages</h2>
            <p className="text-muted-foreground">Limited-time offers and luxury combinations.</p>
          </div>
        </div>
        <div className="relative">
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {packages.map((p) => (
                <CarouselItem key={p.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
                  <Card className="h-full mobile-transition">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg sm:text-xl leading-tight break-words">{p.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <p className="text-sm text-muted-foreground leading-relaxed break-words">{p.desc}</p>
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        <span className="font-medium text-lg">NZD ${p.price}</span>
                        <Button 
                          variant="gold" 
                          className="w-full sm:w-auto touch-target mobile-transition"
                        >
                          View Package
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex touch-target" />
            <CarouselNext className="hidden sm:flex touch-target" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default PackagesCarousel;
