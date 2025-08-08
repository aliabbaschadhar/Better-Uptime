'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AnimatedGlobe } from '@/components/ui/animated-globe';
import { GlitterEffect } from '@/components/ui/glitter-effect';
import { ArrowRight, Shield } from 'lucide-react';

export default function Hero() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 bg-gradient-to-br from-background via-secondary/20 to-background overflow-hidden">
      {/* Glitter Effect */}
      {!reducedMotion && (
        <GlitterEffect 
          theme="dark" 
          intensity="medium" 
        />
      )}
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(241,26,123,0.1),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(152,33,118,0.1),_transparent_50%)]" />
      
      {/* Floating Elements */}
      {!reducedMotion && (
        <>
          <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse-subtle" />
          <div className="absolute top-40 right-20 w-1 h-1 bg-highlight rounded-full animate-pulse-subtle" />
          <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-secondary rounded-full animate-pulse-subtle" />
        </>
      )}
      
      <div className="container mx-auto max-w-6xl text-center relative z-10">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 bg-highlight/10 border-highlight/20 text-highlight rounded-full px-3 sm:px-4 py-2 mb-6 sm:mb-8 backdrop-blur-sm transition-all duration-300 hover:bg-highlight/15 hover:scale-105">
          <Shield className="w-4 h-4" />
          <span className="text-xs sm:text-sm font-medium">Trusted by 10,000+ websites</span>
        </div>

        {/* Animated Globe */}
        <div className="mb-6 sm:mb-8">
          <AnimatedGlobe theme="dark" />
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 sm:mb-8 transition-all duration-500 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
          Always Up.
          <br />
          <span className="bg-gradient-primary bg-clip-text text-transparent">Globally.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed transition-colors duration-500 px-4">
          Real-time website monitoring from every corner of the world.
          <br className="hidden sm:block" />
          Know the moment anything goes wrong, anywhere.
        </p>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-16 px-4">
          <Button 
            size="lg" 
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
          >
            Start Monitoring Free
            <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
          >
            Watch Demo
          </Button>
        </div>

        {/* Visual Element */}
        <div className="relative mx-auto max-w-4xl px-4">
          <div className="bg-gradient-to-r from-secondary/20 to-primary/20 border-white/10 shadow-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 backdrop-blur-sm transition-all duration-500 hover:shadow-3xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-5 sm:w-6 h-5 sm:h-6 text-highlight animate-pulse-subtle">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <span className="text-base sm:text-lg font-semibold text-white">Global Status</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs sm:text-sm text-white/70">All systems operational</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {[
                { region: 'US East', status: 'up', latency: '23ms' },
                { region: 'EU West', status: 'up', latency: '41ms' },
                { region: 'Asia Pacific', status: 'up', latency: '67ms' },
                { region: 'Australia', status: 'up', latency: '89ms' },
              ].map((region) => (
                <div key={region.region} className="bg-white/5 border-white/10 hover:bg-white/10 rounded-xl p-3 sm:p-4 text-center transition-all duration-300 hover:scale-105">
                  <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mb-2 animate-pulse" />
                  <div className="text-xs sm:text-sm font-medium mb-1 text-white">{region.region}</div>
                  <div className="text-xs text-white/70">{region.latency}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}