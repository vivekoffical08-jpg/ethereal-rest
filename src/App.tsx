/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import RestScreen from './components/RestScreen';
import TrendsScreen from './components/TrendsScreen';
import TechnologyScreen from './components/TechnologyScreen';
import ProfileScreen from './components/ProfileScreen';
import IntegrationsScreen from './components/IntegrationsScreen';
import { Moon, LineChart, FlaskConical, User } from 'lucide-react';

type Screen = 'rest' | 'trends' | 'labs' | 'profile' | 'whatsapp';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('labs');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'rest': return <RestScreen />;
      case 'trends': return <TrendsScreen />;
      case 'labs': return <TechnologyScreen />;
      case 'profile': return <ProfileScreen onOpenWhatsApp={() => setCurrentScreen('whatsapp')} />;
      case 'whatsapp': return <IntegrationsScreen onBack={() => setCurrentScreen('profile')} />;
      default: return <TechnologyScreen />;
    }
  };

  return (
    <div className="antialiased min-h-screen bg-surface">
      {renderScreen()}

      {/* Global Bottom Navigation Bar */}
      <nav className="fixed bottom-0 w-full z-50 rounded-t-[24px] bg-surface/70 backdrop-blur-xl flex justify-around items-center px-4 pt-3 pb-8 shadow-[0_-12px_24px_rgba(255,255,255,0.03)] border-t border-white/5">
        <NavItem 
          icon={Moon} 
          label="Rest" 
          active={currentScreen === 'rest'} 
          onClick={() => setCurrentScreen('rest')} 
        />
        <NavItem 
          icon={LineChart} 
          label="Trends" 
          active={currentScreen === 'trends'} 
          onClick={() => setCurrentScreen('trends')} 
        />
        <NavItem 
          icon={FlaskConical} 
          label="Labs" 
          active={currentScreen === 'labs'} 
          onClick={() => setCurrentScreen('labs')} 
        />
        <NavItem 
          icon={User} 
          label="Profile" 
          active={currentScreen === 'profile'} 
          onClick={() => setCurrentScreen('profile')} 
        />
      </nav>
    </div>
  );
}

const NavItem = ({ 
  icon: Icon, 
  label, 
  active = false, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  active?: boolean,
  onClick: () => void
}) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center transition-all duration-300 ease-out active:scale-90 outline-none ${
      active ? 'text-primary scale-110' : 'text-outline opacity-60 hover:text-primary'
    }`}
  >
    <Icon size={24} className={active ? 'fill-primary/20' : ''} />
    <span className="font-headline text-[10px] font-medium tracking-wide mt-1">{label}</span>
  </button>
);

