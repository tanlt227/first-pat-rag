import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Filter, Search, Globe } from 'lucide-react';
import { EconomicEvent } from '../data/marketData';

interface EconomicCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: EconomicEvent[];
}

export const EconomicCalendarModal: React.FC<EconomicCalendarModalProps> = ({
  isOpen,
  onClose,
  events,
}) => {
  if (!isOpen) return null;

  const [impactFilter, setImpactFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const countries = ['all', 'United States', 'Eurozone', 'United Kingdom'];

  const filteredEvents = events.filter((evt) => {
    const matchesImpact = impactFilter === 'all' || evt.impact === impactFilter;
    const matchesCountry = countryFilter === 'all' || evt.country === countryFilter;
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesImpact && matchesCountry && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-[#E0E3EB] overflow-hidden flex flex-col max-h-[88vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0E3EB] bg-[#F7F9FC]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#2962FF]/10 text-[#2962FF] flex items-center justify-center">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#131722]">Global Economic Calendar</h2>
              <p className="text-xs text-[#787B86]">Real-time macroeconomic releases, rate decisions & corporate earnings</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#787B86] hover:text-[#131722] hover:bg-[#E0E3EB] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 border-b border-[#E0E3EB] bg-white flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Impact Filter */}
          <div className="flex items-center space-x-1.5">
            <span className="font-semibold text-[#787B86]">Impact:</span>
            {['all', 'High', 'Medium', 'Earnings'].map((imp) => (
              <button
                key={imp}
                onClick={() => setImpactFilter(imp)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  impactFilter === imp
                    ? 'bg-[#131722] text-white shadow-xs'
                    : 'bg-[#F0F3FA] text-[#787B86] hover:text-[#131722]'
                }`}
              >
                {imp === 'all' ? 'All Impacts' : imp}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-48 sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter events..."
              className="w-full bg-[#F0F3FA] rounded-lg px-3 py-1.5 text-xs text-[#131722] outline-none focus:ring-1 focus:ring-[#2962FF]"
            />
          </div>
        </div>

        {/* Calendar Events List */}
        <div className="overflow-y-auto custom-scrollbar flex-1 divide-y divide-[#F0F3FA]">
          {filteredEvents.length === 0 ? (
            <div className="py-16 text-center text-[#787B86] text-sm">
              No economic events matching current filters.
            </div>
          ) : (
            filteredEvents.map((evt) => (
              <div key={evt.id} className="p-4 hover:bg-[#F7F9FC] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start space-x-3.5">
                  <div className="w-14 text-xs font-bold text-[#787B86] pt-0.5 tabular-nums shrink-0">
                    {evt.time}
                  </div>
                  <div className="text-xl shrink-0 pt-0.5" title={evt.country}>
                    {evt.countryFlag}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-[#131722]">{evt.title}</span>
                      {evt.impact === 'High' && (
                        <span className="text-[10px] font-bold bg-[#FDF0F1] text-[#F23645] px-2 py-0.5 rounded">
                          High
                        </span>
                      )}
                      {evt.impact === 'Medium' && (
                        <span className="text-[10px] font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded">
                          Medium
                        </span>
                      )}
                      {evt.impact === 'Earnings' && (
                        <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                          Earnings
                        </span>
                      )}
                    </div>
                    {evt.subtitle && (
                      <div className="text-xs text-[#787B86] mt-0.5">{evt.subtitle}</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-xs tabular-nums self-end sm:self-center pl-16 sm:pl-0">
                  {evt.actual !== undefined && (
                    <div className="text-right">
                      <span className="text-[#787B86] block text-[10px] uppercase">Actual</span>
                      <strong className="text-[#131722] text-sm">{evt.actual}</strong>
                    </div>
                  )}
                  {evt.forecast && (
                    <div className="text-right">
                      <span className="text-[#787B86] block text-[10px] uppercase">Forecast</span>
                      <span className="text-[#787B86] font-medium">{evt.forecast}</span>
                    </div>
                  )}
                  {evt.prior && (
                    <div className="text-right">
                      <span className="text-[#787B86] block text-[10px] uppercase">Prior</span>
                      <span className="text-[#787B86] font-medium">{evt.prior}</span>
                    </div>
                  )}
                  {evt.estEps && (
                    <div className="text-right">
                      <span className="text-[#787B86] block text-[10px] uppercase">Est EPS</span>
                      <strong className="text-[#131722] font-semibold">{evt.estEps}</strong>
                    </div>
                  )}
                  {evt.estRev && (
                    <div className="text-right">
                      <span className="text-[#787B86] block text-[10px] uppercase">Est Rev</span>
                      <strong className="text-[#131722] font-semibold">{evt.estRev}</strong>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#F7F9FC] border-t border-[#E0E3EB] flex justify-between items-center text-xs text-[#787B86]">
          <span>Data source: Global Macro Economic Feed</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#E0E3EB] hover:bg-[#D5D8E0] text-[#131722] font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
