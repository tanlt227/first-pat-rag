/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { QuickIndicesStrip } from './components/QuickIndicesStrip';
import { MajorWorldIndicesTable } from './components/MajorWorldIndicesTable';
import { TrendingStocks } from './components/TrendingStocks';
import { EconomicCalendarCard } from './components/EconomicCalendarCard';
import { MultiAssetOverview } from './components/MultiAssetOverview';
import { CommunityBanner } from './components/CommunityBanner';
import { Footer } from './components/Footer';
import { SuperchartModal } from './components/SuperchartModal';
import { TradeModal } from './components/TradeModal';
import { SearchModal } from './components/SearchModal';
import { EconomicCalendarModal } from './components/EconomicCalendarModal';
import { PortfolioModal } from './components/PortfolioModal';
import { AuthModal } from './components/AuthModal';

import {
  INITIAL_QUICK_INDICES,
  INITIAL_MAJOR_INDICES,
  INITIAL_STOCKS,
  INITIAL_ECONOMIC_EVENTS,
  INITIAL_ASSET_CLASSES,
  AssetData,
} from './data/marketData';
import { UserPortfolio, Position } from './types';

export default function App() {
  // Market data states
  const [quickIndices, setQuickIndices] = useState<AssetData[]>(INITIAL_QUICK_INDICES);
  const [majorIndices, setMajorIndices] = useState<AssetData[]>(INITIAL_MAJOR_INDICES);
  const [stocks, setStocks] = useState(INITIAL_STOCKS);
  const [economicEvents, setEconomicEvents] = useState(INITIAL_ECONOMIC_EVENTS);
  const [assetClasses, setAssetClasses] = useState(INITIAL_ASSET_CLASSES);

  // Real-time live feed state
  const [isLiveActive, setIsLiveActive] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [currentCategory, setCurrentCategory] = useState<string>('all');

  // Paper Trading Portfolio state
  const [portfolio, setPortfolio] = useState<UserPortfolio>(() => {
    return {
      cashBalance: 100000,
      positions: [
        {
          id: 'pos-1',
          ticker: 'NVDA',
          name: 'NVIDIA',
          type: 'BUY',
          shares: 50,
          entryPrice: 121.50,
          currentPrice: 125.80,
          pnl: 215.00,
          pnlPercent: 3.53,
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    };
  });

  // Modal active states
  const [selectedAssetForChart, setSelectedAssetForChart] = useState<AssetData | null>(null);
  const [superchartOpen, setSuperchartOpen] = useState(false);
  const [tradeAsset, setTradeAsset] = useState<AssetData | null>(null);
  const [tradeOpen, setTradeOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [fullCalendarOpen, setFullCalendarOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  // Flattened all assets for quick search lookup
  const allAssets = useMemo(() => {
    const list: AssetData[] = [
      ...quickIndices,
      ...majorIndices,
      ...stocks.active,
      ...stocks.gainers,
      ...stocks.losers,
      ...assetClasses.crypto,
      ...assetClasses.forex,
      ...assetClasses.commodities,
      ...assetClasses.bonds,
    ];
    // deduplicate by ticker
    const unique = new Map<string, AssetData>();
    for (const item of list) {
      if (!unique.has(item.ticker)) {
        unique.set(item.ticker, item);
      }
    }
    return Array.from(unique.values());
  }, [quickIndices, majorIndices, stocks, assetClasses]);

  // Open superchart by ticker
  const handleOpenSuperchart = useCallback((ticker?: string) => {
    if (!ticker) {
      // Default to SPX
      const def = allAssets.find((a) => a.ticker === 'SPX') || allAssets[0];
      setSelectedAssetForChart(def);
    } else {
      const found = allAssets.find((a) => a.ticker.toUpperCase() === ticker.toUpperCase()) || allAssets[0];
      setSelectedAssetForChart(found);
    }
    setSuperchartOpen(true);
  }, [allAssets]);

  // Open trade modal
  const handleOpenTrade = useCallback((asset: AssetData) => {
    setTradeAsset(asset);
    setTradeOpen(true);
  }, []);

  // Handle trade execution
  const handleExecuteTrade = useCallback((trade: {
    ticker: string;
    name: string;
    type: 'BUY' | 'SELL';
    shares: number;
    price: number;
  }) => {
    const totalCost = trade.shares * trade.price;

    setPortfolio((prev) => {
      let newBalance = prev.cashBalance;
      if (trade.type === 'BUY') {
        newBalance -= totalCost;
      } else {
        newBalance += totalCost;
      }

      const newPosition: Position = {
        id: `pos-${Date.now()}`,
        ticker: trade.ticker,
        name: trade.name,
        type: trade.type,
        shares: trade.shares,
        entryPrice: trade.price,
        currentPrice: trade.price,
        pnl: 0,
        pnlPercent: 0,
        timestamp: new Date().toLocaleTimeString(),
      };

      return {
        cashBalance: newBalance,
        positions: [newPosition, ...prev.positions],
      };
    });
  }, []);

  // Close position
  const handleClosePosition = useCallback((positionId: string) => {
    setPortfolio((prev) => {
      const pos = prev.positions.find((p) => p.id === positionId);
      if (!pos) return prev;

      const proceeds = pos.shares * pos.currentPrice;
      return {
        cashBalance: prev.cashBalance + proceeds,
        positions: prev.positions.filter((p) => p.id !== positionId),
      };
    });
  }, []);

  // Reset portfolio
  const handleResetPortfolio = useCallback(() => {
    setPortfolio({
      cashBalance: 100000,
      positions: [],
    });
  }, []);

  // Real-time market tick simulation
  useEffect(() => {
    if (!isLiveActive) return;

    const interval = setInterval(() => {
      setLastUpdated(new Date());

      // Randomly nudge 1-2 major indices
      setMajorIndices((prev) =>
        prev.map((item) => {
          if (Math.random() > 0.4) return item;
          const delta = (Math.random() - 0.48) * (item.lastPrice * 0.0006);
          const newPrice = Number((item.lastPrice + delta).toFixed(2));
          const newChangePrice = Number((item.changePrice + delta).toFixed(2));
          const newPct = Number(((newChangePrice / (newPrice - newChangePrice)) * 100).toFixed(2));
          return {
            ...item,
            lastPrice: newPrice,
            changePrice: newChangePrice,
            changePercent: newPct,
          };
        })
      );

      // Randomly nudge quick indices
      setQuickIndices((prev) =>
        prev.map((item) => {
          if (Math.random() > 0.4) return item;
          const delta = (Math.random() - 0.48) * (item.lastPrice * 0.0006);
          const newPrice = Number((item.lastPrice + delta).toFixed(2));
          const newChangePrice = Number((item.changePrice + delta).toFixed(2));
          const newPct = Number(((newChangePrice / (newPrice - newChangePrice)) * 100).toFixed(2));
          return {
            ...item,
            lastPrice: newPrice,
            changePrice: newChangePrice,
            changePercent: newPct,
          };
        })
      );

      // Randomly nudge trending stocks
      setStocks((prev) => ({
        ...prev,
        active: prev.active.map((s) => {
          if (Math.random() > 0.5) return s;
          const delta = (Math.random() - 0.46) * 0.25;
          const newPrice = Number((s.lastPrice + delta).toFixed(2));
          const newChangePrice = Number((s.changePrice + delta).toFixed(2));
          const newPct = Number(((newChangePrice / (newPrice - newChangePrice)) * 100).toFixed(2));
          return { ...s, lastPrice: newPrice, changePrice: newChangePrice, changePercent: newPct };
        }),
      }));

      // Update positions current price for live portfolio valuation
      setPortfolio((prev) => ({
        ...prev,
        positions: prev.positions.map((pos) => {
          const match = allAssets.find((a) => a.ticker === pos.ticker);
          const curPrice = match ? match.lastPrice : pos.currentPrice;
          const pnl = (curPrice - pos.entryPrice) * pos.shares * (pos.type === 'BUY' ? 1 : -1);
          const pnlPercent = ((curPrice - pos.entryPrice) / pos.entryPrice) * 100 * (pos.type === 'BUY' ? 1 : -1);
          return {
            ...pos,
            currentPrice: curPrice,
            pnl,
            pnlPercent,
          };
        }),
      }));
    }, 3200);

    return () => clearInterval(interval);
  }, [isLiveActive, allAssets]);

  // Global Ctrl+K / Cmd+K keyboard shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const scrollToTable = () => {
    const el = document.getElementById('major-world-indices');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen flex flex-col antialiased text-[#131722] selection:bg-[#2962FF]/15 selection:text-[#2962FF]">
      {/* Main Header */}
      <Header
        onOpenSearch={() => setSearchOpen(true)}
        onOpenSuperchart={handleOpenSuperchart}
        onOpenPortfolio={() => setPortfolioOpen(true)}
        portfolio={portfolio}
        onOpenAuth={() => setAuthOpen(true)}
      />

      {/* Main Content Container */}
      <main className="flex-grow max-w-[1440px] w-full mx-auto px-4 lg:px-8 py-8 space-y-10">
        {/* Hero Title Section */}
        <HeroSection
          currentCategory={currentCategory}
          onSelectCategory={setCurrentCategory}
          isLiveActive={isLiveActive}
          onToggleLive={() => setIsLiveActive(!isLiveActive)}
          lastUpdated={lastUpdated}
        />

        {/* Primary Indices Quick Strip */}
        <QuickIndicesStrip
          indices={quickIndices}
          onSelectIndex={handleOpenSuperchart}
          onScrollToTable={scrollToTable}
        />

        {/* Major World Indices Table */}
        <MajorWorldIndicesTable
          indices={majorIndices}
          onSelectIndex={handleOpenSuperchart}
          onTrade={handleOpenTrade}
        />

        {/* Trending Stocks & Economic Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TrendingStocks
            stocks={stocks}
            onSelectStock={handleOpenSuperchart}
            onTrade={handleOpenTrade}
          />
          <EconomicCalendarCard
            events={economicEvents}
            onOpenFullCalendar={() => setFullCalendarOpen(true)}
          />
        </div>

        {/* Multi-Asset Overview: Crypto, Currencies, Commodities, Bonds */}
        <MultiAssetOverview
          crypto={assetClasses.crypto}
          forex={assetClasses.forex}
          commodities={assetClasses.commodities}
          bonds={assetClasses.bonds}
          onSelectAsset={handleOpenSuperchart}
          onTrade={handleOpenTrade}
        />

        {/* Community & Supercharts CTA Banner */}
        <CommunityBanner
          onExploreSupercharts={() => handleOpenSuperchart('SPX')}
        />
      </main>

      {/* Main Footer */}
      <Footer
        onOpenCalendar={() => setFullCalendarOpen(true)}
        onOpenSupercharts={() => handleOpenSuperchart('SPX')}
        onSelectCategory={setCurrentCategory}
      />

      {/* Modals & Overlays */}
      <SuperchartModal
        asset={selectedAssetForChart}
        isOpen={superchartOpen}
        onClose={() => setSuperchartOpen(false)}
        onTrade={handleOpenTrade}
      />

      <TradeModal
        asset={tradeAsset}
        isOpen={tradeOpen}
        onClose={() => setTradeOpen(false)}
        portfolio={portfolio}
        onExecuteTrade={handleExecuteTrade}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        allAssets={allAssets}
        onSelectAsset={handleOpenSuperchart}
        onTradeAsset={handleOpenTrade}
      />

      <EconomicCalendarModal
        isOpen={fullCalendarOpen}
        onClose={() => setFullCalendarOpen(false)}
        events={economicEvents}
      />

      <PortfolioModal
        isOpen={portfolioOpen}
        onClose={() => setPortfolioOpen(false)}
        portfolio={portfolio}
        onClosePosition={handleClosePosition}
        onResetPortfolio={handleResetPortfolio}
        onOpenSuperchart={handleOpenSuperchart}
      />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
      />
    </div>
  );
}
