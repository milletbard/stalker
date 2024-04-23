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

  const { stalkerStocks } = useStalkerStocksLocalStorage();

  const filteredSnapshotMovers = snapshotMovers.filter((snapshotMover) => {
    return stalkerStocks.some(
      (stalkerStock) => stalkerStock.symbol === snapshotMover.symbol,
    );
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        {filteredSnapshotMovers.map((snapshotMover) => (
          <CardDataStats
            key={snapshotMover.symbol}
            title={snapshotMover.name}
            symbol={snapshotMover.symbol}
            rate={`${snapshotMover.change}(${snapshotMover.changePercent})%`}
            levelUp={snapshotMover.changePercent > 0}
          />
        ))}
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
