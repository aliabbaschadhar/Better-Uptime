'use client';

import { Globe, MapPin, Zap, Activity } from 'lucide-react';

const regions = [
  {
    name: 'US East',
    location: 'Virginia',
    status: 'operational',
    latency: '23ms',
    uptime: '99.98%',
    coords: { x: 25, y: 35 }
  },
  {
    name: 'US West',
    location: 'California',
    status: 'operational',
    latency: '18ms',
    uptime: '99.97%',
    coords: { x: 15, y: 40 }
  },
  {
    name: 'EU West',
    location: 'Ireland',
    status: 'operational',
    latency: '41ms',
    uptime: '99.99%',
    coords: { x: 50, y: 25 }
  },
  {
    name: 'EU Central',
    location: 'Frankfurt',
    status: 'operational',
    latency: '38ms',
    uptime: '99.96%',
    coords: { x: 55, y: 28 }
  },
  {
    name: 'Asia Pacific',
    location: 'Singapore',
    status: 'operational',
    latency: '67ms',
    uptime: '99.95%',
    coords: { x: 75, y: 50 }
  },
  {
    name: 'Asia East',
    location: 'Tokyo',
    status: 'operational',
    latency: '45ms',
    uptime: '99.98%',
    coords: { x: 85, y: 35 }
  },
  {
    name: 'Australia',
    location: 'Sydney',
    status: 'operational',
    latency: '89ms',
    uptime: '99.94%',
    coords: { x: 85, y: 75 }
  },
  {
    name: 'South America',
    location: 'São Paulo',
    status: 'operational',
    latency: '125ms',
    uptime: '99.93%',
    coords: { x: 30, y: 70 }
  }
];

const stats = [
  {
    icon: Globe,
    label: 'Global Locations',
    value: '8',
    description: 'monitoring points'
  },
  {
    icon: Zap,
    label: 'Average Response',
    value: '52ms',
    description: 'worldwide'
  },
  {
    icon: Activity,
    label: 'Global Uptime',
    value: '99.96%',
    description: 'last 30 days'
  }
];

