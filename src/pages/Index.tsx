import TopBar from "@/components/numassage/TopBar";
import HeaderNav from "@/components/numassage/HeaderNav";
import Hero from "@/components/numassage/Hero";
import FeatureIcons from "@/components/numassage/FeatureIcons";
import ServicesGrid from "@/components/numassage/ServicesGrid";
import PackagesCarousel from "@/components/numassage/PackagesCarousel";
import AboutSection from "@/components/numassage/AboutSection";
import TestimonialsSlider from "@/components/numassage/TestimonialsSlider";
import GiftCardsSection from "@/components/numassage/GiftCardsSection";
import BookingCTA from "@/components/numassage/BookingCTA";
import Footer from "@/components/numassage/Footer";

const Index = () => {
  return (
    <div>
      <TopBar />
      <HeaderNav />
      <main>
        <Hero />
        <FeatureIcons />
        <ServicesGrid />
        <PackagesCarousel />
        <AboutSection />
        <TestimonialsSlider />
        <GiftCardsSection />
        <BookingCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
