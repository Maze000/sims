import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const packages = [
  { id: "lux-1", title: "Seasonal Glow Package", desc: "Body massage + face mask + aromatherapy.", price: 189 },
  { id: "duo-1", title: "Couple’s Serenity", desc: "Side-by-side relaxation massage.", price: 249 },
  { id: "royal-1", title: "Royal Revive", desc: "Thai stretch + deep tissue focus.", price: 209 },
];

const PackagesCarousel = () => {
  return (
    <section id="packages" className="py-14 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-3xl font-display">Special Packages</h2>
            <p className="text-muted-foreground">Limited-time offers and luxury combinations.</p>
          </div>
        </div>
        <div className="relative">
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {packages.map((p) => (
                <CarouselItem key={p.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>{p.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <p className="text-sm text-muted-foreground">{p.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">${p.price}</span>
                        <Button variant="gold">View Package</Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default PackagesCarousel;
