import React from 'react';
import { 
  ArrowLeft, 
  Smartphone, 
  Mic2, 
  Moon, 
  ShieldCheck, 
  Zap, 
  Bed, 
  LineChart, 
  FlaskConical, 
  User 
} from 'lucide-react';
import { motion } from 'motion/react';

const SensorCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-surface-container-low p-5 rounded-2xl flex gap-5 items-start"
  >
    <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center flex-shrink-0 text-primary shadow-lg">
      <Icon size={28} />
    </div>
    <div>
      <h4 className="font-headline font-bold text-lg text-on-surface mb-1">{title}</h4>
      <p className="text-on-surface-variant text-sm leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

export default function TechnologyScreen() {
  return (
    <div className="min-h-screen bg-surface pb-32">
      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl flex items-center justify-between px-6 h-16 shadow-none">
        <button className="text-primary active:scale-95 duration-200 hover:opacity-80 transition-opacity">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-headline tracking-tight font-bold text-lg text-primary">Technology</h1>
        <div className="w-6" /> {/* Spacer for centering */}
      </header>

      <main className="pt-24 px-6 space-y-12">
        {/* Hero Illustration */}
        <section className="relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square w-full rounded-3xl overflow-hidden relative group shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent z-10" />
            <img 
              alt="Abstract Sleep Tech Visualization" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrGRe9xMWJuaZuZXG44Vb-3BsuIf8w6-rQZ3T86UqYDkP-fBaxxKPq75BViXOYzh6ekhLaGApqlyPppHUjQBzRdmnZLArZ70fdlmfixkPCgFdU6DVCK0pr7bq7Z9zwizB6jbmMr-rR0QvKaAewMxAkKJg7wkgyR_ZPYGkI17gFzWL4WMTEn9qNACURgUXULas0fUAqNFfceMQNysE-zZuO4Lp7KHYKCJp7BPigOw39jrDoQhG5Ec1k2suJFwW9zMReAwU3Zh5OY1U"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 left-6 z-20">
              <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-[10px] font-bold tracking-widest uppercase mb-2">
                System Active
              </span>
              <h2 className="font-headline text-3xl font-extrabold tracking-tight leading-tight">
                Beyond Tracking. <br/>
                <span className="text-primary text-glow">Deep Insight.</span>
              </h2>
            </div>
          </motion.div>
        </section>

        {/* Core Sensors Section */}
        <section className="space-y-6">
          <h3 className="font-headline text-sm font-bold tracking-[0.2em] text-outline uppercase ml-1">
            The Sensor Suite
          </h3>
          <div className="space-y-4">
            <SensorCard 
              icon={Smartphone} 
              title="Movement Analysis" 
              description="High-precision accelerometer detects micro-movements to distinguish between REM and deep sleep cycles with clinical accuracy."
            />
            <SensorCard 
              icon={Mic2} 
              title="Soundscapes" 
              description="Monitors rhythmic breathing patterns while utilizing noise-cancellation filters to isolate your unique sleep signature."
            />
            <SensorCard 
              icon={Moon} 
              title="Luminosity Check" 
              description="Evaluates light levels to ensure your environment is optimized for natural melatonin production and circadian rhythm."
            />
          </div>
        </section>

        {/* AI Processing Card */}
        <section>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-surface-container-high to-surface-container-lowest p-6 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-[60px]" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-primary" size={24} />
                <span className="font-headline font-extrabold text-primary tracking-tight">On-Device Intelligence</span>
              </div>
              <h3 className="font-headline text-xl font-bold mb-3">Privacy-First AI Processing</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
                Our proprietary machine learning models analyze your sleep data locally on your device. Your acoustic and movement data never leaves your phone, ensuring absolute privacy.
              </p>
              <div className="flex items-center gap-2 text-[11px] font-bold text-outline tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Neural Engine Active
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="pb-10">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-primary to-on-primary-container py-5 rounded-3xl font-headline font-bold text-on-primary shadow-[0_12px_24px_rgba(68,221,193,0.2)] transition-transform duration-300"
          >
            Optimize My Tracking
          </motion.button>
          <p className="text-center text-outline text-[11px] mt-4 tracking-wide font-medium">
            Compatible with iPhone 12 & Later
          </p>
        </section>
      </main>
    </div>
  );
}

const NavItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <a 
    href="#" 
    className={`flex flex-col items-center justify-center transition-all duration-300 ease-out active:scale-90 ${
      active ? 'text-primary scale-110' : 'text-outline opacity-60 hover:text-primary'
    }`}
  >
    <Icon size={24} className={active ? 'fill-primary/20' : ''} />
    <span className="font-headline text-[10px] font-medium tracking-wide mt-1">{label}</span>
  </a>
);
