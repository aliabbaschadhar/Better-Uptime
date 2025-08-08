'use client';

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, Activity } from 'lucide-react';

const uptimeData = [
  { time: '00:00', uptime: 99.2 },
  { time: '04:00', uptime: 99.8 },
  { time: '08:00', uptime: 100 },
  { time: '12:00', uptime: 99.9 },
  { time: '16:00', uptime: 100 },
  { time: '20:00', uptime: 99.7 },
  { time: '24:00', uptime: 100 },
];

export default function GraphSection() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6 transition-all duration-300 hover:bg-primary/15 hover:scale-105">
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">Real-time Analytics</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Performance at a glance
          </h2>
          
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto px-4">
            Beautiful, simple graphs that tell the story of your website's health.
            No clutter. Just clarity.
          </p>
        </div>

        {/* Graph Container */}
        <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-8 backdrop-blur-sm border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-500">
          {/* Graph Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Last 24 Hours</h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 text-xs sm:text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  <span>Uptime Percentage</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span>99.8% Average</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-bold text-primary">99.8%</div>
                <div className="text-xs sm:text-sm text-white/60">Current Uptime</div>
              </div>
            </div>
          </div>

          {/* Graph */}
          <div className="h-60 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={uptimeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#ffffff60', fontSize: 12 }}
                />
                <YAxis 
                  domain={[99, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#ffffff60', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#982176',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '14px',
                  }}
                  formatter={(value: any) => [`${value}%`, 'Uptime']}
                />
                <Line 
                  type="monotone" 
                  dataKey="uptime" 
                  stroke="#F11A7B"
                  strokeWidth={3}
                  dot={{ fill: '#F11A7B', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#F11A7B', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">
            {[
              { label: 'Response Time', value: '247ms', change: '-12%' },
              { label: 'Incidents', value: '0', change: '0%' },
              { label: 'Regions', value: '12', change: '+2' },
              { label: 'Checks', value: '2,847', change: '+156' },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center group hover:scale-105 transition-transform duration-300" style={{ transitionDelay: `${index * 50}ms` }}>
                <div className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors duration-200">{stat.value}</div>
                <div className="text-xs sm:text-sm text-white/60 mb-1">{stat.label}</div>
                <div className="text-xs text-green-400">{stat.change}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}