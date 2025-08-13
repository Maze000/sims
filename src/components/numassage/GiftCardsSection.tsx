import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const GiftCardsSection = () => {
  const addToCart = () => toast({ title: "Gift card added", description: "NZD $100 Gift Card in your cart." });

  return (
    <section id="gift-cards" className="py-8 md:py-14 bg-gradient-orange-pink/10">
      <div className="container mx-auto px-4">
        <div className="mb-6 md:mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-display text-orange-vibrant mb-2">Gift Cards</h2>
          <p className="text-muted-foreground">Share wellness with friends and family.</p>
        </div>
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-xl sm:text-2xl">Numassage at Home Gift Card</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-6 items-center md:items-end justify-between">
            <p className="text-muted-foreground flex-1 text-center md:text-left leading-relaxed">
              Beautifully presented digital gift card usable for any service. Perfect for birthdays,
              celebrations, or a thoughtful "just because".
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                              <span className="font-medium text-lg">NZD $100</span>
              <Button 
                variant="cta" 
                onClick={addToCart} 
                                  aria-label="Add NZD $100 gift card to cart"
                className="w-full sm:w-auto touch-target mobile-transition"
              >
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GiftCardsSection;
