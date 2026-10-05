import React from 'react';
import { ChevronRight } from 'lucide-react';
import { AssetData } from '../data/marketData';

interface QuickIndicesStripProps {
  indices: AssetData[];
  onSelectIndex: (ticker: string) => void;
  onScrollToTable: () => void;
}

export const QuickIndicesStrip: React.FC<QuickIndicesStripProps> = ({
  indices,
  onSelectIndex,
  onScrollToTable,
}) => {
  return (
    <section className="space-y-4" data-purpose="primary-indices-selector">
      {/* Indices Header Link */}
      <div className="flex items-center space-x-1">
        <button
          onClick={onScrollToTable}
          className="text-2xl font-bold text-[#131722] hover:text-[#2962FF] flex items-center transition-colors group"
        >
          <span>Indices</span>
          <ChevronRight className="w-5 h-5 ml-1 stroke-[3] text-[#131722] group-hover:text-[#2962FF] group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>

      {/* Quick Ticker Horizontal Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {indices.map((idx) => {
          const isPos = idx.changePercent >= 0;
          return (
            <div
              key={idx.id}
              onClick={() => onSelectIndex(idx.ticker)}
              className="bg-[#F0F3FA] hover:bg-[#E8ECF5] cursor-pointer rounded-full px-4 py-2.5 flex items-center justify-between transition-colors border border-transparent hover:border-[#E0E3EB] group shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
            >
              <div className="flex items-center space-x-3">
                <span
                  className={`${idx.badgeClass || 'bg-gray-800'} text-white font-bold text-xs w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-sm`}
                >
                  {idx.badge}
                </span>
                <span className="font-semibold text-sm text-[#131722] group-hover:text-[#2962FF] transition-colors">
                  {idx.name}
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold tabular-nums text-[#131722] block sm:inline">
                  {idx.lastPrice.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span
                  className={`text-xs font-semibold ml-2 tabular-nums ${
                    isPos ? 'text-[#089981]' : 'text-[#F23645]'
                  }`}
                >
                  {isPos ? `+${idx.changePercent.toFixed(2)}%` : `${idx.changePercent.toFixed(2)}%`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
