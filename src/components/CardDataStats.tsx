"use client";

import Chart, { Props } from "react-apexcharts";
import React from "react";
import dayjs from "dayjs";
import useIntradayCandlesFetcher from "@/hooks/useIntradayCandlesFetcher";
import useStalkerStocksLocalStorage from "@/hooks/useStalkerStocksLocalStorage";
import { getIntradayQuote } from "@/service/fugle";
import { has, takeRight } from "lodash-es";
import { postLineNotify } from "@/service/line";
import { useInterval, useLocalStorage, useSessionStorage } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";

interface CardDataStatsProps {
  title: string;
  symbol: string;
  option?: {
    openInterval?: boolean;
    showAction?: boolean;
  };
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  symbol,
  option,
}) => {
  const [kdTimeframe] = useLocalStorage("kd-timeframe", "15");

  const { data: intradayCandles = [], isMarketOpen } =
    useIntradayCandlesFetcher({
      symbol,
    });

  const { data: intradayQuote } = useQuery({
    queryKey: ["/intraday/quote", symbol],
    queryFn: () => getIntradayQuote({ symbol }),
    // * 開盤後每1分鐘重新取得資料
    refetchInterval: !isMarketOpen && option?.openInterval ? 1000 * 60 * 1 : 0,
  });

  const [candlesNotificationSession, setCandlesNotificationSession] =
    useSessionStorage("candlesNotification", {});

  const [lineTokenSession] = useSessionStorage("line-token", { lineToken: "" });

  const { onRemoveStalkerStocks } = useStalkerStocksLocalStorage();

  const series = [
    {
      name: "DIF",
      data: intradayCandles.map((item) => item.dif) || [],
    },
    {
      name: "DEA",
      data: intradayCandles.map((item) => item.dea) || [],
    },
  ];

  const options: Props["options"] = {
    chart: {
      id: "basic-bar",
      zoom: {
        enabled: false, // 禁用縮放
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      onDatasetHover: {
        highlightDataSeries: false,
      },
    },

    xaxis: {
      categories:
        intradayCandles.map((item) => dayjs(item.date).format("MM/DD HH:mm")) ||
        [],
    },

    colors: ["#2396f3", "#f93737"],
    stroke: {
      width: 2,
    },
  };

  const onLineNotify = async (text: string) => {
    try {
      postLineNotify(lineTokenSession.lineToken, text);
    } catch (e) {
      console.log(e);
    }
  };

  const [second, first] = takeRight(intradayCandles, 2);
  // * 是否黃金交叉
  const isGoldCross = second?.dif < second?.dea && first?.dif > first?.dea;

  useInterval(
    () => {
      const time = dayjs(first.date).format("HH:mm:ss");
      const close = first.close;

      if (isGoldCross) {
        // * 判斷是否已經通知過
        if (has(candlesNotificationSession, time)) {
          return;
        }

        const text = `${kdTimeframe} 分 K 黃金交叉通知: ${title}(${symbol}) 股價: ${first.close}, 時間: ${dayjs(first.date).format("HH:mm:ss")}`;
        onLineNotify(text);

        // * 通知過後，將時間存入 sessionStorage
        setCandlesNotificationSession({
          [time]: {
            time,
            close,
            symbol,
            kdTimeframe,
            title,
          },
        });
      } else {
        console.log("no gold cross");
      }
    },

    // * 4 分鐘更新一次
    isMarketOpen && option?.openInterval ? 1000 * 60 * 4 : null,
  );

  const levelUp = (intradayQuote?.changePercent || 0) > 0;

  return (
    <a
      href={`${process.env.NEXT_PUBLIC_FUGLE_DOMAIN}/tradingview/${symbol}`}
      target="_blank"
      rel="noreferrer noopener nofollow"
    >
      <div className="relative m-4 rounded-md border border-stroke bg-white px-4 py-3 shadow-default transition duration-300 ease-in-out dark:border-strokedark dark:bg-boxdark">
        {option?.openInterval && isMarketOpen && (
          <span className="absolute right-5 flex h-3 w-3 items-center justify-center self-end">
            <span
              className={`rounded-ful absolute inline-flex h-full w-full animate-ping opacity-0
           ${isGoldCross ? "bg-rose-400" : "bg-yellow-400"}
          `}
            ></span>
            <span
              className={`relative inline-flex h-3 w-5 rounded-full 
          ${isGoldCross ? "bg-rose-600" : "bg-yellow-500"}
          `}
            ></span>
          </span>
        )}

        <div className="flex items-end justify-between">
          <div className="flex">
            {option?.showAction && (
              <span
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onRemoveStalkerStocks({ symbol, name: title });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="m-1 h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </span>
            )}

            <div>
              <h4 className="flex items-center text-title-sm font-normal text-black dark:text-white">
                {title}
              </h4>
              <span className="text-sm font-medium">{symbol}</span>
            </div>
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onLineNotify(`🚨 ${title}(${symbol}) 通知測試`);
            }}
          >
            <span
              className={`text-xl ${levelUp ? "text-meta-1" : "text-meta-3"}  `}
            >
              {intradayQuote?.closePrice || 0}
            </span>
            <span
              className={`flex items-center gap-1 text-sm font-medium ${
                levelUp ? "text-meta-1" : "text-meta-3"
              }`}
            >
              {intradayQuote?.changePercent || 0}%
              {levelUp ? (
                <svg
                  className="fill-meta-1"
                  width="10"
                  height="11"
                  viewBox="0 0 10 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                    fill=""
                  />
                </svg>
              ) : (
                <svg
                  className="fill-meta-3"
                  width="10"
                  height="11"
                  viewBox="0 0 10 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                    fill=""
                  />
                </svg>
              )}
            </span>
          </div>
        </div>

        <div className="">
          <Chart options={options} series={series} type="line" width="100%" />
        </div>
      </div>
    </a>
  );
};

export default CardDataStats;
