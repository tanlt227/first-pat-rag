import React from 'react';

interface FooterProps {
  onOpenCalendar: () => void;
  onOpenSupercharts: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCalendar,
  onOpenSupercharts,
  onSelectCategory,
}) => {
  return (
    <footer
      className="border-t border-[#E0E3EB] bg-[#FFFFFF] mt-16 pt-12 pb-8 text-xs text-[#787B86]"
      data-purpose="site-footer"
    >
      <div className="max-w-[1440px] w-full mx-auto px-4 lg:px-8">
        {/* Footer Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-10 border-b border-[#F0F3FA]">
          {/* Col 1: Products */}
          <div className="space-y-3">
            <div className="font-bold text-[#131722] text-sm">Products</div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenSupercharts}
                  className="hover:text-[#2962FF] transition-colors text-left"
                >
                  Supercharts
                </button>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition-colors" href="#">
                  Pine Script™
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition-colors" href="#">
                  Stock Screener
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition-colors" href="#">
                  Forex Screener
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition-colors" href="#">
                  Crypto Coins Screener
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenCalendar}
                  className="hover:text-[#2962FF] transition-colors text-left"
                >
                  Economic Calendar
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Company */}
          <div className="space-y-3">
            <div className="font-bold text-[#131722] text-sm">Company</div>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-[#2962FF] transition-colors" href="#">
                  About
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition-colors" href="#">
                  Features
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition-colors" href="#">
                  Pricing
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition-colors" href="#">
                  Social Wall of Love
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition-colors" href="#">
                  Athletes & Ambassadors
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition-colors" href="#">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Community */}
          <div className="space-y-3">
            <div className="font-bold text-[#131722] text-sm">Community</div>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-[#2962FF] transition-colors" href="#">
                  Refer a friend
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition-colors" href="#">
                  Ideas
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition-colors" href="#">
                  Scripts
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition-colors" href="#">
                  House Rules
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition-colors" href="#">
                  Moderators
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: For Business */}
          <div className="space-y-3">
            <div className="font-bold text-[#131722] text-sm">For Business</div>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-[#2962FF] transition-colors" href="#">
                  Charting Solutions
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition-colors" href="#">
                  Lightweight Charts™
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition-colors" href="#">
                  Brokerage Integration
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition-colors" href="#">
                  Partner Program
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition-colors" href="#">
                  Advertising
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Markets */}
          <div className="space-y-3">
            <div className="font-bold text-[#131722] text-sm">Markets</div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('indices')}
                  className="hover:text-[#2962FF] transition-colors text-left"
                >
                  Indices
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('stocks')}
                  className="hover:text-[#2962FF] transition-colors text-left"
                >
                  US Stocks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('crypto')}
                  className="hover:text-[#2962FF] transition-colors text-left"
                >
                  Crypto Assets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('forex')}
                  className="hover:text-[#2962FF] transition-colors text-left"
                >
                  Forex Pairs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('commodities')}
                  className="hover:text-[#2962FF] transition-colors text-left"
                >
                  Commodity Futures
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('indices')}
                  className="hover:text-[#2962FF] transition-colors text-left"
                >
                  Government Bonds
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs text-[#787B86]">
              © 2024 TradingView, Inc. All rights reserved.
            </span>
            <a className="hover:text-[#131722] transition-colors" href="#">
              Terms of use
            </a>
            <a className="hover:text-[#131722] transition-colors" href="#">
              Privacy policy
            </a>
            <a className="hover:text-[#131722] transition-colors" href="#">
              Security
            </a>
          </div>
          <div className="text-xs text-[#787B86] text-center md:text-right">
            Quotes data is real-time or delayed per exchange regulations.
          </div>
        </div>
      </div>
    </footer>
  );
};
