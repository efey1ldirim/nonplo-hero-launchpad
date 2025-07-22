import HeroSection from "@/components/HeroSection";
import WhyNonploSection from "@/components/WhyNonploSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import PricingSection from "@/components/PricingSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WhyNonploSection />
      <FeaturesSection />
      <TestimonialsSection />
      <FAQSection />
      <PricingSection />
      <ContactSection />
    </div>
  );
};

export default Index;
