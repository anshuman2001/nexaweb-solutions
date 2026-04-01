import HeroSection from '@/components/home/HeroSection';
import StatsBar from '@/components/home/StatsBar';
import AIAgentsSection from '@/components/home/AIAgentsSection';
import WebsiteServicesSection from '@/components/home/WebsiteServicesSection';
import HowItWorks from '@/components/home/HowItWorks';
import PortfolioSection from '@/components/home/PortfolioSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PricingSection from '@/components/home/PricingSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';
import LiveDemoWidget from '@/components/home/LiveDemoWidget';
import DemoPopup from '@/components/home/DemoPopup';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <AIAgentsSection />
      <WebsiteServicesSection />
      <HowItWorks />
      <PortfolioSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <LiveDemoWidget />
      <DemoPopup />
    </>
  );
}
