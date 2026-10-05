import { AssetData, EconomicEvent } from '../data/marketData';

export interface Position {
  id: string;
  ticker: string;
  name: string;
  type: 'BUY' | 'SELL';
  shares: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  timestamp: string;
}

export interface UserPortfolio {
  cashBalance: number;
  positions: Position[];
}

export type Timeframe = '1D' | '5D' | '1M' | '3M' | '1Y' | 'ALL';
export type ChartType = 'candlestick' | 'line' | 'area';
