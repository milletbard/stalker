"use client";

import React, { useEffect, useRef } from "react";
import { ISnapshotMover } from "@/types/fugle";
import MoversTable from "../Movers/MoversTable";
import Link from "next/link";
import CardDataStats from "../CardDataStats";
import { toast } from "react-toastify";
import { useSessionStorage } from "usehooks-ts";

interface IECommerceProps {
  snapshotMovers: ISnapshotMover[];
}

const ECommerce = (props: IECommerceProps) => {
  const { snapshotMovers } = props;

  // * 紀錄是否關閉過 toast
  const [stalkerStocksToast, setStalkerStocksToast] = useSessionStorage(
    "stalkerStocksToast",
    { closed: false },
  );

  useEffect(() => {
    const openDocumentToast = () => {
      toast(
        <div className="flex flex-col text-sm">
          <p>
            簡單的假設，當 <strong>MACD</strong>{" "}
            交叉時，代表某個方向的趨勢可能告一個小段落。當然還需其他指標搭配使用，
            <strong>Stalker</strong> 提供較短線的計算及監聽功能。
          </p>
        </div>,
        {
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          closeButton: false,
          onClick: () => {
            toast.dismiss();
            toast(
              <div className="flex flex-col text-sm">
                <div className="flex">
                  <span className="mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                      />
                    </svg>
                  </span>
                  提供 {` `}
                  <strong>5</strong> 、<strong>15</strong>、<strong>30</strong>
                  、<strong>60</strong> {` `}分鐘線
                </div>
                <br />
                <div className="text-sm">
                  <span className="inline-block">
                    <svg
                      className="fill-current duration-300 ease-in-out"
                      width="16"
                      height="16"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.1999 14.9343L15.6374 14.0624C15.5249 13.8937 15.4687 13.7249 15.4687 13.528V7.67803C15.4687 6.01865 14.7655 4.47178 13.4718 3.31865C12.4312 2.39053 11.0812 1.7999 9.64678 1.6874V1.1249C9.64678 0.787402 9.36553 0.478027 8.9999 0.478027C8.6624 0.478027 8.35303 0.759277 8.35303 1.1249V1.65928C8.29678 1.65928 8.24053 1.65928 8.18428 1.6874C4.92178 2.05303 2.4749 4.66865 2.4749 7.79053V13.528C2.44678 13.8093 2.39053 13.9499 2.33428 14.0343L1.7999 14.9343C1.63115 15.2155 1.63115 15.553 1.7999 15.8343C1.96865 16.0874 2.2499 16.2562 2.55928 16.2562H8.38115V16.8749C8.38115 17.2124 8.6624 17.5218 9.02803 17.5218C9.36553 17.5218 9.6749 17.2405 9.6749 16.8749V16.2562H15.4687C15.778 16.2562 16.0593 16.0874 16.228 15.8343C16.3968 15.553 16.3968 15.2155 16.1999 14.9343ZM3.23428 14.9905L3.43115 14.653C3.5999 14.3718 3.68428 14.0343 3.74053 13.6405V7.79053C3.74053 5.31553 5.70928 3.23428 8.3249 2.95303C9.92803 2.78428 11.503 3.2624 12.6562 4.2749C13.6687 5.1749 14.2312 6.38428 14.2312 7.67803V13.528C14.2312 13.9499 14.3437 14.3437 14.5968 14.7374L14.7655 14.9905H3.23428Z"
                        fill=""
                      />
                    </svg>
                  </span>{" "}
                  當 <strong>MACD</strong> 黃金交叉時，卡片右上角的訊號源將由
                  <div className="mx-1 inline-block h-3 w-3 rounded-full bg-yellow-400" />
                  轉變為
                  <div className="mx-1 inline-block h-3 w-3 rounded-full bg-red" />{" "}
                  ，並將訊號源推送至右上角的通知中心。
                </div>
              </div>,
              {
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                closeButton: false,
                onClick: () => {
                  toast.dismiss();
                  toast(
                    <p className="text-sm">
                      最後，如果想收到更多即時通知，點擊{` `}
                      <a
                        className="inline-block text-blue-500 hover:underline"
                        href="https://reurl.cc/0vxA06"
                        target="_blank"
                        rel="noreferrer noopener nofollow"
                      >
                        <strong>此處</strong>
                      </a>{" "}
                      {` `}
                      開啟 Line Notify 設定。
                    </p>,
                    {
                      autoClose: false,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      closeButton: false,
                      onClick: () => {
                        toast.dismiss();
                        setStalkerStocksToast({ closed: true });
                      },
                    },
                  );
                },
              },
            );
          },
        },
      );
    };

    // * 顯示 toast，提醒使用者如何使用 Stalker
    if (!stalkerStocksToast.closed) {
      openDocumentToast();
    }
  }, [setStalkerStocksToast, stalkerStocksToast.closed]);

  return (
    <>
      <div className="mx-auto max-w-2xl py-32 sm:py-52 lg:py-48">
        <div className="text-center">
          <h1 className="text-gray-900 text-2xl font-bold tracking-tight sm:text-4xl">
            Mastering MACD: Your Gateway to Profitable Trading Signals
          </h1>
          <p className="text-gray-600 mt-6 text-lg leading-8">
            The MACD (Moving Average Convergence Divergence) indicator is
            explained, consisting of four components: MACD line, signal line,
            histogram, and zero line, which help identify market trends and
            momentum.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/single"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              開始
            </Link>
            <a
              rel="noreferrer noopener nofollow"
              href="https://www.youtube.com/watch?v=rf_EQvubKlk&t=1s&ab_channel=TradingLab"
              target="_blank"
              className="text-gray-900 text-sm font-semibold leading-6"
            >
              學習 <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        {snapshotMovers.slice(0, 3).map((snapshotMover) => {
          return (
            <CardDataStats
              key={snapshotMover.symbol}
              title={snapshotMover.name}
              symbol={snapshotMover.symbol}
            />
          );
        })}
      </div>

      <div className="mt-4 hidden md:mt-6 md:block 2xl:mt-7.5">
        <MoversTable
          hideTradeAction={true}
          snapshotMovers={snapshotMovers.slice(0, 8)}
          extra={
            <Link href="/movers">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          }
        />
      </div>
    </>
  );
};

export default ECommerce;
