import React from 'react';
import { motion } from 'motion/react';
import { Calendar, ChevronRight, TrendingUp, Zap, Clock, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';

const data = [
  { day: 'Mon', hours: 7.2, quality: 82 },
  { day: 'Tue', hours: 6.8, quality: 75 },
  { day: 'Wed', hours: 8.1, quality: 91 },
  { day: 'Thu', hours: 7.5, quality: 85 },
  { day: 'Fri', hours: 6.5, quality: 70 },
  { day: 'Sat', hours: 9.2, quality: 95 },
  { day: 'Sun', hours: 8.4, quality: 88 },
];

export default function TrendsScreen() {
  return (
    <div className="min-h-screen bg-surface pb-32">
      {/* Header */}
      <header className="px-6 pt-12 pb-6 flex justify-between items-end">
        <div>
          <h2 className="font-headline text-on-surface-variant text-sm font-bold tracking-widest uppercase">Analytics</h2>
          <h1 className="font-headline text-3xl font-extrabold text-on-surface">Sleep Trends</h1>
        </div>
        <button className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-full text-sm font-bold text-primary">
          <Calendar size={16} />
          This Week
        </button>
      </header>

      <main className="px-6 space-y-8">
        {/* Main Chart */}
        <section className="bg-surface-container-low p-6 rounded-3xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-headline font-bold text-lg">Duration (Hours)</h3>
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <TrendingUp size={16} />
              +0.4h Avg
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#908f9d', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(68, 221, 193, 0.05)' }}
                  contentStyle={{ 
                    backgroundColor: '#1c2028', 
                    border: 'none', 
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                  }}
                  itemStyle={{ color: '#44ddc1', fontWeight: 700 }}
                />
                <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.hours > 7.5 ? '#44ddc1' : '#31353e'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Consistency Metric */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-low p-6 rounded-3xl flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Zap size={20} />
            </div>
            <div>
              <div className="text-outline text-[10px] font-bold tracking-widest uppercase mb-1">Consistency</div>
              <div className="font-headline text-2xl font-bold text-on-surface">92%</div>
            </div>
          </div>
          <div className="bg-surface-container-low p-6 rounded-3xl flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-4">
              <Clock size={20} />
            </div>
            <div>
              <div className="text-outline text-[10px] font-bold tracking-widest uppercase mb-1">Avg Bedtime</div>
              <div className="font-headline text-2xl font-bold text-on-surface">22:45</div>
            </div>
          </div>
        </section>

        {/* Insights List */}
        <section className="space-y-4">
          <h3 className="font-headline text-sm font-bold tracking-[0.2em] text-outline uppercase ml-1">Key Insights</h3>
          <div className="space-y-3">
            <InsightItem 
              icon={Activity} 
              title="Deep Sleep Peak" 
              description="Your deep sleep is 15% higher on days you exercise before 4 PM."
            />
            <InsightItem 
              icon={TrendingUp} 
              title="Weekend Recovery" 
              description="You averaged 8.8h this weekend, recovering from a mid-week deficit."
            />
          </div>
        </section>
      </main>
    </div>
  );
}

const InsightItem = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="bg-surface-container p-5 rounded-2xl flex items-center justify-between group cursor-pointer active:scale-[0.98] transition-transform">
    <div className="flex gap-4 items-center">
      <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-outline group-hover:text-primary transition-colors">
        <Icon size={20} />
      </div>
      <div>
        <h4 className="font-headline font-bold text-on-surface text-sm">{title}</h4>
        <p className="text-on-surface-variant text-xs mt-0.5">{description}</p>
      </div>
    </div>
    <ChevronRight size={18} className="text-outline" />
  </div>
);
