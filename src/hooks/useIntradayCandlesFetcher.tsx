import { getHistoricalCandles, getIntradayCandles } from "@/service/fugle";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useMemo } from "react";
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

  const { data, isFetching } = useQuery({
    queryKey: [symbol, kdTimeframe],
    queryFn: () => getHistoricalCandles({ symbol, timeframe: kdTimeframe }),
  });

  const filteredData = useMemo(() => {
    if (isFetching) return [];

    const dates = new Set(
      data?.data.map((item) => dayjs(item.date).format("YYYY-MM-DD")),
    );

    const includeThreeDays = Array.from(dates).slice(0, pickedDays);

    const pickedDaysData = data?.data.filter((item) =>
      includeThreeDays.includes(dayjs(item.date).format("YYYY-MM-DD")),
    );

    return pickedDaysData
      ?.map((item, index) => {
        const ema12Array = ema(
          data?.data.slice(index, 12 + index).map((item) => item.close) || [],
          12,
        );
        const ema26Array = ema(
          data?.data.slice(index, 26 + index).map((item) => item.close) || [],
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
  }, [isFetching]);

  return {
    data: filteredData,
    isFetching,
  };
};

export default useIntradayCandlesFetcher;
