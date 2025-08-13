import { ShieldCheck, Sparkles, Leaf } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Experienced Therapists",
    desc: "Certified professionals with years of practice.",
  },
  {
    icon: Sparkles,
    title: "Personalized Treatments",
    desc: "Tailored sessions to your goals and preferences.",
  },
  {
    icon: Leaf,
    title: "Serene Environment",
    desc: "Calm, clean, and luxurious spa spaces.",
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
