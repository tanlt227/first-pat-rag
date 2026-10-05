import React from 'react';
import { X, DollarSign, Briefcase, TrendingUp, TrendingDown, RefreshCcw } from 'lucide-react';
import { UserPortfolio } from '../types';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: UserPortfolio;
  onClosePosition: (positionId: string) => void;
  onResetPortfolio: () => void;
  onOpenSuperchart: (ticker: string) => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  isOpen,
  onClose,
  portfolio,
  onClosePosition,
  onResetPortfolio,
  onOpenSuperchart,
}) => {
  if (!isOpen) return null;

  const positionsValue = portfolio.positions.reduce((acc, pos) => {
    return acc + pos.shares * pos.currentPrice;
  }, 0);

  const totalEquity = portfolio.cashBalance + positionsValue;
  const initialEquity = 100000;
  const totalPnL = totalEquity - initialEquity;
  const totalPnLPercent = (totalPnL / initialEquity) * 100;
  const isPos = totalPnL >= 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#E0E3EB] overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0E3EB] bg-[#F7F9FC]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#089981]/10 text-[#089981] flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#131722]">Paper Trading Account</h2>
              <p className="text-xs text-[#787B86]">Simulated real-time execution & virtual portfolio</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#787B86] hover:text-[#131722] hover:bg-[#E0E3EB] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Portfolio Stats Summary */}
        <div className="p-6 bg-white border-b border-[#E0E3EB] grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#F0F3FA] p-3.5 rounded-xl">
            <span className="text-xs text-[#787B86] block font-medium">Total Net Equity</span>
            <span className="text-xl font-bold text-[#131722] tabular-nums">
              ${totalEquity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="bg-[#F0F3FA] p-3.5 rounded-xl">
            <span className="text-xs text-[#787B86] block font-medium">Available Cash</span>
            <span className="text-xl font-bold text-[#131722] tabular-nums">
              ${portfolio.cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="bg-[#F0F3FA] p-3.5 rounded-xl">
            <span className="text-xs text-[#787B86] block font-medium">Unrealized P&L</span>
            <span
              className={`text-xl font-bold tabular-nums flex items-center space-x-1 ${
                isPos ? 'text-[#089981]' : 'text-[#F23645]'
              }`}
            >
              <span>{isPos ? `+$${totalPnL.toFixed(2)}` : `-$${Math.abs(totalPnL).toFixed(2)}`}</span>
              <span className="text-xs font-semibold">({isPos ? `+${totalPnLPercent.toFixed(2)}%` : `${totalPnLPercent.toFixed(2)}%`})</span>
            </span>
          </div>
        </div>

        {/* Open Positions List */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-[#131722]">
              Open Positions ({portfolio.positions.length})
            </h3>
            <button
              onClick={onResetPortfolio}
              className="text-xs text-[#787B86] hover:text-[#F23645] flex items-center space-x-1 transition-colors cursor-pointer"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              <span>Reset to $100,000</span>
            </button>
          </div>

          {portfolio.positions.length === 0 ? (
            <div className="py-12 text-center text-[#787B86] text-sm bg-[#F7F9FC] rounded-xl border border-dashed border-[#E0E3EB]">
              <p>No active positions yet.</p>
              <p className="text-xs text-[#787B86] mt-1">
                Click "Trade" on any stock, index, or crypto ticker to place simulated orders.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#F0F3FA] border border-[#E0E3EB] rounded-xl overflow-hidden">
              {portfolio.positions.map((pos) => {
                const posPnL = (pos.currentPrice - pos.entryPrice) * pos.shares * (pos.type === 'BUY' ? 1 : -1);
                const posPnLPct = ((pos.currentPrice - pos.entryPrice) / pos.entryPrice) * 100 * (pos.type === 'BUY' ? 1 : -1);
                const isPosPnL = posPnL >= 0;

                return (
                  <div
                    key={pos.id}
                    className="p-3.5 hover:bg-[#F7F9FC] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            onClose();
                            onOpenSuperchart(pos.ticker);
                          }}
                          className="font-bold text-sm text-[#131722] hover:text-[#2962FF]"
                        >
                          {pos.ticker}
                        </button>
                        <span
                          className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
                            pos.type === 'BUY'
                              ? 'bg-[#E8F5EE] text-[#089981]'
                              : 'bg-[#FDF0F1] text-[#F23645]'
                          }`}
                        >
                          {pos.type}
                        </span>
                        <span className="text-[#787B86]">{pos.name}</span>
                      </div>
                      <div className="text-[#787B86] mt-0.5 tabular-nums">
                        {pos.shares} shares @ ${pos.entryPrice.toFixed(2)} · Last: ${pos.currentPrice.toFixed(2)}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <span className="text-[#787B86] block text-[10px]">Position Value</span>
                        <strong className="text-sm font-semibold tabular-nums text-[#131722]">
                          ${(pos.shares * pos.currentPrice).toFixed(2)}
                        </strong>
                      </div>

                      <div className="text-right w-24">
                        <span className="text-[#787B86] block text-[10px]">P&L</span>
                        <span
                          className={`font-bold tabular-nums text-sm ${
                            isPosPnL ? 'text-[#089981]' : 'text-[#F23645]'
                          }`}
                        >
                          {isPosPnL ? `+$${posPnL.toFixed(2)}` : `-$${Math.abs(posPnL).toFixed(2)}`}
                        </span>
                      </div>

                      <button
                        onClick={() => onClosePosition(pos.id)}
                        className="px-3 py-1.5 bg-[#FDF0F1] hover:bg-[#fbdade] text-[#F23645] font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
