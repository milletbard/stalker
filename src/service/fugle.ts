import {
  IFugleResponse,
  ISnapshotQuote,
  ISnapshotMover,
  IntradayCandle,
  IHistoricalCandle,
  IntradayQuote,
} from "@/types/fugle";
import { FugleApi } from "./baseApi";

export const fugleFetcher = async (url: string) => {
  const res = await FugleApi(url);
  return res;
};

/** 取得股票或指數列表（依條件查詢）*/
export const getIntradayTickers = async (): Promise<
  IFugleResponse<{ symbol: string; name?: string }[]>
> => {
  const res = await FugleApi(`intraday/tickers?type=EQUITY&exchange=TWSE&TSE`, {
    method: "GET",
  });

  return res;
};

/** 取得股票漲跌幅排行（依市場別） */
export const getSnapshotMovers = async ({
  direction = "up",
}:
  | undefined
  | {
      direction?: string;
    } = {}): Promise<IFugleResponse<ISnapshotMover[]>> => {
  const res: IFugleResponse<ISnapshotMover[]> = await FugleApi(
    `/snapshot/movers/TSE?change=percent&direction=${direction}`,
    { method: "GET" },
  );

  return res;
};

/** 取得股票行情快照（依市場別）*/
export const getSnapshotQuotes = async (): Promise<
  IFugleResponse<ISnapshotQuote[]>
> => {
  const res = await FugleApi("/snapshot/quotes/TSE", { method: "GET" });

  return res;
};

/** 取得股票即時報價（依代碼查詢）*/
export const getIntradayQuote = async ({
  symbol,
}: {
  symbol: string;
}): Promise<IntradayQuote> => {
  const res = await FugleApi(`/intraday/quote/${symbol}`, {
    method: "GET",
  });

  return res;
};

/** 取得日內行情股票價格Ｋ線（依代碼查詢）*/
export const getIntradayCandles = async ({
  symbol,
  timeframe,
}: {
  symbol: string;
  timeframe: string;
}): Promise<IFugleResponse<IntradayCandle[]>> => {
  const res = await FugleApi(
    `/intraday/candles/${symbol}?timeframe=${timeframe}`,
    {
      method: "GET",
    },
  );

  return res;
};

/** 取得股票價格Ｋ線（依代碼查詢）*/
export const getHistoricalCandles = async ({
  symbol,
  timeframe,
}: {
  symbol: string;
  timeframe: string;
}): Promise<IFugleResponse<IHistoricalCandle[]>> => {
  const today = new Date();

  const from = new Date(today);
  // 固定查詢過去 14 天的資料
  from.setDate(today.getDate() - 14);
  // 將日期轉換為 yyyy-MM-dd 格式
  const fromDateFormatted = from.toISOString().split("T")[0];
  // 今天日期轉換為 yyyy-MM-dd 格式
  const todayDateFormatted = today.toISOString().split("T")[0];

  const res = await FugleApi(
    `/historical/candles/${symbol}?timeframe=${timeframe}&fields=open,high,low,close,volume&from=${fromDateFormatted}&to=${todayDateFormatted}`,
    {
      method: "GET",
    },
  );

  return res;
};
