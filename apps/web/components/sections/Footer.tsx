'use client';

import { Heart, Mail, Twitter, Github, Linkedin } from 'lucide-react';

const footerLinks = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'API Documentation', href: '#' },
    { name: 'Integrations', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: '#' },
  ],
  support: [
    { name: 'Help Center', href: '#' },
    { name: 'Status Page', href: '#' },
    { name: 'Community', href: '#' },
    { name: 'System Status', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'GDPR', href: '#' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', name: 'Twitter' },
  { icon: Github, href: '#', name: 'GitHub' },
  { icon: Linkedin, href: '#', name: 'LinkedIn' },
  { icon: Mail, href: 'mailto:hello@better-uptime.com', name: 'Email' },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-secondary/20 border-t border-white/10">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand Section - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg" />
              <span className="text-xl sm:text-2xl font-bold text-white">Better-Uptime</span>
            </div>
            
            <p className="text-white/70 mb-4 sm:mb-6 max-w-md leading-relaxed text-sm sm:text-base">
              Real-time website monitoring from every corner of the world. 
              Keep your users happy with reliable uptime tracking and instant alerts.
            </p>
            
            <div className="flex items-center gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  className="w-9 sm:w-10 h-9 sm:h-10 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-300 group hover:scale-110"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 sm:w-5 h-4 sm:h-5 text-white/70 group-hover:text-white transition-colors duration-200" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections - Each takes 1 column */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Product</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-white/70 hover:text-primary transition-colors duration-200 text-sm sm:text-base hover:translate-x-1 inline-block transform transition-transform"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-white/70 hover:text-primary transition-colors duration-200 text-sm sm:text-base hover:translate-x-1 inline-block transform transition-transform"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-white/70 hover:text-primary transition-colors duration-200 text-sm sm:text-base hover:translate-x-1 inline-block transform transition-transform"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Legal</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-white/70 hover:text-primary transition-colors duration-200 text-sm sm:text-base hover:translate-x-1 inline-block transform transition-transform"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
            {/* Copyright & Love */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-white/60 text-sm text-center sm:text-left">
              <div className="flex items-center gap-2">
                <span>Built by Better-Uptime with</span>
                <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" />
              </div>
              <span className="hidden sm:inline text-white/40">•</span>
              <span>© 2024 Better-Uptime. All rights reserved.</span>
            </div>

            {/* Legal Links - Mobile: Stack, Desktop: Horizontal */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm">
              {footerLinks.legal.map((link, index) => (
                <div key={link.name} className="flex items-center gap-3 sm:gap-6">
                  <a 
                    href={link.href}
                    className="text-white/60 hover:text-primary transition-colors duration-200 hover:underline"
                  >
                    {link.name}
                  </a>
                  {index < footerLinks.legal.length - 1 && (
                    <span className="text-white/30 hidden sm:inline">•</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Status Badge */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-2 bg-green-400/10 border border-green-400/20 rounded-full px-3 sm:px-4 py-2 hover:bg-green-400/15 transition-all duration-300 hover:scale-105">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm text-green-400 font-medium">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}