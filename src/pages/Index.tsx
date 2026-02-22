import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SocialProofSection from '@/components/SocialProofSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import ProductDemoSection from '@/components/ProductDemoSection';
import MarketSection from '@/components/MarketSection';
import VisionSection from '@/components/VisionSection';
import WaitlistSection from '@/components/WaitlistSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <SocialProofSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ProductDemoSection />
      <MarketSection />
      <VisionSection />
      <WaitlistSection />
      <Footer />
    </main>
  );
};

export default Index;
