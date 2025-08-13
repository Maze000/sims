import aboutImage from "@/assets/numassage/spa-interior.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-8 md:py-14 bg-gradient-pink-light/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          <div className="overflow-hidden rounded-lg shadow-lg order-2 lg:order-1">
            <img
              src={aboutImage}
              alt="Elegant Numassage spa interior with massage table and plants"
              className="w-full h-full object-cover hover:scale-[1.02] transition-transform mobile-transition-transform"
              loading="lazy"
            />
          </div>
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-display mb-3 text-orange-vibrant leading-tight">
              About Numassage at Home
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              At Numassage at Home, we believe in holistic care that harmonizes body and mind. Our
              certified therapists combine time-honored techniques with modern knowledge to
              deliver deeply restorative treatments in your own space.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From personalized consultations to premium oils and comfortable home environments, every detail is
              designed to help you relax, heal, and rebalance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
