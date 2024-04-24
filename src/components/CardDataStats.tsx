import Chart, { Props } from "react-apexcharts";
import React from "react";
import dayjs from "dayjs";
import useIntradayCandlesFetcher from "@/hooks/useIntradayCandlesFetcher";
import useStalkerStocksLocalStorage from "@/hooks/useStalkerStocksLocalStorage";
import { postLineNotify } from "@/service/line";

interface CardDataStatsProps {
  title: string;
  symbol: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  symbol,
  rate,
  levelUp,
  levelDown,
}) => {
  const { data: intradayCandles = [] } = useIntradayCandlesFetcher({
    symbol,
  });
  const { onRemoveStalkerStocks } = useStalkerStocksLocalStorage();
  const series = [
    // {
    //   name: "EMA(12)",
    //   data: intradayCandles.map((item) => item.ema12) || [],
    // },
    // {
    //   name: "EMA(26)",
    //   data: intradayCandles.map((item) => item.ema26) || [],
    // },
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

  const onLineNotify = async () => {
    try {
      postLineNotify(`🚨 ${title}(${symbol}) 通知測試`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <a
      href={`${process.env.NEXT_PUBLIC_FUGLE_DOMAIN}/tradingview/${symbol}`}
      target="_blank"
      rel="noreferrer noopener nofollow"
    >
      <div className="relative rounded-md border border-stroke bg-white px-7 py-6 shadow-default transition duration-300 ease-in-out dark:border-strokedark dark:bg-boxdark">
        <span
          className="absolute right-5 flex h-3 w-3 items-center justify-center self-end"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onLineNotify();
          }}
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75"></span>
          <span className="relative inline-flex h-3 w-5 rounded-full bg-yellow-500"></span>
        </span>

        <div className="flex items-end justify-between">
          <div className="flex">
            <span
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onRemoveStalkerStocks(symbol);
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

            <div>
              <h4 className="flex items-center text-title-sm font-normal text-black dark:text-white">
                {title}
              </h4>
              <span className="text-sm font-medium">{symbol}</span>
            </div>
          </div>

          <span
            className={`flex items-center gap-1 text-sm font-medium ${
              levelUp && "text-meta-1"
            } ${levelDown && "text-meta-3"} `}
          >
            {rate}

            {levelUp && (
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
            )}
            {levelDown && (
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

        <div className="">
          <Chart options={options} series={series} type="line" width="100%" />
        </div>
      </div>
    </a>
  );
};

export default CardDataStats;
