import HeroSection from "@/components/HeroSection";
import WhyNonploSection from "@/components/WhyNonploSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WhyNonploSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
    </div>
  );
};

export default Index;
