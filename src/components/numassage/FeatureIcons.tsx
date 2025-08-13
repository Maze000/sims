import { ShieldCheck, Sparkles, Leaf } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Experienced Therapists",
    desc: "Certified professionals with years of practice. Our therapists have undergone extensive training in various massage techniques and therapeutic approaches. They bring a wealth of knowledge from working with diverse clients and conditions. Each therapist is committed to ongoing education and maintaining the highest standards of care.",
  },
  {
    icon: Sparkles,
    title: "Personalized Treatments",
    desc: "Tailored sessions to your goals and preferences. We begin each session with a thorough consultation to understand your specific needs and health objectives. Our treatments are customized based on your body type, stress levels, and any areas of tension or discomfort. We adapt our techniques throughout the session to ensure maximum effectiveness and comfort.",
  },
  {
    icon: Leaf,
    title: "Home Comfort",
    desc: "Transform your space into a peaceful sanctuary. We bring the spa experience directly to your home with portable massage tables, soft lighting, soothing music, and aromatic essential oils. Our therapists create a tranquil atmosphere in your familiar surroundings, ensuring maximum comfort and relaxation without leaving your home.",
  },
];

const FeatureIcons = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f) => (
          <div key={f.title} className="rounded-lg border bg-card p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/40">
              <f.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureIcons;
