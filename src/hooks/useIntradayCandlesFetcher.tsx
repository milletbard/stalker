import { getHistoricalCandles, getIntradayCandles } from "@/service/fugle";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";
import { ema, macd } from "./macd";

const pickedDays = 10;

export interface IIntradayCandlesFetcherProps {
  symbol: string;
}

const useIntradayCandlesFetcher = ({
  symbol,
}: IIntradayCandlesFetcherProps) => {
  const [kdTimeframe] = useLocalStorage("kd-timeframe", "15");

  // * 是否在早上9點到下午1點半之間
  const isMarketOpen = useMemo(() => {
    const now = dayjs();
    const open = dayjs().set("hour", 9).set("minute", 0);
    const close = dayjs().set("hour", 13).set("minute", 30);

    return now.isAfter(open) && now.isBefore(close);
  }, []);

  // * 當日資料
  const {
    data: { data: intradayCandles = [] } = {},
    isFetching: isIntradayCandlesFetching,
  } = useQuery({
    queryKey: ["/intraday/candles", symbol, kdTimeframe],
    queryFn: () => getIntradayCandles({ symbol, timeframe: kdTimeframe }),
    // * 開盤後每4分鐘重新取得資料
    refetchInterval: isMarketOpen && 1000 * 60 * 4,
  });

  // * 歷史行情不包含當日資料，排序為新到舊
  const {
    data: { data: historicalCandles = [] } = {},
    isFetching: isHistoricalCandlesFetching,
  } = useQuery({
    queryKey: ["/historical/candles", symbol, kdTimeframe],
    queryFn: () => getHistoricalCandles({ symbol, timeframe: kdTimeframe }),
  });

  const loading = isIntradayCandlesFetching || isHistoricalCandlesFetching;

  // * 一併改為新到舊
  const reverseIntradayCandles = [...intradayCandles].reverse();

  const filteredData = useMemo(() => {
    if (loading) return [];

    // * 合併當日與歷史資料，當收盤後只顯示歷史資料
    const allCandles = isMarketOpen
      ? [...reverseIntradayCandles, ...historicalCandles]
      : historicalCandles;

    const dates = new Set(
      allCandles.map((item) => dayjs(item.date).format("YYYY-MM-DD")),
    );

    const includeThreeDays = Array.from(dates).slice(0, pickedDays);

    const pickedDaysData = allCandles.filter((item) =>
      includeThreeDays.includes(dayjs(item.date).format("YYYY-MM-DD")),
    );

    return pickedDaysData
      ?.map((item, index) => {
        const ema12Array = ema(
          historicalCandles
            .slice(index, 12 + index)
            .map((item) => item.close) || [],
          12,
        );
        const ema26Array = ema(
          historicalCandles
            .slice(index, 26 + index)
            .map((item) => item.close) || [],
          26,
        );

        const { ema12, ema26, dif, dea, bar } = macd({
          ema12Array,
          ema26Array,
        });

        return {
          ...item,
          dif,
          dea,
          bar,
          ema12,
          ema26,
        };
      })
      .reverse();
  }, [loading]);

  return {
    data: filteredData,
    isFetching: loading,
    isMarketOpen,
  };
};

export default useIntradayCandlesFetcher;
