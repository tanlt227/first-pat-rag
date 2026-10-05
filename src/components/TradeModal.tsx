import React, { useState } from 'react';
import { X, Check, ShieldCheck, AlertCircle } from 'lucide-react';
import { AssetData } from '../data/marketData';
import { UserPortfolio } from '../types';

interface TradeModalProps {
  asset: AssetData | null;
  isOpen: boolean;
  onClose: () => void;
  portfolio: UserPortfolio;
  onExecuteTrade: (trade: {
    ticker: string;
    name: string;
    type: 'BUY' | 'SELL';
    shares: number;
    price: number;
  }) => void;
}

export const TradeModal: React.FC<TradeModalProps> = ({
  asset,
  isOpen,
  onClose,
  portfolio,
  onExecuteTrade,
}) => {
  if (!isOpen || !asset) return null;

  const [orderSide, setOrderSide] = useState<'BUY' | 'SELL'>('BUY');
  const [orderType, setOrderType] = useState<'Market' | 'Limit'>('Market');
  const [shares, setShares] = useState<number>(10);
  const [limitPrice, setLimitPrice] = useState<number>(asset.lastPrice);
  const [enableSL, setEnableSL] = useState(false);
  const [stopLoss, setStopLoss] = useState<number>(Number((asset.lastPrice * 0.95).toFixed(2)));
  const [enableTP, setEnableTP] = useState(false);
  const [takeProfit, setTakeProfit] = useState<number>(Number((asset.lastPrice * 1.10).toFixed(2)));
  const [submitted, setSubmitted] = useState(false);

  const execPrice = orderType === 'Market' ? asset.lastPrice : limitPrice;
  const totalCost = shares * execPrice;
  const canAfford = orderSide === 'SELL' || portfolio.cashBalance >= totalCost;

  const existingPosition = portfolio.positions.find((p) => p.ticker === asset.ticker);

  const handleQuickPercent = (pct: number) => {
    const budget = portfolio.cashBalance * pct;
    const computedShares = Math.max(1, Math.floor(budget / execPrice));
    setShares(computedShares);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canAfford && orderSide === 'BUY') return;
    if (shares <= 0) return;

    onExecuteTrade({
      ticker: asset.ticker,
      name: asset.name,
      type: orderSide,
      shares,
      price: execPrice,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#E0E3EB] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0E3EB] bg-[#F7F9FC]">
          <div className="flex items-center space-x-3">
            <span className={`${asset.badgeClass || 'bg-gray-800'} text-white font-bold text-xs w-7 h-7 rounded-full flex items-center justify-center`}>
              {asset.badge || asset.ticker.slice(0, 3)}
            </span>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-[#131722]">{asset.ticker}</span>
                <span className="text-xs text-[#787B86]">{asset.name}</span>
              </div>
              <div className="text-xs font-semibold tabular-nums text-[#131722]">
                ${asset.lastPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#787B86] hover:text-[#131722] hover:bg-[#E0E3EB] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#E8F5EE] text-[#089981] flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#131722]">Order Executed!</h3>
            <p className="text-sm text-[#787B86]">
              {orderSide} {shares} shares of {asset.ticker} at ${execPrice.toFixed(2)}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Buy / Sell Tabs */}
            <div className="grid grid-cols-2 p-1 bg-[#F0F3FA] rounded-xl gap-1">
              <button
                type="button"
                onClick={() => setOrderSide('BUY')}
                className={`py-2 text-sm font-bold rounded-lg transition-colors cursor-pointer ${
                  orderSide === 'BUY'
                    ? 'bg-[#089981] text-white shadow-xs'
                    : 'text-[#787B86] hover:text-[#131722]'
                }`}
              >
                Buy / Long
              </button>
              <button
                type="button"
                onClick={() => setOrderSide('SELL')}
                className={`py-2 text-sm font-bold rounded-lg transition-colors cursor-pointer ${
                  orderSide === 'SELL'
                    ? 'bg-[#F23645] text-white shadow-xs'
                    : 'text-[#787B86] hover:text-[#131722]'
                }`}
              >
                Sell / Short
              </button>
            </div>

            {/* Order Type: Market / Limit */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#787B86] font-medium">Order Type</span>
              <div className="flex items-center space-x-1 bg-[#F0F3FA] p-0.5 rounded-lg">
                <button
                  type="button"
                  onClick={() => setOrderType('Market')}
                  className={`px-3 py-1 rounded font-semibold transition-colors cursor-pointer ${
                    orderType === 'Market' ? 'bg-white text-[#131722] shadow-xs' : 'text-[#787B86]'
                  }`}
                >
                  Market
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('Limit')}
                  className={`px-3 py-1 rounded font-semibold transition-colors cursor-pointer ${
                    orderType === 'Limit' ? 'bg-white text-[#131722] shadow-xs' : 'text-[#787B86]'
                  }`}
                >
                  Limit
                </button>
              </div>
            </div>

            {orderType === 'Limit' && (
              <div>
                <label className="block text-xs font-semibold text-[#787B86] mb-1">
                  Limit Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(Number(e.target.value))}
                  className="w-full bg-[#F0F3FA] rounded-xl px-3 py-2 text-sm font-semibold tabular-nums text-[#131722] outline-none focus:ring-2 focus:ring-[#2962FF]"
                />
              </div>
            )}

            {/* Quantity */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-[#787B86]">Quantity</span>
                <span className="text-[#787B86] tabular-nums">
                  Cash: ${portfolio.cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <input
                type="number"
                min="1"
                step="1"
                value={shares}
                onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-[#F0F3FA] rounded-xl px-3 py-2 text-base font-bold tabular-nums text-[#131722] outline-none focus:ring-2 focus:ring-[#2962FF]"
              />

              {/* Quick % buttons */}
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[0.1, 0.25, 0.5, 1.0].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => handleQuickPercent(pct)}
                    className="py-1 bg-[#F0F3FA] hover:bg-[#E0E3EB] text-[11px] font-semibold text-[#787B86] hover:text-[#131722] rounded-lg transition-colors cursor-pointer"
                  >
                    {pct * 100}%
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Box */}
            <div className="p-3 bg-[#F0F3FA]/70 rounded-xl space-y-1.5 text-xs text-[#787B86]">
              <div className="flex justify-between">
                <span>Execution Price</span>
                <span className="font-semibold text-[#131722] tabular-nums">${execPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Value</span>
                <span className="font-bold text-[#131722] tabular-nums">${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between">
                <span>Broker Fee</span>
                <span className="text-[#089981] font-semibold">$0.00 (Commission-free)</span>
              </div>
            </div>

            {!canAfford && orderSide === 'BUY' && (
              <div className="flex items-center space-x-2 text-xs text-[#F23645] bg-[#FDF0F1] p-2.5 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Insufficient paper funds for this order. Lower quantity or reset account.</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!canAfford && orderSide === 'BUY'}
              className={`w-full py-3 rounded-xl font-bold text-sm text-white transition-all shadow-sm active:scale-98 cursor-pointer ${
                orderSide === 'BUY'
                  ? 'bg-[#089981] hover:bg-[#078570] disabled:bg-gray-300'
                  : 'bg-[#F23645] hover:bg-[#D92534] disabled:bg-gray-300'
              }`}
            >
              Confirm {orderSide} Order
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
