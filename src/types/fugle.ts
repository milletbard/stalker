export interface IFugleResponse<T> {
  change?: string;
  date: string;
  type?: string;
  time: string;
  market: "TSE";
  exchange?: string;
  isNormal?: boolean;
  timeframe?: string;
  symbol?: string;
  data: T;
}

export interface ISnapshotMover {
  type: "EQUITY";
  symbol: string;
  name: string;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  closePrice: number;
  change: number;
  changePercent: number;
  tradeVolume: number;
  tradeValue: number;
  lastUpdated: number;
}

export interface ISnapshotQuote {
  type: string;
  symbol: string;
  name: string;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  closePrice: number;
  change: number;
  changePercent: number;
  tradeVolume: number;
  tradeValue: number;
  lastUpdated: number;
}

export interface IntradayCandle {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  average: number;
}

export interface IHistoricalCandle {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  change: number;
}
