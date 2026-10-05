import React from 'react';
import { ChevronRight } from 'lucide-react';
import { AssetData } from '../data/marketData';

interface MultiAssetOverviewProps {
  crypto: AssetData[];
  forex: AssetData[];
  commodities: AssetData[];
  bonds: AssetData[];
  onSelectAsset: (ticker: string) => void;
  onTrade: (asset: AssetData) => void;
}

export const MultiAssetOverview: React.FC<MultiAssetOverviewProps> = ({
  crypto,
  forex,
  commodities,
  bonds,
  onSelectAsset,
  onTrade,
}) => {
  return (
    <section className="space-y-6" data-purpose="multi-asset-classes">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-[#E0E3EB] pb-3">
        <h2 className="text-xl sm:text-2xl font-bold text-[#131722]">
          World Markets At A Glance
        </h2>
        <div className="text-xs text-[#787B86] flex items-center space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#089981] animate-tv-pulse inline-block"></span>
          <span>Updated in real-time</span>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Crypto Column */}
        <div className="border border-[#E0E3EB] rounded-2xl p-5 bg-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#F0F3FA]">
              <button
                onClick={() => onSelectAsset('BTCUSD')}
                className="font-bold text-[#131722] hover:text-[#2962FF] flex items-center transition-colors group cursor-pointer"
              >
                <span>Crypto</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <span className="text-xs text-[#787B86] font-medium">USD</span>
            </div>

            <div className="mt-4 space-y-3.5 text-sm">
              {crypto.map((item) => {
                const isPos = item.changePercent >= 0;
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectAsset(item.ticker)}
                    className="flex items-center justify-between hover:bg-[#F0F3FA]/70 p-1.5 -mx-1.5 rounded-lg transition-colors cursor-pointer group"
                  >
                    <div>
                      <span className="font-bold block text-[#131722] group-hover:text-[#2962FF] transition-colors">
                        {item.ticker}
                      </span>
                      <span className="text-xs text-[#787B86]">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold block tabular-nums text-[#131722]">
                        ${item.lastPrice.toLocaleString('en-US', {
                          minimumFractionDigits: item.lastPrice < 2 ? 4 : 2,
                          maximumFractionDigits: item.lastPrice < 2 ? 4 : 2,
                        })}
                      </span>
                      <span
                        className={`text-xs font-semibold tabular-nums ${
                          isPos ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isPos ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Currencies (Forex) Column */}
        <div className="border border-[#E0E3EB] rounded-2xl p-5 bg-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#F0F3FA]">
              <button
                onClick={() => onSelectAsset('EURUSD')}
                className="font-bold text-[#131722] hover:text-[#2962FF] flex items-center transition-colors group cursor-pointer"
              >
                <span>Currencies</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <span className="text-xs text-[#787B86] font-medium">FX</span>
            </div>

            <div className="mt-4 space-y-3.5 text-sm">
              {forex.map((item) => {
                const isPos = item.changePercent >= 0;
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectAsset(item.ticker)}
                    className="flex items-center justify-between hover:bg-[#F0F3FA]/70 p-1.5 -mx-1.5 rounded-lg transition-colors cursor-pointer group"
                  >
                    <div>
                      <span className="font-bold block text-[#131722] group-hover:text-[#2962FF] transition-colors">
                        {item.ticker}
                      </span>
                      <span className="text-xs text-[#787B86]">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold block tabular-nums text-[#131722]">
                        {item.lastPrice.toLocaleString('en-US', {
                          minimumFractionDigits: item.lastPrice < 10 ? 5 : 2,
                          maximumFractionDigits: item.lastPrice < 10 ? 5 : 2,
                        })}
                      </span>
                      <span
                        className={`text-xs font-semibold tabular-nums ${
                          isPos ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isPos ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Commodities Column */}
        <div className="border border-[#E0E3EB] rounded-2xl p-5 bg-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#F0F3FA]">
              <button
                onClick={() => onSelectAsset('Gold')}
                className="font-bold text-[#131722] hover:text-[#2962FF] flex items-center transition-colors group cursor-pointer"
              >
                <span>Commodities</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <span className="text-xs text-[#787B86] font-medium">Futures</span>
            </div>

            <div className="mt-4 space-y-3.5 text-sm">
              {commodities.map((item) => {
                const isPos = item.changePercent >= 0;
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectAsset(item.ticker)}
                    className="flex items-center justify-between hover:bg-[#F0F3FA]/70 p-1.5 -mx-1.5 rounded-lg transition-colors cursor-pointer group"
                  >
                    <div>
                      <span className="font-bold block text-[#131722] group-hover:text-[#2962FF] transition-colors">
                        {item.ticker}
                      </span>
                      <span className="text-xs text-[#787B86]">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold block tabular-nums text-[#131722]">
                        ${item.lastPrice.toLocaleString('en-US', {
                          minimumFractionDigits: item.lastPrice < 10 ? 3 : 2,
                          maximumFractionDigits: item.lastPrice < 10 ? 3 : 2,
                        })}
                      </span>
                      <span
                        className={`text-xs font-semibold tabular-nums ${
                          isPos ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isPos ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Government Bonds Column */}
        <div className="border border-[#E0E3EB] rounded-2xl p-5 bg-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#F0F3FA]">
              <button
                onClick={() => onSelectAsset('US 10Y')}
                className="font-bold text-[#131722] hover:text-[#2962FF] flex items-center transition-colors group cursor-pointer"
              >
                <span>Bonds</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <span className="text-xs text-[#787B86] font-medium">Yield %</span>
            </div>

            <div className="mt-4 space-y-3.5 text-sm">
              {bonds.map((item) => {
                const isPos = item.changePrice >= 0;
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectAsset(item.ticker)}
                    className="flex items-center justify-between hover:bg-[#F0F3FA]/70 p-1.5 -mx-1.5 rounded-lg transition-colors cursor-pointer group"
                  >
                    <div>
                      <span className="font-bold block text-[#131722] group-hover:text-[#2962FF] transition-colors">
                        {item.ticker}
                      </span>
                      <span className="text-xs text-[#787B86]">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold block tabular-nums text-[#131722]">
                        {item.lastPrice.toFixed(3)}%
                      </span>
                      <span
                        className={`text-xs font-semibold tabular-nums ${
                          isPos ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isPos ? `+${item.changePrice.toFixed(3)}` : item.changePrice.toFixed(3)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
