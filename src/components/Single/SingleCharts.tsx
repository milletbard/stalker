"use client";

import CardDataStats from "../CardDataStats";
import React from "react";
import SingleEmpty from "./SingleEmpty";
import useStalkerStocksLocalStorage from "@/hooks/useStalkerStocksLocalStorage";
import SearchInput from "../Header/SearchInput";

const SingleCharts = () => {
  const { stalkerStocks } = useStalkerStocksLocalStorage();

  const isEmpty = Object.keys(stalkerStocks).length === 0;

  return (
    <div>
      <SearchInput
        wrapperClassName="m-4 block sm:hidden"
        id="stock-search-input-mobile"
      />

      {isEmpty ? (
        <SingleEmpty />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
          {Object.values(stalkerStocks).map((stalkerStock) => (
            <CardDataStats
              key={stalkerStock.symbol}
              title={stalkerStock?.name || ""}
              symbol={stalkerStock?.symbol}
              option={{
                openInterval: true,
                showAction: true,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleCharts;
