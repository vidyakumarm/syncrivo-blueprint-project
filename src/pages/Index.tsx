import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { HeroSectionNew } from '@/components/sections/HeroSectionNew';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { DemoSection } from '@/components/sections/DemoSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { SupportedPlatformsSection } from '@/components/sections/SupportedPlatformsSection';
import { CTASection } from '@/components/sections/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSectionNew />
        <FeaturesSection />
        <HowItWorksSection />
        <DemoSection />
        <SupportedPlatformsSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