export default function RegionMonitoring() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6 transition-all duration-300 hover:bg-blue-500/15 hover:scale-105">
            <Globe className="w-4 h-4 text-blue-500" />
            <span className="text-xs sm:text-sm font-medium text-blue-500">Global Network</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Monitor from everywhere.
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">See the full picture.</span>
          </h2>

          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto px-4">
            Track your website&apos;s performance from 8 strategic locations worldwide.
            Get real-time insights into how your users experience your site, no matter where they are.
          </p>
        </div>

        {/* Global Stats */}
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
              <div className="text-sm sm:text-base text-white/70 font-medium">{stat.label}</div>
              <div className="text-xs sm:text-sm text-white/50">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* World Map Visualization */}
        <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-3xl p-6 sm:p-8 lg:p-12 backdrop-blur-sm border border-white/10 hover:bg-white/[0.08] transition-all duration-300 mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Real-time Global Status</h3>
            <p className="text-white/60 text-sm sm:text-base">All monitoring locations are operational and responding normally</p>
          </div>

          {/* Simplified World Map with Monitoring Points */}
          <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-2xl p-6 sm:p-8 lg:p-12 border border-white/5 overflow-hidden min-h-[300px] sm:min-h-[400px]">
            {/* Animated Background Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 animate-pulse" style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px',
                animation: 'grid-flow 20s ease-in-out infinite'
              }}></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>

            {/* Data Flow Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
              <defs>
                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                  <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {regions.map((region, index) => (
                <g key={`flow-${index}`}>
                  <circle
                    cx={`${region.coords.x}%`}
                    cy={`${region.coords.y}%`}
                    r="20"
                    fill="none"
                    stroke="url(#flowGradient)"
                    strokeWidth="1"
                    opacity="0.4"
                    filter="url(#glow)"
                  >
                    <animate
                      attributeName="r"
                      values="20;40;20"
                      dur="4s"
                      repeatCount="indefinite"
                      begin={`${index * 0.5}s`}
                    />
                    <animate
                      attributeName="opacity"
                      values="0.4;0.1;0.4"
                      dur="4s"
                      repeatCount="indefinite"
                      begin={`${index * 0.5}s`}
                    />
                  </circle>
                </g>
              ))}
            </svg>

            {/* Enhanced Monitoring Points */}
            {regions.map((region, index) => (
              <div
                key={region.name}
                className="absolute group cursor-pointer animate-fade-in"
                style={{
                  left: `${region.coords.x}%`,
                  top: `${region.coords.y}%`,
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${index * 150}ms`
                }}
              >
                {/* Outer Glow Ring */}
                <div className="absolute inset-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-emerald-400/20 to-blue-400/20 animate-spin-slow"></div>
                </div>

                {/* Pulse Rings */}
                <div className="absolute inset-0 w-6 h-6 bg-green-400/30 rounded-full animate-ping -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"></div>
                <div
                  className="absolute inset-0 w-4 h-4 bg-green-400/50 rounded-full animate-ping -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
                  style={{ animationDelay: '0.5s' }}
                ></div>

                {/* Main Point with Enhanced Styling */}
                <div className="relative w-4 h-4 bg-gradient-to-br from-green-300 to-emerald-500 rounded-full border-2 border-white shadow-lg group-hover:scale-150 transition-all duration-500 group-hover:shadow-green-400/50 group-hover:shadow-2xl">
                  <div className="absolute inset-1 bg-gradient-to-br from-white to-green-100 rounded-full opacity-90"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent to-green-600/30"></div>

                  {/* Inner animated dot */}
                  <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-emerald-600 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                </div>

                {/* Data Stream Effect */}
                <div className="absolute -top-2 -left-2 w-8 h-8 pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
                      style={{
                        left: `${50 + Math.cos((Date.now() * 0.003) + i * 2) * 15}%`,
                        top: `${50 + Math.sin((Date.now() * 0.003) + i * 2) * 15}%`,
                        transform: 'translate(-50%, -50%)',
                        animationDelay: `${i * 0.3}s`
                      }}
                    />
                  ))}
                </div>

                {/* Enhanced Tooltip */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-br from-black/95 to-slate-900/95 backdrop-blur-md text-white p-4 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none whitespace-nowrap z-20 border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 group-hover:scale-105 group-hover:-translate-y-2">
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 to-blue-500/20 blur-sm"></div>
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                      <span className="text-sm font-bold text-emerald-300">{region.name}</span>
                    </div>
                    <div className="text-xs text-slate-300 mb-3 font-medium">{region.location}</div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-800/50 rounded-lg p-2 border border-slate-700/50">
                        <div className="text-slate-400 mb-1">Latency</div>
                        <div className="text-emerald-400 font-bold flex items-center gap-1">
                          <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></div>
                          {region.latency}
                        </div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-2 border border-slate-700/50">
                        <div className="text-slate-400 mb-1">Uptime</div>
                        <div className="text-green-400 font-bold">{region.uptime}</div>
                      </div>
                    </div>

                    {/* Real-time status indicator */}
                    <div className="mt-3 flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></div>
                        <span className="text-emerald-400">Live</span>
                      </div>
                      <div className="text-slate-500">•</div>
                      <span className="text-slate-400">Last check: now</span>
                    </div>
                  </div>

                  {/* Enhanced Arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-black/95"></div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-0 h-0 border-l-5 border-r-5 border-t-5 border-transparent border-t-emerald-500/20"></div>
                </div>

                {/* Status Activity Lines */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-px h-4 bg-gradient-to-t from-transparent via-cyan-400/60 to-transparent"
                      style={{
                        left: `${20 + i * 60}%`,
                        top: '-8px',
                        animationDelay: `${i * 0.8}s`,
                        animation: 'data-flow 2s ease-in-out infinite'
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Enhanced Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              <defs>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
                  <stop offset="25%" stopColor="#3b82f6" stopOpacity="0.6" />
                  <stop offset="75%" stopColor="#3b82f6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                  <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>
              </defs>

              {regions.slice(0, -1).map((region, index) => {
                const nextRegion = regions[index + 1];
                const pathId = `path-${index}`;
                return (
                  <g key={`connection-${index}`}>
                    {/* Base connection line */}
                    <path
                      id={pathId}
                      d={`M ${region.coords.x}% ${region.coords.y}% Q ${(region.coords.x + nextRegion.coords.x) / 2 + 10}% ${(region.coords.y + nextRegion.coords.y) / 2 - 5}% ${nextRegion.coords.x}% ${nextRegion.coords.y}%`}
                      stroke="url(#connectionGradient)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,10"
                      filter="url(#glow)"
                    />

                    {/* Animated pulse along the path */}
                    <circle r="3" fill="url(#pulseGradient)" opacity="0.8">
                      <animateMotion dur="3s" repeatCount="indefinite" begin={`${index * 0.5}s`}>
                        <mpath href={`#${pathId}`} />
                      </animateMotion>
                    </circle>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Region Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {regions.map((region, index) => (
            <div
              key={region.name}
              className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-300 hover:scale-105 group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div className="text-sm font-semibold text-white">{region.name}</div>
              </div>

              <div className="text-xs text-white/60 mb-3">{region.location}</div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/70">Latency</span>
                  <span className="text-sm font-medium text-primary">{region.latency}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/70">Uptime</span>
                  <span className="text-sm font-medium text-green-400">{region.uptime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-white/10 hover:bg-gradient-to-r hover:from-primary/15 hover:to-secondary/15 transition-all duration-300">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ready for global monitoring?</h3>
            <p className="text-white/70 mb-4 sm:mb-6 text-sm sm:text-base">
              Start monitoring your website from all our global locations with instant alerts and detailed performance insights.
            </p>
            <button className="bg-gradient-primary text-white px-6 sm:px-8 py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300">
              Start Global Monitoring
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}