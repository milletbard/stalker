"use client";

import React from "react";
import CardDataStats from "../CardDataStats";
import { ISnapshotMover } from "@/types/fugle";
import useStalkerStocksLocalStorage from "@/hooks/useStalkerStocksLocalStorage";

interface ISingleChartsProps {
  snapshotMovers: ISnapshotMover[];
}

const SingleCharts = (props: ISingleChartsProps) => {
  const { snapshotMovers } = props;

  const { stalkerStocks } = useStalkerStocksLocalStorage();

  const filteredSnapshotMovers = snapshotMovers.filter((snapshotMover) => {
    return stalkerStocks.some(
      (stalkerStock) => stalkerStock.symbol === snapshotMover.symbol,
    );
  });

  return (
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
  );
};

export default SingleCharts;
