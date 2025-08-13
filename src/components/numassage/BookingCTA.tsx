import { Button } from "@/components/ui/button";

const BookingCTA = () => {
  return (
    <section id="booking" className="py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-display mb-3">Ready to unwind?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Schedule your massage and step into a calmer you.
        </p>
        <Button variant="cta" size="xl" asChild>
          <a href="#services" aria-label="Schedule your massage">Schedule Your Massage</a>
        </Button>
      </div>
    </section>
  );
};

export default BookingCTA;
