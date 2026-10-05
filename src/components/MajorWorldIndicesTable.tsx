import React, { useState } from 'react';
import { AssetData } from '../data/marketData';
import { Sparkline } from './Sparkline';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MajorWorldIndicesTableProps {
  indices: AssetData[];
  onSelectIndex: (ticker: string) => void;
  onTrade: (asset: AssetData) => void;
}

export const MajorWorldIndicesTable: React.FC<MajorWorldIndicesTableProps> = ({
  indices,
  onSelectIndex,
  onTrade,
}) => {
  const [activeRegion, setActiveRegion] = useState<'America' | 'Europe' | 'Asia & Pacific' | 'all'>('America');

  const filteredIndices = activeRegion === 'all'
    ? indices
    : indices.filter((idx) => idx.region === activeRegion);

  return (
    <section
      id="major-world-indices"
      className="border border-[#E0E3EB] rounded-2xl p-4 sm:p-6 bg-white shadow-sm"
      data-purpose="world-indices-overview"
    >
      {/* Table Header & Region Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#F0F3FA] gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#131722]">Major World Indices</h2>
          <p className="text-xs text-[#787B86] mt-0.5">
            Global benchmark performance and real-time intraday tracking
          </p>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto custom-scrollbar pb-1 md:pb-0">
          <button
            onClick={() => setActiveRegion('America')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeRegion === 'America'
                ? 'bg-[#F0F3FA] text-[#131722]'
                : 'text-[#787B86] hover:bg-[#F0F3FA] hover:text-[#131722]'
            }`}
          >
            America
          </button>
          <button
            onClick={() => setActiveRegion('Europe')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeRegion === 'Europe'
                ? 'bg-[#F0F3FA] text-[#131722]'
                : 'text-[#787B86] hover:bg-[#F0F3FA] hover:text-[#131722]'
            }`}
          >
            Europe
          </button>
          <button
            onClick={() => setActiveRegion('Asia & Pacific')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeRegion === 'Asia & Pacific'
                ? 'bg-[#F0F3FA] text-[#131722]'
                : 'text-[#787B86] hover:bg-[#F0F3FA] hover:text-[#131722]'
            }`}
          >
            Asia & Pacific
          </button>
          <button
            onClick={() => setActiveRegion('all')}
            className={`text-xs font-semibold px-2 py-1.5 rounded-lg hover:underline transition-colors whitespace-nowrap ${
              activeRegion === 'all' ? 'text-[#2962FF] font-bold' : 'text-[#2962FF]'
            }`}
          >
            See all
          </button>
        </div>
      </div>

      {/* Indices Data Grid */}
      <div className="overflow-x-auto custom-scrollbar mt-2">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="text-xs text-[#787B86] border-b border-[#F0F3FA] uppercase">
              <th className="py-3 px-3">Ticker / Name</th>
              <th className="py-3 px-3 text-right">Last Price</th>
              <th className="py-3 px-3 text-right">Change ($)</th>
              <th className="py-3 px-3 text-right">Change (%)</th>
              <th className="py-3 px-3 text-center">Chart</th>
              <th className="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-[#F0F3FA]">
            {filteredIndices.map((idx) => {
              const isPos = idx.changePercent >= 0;
              return (
                <tr
                  key={idx.id}
                  onClick={() => onSelectIndex(idx.ticker)}
                  className="hover:bg-[#F7F9FC] transition-colors cursor-pointer group"
                >
                  {/* Ticker / Name */}
                  <td className="py-3.5 px-3 flex items-center space-x-3">
                    <span
                      className={`${
                        idx.badgeClass || 'bg-gray-800'
                      } text-white font-bold text-[10px] w-6 h-6 rounded-full flex items-center justify-center shrink-0 shadow-xs`}
                    >
                      {idx.badge}
                    </span>
                    <div>
                      <div className="font-bold text-[#131722] group-hover:text-[#2962FF] transition-colors">
                        {idx.ticker}
                      </div>
                      <div className="text-xs text-[#787B86]">{idx.name}</div>
                    </div>
                  </td>

                  {/* Last Price */}
                  <td className="py-3.5 px-3 text-right font-semibold tabular-nums text-[#131722]">
                    {idx.lastPrice.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>

                  {/* Change ($) */}
                  <td
                    className={`py-3.5 px-3 text-right tabular-nums font-medium ${
                      isPos ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {isPos ? `+${idx.changePrice.toFixed(2)}` : idx.changePrice.toFixed(2)}
                  </td>

                  {/* Change (%) */}
                  <td className="py-3.5 px-3 text-right tabular-nums">
                    <span
                      className={`inline-block font-semibold text-xs px-2 py-0.5 rounded ${
                        isPos
                          ? 'bg-[#E8F5EE] text-[#089981]'
                          : 'bg-[#FDF0F1] text-[#F23645]'
                      }`}
                    >
                      {isPos ? `+${idx.changePercent.toFixed(2)}%` : `${idx.changePercent.toFixed(2)}%`}
                    </span>
                  </td>

                  {/* Chart Sparkline */}
                  <td className="py-3.5 px-3 text-center">
                    <Sparkline
                      data={idx.sparkline}
                      isPositive={isPos}
                      width={84}
                      height={26}
                    />
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onTrade(idx)}
                      className="text-xs font-semibold text-[#2962FF] hover:bg-[#F0F3FA] active:bg-[#E0E3EB] px-2.5 py-1 rounded transition-colors"
                    >
                      Trade
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
