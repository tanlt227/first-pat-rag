import React, { useState, useMemo } from 'react';
import { X, Maximize2, Minimize2, TrendingUp, TrendingDown, Layers, BarChart2, Activity, Sliders, ChevronDown } from 'lucide-react';
import { AssetData } from '../data/marketData';
import { ChartType, Timeframe } from '../types';

interface SuperchartModalProps {
  asset: AssetData | null;
  isOpen: boolean;
  onClose: () => void;
  onTrade: (asset: AssetData) => void;
}

export const SuperchartModal: React.FC<SuperchartModalProps> = ({
  asset,
  isOpen,
  onClose,
  onTrade,
}) => {
  if (!isOpen || !asset) return null;

  const [timeframe, setTimeframe] = useState<Timeframe>('1D');
  const [chartType, setChartType] = useState<ChartType>('candlestick');
  const [showMA, setShowMA] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [showRSI, setShowRSI] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const isPos = asset.changePercent >= 0;

  // Generate realistic OHLC candlesticks based on the asset's price and timeframe
  const candleData = useMemo(() => {
    const count = 36;
    const basePrice = asset.lastPrice;
    const volatility = basePrice * 0.006;
    const candles = [];
    let current = asset.open || basePrice * 0.995;

    for (let i = 0; i < count; i++) {
      const isUp = Math.sin(i * 0.7) + (Math.random() - 0.45) > 0;
      const move = (Math.random() * volatility) * (isUp ? 1 : -0.85);
      const open = current;
      const close = Math.max(open * 0.9, open + move);
      const high = Math.max(open, close) + Math.random() * (volatility * 0.6);
      const low = Math.min(open, close) - Math.random() * (volatility * 0.6);
      const volume = Math.floor(10000 + Math.random() * 80000);
      
      candles.push({
        time: `${9 + Math.floor((i * 15) / 60)}:${((i * 15) % 60).toString().padStart(2, '0')}`,
        open,
        high,
        low,
        close,
        volume,
        isBullish: close >= open,
      });

      current = close;
    }

    // Force the last candle close to match current asset lastPrice
    const last = candles[candles.length - 1];
    last.close = asset.lastPrice;
    last.high = Math.max(last.high, asset.lastPrice);
    last.low = Math.min(last.low, asset.lastPrice);
    last.isBullish = last.close >= last.open;

    return candles;
  }, [asset.id, timeframe, asset.lastPrice]);

  // Dimensions for SVG canvas
  const svgWidth = 800;
  const svgHeight = 360;
  const chartHeight = showRSI ? 260 : 310;
  const rsiHeight = showRSI ? 60 : 0;
  const paddingRight = 65;
  const paddingLeft = 15;
  const paddingTop = 25;
  const plotWidth = svgWidth - paddingLeft - paddingRight;

  const minPrice = Math.min(...candleData.map((c) => c.low)) * 0.998;
  const maxPrice = Math.max(...candleData.map((c) => c.high)) * 1.002;
  const priceRange = maxPrice - minPrice || 1;

  const maxVolume = Math.max(...candleData.map((c) => c.volume));

  const scaleY = (p: number) => {
    return chartHeight - paddingTop - ((p - minPrice) / priceRange) * (chartHeight - paddingTop * 2) + paddingTop;
  };

  const candleWidth = Math.max(4, plotWidth / candleData.length - 4);

  // Moving Average 10
  const maPoints = candleData.map((c, i) => {
    const slice = candleData.slice(Math.max(0, i - 7), i + 1);
    const avg = slice.reduce((acc, curr) => acc + curr.close, 0) / slice.length;
    const x = paddingLeft + (i / (candleData.length - 1)) * plotWidth;
    const y = scaleY(avg);
    return { x, y };
  });

  const maPathD = maPoints.reduce((acc, pt, idx) => `${acc} ${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`, '');

  const activeCandle = hoverIndex !== null ? candleData[hoverIndex] : candleData[candleData.length - 1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-[#E0E3EB] flex flex-col overflow-hidden max-h-[92vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Superchart Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#E0E3EB] bg-[#F7F9FC]">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <span className={`${asset.badgeClass || 'bg-gray-800'} text-white font-bold text-xs w-7 h-7 rounded-full flex items-center justify-center shadow-xs`}>
              {asset.badge || asset.ticker.slice(0, 3)}
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-[#131722]">{asset.ticker}</span>
                <span className="text-xs text-[#787B86] font-medium hidden sm:inline">{asset.name}</span>
                <span className="text-[11px] bg-[#E0E3EB] text-[#131722] px-1.5 py-0.2 rounded font-semibold">
                  {asset.exchange || 'INDEX'}
                </span>
              </div>
            </div>
            <div className="pl-2 border-l border-[#E0E3EB] flex items-baseline space-x-2">
              <span className="text-xl font-bold tabular-nums text-[#131722]">
                ${asset.lastPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className={`text-xs font-semibold tabular-nums ${isPos ? 'text-[#089981]' : 'text-[#F23645]'}`}>
                {isPos ? `+${asset.changePercent.toFixed(2)}%` : `${asset.changePercent.toFixed(2)}%`}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onTrade(asset)}
              className="bg-[#2962FF] hover:bg-[#1E53E5] text-white text-xs font-semibold px-4 py-1.5 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Trade {asset.ticker}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#787B86] hover:text-[#131722] hover:bg-[#E0E3EB] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chart Toolbar Controls */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-2 border-b border-[#E0E3EB] text-xs gap-2 bg-white">
          {/* Timeframes */}
          <div className="flex items-center space-x-1 bg-[#F0F3FA] p-1 rounded-lg">
            {(['1D', '5D', '1M', '3M', '1Y', 'ALL'] as Timeframe[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                  timeframe === tf
                    ? 'bg-white text-[#2962FF] shadow-xs'
                    : 'text-[#787B86] hover:text-[#131722]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Chart Type & Indicators */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 border-r border-[#E0E3EB] pr-3">
              <button
                onClick={() => setChartType('candlestick')}
                className={`px-2 py-1 rounded font-medium transition-colors ${
                  chartType === 'candlestick' ? 'bg-[#F0F3FA] text-[#2962FF]' : 'text-[#787B86] hover:text-[#131722]'
                }`}
              >
                Candles
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`px-2 py-1 rounded font-medium transition-colors ${
                  chartType === 'line' ? 'bg-[#F0F3FA] text-[#2962FF]' : 'text-[#787B86] hover:text-[#131722]'
                }`}
              >
                Line
              </button>
              <button
                onClick={() => setChartType('area')}
                className={`px-2 py-1 rounded font-medium transition-colors ${
                  chartType === 'area' ? 'bg-[#F0F3FA] text-[#2962FF]' : 'text-[#787B86] hover:text-[#131722]'
                }`}
              >
                Area
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowMA(!showMA)}
                className={`px-2 py-1 rounded font-medium text-xs border ${
                  showMA ? 'border-[#2962FF] bg-[#2962FF]/10 text-[#2962FF]' : 'border-[#E0E3EB] text-[#787B86]'
                }`}
              >
                MA (10)
              </button>
              <button
                onClick={() => setShowVolume(!showVolume)}
                className={`px-2 py-1 rounded font-medium text-xs border ${
                  showVolume ? 'border-[#2962FF] bg-[#2962FF]/10 text-[#2962FF]' : 'border-[#E0E3EB] text-[#787B86]'
                }`}
              >
                Vol
              </button>
              <button
                onClick={() => setShowRSI(!showRSI)}
                className={`px-2 py-1 rounded font-medium text-xs border ${
                  showRSI ? 'border-[#2962FF] bg-[#2962FF]/10 text-[#2962FF]' : 'border-[#E0E3EB] text-[#787B86]'
                }`}
              >
                RSI (14)
              </button>
            </div>
          </div>
        </div>

        {/* OHLC Bar Info */}
        <div className="px-6 py-2 bg-white flex items-center space-x-4 text-xs tabular-nums text-[#787B86] border-b border-[#F0F3FA]">
          <span>Time: <strong className="text-[#131722]">{activeCandle.time}</strong></span>
          <span>O: <strong className="text-[#131722]">${activeCandle.open.toFixed(2)}</strong></span>
          <span>H: <strong className="text-[#131722]">${activeCandle.high.toFixed(2)}</strong></span>
          <span>L: <strong className="text-[#131722]">${activeCandle.low.toFixed(2)}</strong></span>
          <span>C: <strong className={`${activeCandle.isBullish ? 'text-[#089981]' : 'text-[#F23645]'}`}>${activeCandle.close.toFixed(2)}</strong></span>
          <span>Vol: <strong className="text-[#131722]">{activeCandle.volume.toLocaleString()}</strong></span>
        </div>

        {/* Main Chart Graphic Canvas */}
        <div className="p-4 sm:p-6 bg-white overflow-hidden flex-1 select-none">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-72 sm:h-96"
            onMouseLeave={() => setHoverIndex(null)}
          >
            {/* Grid lines */}
            {[0.2, 0.4, 0.6, 0.8].map((ratio) => {
              const y = paddingTop + ratio * (chartHeight - paddingTop * 2);
              const priceVal = maxPrice - ratio * priceRange;
              return (
                <g key={ratio}>
                  <line
                    x1={paddingLeft}
                    y1={y}
                    x2={svgWidth - paddingRight}
                    y2={y}
                    stroke="#F0F3FA"
                    strokeDasharray="3 3"
                  />
                  <text
                    x={svgWidth - paddingRight + 8}
                    y={y + 4}
                    fontSize="10"
                    fill="#787B86"
                    className="tabular-nums"
                  >
                    ${priceVal.toFixed(2)}
                  </text>
                </g>
              );
            })}

            {/* Current Price Reference Line */}
            {(() => {
              const curY = scaleY(asset.lastPrice);
              return (
                <g>
                  <line
                    x1={paddingLeft}
                    y1={curY}
                    x2={svgWidth - paddingRight}
                    y2={curY}
                    stroke={isPos ? '#089981' : '#F23645'}
                    strokeDasharray="2 2"
                    strokeWidth="1.2"
                  />
                  <rect
                    x={svgWidth - paddingRight + 4}
                    y={curY - 9}
                    width={56}
                    height={18}
                    rx="3"
                    fill={isPos ? '#089981' : '#F23645'}
                  />
                  <text
                    x={svgWidth - paddingRight + 8}
                    y={curY + 3}
                    fontSize="10"
                    fill="#FFFFFF"
                    fontWeight="bold"
                    className="tabular-nums"
                  >
                    ${asset.lastPrice.toFixed(2)}
                  </text>
                </g>
              );
            })()}

            {/* Volume Histogram */}
            {showVolume && (
              <g opacity="0.25">
                {candleData.map((c, i) => {
                  const x = paddingLeft + (i / (candleData.length - 1)) * plotWidth;
                  const vHeight = (c.volume / maxVolume) * 55;
                  const y = chartHeight - vHeight;
                  return (
                    <rect
                      key={`vol-${i}`}
                      x={x - candleWidth / 2}
                      y={y}
                      width={candleWidth}
                      height={vHeight}
                      fill={c.isBullish ? '#089981' : '#F23645'}
                    />
                  );
                })}
              </g>
            )}

            {/* Moving Average Line */}
            {showMA && (
              <path
                d={maPathD}
                fill="none"
                stroke="#2962FF"
                strokeWidth="1.8"
                opacity="0.85"
              />
            )}

            {/* Chart Type: Candlestick */}
            {chartType === 'candlestick' && (
              <g>
                {candleData.map((c, i) => {
                  const x = paddingLeft + (i / (candleData.length - 1)) * plotWidth;
                  const yOpen = scaleY(c.open);
                  const yClose = scaleY(c.close);
                  const yHigh = scaleY(c.high);
                  const yLow = scaleY(c.low);
                  const top = Math.min(yOpen, yClose);
                  const height = Math.max(2, Math.abs(yOpen - yClose));
                  const color = c.isBullish ? '#089981' : '#F23645';

                  return (
                    <g
                      key={i}
                      onMouseEnter={() => setHoverIndex(i)}
                      className="cursor-crosshair"
                    >
                      {/* High-Low Wick */}
                      <line
                        x1={x}
                        y1={yHigh}
                        x2={x}
                        y2={yLow}
                        stroke={color}
                        strokeWidth="1.2"
                      />
                      {/* Open-Close Candle Body */}
                      <rect
                        x={x - candleWidth / 2}
                        y={top}
                        width={candleWidth}
                        height={height}
                        fill={color}
                        rx="1"
                      />
                    </g>
                  );
                })}
              </g>
            )}

            {/* Chart Type: Line or Area */}
            {(chartType === 'line' || chartType === 'area') && (
              <g>
                {(() => {
                  const points = candleData.map((c, i) => {
                    const x = paddingLeft + (i / (candleData.length - 1)) * plotWidth;
                    const y = scaleY(c.close);
                    return { x, y };
                  });

                  const lineD = points.reduce((acc, p, idx) => `${acc} ${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`, '');
                  const areaD = `${lineD} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

                  return (
                    <>
                      {chartType === 'area' && (
                        <path
                          d={areaD}
                          fill={isPos ? 'url(#greenGradient)' : 'url(#redGradient)'}
                        />
                      )}
                      <path
                        d={lineD}
                        fill="none"
                        stroke={isPos ? '#089981' : '#F23645'}
                        strokeWidth="2"
                      />
                    </>
                  );
                })()}
              </g>
            )}

            {/* Linear Gradients for Area chart */}
            <defs>
              <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#089981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#089981" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F23645" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#F23645" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Hover Crosshair */}
            {hoverIndex !== null && (
              <g>
                {(() => {
                  const hx = paddingLeft + (hoverIndex / (candleData.length - 1)) * plotWidth;
                  const hy = scaleY(candleData[hoverIndex].close);
                  return (
                    <>
                      <line
                        x1={hx}
                        y1={paddingTop}
                        x2={hx}
                        y2={chartHeight}
                        stroke="#787B86"
                        strokeDasharray="2 2"
                        strokeWidth="1"
                      />
                      <line
                        x1={paddingLeft}
                        y1={hy}
                        x2={svgWidth - paddingRight}
                        y2={hy}
                        stroke="#787B86"
                        strokeDasharray="2 2"
                        strokeWidth="1"
                      />
                      <circle cx={hx} cy={hy} r="3.5" fill="#2962FF" />
                    </>
                  );
                })()}
              </g>
            )}

            {/* RSI Indicator Sub-chart */}
            {showRSI && (
              <g transform={`translate(0, ${chartHeight + 15})`}>
                <line x1={paddingLeft} y1={0} x2={svgWidth - paddingRight} y2={0} stroke="#E0E3EB" />
                <line x1={paddingLeft} y1={15} x2={svgWidth - paddingRight} y2={15} stroke="#F0F3FA" strokeDasharray="2 2" />
                <line x1={paddingLeft} y1={45} x2={svgWidth - paddingRight} y2={45} stroke="#F0F3FA" strokeDasharray="2 2" />
                <text x={paddingLeft} y={-4} fontSize="9" fill="#787B86" fontWeight="bold">RSI (14): 58.4</text>
                <text x={svgWidth - paddingRight + 5} y={18} fontSize="9" fill="#787B86">70</text>
                <text x={svgWidth - paddingRight + 5} y={48} fontSize="9" fill="#787B86">30</text>
                {/* RSI Wave */}
                <path
                  d={`M ${paddingLeft} 30 Q ${paddingLeft + 100} 10, ${paddingLeft + 250} 35 T ${paddingLeft + 500} 20 T ${svgWidth - paddingRight} 28`}
                  fill="none"
                  stroke="#7B1FA2"
                  strokeWidth="1.5"
                />
              </g>
            )}
          </svg>
        </div>

        {/* Superchart Bottom Status / Quick Buy & Sell Strip */}
        <div className="px-6 py-3 bg-[#F7F9FC] border-t border-[#E0E3EB] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-4 text-[#787B86]">
            <span>Exchange: <strong>Continuous Trading</strong></span>
            <span>Spread: <strong>0.02</strong></span>
            <span>Market Status: <span className="text-[#089981] font-semibold">● Open</span></span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onTrade(asset)}
              className="bg-[#089981] hover:bg-[#078570] text-white font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Buy {asset.ticker}
            </button>
            <button
              onClick={() => onTrade(asset)}
              className="bg-[#F23645] hover:bg-[#D92534] text-white font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Sell {asset.ticker}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
