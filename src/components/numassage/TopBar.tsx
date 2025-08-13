import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const TopBar = () => {
  return (
    <div className="w-full bg-secondary text-secondary-foreground">
      <div className="container mx-auto flex items-center justify-between py-2 px-4 text-sm">
        <p className="opacity-90">Your Journey to Wellness Starts Here</p>
        <div className="flex items-center gap-3">
          <a href="tel:+640000000" className="flex items-center gap-1 hover:underline" aria-label="Call Numasage">
            <Phone className="h-4 w-4" />
            <span>+64 000 0000</span>
          </a>
          <Button variant="cta" size="sm" asChild>
            <a href="#booking" aria-label="Book Now">Book Now</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
