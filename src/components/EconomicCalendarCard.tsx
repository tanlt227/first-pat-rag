import React from 'react';
import { EconomicEvent } from '../data/marketData';

interface EconomicCalendarCardProps {
  events: EconomicEvent[];
  onOpenFullCalendar: () => void;
}

export const EconomicCalendarCard: React.FC<EconomicCalendarCardProps> = ({
  events,
  onOpenFullCalendar,
}) => {
  const displayEvents = events.slice(0, 3);

  return (
    <section
      className="border border-[#E0E3EB] rounded-2xl p-5 sm:p-6 bg-white shadow-sm flex flex-col justify-between"
      data-purpose="economic-calendar"
    >
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#F0F3FA]">
          <h2 className="text-lg font-bold text-[#131722]">Key Events Today</h2>
          <button
            onClick={onOpenFullCalendar}
            className="text-xs font-semibold text-[#2962FF] hover:underline cursor-pointer"
          >
            Calendar →
          </button>
        </div>

        <div className="mt-4 space-y-3.5">
          {displayEvents.map((evt) => {
            const isHigh = evt.impact === 'High';
            const isMed = evt.impact === 'Medium';
            const isEarnings = evt.impact === 'Earnings';

            return (
              <div
                key={evt.id}
                onClick={onOpenFullCalendar}
                className="p-3 rounded-xl bg-[#F0F3FA]/60 hover:bg-[#F0F3FA] transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs text-[#787B86]">
                  <span className="tabular-nums font-medium">{evt.time}</span>
                  {isHigh && <span className="text-red-500 font-semibold">High Impact</span>}
                  {isMed && <span className="text-yellow-600 font-semibold">Medium Impact</span>}
                  {isEarnings && <span className="text-[#787B86] font-medium">Earnings Release</span>}
                  {evt.impact === 'Low' && <span className="text-[#089981] font-medium">Low Impact</span>}
                </div>

                <div className="font-semibold text-sm text-[#131722] mt-1 group-hover:text-[#2962FF] transition-colors">
                  {evt.title}
                </div>

                {evt.subtitle && (
                  <div className="text-xs text-[#787B86] mt-1">
                    {evt.subtitle}
                  </div>
                )}

                {evt.actual !== undefined && (
                  <div className="text-xs text-[#787B86] mt-1 flex justify-between tabular-nums">
                    <span>
                      Actual: <strong className="text-[#131722] font-semibold">{evt.actual}</strong>
                    </span>
                    <span>Forecast: {evt.forecast}</span>
                    <span>Prior: {evt.prior}</span>
                  </div>
                )}

                {evt.estEps && (
                  <div className="text-xs text-[#787B86] mt-1 flex justify-between tabular-nums">
                    <span>Est EPS: <strong className="text-[#131722] font-semibold">{evt.estEps}</strong></span>
                    <span>Est Rev: <strong className="text-[#131722] font-semibold">{evt.estRev}</strong></span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={onOpenFullCalendar}
        className="mt-4 w-full py-2.5 text-xs font-semibold text-[#131722] bg-[#F0F3FA] hover:bg-[#E0E3EB] rounded-xl transition-colors cursor-pointer"
      >
        Open Full Economic Calendar
      </button>
    </section>
  );
};
