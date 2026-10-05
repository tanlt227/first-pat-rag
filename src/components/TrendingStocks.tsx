import React, { useState } from 'react';
import { AssetData } from '../data/marketData';

interface TrendingStocksProps {
  stocks: {
    active: AssetData[];
    gainers: AssetData[];
    losers: AssetData[];
  };
  onSelectStock: (ticker: string) => void;
  onTrade: (asset: AssetData) => void;
}

export const TrendingStocks: React.FC<TrendingStocksProps> = ({
  stocks,
  onSelectStock,
  onTrade,
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'gainers' | 'losers'>('active');

  const currentStocks = stocks[activeTab] || stocks.active;

  return (
    <section
      className="lg:col-span-2 border border-[#E0E3EB] rounded-2xl p-5 sm:p-6 bg-white shadow-sm flex flex-col justify-between"
      data-purpose="market-movers-stocks"
    >
      <div>
        {/* Header & Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F0F3FA] gap-3">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-[#131722]">Trending Stocks</h2>
            <span className="bg-[#F0F3FA] text-[#2962FF] text-xs font-semibold px-2 py-0.5 rounded-full">
              US Market
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs font-medium">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'active'
                  ? 'bg-[#131722] text-white shadow-xs'
                  : 'text-[#787B86] hover:bg-[#F0F3FA]'
              }`}
            >
              Most Active
            </button>
            <button
              onClick={() => setActiveTab('gainers')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'gainers'
                  ? 'bg-[#131722] text-white shadow-xs'
                  : 'text-[#787B86] hover:bg-[#F0F3FA]'
              }`}
            >
              Top Gainers
            </button>
            <button
              onClick={() => setActiveTab('losers')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'losers'
                  ? 'bg-[#131722] text-white shadow-xs'
                  : 'text-[#787B86] hover:bg-[#F0F3FA]'
              }`}
            >
              Top Losers
            </button>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          {currentStocks.map((stock) => {
            const isPos = stock.changePercent >= 0;
            return (
              <div
                key={stock.id}
                onClick={() => onSelectStock(stock.ticker)}
                className="border border-[#F0F3FA] hover:border-[#2962FF] rounded-xl p-4 transition-all hover:shadow-md cursor-pointer group bg-white"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs tracking-tight ${stock.badgeClass}`}
                    >
                      {stock.badge}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#131722] text-base group-hover:text-[#2962FF] transition-colors">
                        {stock.name}
                      </h3>
                      <span className="text-xs text-[#787B86]">{stock.exchange || 'NASDAQ'}</span>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded tabular-nums ${
                      isPos ? 'bg-[#E8F5EE] text-[#089981]' : 'bg-[#FDF0F1] text-[#F23645]'
                    }`}
                  >
                    {isPos ? `+${stock.changePercent.toFixed(2)}%` : `${stock.changePercent.toFixed(2)}%`}
                  </span>
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <span className="text-2xl font-bold tabular-nums text-[#131722]">
                    ${stock.lastPrice.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-[#787B86] tabular-nums">
                      Vol: {stock.volume}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onTrade(stock);
                      }}
                      className="opacity-0 group-hover:opacity-100 text-[11px] font-semibold text-[#2962FF] hover:underline transition-opacity ml-1"
                    >
                      Trade
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
