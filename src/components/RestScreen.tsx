import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Play, Info, Bell, Settings, Square, Activity, ShieldCheck } from 'lucide-react';

export default function RestScreen() {
  const [isTracking, setIsTracking] = useState(false);
  const [sleepData, setSleepData] = useState<any>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Initialize Web Worker
    workerRef.current = new Worker(new URL('../workers/sleepProcessor.ts', import.meta.url), {
      type: 'module'
    });

    workerRef.current.onmessage = (e) => {
      if (e.data.type === 'ANALYSIS_UPDATE') {
        setSleepData(e.data.payload);
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const toggleTracking = () => {
    if (!isTracking) {
      workerRef.current?.postMessage({ type: 'START_TRACKING' });
      setIsTracking(true);
    } else {
      workerRef.current?.postMessage({ type: 'STOP_TRACKING' });
      setIsTracking(false);
      setSleepData(null);
    }
  };

  return (
    <div className="min-h-screen bg-surface pb-32">
      {/* Header */}
      <header className="px-6 pt-12 pb-6 flex justify-between items-center">
        <div>
          <h2 className="font-headline text-on-surface-variant text-sm font-bold tracking-widest uppercase">
            {isTracking ? 'Session Active' : 'Tonight'}
          </h2>
          <h1 className="font-headline text-3xl font-extrabold text-on-surface">
            {isTracking ? 'Tracking Sleep' : 'Ready for Rest'}
          </h1>
        </div>
        <div className="flex gap-4">
          {!isTracking && (
            <>
              <button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-outline">
                <Bell size={20} />
              </button>
              <button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-outline">
                <Settings size={20} />
              </button>
            </>
          )}
        </div>
      </header>

      <main className="px-6 space-y-10">
        {/* Sleep Pulse centerpiece */}
        <section className="flex justify-center py-10 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <motion.div 
              animate={{ 
                scale: isTracking ? [1, 1.2, 1] : 1,
                opacity: isTracking ? [0.2, 0.4, 0.2] : 0.2
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-64 h-64 rounded-full bg-primary blur-[80px]" 
            />
          </div>
          
          <div className="relative w-72 h-72 flex items-center justify-center">
            {/* Outer Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="144"
                cy="144"
                r="130"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-surface-container-lowest"
              />
              <motion.circle
                initial={{ strokeDasharray: "0 1000" }}
                animate={{ strokeDasharray: isTracking ? "1000 1000" : "600 1000" }}
                transition={{ duration: 2, ease: "easeOut" }}
                cx="144"
                cy="144"
                r="130"
                fill="none"
                stroke="url(#pulseGradient)"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#44ddc1" />
                  <stop offset="100%" stopColor="#bdc2ff" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Content */}
            <div className="text-center z-10">
              <AnimatePresence mode="wait">
                {isTracking ? (
                  <motion.div
                    key="tracking"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="space-y-2"
                  >
                    <Activity size={48} className="text-primary mx-auto mb-2 animate-pulse" />
                    <div className="font-headline text-4xl font-extrabold text-on-surface">
                      {sleepData?.stage || 'ANALYZING'}
                    </div>
                    <div className="text-primary text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      Live Feed Active
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Moon size={48} className="text-primary mx-auto mb-4" />
                    <div className="font-headline text-5xl font-extrabold text-on-surface mb-1">22:30</div>
                    <div className="font-headline text-sm font-bold text-outline tracking-widest uppercase">Target Bedtime</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Real-time Metrics (Visible during tracking) */}
        <AnimatePresence>
          {isTracking && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-surface-container-low p-5 rounded-3xl border border-primary/10">
                <div className="text-outline text-[10px] font-bold tracking-widest uppercase mb-2">Heart Rate</div>
                <div className="font-headline text-2xl font-bold text-on-surface">
                  {Math.round(sleepData?.heartRate || 65)} <span className="text-sm font-medium text-outline">BPM</span>
                </div>
              </div>
              <div className="bg-surface-container-low p-5 rounded-3xl border border-primary/10">
                <div className="text-outline text-[10px] font-bold tracking-widest uppercase mb-2">Confidence</div>
                <div className="font-headline text-2xl font-bold text-on-surface">
                  {Math.round((sleepData?.confidence || 0.9) * 100)}%
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Quick Stats / Privacy Info */}
        <section className="grid grid-cols-2 gap-4">
          {!isTracking ? (
            <>
              <div className="bg-surface-container-low p-5 rounded-3xl">
                <div className="text-outline text-[10px] font-bold tracking-widest uppercase mb-2">Last Night</div>
                <div className="font-headline text-2xl font-bold text-on-surface">7h 24m</div>
                <div className="text-primary text-[11px] font-bold mt-1">+12% vs Avg</div>
              </div>
              <div className="bg-surface-container-low p-5 rounded-3xl">
                <div className="text-outline text-[10px] font-bold tracking-widest uppercase mb-2">Quality</div>
                <div className="font-headline text-2xl font-bold text-on-surface">88%</div>
                <div className="text-secondary text-[11px] font-bold mt-1">Restorative</div>
              </div>
            </>
          ) : (
            <div className="col-span-2 bg-surface-container p-5 rounded-3xl flex items-center gap-4">
              <ShieldCheck className="text-primary" size={24} />
              <p className="text-on-surface-variant text-xs leading-relaxed">
                Your sleep data is being processed locally via Web Worker. No acoustic or movement data is transmitted.
              </p>
            </div>
          )}
        </section>

        {/* Start/Stop Button */}
        <section className="pt-4">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={toggleTracking}
            className={`w-full py-6 rounded-full font-headline font-extrabold flex items-center justify-center gap-3 transition-all duration-500 ${
              isTracking 
                ? 'bg-surface-container-highest text-on-surface shadow-xl' 
                : 'bg-gradient-to-r from-primary to-on-primary-container text-on-primary shadow-[0_20px_40px_rgba(68,221,193,0.3)]'
            }`}
          >
            {isTracking ? (
              <>
                <Square size={24} fill="currentColor" />
                End Sleep Session
              </>
            ) : (
              <>
                <Play size={24} fill="currentColor" />
                Start Sleep Session
              </>
            )}
          </motion.button>
        </section>
      </main>
    </div>
  );
}

