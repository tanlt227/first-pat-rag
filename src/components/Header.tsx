import React, { useState } from 'react';
import { Search, Globe, User, ChevronDown, Bell, Check, ExternalLink } from 'lucide-react';
import { UserPortfolio } from '../types';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenSuperchart: (symbol?: string) => void;
  onOpenPortfolio: () => void;
  portfolio: UserPortfolio;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenSuperchart,
  onOpenPortfolio,
  portfolio,
  onOpenAuth,
}) => {
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [productsOpen, setProductsOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [brokersOpen, setBrokersOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages = [
    { code: 'EN', name: 'English (US)' },
    { code: 'ES', name: 'Español' },
    { code: 'FR', name: 'Français' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'JA', name: '日本語' },
    { code: 'ZH', name: '简体中文' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E0E3EB] h-[60px] flex items-center px-4 lg:px-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between">
        {/* Left side: TV Logo & Global Search */}
        <div className="flex items-center space-x-5 lg:space-x-7">
          {/* TradingView Logo Mark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-2 text-[#131722] hover:opacity-80 transition-opacity focus:outline-none"
            title="TradingView"
          >
            <svg
              className="w-8 h-8 fill-current text-[#131722]"
              viewBox="0 0 36 28"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 22H7V11h7v11zm11-16h-7v22h7V6zm11 8h-7v14h7V14zM0 27h3.5c1.9 0 3.5-1.6 3.5-3.5S5.4 20 3.5 20H0v7z" />
            </svg>
            <span className="font-extrabold text-xl tracking-tight hidden sm:inline-block text-[#131722]">
              TradingView
            </span>
          </button>

          {/* Global Search Input (Ctrl+K) */}
          <div
            onClick={onOpenSearch}
            className="relative w-56 sm:w-64 md:w-80 cursor-pointer group"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#787B86] group-hover:text-[#2962FF] transition-colors">
              <Search className="w-4 h-4" />
            </div>
            <div className="w-full bg-[#F0F3FA] group-hover:bg-[#E8ECF5] text-sm text-[#787B86] rounded-full pl-9 pr-12 py-2 transition-all flex items-center justify-between border border-transparent group-hover:border-[#E0E3EB]">
              <span className="truncate">Search (Ctrl+K)</span>
              <kbd className="hidden sm:inline-block text-[10px] font-semibold bg-white border border-[#E0E3EB] rounded px-1.5 py-0.5 text-[#787B86]">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-[15px] font-medium" data-purpose="primary-navigation">
            {/* Products Dropdown */}
            <div className="relative" onMouseLeave={() => setProductsOpen(false)}>
              <button
                onMouseEnter={() => setProductsOpen(true)}
                onClick={() => setProductsOpen(!productsOpen)}
                className="text-[#131722] hover:text-[#2962FF] transition-colors flex items-center py-2"
              >
                Products
                <ChevronDown className="w-3.5 h-3.5 ml-1 text-[#787B86]" />
              </button>
              {productsOpen && (
                <div className="absolute left-0 top-full pt-1 w-56 z-50">
                  <div className="bg-white rounded-xl shadow-lg border border-[#E0E3EB] p-2 space-y-1">
                    <button
                      onClick={() => {
                        setProductsOpen(false);
                        onOpenSuperchart('SPX');
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-[#131722] hover:bg-[#F0F3FA] rounded-lg font-medium flex items-center justify-between group"
                    >
                      <span>Supercharts</span>
                      <span className="text-[11px] bg-[#E8F5EE] text-[#089981] px-1.5 py-0.5 rounded">Pro</span>
                    </button>
                    <button
                      onClick={() => setProductsOpen(false)}
                      className="w-full text-left px-3 py-2 text-sm text-[#131722] hover:bg-[#F0F3FA] rounded-lg"
                    >
                      Pine Script™ v5
                    </button>
                    <button
                      onClick={() => setProductsOpen(false)}
                      className="w-full text-left px-3 py-2 text-sm text-[#131722] hover:bg-[#F0F3FA] rounded-lg"
                    >
                      Stock Screener
                    </button>
                    <button
                      onClick={() => setProductsOpen(false)}
                      className="w-full text-left px-3 py-2 text-sm text-[#131722] hover:bg-[#F0F3FA] rounded-lg"
                    >
                      Crypto Screener
                    </button>
                    <button
                      onClick={() => setProductsOpen(false)}
                      className="w-full text-left px-3 py-2 text-sm text-[#131722] hover:bg-[#F0F3FA] rounded-lg"
                    >
                      Heatmaps & Sparks
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Community Dropdown */}
            <div className="relative" onMouseLeave={() => setCommunityOpen(false)}>
              <button
                onMouseEnter={() => setCommunityOpen(true)}
                onClick={() => setCommunityOpen(!communityOpen)}
                className="text-[#131722] hover:text-[#2962FF] transition-colors flex items-center py-2"
              >
                Community
                <ChevronDown className="w-3.5 h-3.5 ml-1 text-[#787B86]" />
              </button>
              {communityOpen && (
                <div className="absolute left-0 top-full pt-1 w-48 z-50">
                  <div className="bg-white rounded-xl shadow-lg border border-[#E0E3EB] p-2 space-y-1">
                    <a href="#community" onClick={() => setCommunityOpen(false)} className="block px-3 py-2 text-sm text-[#131722] hover:bg-[#F0F3FA] rounded-lg">Trade Ideas</a>
                    <a href="#community" onClick={() => setCommunityOpen(false)} className="block px-3 py-2 text-sm text-[#131722] hover:bg-[#F0F3FA] rounded-lg">Live Streams</a>
                    <a href="#community" onClick={() => setCommunityOpen(false)} className="block px-3 py-2 text-sm text-[#131722] hover:bg-[#F0F3FA] rounded-lg">Community Scripts</a>
                    <a href="#community" onClick={() => setCommunityOpen(false)} className="block px-3 py-2 text-sm text-[#131722] hover:bg-[#F0F3FA] rounded-lg">House Rules</a>
                  </div>
                </div>
              )}
            </div>

            {/* Markets Active Tab */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[#2962FF] font-semibold flex items-center py-2"
            >
              Markets
              <span className="ml-1 w-1.5 h-1.5 bg-[#2962FF] rounded-full" />
            </a>

            {/* Brokers Dropdown */}
            <div className="relative" onMouseLeave={() => setBrokersOpen(false)}>
              <button
                onMouseEnter={() => setBrokersOpen(true)}
                onClick={() => setBrokersOpen(!brokersOpen)}
                className="text-[#131722] hover:text-[#2962FF] transition-colors flex items-center py-2"
              >
                Brokers
                <ChevronDown className="w-3.5 h-3.5 ml-1 text-[#787B86]" />
              </button>
              {brokersOpen && (
                <div className="absolute left-0 top-full pt-1 w-52 z-50">
                  <div className="bg-white rounded-xl shadow-lg border border-[#E0E3EB] p-2 space-y-1">
                    <div className="px-3 py-1 text-[11px] font-bold text-[#787B86] uppercase tracking-wider">Top Integrated</div>
                    <div className="px-3 py-1.5 text-sm text-[#131722] hover:bg-[#F0F3FA] rounded-lg cursor-pointer flex items-center justify-between">
                      <span>Interactive Brokers</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    </div>
                    <div className="px-3 py-1.5 text-sm text-[#131722] hover:bg-[#F0F3FA] rounded-lg cursor-pointer flex items-center justify-between">
                      <span>TradeStation</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    </div>
                    <div className="px-3 py-1.5 text-sm text-[#131722] hover:bg-[#F0F3FA] rounded-lg cursor-pointer flex items-center justify-between">
                      <span>OANDA</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    </div>
                    <div className="px-3 py-1.5 text-sm text-[#131722] hover:bg-[#F0F3FA] rounded-lg cursor-pointer flex items-center justify-between">
                      <span>Paper Trading</span>
                      <span className="text-[10px] text-[#2962FF] font-semibold">Active</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* More Dropdown */}
            <div className="relative" onMouseLeave={() => setMoreOpen(false)}>
              <button
                onMouseEnter={() => setMoreOpen(true)}
                onClick={() => setMoreOpen(!moreOpen)}
                className="text-[#131722] hover:text-[#2962FF] transition-colors flex items-center py-2"
              >
                More
                <ChevronDown className="w-3.5 h-3.5 ml-1 text-[#787B86]" />
              </button>
              {moreOpen && (
                <div className="absolute left-0 top-full pt-1 w-44 z-50">
                  <div className="bg-white rounded-xl shadow-lg border border-[#E0E3EB] p-2 space-y-1">
                    <a href="#pricing" onClick={() => setMoreOpen(false)} className="block px-3 py-2 text-sm text-[#131722] hover:bg-[#F0F3FA] rounded-lg">Pricing</a>
                    <a href="#desktop" onClick={() => setMoreOpen(false)} className="block px-3 py-2 text-sm text-[#131722] hover:bg-[#F0F3FA] rounded-lg">Desktop App</a>
                    <a href="#mobile" onClick={() => setMoreOpen(false)} className="block px-3 py-2 text-sm text-[#131722] hover:bg-[#F0F3FA] rounded-lg">Mobile App</a>
                    <a href="#about" onClick={() => setMoreOpen(false)} className="block px-3 py-2 text-sm text-[#131722] hover:bg-[#F0F3FA] rounded-lg">About Us</a>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right side: Language, User Profile & CTA Button */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Quick Paper Balance Badge */}
          <button
            onClick={onOpenPortfolio}
            className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[#F0F3FA] hover:bg-[#E0E3EB] text-xs font-semibold text-[#131722] transition-colors border border-transparent hover:border-[#E0E3EB]"
            title="Open Paper Trading Account"
          >
            <span className="text-[#787B86]">Paper:</span>
            <span className="text-[#089981] tabular-nums font-bold">
              ${portfolio.cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center text-sm font-semibold text-[#131722] hover:text-[#2962FF] px-2 py-1.5 rounded hover:bg-[#F0F3FA] transition-colors"
              title="Select Language"
            >
              <Globe className="w-4 h-4 mr-1 text-[#787B86]" />
              <span>{selectedLang}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-[#E0E3EB] p-1.5 z-50">
                <div className="text-[11px] font-semibold text-[#787B86] px-2.5 py-1">Select Language</div>
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setSelectedLang(l.code);
                      setLangOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg text-left transition-colors ${
                      selectedLang === l.code ? 'bg-[#F0F3FA] text-[#2962FF] font-semibold' : 'text-[#131722] hover:bg-[#F0F3FA]'
                    }`}
                  >
                    <span>{l.name}</span>
                    {selectedLang === l.code && <Check className="w-3.5 h-3.5 text-[#2962FF]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User profile icon button */}
          <button
            onClick={onOpenPortfolio}
            className="p-2 text-[#131722] hover:bg-[#F0F3FA] rounded-full transition-colors relative"
            title="User Profile & Portfolio"
          >
            <User className="w-5 h-5 text-[#131722]" />
            {portfolio.positions.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#2962FF] rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {/* CTA Button with vibrant gradient */}
          <button
            onClick={onOpenAuth}
            className="btn-gradient text-white text-xs sm:text-sm font-medium px-4 sm:px-5 py-2 rounded-full shadow-sm hover:opacity-95 active:scale-95 transition-all whitespace-nowrap"
          >
            Get started
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#131722] hover:bg-[#F0F3FA] rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[60px] left-0 right-0 bg-white border-b border-[#E0E3EB] shadow-lg p-4 space-y-3 z-50">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSuperchart('SPX');
              }}
              className="text-left py-2 px-3 rounded-lg text-sm font-semibold hover:bg-[#F0F3FA] text-[#131722]"
            >
              Supercharts
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortfolio();
              }}
              className="text-left py-2 px-3 rounded-lg text-sm font-semibold hover:bg-[#F0F3FA] text-[#131722] flex items-center justify-between"
            >
              <span>Paper Trading Account</span>
              <span className="text-[#089981] font-bold">${portfolio.cashBalance.toFixed(2)}</span>
            </button>
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg text-sm font-semibold text-[#2962FF] bg-[#F0F3FA]"
            >
              Markets Overview
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="text-left py-2 px-3 rounded-lg text-sm font-semibold hover:bg-[#F0F3FA] text-[#131722]"
            >
              Search Tickers (Ctrl+K)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
