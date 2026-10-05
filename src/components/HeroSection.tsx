import React, { useState } from 'react';
import { ChevronDown, Check, Activity, Pause, Play, RefreshCw } from 'lucide-react';

interface HeroSectionProps {
  currentCategory: string;
  onSelectCategory: (category: string) => void;
  isLiveActive: boolean;
  onToggleLive: () => void;
  lastUpdated: Date;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentCategory,
  onSelectCategory,
  isLiveActive,
  onToggleLive,
  lastUpdated,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const categories = [
    { id: 'all', title: 'Markets, everywhere', subtitle: 'Track world markets, indices, stocks, crypto, currencies and commodities in real time.' },
    { id: 'indices', title: 'Major World Indices', subtitle: 'Global benchmark performance, regional stock exchanges and intraday volatility.' },
    { id: 'stocks', title: 'Equities & Movers', subtitle: 'Real-time US equities, large caps, earnings reports and volume leaders.' },
    { id: 'crypto', title: 'Crypto & Digital Assets', subtitle: '24/7 decentralized currency pricing, liquidity and market capitalizations.' },
    { id: 'forex', title: 'Currencies & Forex', subtitle: 'Major, minor and exotic global currency pairs with dollar index tracking.' },
    { id: 'commodities', title: 'Commodities & Energy', subtitle: 'Precious metals, energy benchmarks, agricultural futures and spot prices.' },
  ];

  const current = categories.find((c) => c.id === currentCategory) || categories[0];

  return (
    <section className="text-center py-6 relative" data-purpose="hero-title">
      <div className="relative inline-block">
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="inline-flex items-center space-x-2 md:space-x-3 cursor-pointer group select-none hover:opacity-90 transition-opacity"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#131722]">
            {current.title}
          </h1>
          <ChevronDown
            className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-[#131722] transition-transform duration-200 ${
              dropdownOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'
            }`}
          />
        </div>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-[#E0E3EB] p-2 z-50 text-left">
            <div className="text-[11px] font-bold text-[#787B86] uppercase px-3 py-1.5 tracking-wider">
              Market Viewport
            </div>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setDropdownOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors text-left ${
                  currentCategory === cat.id
                    ? 'bg-[#F0F3FA] text-[#2962FF] font-semibold'
                    : 'text-[#131722] hover:bg-[#F0F3FA]'
                }`}
              >
                <div>
                  <div className="font-semibold">{cat.title}</div>
                </div>
                {currentCategory === cat.id && <Check className="w-4 h-4 text-[#2962FF] shrink-0" />}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="text-[#787B86] text-sm sm:text-base mt-2 max-w-xl mx-auto px-4">
        {current.subtitle}
      </p>

      {/* Real-time streaming status banner */}
      <div className="mt-4 flex items-center justify-center space-x-3 text-xs">
        <div className="inline-flex items-center space-x-2 bg-[#F0F3FA] px-3 py-1 rounded-full text-[#131722]">
          <span
            className={`w-2 h-2 rounded-full ${
              isLiveActive ? 'bg-[#089981] animate-tv-pulse' : 'bg-[#787B86]'
            }`}
          />
          <span className="font-medium">
            {isLiveActive ? 'Live Real-time Feed' : 'Live Feed Paused'}
          </span>
          <span className="text-[#787B86]">·</span>
          <span className="text-[#787B86] tabular-nums">
            {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>

        <button
          onClick={onToggleLive}
          className="p-1 rounded-full hover:bg-[#F0F3FA] text-[#787B86] hover:text-[#131722] transition-colors"
          title={isLiveActive ? 'Pause real-time updates' : 'Resume real-time updates'}
        >
          {isLiveActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
      </div>
    </section>
  );
};
