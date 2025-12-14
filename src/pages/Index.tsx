import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { UseCasesSection } from '@/components/sections/UseCasesSection';
import { SecurityTeaserSection } from '@/components/sections/SecurityTeaserSection';
import { FinalCTASection } from '@/components/sections/FinalCTASection';

const Index = () => {
  console.log('🏠 [HomePage] Component mounted', {
    timestamp: new Date().toISOString(),
    path: window.location.pathname,
    userAgent: navigator.userAgent
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <UseCasesSection />
        <SecurityTeaserSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
