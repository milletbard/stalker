"use client";

import useStalkerStocksLocalStorage from "@/hooks/useStalkerStocksLocalStorage";
import { ISnapshotMover } from "@/types/fugle";
import { formatNumber } from "@/utils/numberFormat";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface IMoversTableProps {
  snapshotMovers: ISnapshotMover[];
  extra?: React.ReactNode;
}

const MoversTable = ({ snapshotMovers, extra }: IMoversTableProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { stalkerStocks, onAddStalkerStocks, onRemoveStalkerStocks } =
    useStalkerStocksLocalStorage();
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1 dark:border-strokedark dark:bg-boxdark">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="mb text-xl font-semibold text-black dark:text-white">
          漲跌幅排行
        </h4>

        {extra}
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 sm:grid-cols-5 dark:bg-meta-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              股票
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              股價
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              漲跌幅
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              成交量
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              成交金額
            </h5>
          </div>
        </div>

        {snapshotMovers.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${"border-b border-stroke dark:border-strokedark"}`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              {stalkerStocks.some((item) => item.symbol === brand.symbol) ? (
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    onRemoveStalkerStocks(brand.symbol);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </span>
              ) : (
                <span
                  onClick={() => {
                    onAddStalkerStocks({
                      symbol: brand.symbol,
                      name: brand.name,
                    });
                    router.replace(`${pathname}`);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </span>
              )}

              <p className="hidden text-black sm:block dark:text-white">
                {brand.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.closePrice}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p
                className={
                  brand.changePercent === 0
                    ? "text-meta-2"
                    : brand.changePercent > 0
                      ? "text-meta-1"
                      : "text-meta-3"
                }
              >
                {brand.change}({brand.changePercent}%)
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">
                {brand.tradeVolume}張
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{formatNumber(brand.tradeValue)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoversTable;
