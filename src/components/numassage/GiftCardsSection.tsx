import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const GiftCardsSection = () => {
  const addToCart = () => toast({ title: "Gift card added", description: "$100 Gift Card in your cart." });

  return (
    <section id="gift-cards" className="py-14 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="mb-6 md:mb-8">
          <h2 className="text-3xl font-display">Gift Cards</h2>
          <p className="text-muted-foreground">Share wellness with friends and family.</p>
        </div>
        <Card className="max-w-3xl">
          <CardHeader>
            <CardTitle>Numasage Gift Card</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-6 items-center md:items-end justify-between">
            <p className="text-muted-foreground flex-1">
              Beautifully presented digital gift card usable for any service. Perfect for birthdays,
              celebrations, or a thoughtful "just because".
            </p>
            <div className="flex items-center gap-3">
              <span className="font-medium">$100</span>
              <Button variant="cta" onClick={addToCart} aria-label="Add $100 gift card to cart">Add to Cart</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GiftCardsSection;
