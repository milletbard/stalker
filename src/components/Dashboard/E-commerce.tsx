"use client";

import React from "react";
import CardDataStats from "../CardDataStats";
import { ISnapshotMover } from "@/types/fugle";
import MoversTable from "../Movers/MoversTable";
import Link from "next/link";
import useStalkerStocksLocalStorage from "@/hooks/useStalkerStocksLocalStorage";

interface IECommerceProps {
  snapshotMovers: ISnapshotMover[];
}

const ECommerce = (props: IECommerceProps) => {
  const { snapshotMovers } = props;

  return (
    <>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-60">
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
              Get started
            </Link>
            <a
              rel="noreferrer noopener nofollow"
              href="https://www.youtube.com/watch?v=rf_EQvubKlk&t=1s&ab_channel=TradingLab"
              target="_blank"
              className="text-gray-900 text-sm font-semibold leading-6"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-4 hidden md:mt-6 md:block 2xl:mt-7.5">
        <MoversTable
          snapshotMovers={snapshotMovers.slice(0, 5)}
          extra={
            <Link href="/movers">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
