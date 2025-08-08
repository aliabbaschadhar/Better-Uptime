'use client';

import { Check, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Free',
    price: '0',
    period: 'forever',
    description: 'Perfect for personal projects',
    icon: Zap,
    features: [
      '1 website monitor',
      '5-minute check intervals',
      'Email alerts',
      'Basic uptime graphs',
      '30-day data retention',
      'Community support',
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '19',
    period: 'per month',
    description: 'For growing businesses',
    icon: Crown,
    features: [
      '10 website monitors',
      '1-minute check intervals',
      'Email, SMS, Slack alerts',
      'Advanced performance graphs',
      '1-year data retention',
      'SSL certificate monitoring',
      'API access',
      'Priority support',
    ],
    cta: 'Start Pro Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    description: 'For large organizations',
    icon: Crown,
    features: [
      'Unlimited monitors',
      '30-second check intervals',
      'All alert channels + custom',
      'Custom dashboards & reports',
      'Unlimited data retention',
      'White-label options',
      'SLA guarantees',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6 transition-all duration-300 hover:bg-primary/15 hover:scale-105">
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">Simple Pricing</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Start free. Scale as you grow.
          </h2>
          
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto px-4">
            No hidden fees. No surprises. 
            <br className="hidden sm:block" />
            Just transparent pricing that scales with your needs.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`relative bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm border transition-all duration-300 hover:scale-105 hover:shadow-xl group animate-fade-in ${
                plan.popular 
                  ? 'border-primary shadow-2xl shadow-primary/20 lg:scale-105' 
                  : 'border-white/10 hover:bg-white/15'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-primary text-white px-4 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                  <plan.icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-white/60 text-xs sm:text-sm mb-4 sm:mb-6">{plan.description}</p>
                
                <div className="mb-4 sm:mb-6">
                  {plan.price === 'Custom' ? (
                    <div className="text-2xl sm:text-3xl font-bold text-primary">{plan.price}</div>
                  ) : (
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl sm:text-4xl font-bold text-primary">${plan.price}</span>
                      <span className="text-white/60 text-xs sm:text-sm">/{plan.period}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={feature} className="flex items-center gap-3">
                    <Check className="w-4 sm:w-5 h-4 sm:h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-200" style={{ transitionDelay: `${featureIndex * 50}ms` }} />
                    <span className="text-white/80 text-sm sm:text-base">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button 
                className={`w-full py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl hover:shadow-primary/30'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                {plan.cta}
              </Button>

              {plan.name === 'Free' && (
                <p className="text-center text-xs text-white/60 mt-3 sm:mt-4">
                  No credit card required
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-highlight/10 to-secondary/10 rounded-2xl p-4 sm:p-6 backdrop-blur-sm border border-highlight/20 hover:bg-gradient-to-r hover:from-highlight/15 hover:to-secondary/15 transition-all duration-300">
            <p className="text-white/70 mb-2 text-sm sm:text-base">
              <span className="text-highlight font-semibold">30-day money-back guarantee</span> on all paid plans
            </p>
            <p className="text-xs sm:text-sm text-white/60">
              Questions about pricing? <button className="text-primary hover:underline font-medium transition-colors duration-200">Contact our team</button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}