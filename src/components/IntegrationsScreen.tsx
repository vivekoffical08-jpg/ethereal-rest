import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MessageCircle, Clock, Phone, ShieldCheck, BellRing, CheckCircle2, AlertCircle } from 'lucide-react';

export default function WhatsAppIntegrationScreen({ onBack }: { onBack: () => void }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('16:00');
  const [isTesting, setIsTesting] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleTest = async () => {
    if (!phoneNumber) return;
    setIsTesting(true);
    setTestStatus('idle');
    
    try {
      const response = await fetch('/api/whatsapp/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send test notification');
      }

      setTestStatus('success');
      setTimeout(() => setTestStatus('idle'), 3000);
    } catch (error) {
      console.error('WhatsApp Test Error:', error);
      setTestStatus('error');
      setTimeout(() => setTestStatus('idle'), 5000);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface pb-32">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl flex items-center justify-between px-6 h-16">
        <button 
          onClick={onBack}
          className="text-primary active:scale-95 duration-200 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-headline tracking-tight font-bold text-lg text-primary">WhatsApp Sync</h1>
        <div className="w-6" />
      </header>

      <main className="pt-24 px-6 space-y-8">
        {/* Intro Card */}
        <section>
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-3xl border border-primary/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366] flex items-center justify-center text-white shadow-lg">
                <MessageCircle size={28} fill="currentColor" />
              </div>
              <div>
                <h2 className="font-headline font-bold text-lg">Parental Alerts</h2>
                <p className="text-on-surface-variant text-xs">Powered by WhatsApp Business</p>
              </div>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Get an instant notification and a photo when your child falls asleep during the day. Stay connected, even when you're in the next room or at work.
            </p>
          </div>
        </section>

        {/* Configuration */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-headline text-sm font-bold tracking-[0.2em] text-outline uppercase">Configuration</h3>
            <button 
              onClick={() => setIsEnabled(!isEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative ${isEnabled ? 'bg-primary' : 'bg-surface-container-highest'}`}
            >
              <motion.div 
                animate={{ x: isEnabled ? 26 : 2 }}
                className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
              />
            </button>
          </div>

          <div className={`space-y-4 transition-opacity duration-300 ${isEnabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
            {/* Phone Input */}
            <div className="bg-surface-container-low p-5 rounded-2xl space-y-3">
              <div className="flex items-center gap-3 text-outline mb-1">
                <Phone size={18} />
                <span className="text-[10px] font-bold tracking-widest uppercase">Parent's Phone Number</span>
              </div>
              <input 
                type="tel" 
                placeholder="+1 (555) 000-0000"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-surface-container border-none rounded-xl py-3 px-4 text-on-surface placeholder:text-outline/50 focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>

            {/* Time Range */}
            <div className="bg-surface-container-low p-5 rounded-2xl space-y-4">
              <div className="flex items-center gap-3 text-outline mb-1">
                <Clock size={18} />
                <span className="text-[10px] font-bold tracking-widest uppercase">Monitoring Window</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-outline font-bold ml-1">START</label>
                  <input 
                    type="time" 
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-surface-container border-none rounded-xl py-3 px-4 text-on-surface outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-outline font-bold ml-1">END</label>
                  <input 
                    type="time" 
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full bg-surface-container border-none rounded-xl py-3 px-4 text-on-surface outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Privacy Note */}
            <div className="flex gap-3 px-2">
              <ShieldCheck className="text-primary shrink-0" size={20} />
              <p className="text-[11px] text-on-surface-variant leading-tight">
                Notifications are sent using encrypted channels. No audio recordings are ever stored or shared.
              </p>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="pt-4 space-y-4">
          <button 
            disabled={!isEnabled || !phoneNumber || isTesting}
            onClick={handleTest}
            className={`w-full py-4 rounded-2xl font-headline font-bold flex items-center justify-center gap-3 transition-all ${
              isEnabled && phoneNumber 
                ? 'bg-surface-container-highest text-primary hover:bg-surface-bright' 
                : 'bg-surface-container-low text-outline cursor-not-allowed'
            }`}
          >
            {isTesting ? (
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : testStatus === 'success' ? (
              <CheckCircle2 size={20} />
            ) : testStatus === 'error' ? (
              <AlertCircle size={20} className="text-error" />
            ) : (
              <BellRing size={20} />
            )}
            {testStatus === 'success' ? 'Message Sent!' : testStatus === 'error' ? 'Failed to Send' : 'Send Test Notification'}
          </button>

          <button 
            disabled={!isEnabled || !phoneNumber}
            className={`w-full py-5 rounded-3xl font-headline font-extrabold transition-all ${
              isEnabled && phoneNumber 
                ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' 
                : 'bg-surface-container-low text-outline cursor-not-allowed'
            }`}
          >
            Save Integration Settings
          </button>
        </section>

        {/* Preview Section */}
        <section className="pb-10">
          <h3 className="font-headline text-[10px] font-bold tracking-[0.2em] text-outline uppercase ml-1 mb-4 text-center">Notification Preview</h3>
          <div className="max-w-[280px] mx-auto bg-[#E5DDD5] rounded-2xl overflow-hidden shadow-xl border-4 border-surface-container-highest">
            <div className="bg-[#075E54] p-3 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20" />
              <div className="text-white">
                <div className="text-[10px] font-bold">Ethereal Rest</div>
                <div className="text-[8px] opacity-70">Online</div>
              </div>
            </div>
            <div className="p-3 space-y-2">
              <div className="bg-white p-1 rounded-lg rounded-tl-none shadow-sm max-w-[90%]">
                <img 
                  src="https://picsum.photos/seed/sleepingchild/400/300" 
                  alt="Sleeping Child" 
                  className="rounded-md mb-1 w-full aspect-video object-cover"
                  referrerPolicy="no-referrer"
                />
                <p className="text-[11px] text-black leading-tight">Hey, your child is sleeping in the day.</p>
                <div className="text-[8px] text-gray-400 text-right mt-1">14:02</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
