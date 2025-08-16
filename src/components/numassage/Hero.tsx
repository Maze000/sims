import heroImage from "@/assets/numassage/hero.png";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="relative">
      <div className="relative h-[78vh] md:h-[91vh] w-full rounded-none">
        <img
          src={heroImage}
          alt="Serene spa atmosphere with massage table, candles, and plants"
          className="h-full w-full object-cover scale-110"
          loading="eager"
        />
                 <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-pink-vibrant/50 to-orange-vibrant/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl animate-enter">
                             <h1 className="text-3xl sm:text-4xl md:text-6xl font-display mb-4 md:mb-6 leading-tight bg-gradient-to-r from-pink-500/40 to-orange-500/40 backdrop-blur-sm px-8 py-4 rounded-3xl inline-block border border-white/20 shadow-2xl">
                 Relax. Heal. Rebalance.
               </h1>
                             <p className="text-base sm:text-lg md:text-xl text-white mb-6 md:mb-8 leading-relaxed bg-orange-500/30 backdrop-blur-sm px-6 py-3 rounded-2xl inline-block">
                 Therapeutic massages at home, tailored to your needs.
               </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
                                 <Button 
                   variant="cta" 
                   size="xl" 
                   className="w-full sm:w-auto touch-target mobile-transition"
                                       onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector('#booking') as HTMLElement;
                      if (element) {
                        const headerHeight = 80; // Height of fixed header
                        const elementPosition = element.offsetTop - headerHeight;
                        window.scrollTo({
                          top: elementPosition,
                          behavior: 'smooth',
                          left: 0 // Ensure no horizontal movement
                        });
                      }
                    }}
                 >
                   Book Now
                 </Button>
                                 <Button 
                   variant="gold" 
                   size="xl" 
                   className="w-full sm:w-auto touch-target mobile-transition"
                                       onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector('#services') as HTMLElement;
                      if (element) {
                        const headerHeight = 80; // Height of fixed header
                        const elementPosition = element.offsetTop - headerHeight;
                        window.scrollTo({
                          top: elementPosition,
                          behavior: 'smooth',
                          left: 0 // Ensure no horizontal movement
                        });
                      }
                    }}
                 >
                   Explore Services
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
