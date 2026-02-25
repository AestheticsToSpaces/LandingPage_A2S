import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SocialProofSection from '@/components/SocialProofSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import PromptToRoomDemo from '@/components/PromptToRoomDemo';
import ProductDemoSection from '@/components/ProductDemoSection';
import BreakdownDemo from '@/components/BreakdownDemo';
import MarketSection from '@/components/MarketSection';
import VisionSection from '@/components/VisionSection';
import WaitlistSection from '@/components/WaitlistSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { ParallaxFloat } from '@/components/ParallaxSection';

const Index = () => {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden relative">
      {/* Parallax background decorations */}
      <ParallaxFloat speed={0.3} className="top-[800px] left-10 w-72 h-72 -z-10">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl" />
      </ParallaxFloat>
      <ParallaxFloat speed={-0.2} className="top-[1500px] right-10 w-96 h-96 -z-10">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-copper/5 to-transparent blur-3xl" />
      </ParallaxFloat>
      <ParallaxFloat speed={0.4} className="top-[2500px] left-1/4 w-80 h-80 -z-10">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-teal-light/5 to-transparent blur-3xl" />
      </ParallaxFloat>
      <ParallaxFloat speed={-0.3} className="top-[3500px] right-1/4 w-64 h-64 -z-10">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl" />
      </ParallaxFloat>
      <ParallaxFloat speed={0.25} className="top-[4500px] left-20 w-96 h-96 -z-10">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-copper/5 to-transparent blur-3xl" />
      </ParallaxFloat>

      <Navbar />
      <HeroSection />
      <SocialProofSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PromptToRoomDemo />
      <ProductDemoSection />
      <BreakdownDemo />
      <MarketSection />
      <VisionSection />
      <WaitlistSection />
      <FAQSection />
      <Footer />
      <BackToTop />
    </main>
  );
};

export default Index;
