import heroImage from "@/assets/numassage/hero.jpg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="relative">
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden rounded-none">
        <img
          src={heroImage}
          alt="Serene spa atmosphere with massage table, candles, and plants"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl animate-enter">
              <h1 className="text-4xl md:text-6xl font-display mb-4">Relax. Heal. Rebalance.</h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6">
                Luxury therapeutic massages tailored to your needs.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="cta" size="xl" asChild>
                  <a href="#booking" aria-label="Book your massage now">Book Now</a>
                </Button>
                <Button variant="gold" size="xl" asChild>
                  <a href="#services" aria-label="Explore massage services">Explore Services</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
