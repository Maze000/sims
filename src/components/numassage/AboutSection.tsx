import aboutImage from "@/assets/numassage/spa-interior.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-14">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="overflow-hidden rounded-lg shadow-sm">
          <img
            src={aboutImage}
            alt="Elegant Numasage spa interior with massage table and plants"
            className="w-full h-full object-cover hover:scale-[1.02] transition-transform"
            loading="lazy"
          />
        </div>
        <div>
          <h2 className="text-3xl font-display mb-3">About Numasage</h2>
          <p className="text-muted-foreground mb-4">
            At Numasage, we believe in holistic care that harmonizes body and mind. Our
            certified therapists combine time-honored techniques with modern knowledge to
            deliver deeply restorative treatments.
          </p>
          <p className="text-muted-foreground">
            From personalized consultations to premium oils and serene spaces, every detail is
            designed to help you relax, heal, and rebalance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
