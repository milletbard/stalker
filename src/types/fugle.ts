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

export interface IntradayQuote {
  date: string;
  type: string;
  exchange: string;
  market: string;
  symbol: string;
  name: string;
  referencePrice: number;
  previousClose: number;
  openPrice: number;
  openTime: number;
  highPrice: number;
  highTime: number;
  lowPrice: number;
  lowTime: number;
  closePrice: number;
  closeTime: number;
  avgPrice: number;
  change: number;
  changePercent: number;
  amplitude: number;
  lastPrice: number;
  lastSize: number;
  bids: {
    price: number;
    size: number;
  }[];
  asks: {
    price: number;
    size: number;
  }[];
  total: {
    tradeValue: number;
    tradeVolume: number;
    tradeVolumeAtBid: number;
    tradeVolumeAtAsk: number;
    transaction: number;
    time: number;
  };
  lastTrade: {
    bid: number;
    ask: number;
    price: number;
    size: number;
    time: number;
    serial: number;
  };
  lastTrial: {
    bid: number;
    ask: number;
    price: number;
    size: number;
    time: number;
    serial: number;
  };
  isClose: boolean;
  serial: number;
  lastUpdated: number;
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
