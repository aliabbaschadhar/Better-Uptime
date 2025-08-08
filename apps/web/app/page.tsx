import Hero from '@/components/sections/Hero';
import GraphSection from '@/components/sections/GraphSection';
import RegionMonitoring from '@/components/sections/RegionMonitoring';
import Features from '@/components/sections/Features';
import Trust from '@/components/sections/Trust';
import Pricing from '@/components/sections/Pricing';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <GraphSection />
      <RegionMonitoring />
      <Features />
      <Trust />
      <Pricing />
      <Footer />
    </main>
  );
}