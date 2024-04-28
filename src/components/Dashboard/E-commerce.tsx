"use client";

import React from "react";
import { ISnapshotMover } from "@/types/fugle";
import MoversTable from "../Movers/MoversTable";
import Link from "next/link";
import CardDataStats from "../CardDataStats";

import useStalkerStocksToastEffect from "@/hooks/useStalkerStocksToastEffect";

interface IECommerceProps {
  snapshotMovers: ISnapshotMover[];
}

const ECommerce = (props: IECommerceProps) => {
  const { snapshotMovers } = props;

  useStalkerStocksToastEffect();

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
