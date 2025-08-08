'use client';

import { Star, Users, TrendingUp, Award } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO, TechFlow',
    company: 'techflow.com',
    content: 'Better-Uptime saved us from a major outage. The instant alerts and clear graphs make it easy to stay on top of our infrastructure.',
    avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    rating: 5,
  },
  {
    name: 'Marcus Rodriguez',
    role: 'DevOps Lead',
    company: 'cloudscale.io',
    content: 'The global monitoring is game-changing. We can see exactly how our services perform for users in different regions.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    rating: 5,
  },
  {
    name: 'Emma Thompson',
    role: 'Product Manager',
    company: 'streamline.app',
    content: 'Clean, intuitive interface with powerful features. Finally, monitoring that doesn\'t require a PhD to understand.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    rating: 5,
  },
];

const stats = [
  { icon: Users, label: 'Websites Monitored', value: '10,000+' },
  { icon: TrendingUp, label: 'Uptime Guaranteed', value: '99.9%' },
  { icon: Award, label: 'Customer Rating', value: '4.9/5' },
];

const trustedCompanies = ['TechFlow', 'CloudScale', 'Streamline', 'DataPipe', 'NextGen'];

export default function Trust() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-secondary/5 to-secondary/10">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 bg-green-400/10 border border-green-400/20 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6 transition-all duration-300 hover:bg-green-400/15 hover:scale-105">
            <Star className="w-4 h-4 text-green-400" />
            <span className="text-xs sm:text-sm font-medium text-green-400">Trusted Globally</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Loved by developers
          </h2>
          
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto px-4">
            Join thousands of teams who trust Better-Uptime to keep their services running smoothly.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center group transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                <stat.icon className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-2 group-hover:text-primary/90 transition-colors duration-300">{stat.value}</div>
              <div className="text-sm sm:text-base text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name}
              className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl group animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400 fill-yellow-400 group-hover:scale-110 transition-transform duration-200" style={{ transitionDelay: `${i * 50}ms` }} />
                ))}
              </div>

              {/* Content */}
              <p className="text-sm sm:text-base text-white/80 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div>
                  <div className="text-sm sm:text-base font-semibold text-white">{testimonial.name}</div>
                  <div className="text-xs sm:text-sm text-white/60">{testimonial.role}</div>
                  <div className="text-xs text-primary font-medium">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof Banner */}
        <div className="bg-gradient-to-r from-highlight/10 to-primary/10 rounded-2xl p-6 sm:p-8 text-center border border-highlight/20 hover:bg-gradient-to-r hover:from-highlight/15 hover:to-primary/15 transition-all duration-300">
          {/* Trusted by teams section - Mobile responsive */}
          <div className="mb-6">
            <div className="text-sm text-white/70 mb-4">Trusted by teams at:</div>
            
            {/* Mobile: Stack vertically, Desktop: Horizontal */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8">
              {trustedCompanies.map((company, index) => (
                <span 
                  key={company} 
                  className="text-white/50 text-sm font-medium hover:text-white/70 transition-colors duration-200 cursor-default"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-sm text-highlight">
            <Star className="w-4 h-4 fill-current animate-pulse" />
            <span className="font-medium">4.9/5 stars from 500+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}