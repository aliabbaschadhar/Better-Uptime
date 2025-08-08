'use client';

import { Zap, Bell, BarChart3, Globe, Shield, Timer } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Real-time Monitoring',
    description: 'Monitor your websites every 30 seconds from multiple global locations. Get instant visibility into performance issues before your users do.',
    highlight: 'sub-second alerts',
  },
  {
    icon: Globe,
    title: 'Global Uptime Tracking',
    description: 'Track uptime performance across 8 strategic locations worldwide. Understand how your site performs for users everywhere.',
    highlight: '8 global regions',
  },
  {
    icon: Bell,
    title: 'Instant Alerts',
    description: 'Receive notifications via email, SMS, Slack, or webhook the moment something goes wrong. Never miss a critical issue again.',
    highlight: 'multi-channel alerts',
  },
  {
    icon: BarChart3,
    title: 'Clean Performance Graphs',
    description: 'Beautiful, simple visualizations that make complex data easy to understand. Track trends and identify patterns at a glance.',
    highlight: 'crystal clear insights',
  },
  {
    icon: Shield,
    title: 'SSL Monitoring',
    description: 'Monitor SSL certificate expiration and get alerted before certificates expire. Keep your security credentials up to date.',
    highlight: '90-day early warning',
  },
  {
    icon: Timer,
    title: 'Response Time Tracking',
    description: 'Track response times from multiple locations and get detailed performance metrics to optimize your site speed.',
    highlight: 'millisecond precision',
  },
];

export default function Features() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-background to-secondary/5">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6 transition-all duration-300 hover:bg-secondary/25 hover:scale-105">
            <BarChart3 className="w-4 h-4 text-secondary" />
            <span className="text-xs sm:text-sm font-medium text-secondary">Core Features</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Everything you need.
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">Nothing you don't.</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto px-4">
            Powerful monitoring tools designed for simplicity.
            Get comprehensive insights without the complexity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                <feature.icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
              </div>

              {/* Content */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  {feature.description}
                </p>

                {/* Highlight */}
                <div className="inline-flex items-center gap-2 bg-highlight/10 border border-highlight/20 rounded-full px-3 py-1 group-hover:bg-highlight/15 transition-all duration-300">
                  <div className="w-2 h-2 bg-highlight rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-highlight">{feature.highlight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-white/10 hover:bg-gradient-to-r hover:from-primary/15 hover:to-secondary/15 transition-all duration-300">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ready to monitor like a pro?</h3>
            <p className="text-white/70 mb-4 sm:mb-6 text-sm sm:text-base">Start with our free tier and upgrade as you grow.</p>
            <button className="bg-gradient-primary text-white px-6 sm:px-8 py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}