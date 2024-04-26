"use client";

import CardDataStats from "../CardDataStats";
import React from "react";
import SingleEmpty from "./SingleEmpty";
import useStalkerStocksLocalStorage from "@/hooks/useStalkerStocksLocalStorage";

const SingleCharts = () => {
  const { stalkerStocks } = useStalkerStocksLocalStorage();

  if (Object.keys(stalkerStocks).length === 0) {
    return <SingleEmpty />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
      {Object.values(stalkerStocks).map((stalkerStock) => (
        <CardDataStats
          key={stalkerStock.symbol}
          title={stalkerStock?.name || ""}
          symbol={stalkerStock?.symbol}
          option={{
            openInterval: true,
          }}
        />
      ))}
    </div>
  );
};

export default SingleCharts;
