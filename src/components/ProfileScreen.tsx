import React from 'react';
import { motion } from 'motion/react';
import { User, Shield, Bell, CreditCard, ChevronRight, LogOut, Award, Heart, Moon, MessageCircle } from 'lucide-react';

export default function ProfileScreen({ onOpenWhatsApp }: { onOpenWhatsApp: () => void }) {
  return (
    <div className="min-h-screen bg-surface pb-32">
      {/* Header / Profile Info */}
      <header className="px-6 pt-16 pb-10 text-center">
        <div className="relative inline-block mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
            <div className="w-full h-full rounded-full bg-surface-container flex items-center justify-center overflow-hidden">
              <img 
                src="https://picsum.photos/seed/sleepuser/200" 
                alt="User Avatar" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary border-4 border-surface flex items-center justify-center text-on-primary">
            <Award size={14} fill="currentColor" />
          </div>
        </div>
        <h1 className="font-headline text-2xl font-extrabold text-on-surface">Vivek Sharma</h1>
        <p className="text-outline text-sm font-medium mt-1">Premium Member since 2024</p>
      </header>

      <main className="px-6 space-y-8">
        {/* Stats Row */}
        <section className="grid grid-cols-3 gap-4">
          <ProfileStat label="Streak" value="12d" />
          <ProfileStat label="Quality" value="84" />
          <ProfileStat label="Level" value="14" />
        </section>

        {/* Settings Groups */}
        <section className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-headline text-[10px] font-bold tracking-[0.2em] text-outline uppercase ml-1">Account Settings</h3>
            <div className="bg-surface-container-low rounded-3xl overflow-hidden">
              <SettingsItem icon={User} label="Personal Information" />
              <SettingsItem icon={MessageCircle} label="WhatsApp Integration" onClick={onOpenWhatsApp} />
              <SettingsItem icon={Bell} label="Notifications" />
              <SettingsItem icon={CreditCard} label="Subscription Plan" />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-headline text-[10px] font-bold tracking-[0.2em] text-outline uppercase ml-1">Health & Privacy</h3>
            <div className="bg-surface-container-low rounded-3xl overflow-hidden">
              <SettingsItem icon={Heart} label="Health Data Sync" />
              <SettingsItem icon={Moon} label="Sleep Goals" />
              <SettingsItem icon={Shield} label="Privacy & Security" />
            </div>
          </div>
        </section>

        {/* Logout */}
        <section className="pt-4">
          <button className="w-full flex items-center justify-center gap-2 text-error font-headline font-bold py-4 rounded-2xl bg-error/5 hover:bg-error/10 transition-colors">
            <LogOut size={20} />
            Sign Out
          </button>
        </section>
      </main>
    </div>
  );
}

const ProfileStat = ({ label, value }: { label: string, value: string }) => (
  <div className="bg-surface-container-low p-4 rounded-2xl text-center">
    <div className="text-outline text-[10px] font-bold tracking-widest uppercase mb-1">{label}</div>
    <div className="font-headline text-xl font-bold text-on-surface">{value}</div>
  </div>
);

const SettingsItem = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className="flex items-center justify-between p-5 hover:bg-surface-container transition-colors cursor-pointer group"
  >
    <div className="flex items-center gap-4">
      <div className="text-outline group-hover:text-primary transition-colors">
        <Icon size={20} />
      </div>
      <span className="font-headline font-bold text-sm text-on-surface">{label}</span>
    </div>
    <ChevronRight size={18} className="text-outline" />
  </div>
);
