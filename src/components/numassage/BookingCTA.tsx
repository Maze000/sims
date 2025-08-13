import { Button } from "@/components/ui/button";

const BookingCTA = () => {
  return (
    <section id="booking" className="py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-display mb-3">Ready to unwind?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Schedule your massage and step into a calmer you.
        </p>
        <Button 
          variant="cta" 
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
          Schedule Your Massage
        </Button>
      </div>
    </section>
  );
};

export default BookingCTA;
