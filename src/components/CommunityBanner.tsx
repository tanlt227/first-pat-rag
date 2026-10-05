import React from 'react';

interface CommunityBannerProps {
  onExploreSupercharts: () => void;
}

export const CommunityBanner: React.FC<CommunityBannerProps> = ({
  onExploreSupercharts,
}) => {
  return (
    <section
      id="community"
      className="rounded-2xl bg-gradient-to-r from-[#131722] via-[#1A2234] to-[#1E2638] text-white p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between shadow-lg relative overflow-hidden"
      data-purpose="community-cta"
    >
      {/* Decorative background glow */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#2962FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-2 max-w-xl relative z-10">
        <span className="text-xs uppercase tracking-wider text-[#2962FF] font-bold">
          Community Powered
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Chart with 60 million traders and investors.
        </h3>
        <p className="text-gray-300 text-sm">
          Access unmatched technical analysis tools, interactive charts, and real-time community market opinions.
        </p>
      </div>

      <div className="mt-6 md:mt-0 flex items-center space-x-3 shrink-0 relative z-10 w-full sm:w-auto">
        <button
          onClick={onExploreSupercharts}
          className="w-full sm:w-auto text-center bg-[#2962FF] hover:bg-[#1E53E5] text-white text-sm font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
        >
          Explore Supercharts
        </button>
      </div>
    </section>
  );
};
