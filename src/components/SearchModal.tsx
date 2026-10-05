import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { AssetData } from '../data/marketData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  allAssets: AssetData[];
  onSelectAsset: (ticker: string) => void;
  onTradeAsset: (asset: AssetData) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  allAssets,
  onSelectAsset,
  onTradeAsset,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const filteredAssets = allAssets.filter((asset) => {
    const matchesQuery =
      asset.ticker.toLowerCase().includes(query.toLowerCase()) ||
      asset.name.toLowerCase().includes(query.toLowerCase());
    const matchesCat =
      categoryFilter === 'all' || asset.category === categoryFilter;
    return matchesQuery && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-xs">
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#E0E3EB] overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="p-4 border-b border-[#E0E3EB] flex items-center space-x-3 bg-white">
          <Search className="w-5 h-5 text-[#787B86] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbols, companies, currencies, crypto..."
            className="w-full text-base text-[#131722] placeholder-[#787B86] outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#787B86] hover:text-[#131722] p-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-[#787B86] hover:text-[#131722] hover:bg-[#F0F3FA] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Categories Chips */}
        <div className="px-4 py-2 bg-[#F7F9FC] border-b border-[#E0E3EB] flex items-center space-x-2 overflow-x-auto custom-scrollbar text-xs">
          {[
            { id: 'all', label: 'All' },
            { id: 'stock', label: 'Stocks' },
            { id: 'index', label: 'Indices' },
            { id: 'crypto', label: 'Crypto' },
            { id: 'forex', label: 'Forex' },
            { id: 'commodity', label: 'Commodities' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-[#131722] text-white shadow-xs'
                  : 'bg-white text-[#787B86] border border-[#E0E3EB] hover:text-[#131722]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto custom-scrollbar p-2 flex-1 divide-y divide-[#F0F3FA]">
          {filteredAssets.length === 0 ? (
            <div className="py-12 text-center text-[#787B86] text-sm">
              No results found for "{query}". Try searching for SPX, NVDA, BTC, or Gold.
            </div>
          ) : (
            filteredAssets.map((asset) => {
              const isPos = asset.changePercent >= 0;
              return (
                <div
                  key={asset.id}
                  onClick={() => {
                    onSelectAsset(asset.ticker);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F0F3FA] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`${
                        asset.badgeClass || 'bg-gray-800'
                      } text-white font-bold text-xs w-7 h-7 rounded-full flex items-center justify-center shrink-0`}
                    >
                      {asset.badge || asset.ticker.slice(0, 3)}
                    </span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-[#131722] group-hover:text-[#2962FF] transition-colors">
                          {asset.ticker}
                        </span>
                        <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-[#E0E3EB]/70 text-[#787B86]">
                          {asset.category}
                        </span>
                      </div>
                      <div className="text-xs text-[#787B86] truncate max-w-xs">{asset.name}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-right">
                    <div>
                      <div className="font-semibold text-sm tabular-nums text-[#131722]">
                        ${asset.lastPrice.toLocaleString('en-US', {
                          minimumFractionDigits: asset.lastPrice < 2 ? 4 : 2,
                          maximumFractionDigits: asset.lastPrice < 2 ? 4 : 2,
                        })}
                      </div>
                      <div
                        className={`text-xs font-semibold tabular-nums ${
                          isPos ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isPos ? `+${asset.changePercent.toFixed(2)}%` : `${asset.changePercent.toFixed(2)}%`}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onTradeAsset(asset);
                        onClose();
                      }}
                      className="text-xs font-semibold text-[#2962FF] hover:bg-white px-2.5 py-1 rounded-lg border border-[#E0E3EB] transition-colors"
                    >
                      Trade
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2.5 bg-[#F7F9FC] border-t border-[#E0E3EB] text-[11px] text-[#787B86] flex justify-between">
          <span>Click any result to view Superchart</span>
          <span>Press <kbd className="bg-white border border-[#E0E3EB] px-1 rounded">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};
