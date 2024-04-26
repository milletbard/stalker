"use client";

import React from "react";
import { useMediaQuery } from "usehooks-ts";

const SingleEmpty = () => {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const handleSearchClick = () => {
    const element = document.getElementById("stock-search-input");
    const elementMobile = document.getElementById("stock-search-input-mobile");

    if (isDesktop) {
      element?.focus();
    } else {
      elementMobile?.focus();
    }
  };

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="text-gray-900 mt-2 flex justify-center text-center text-xl font-bold tracking-tight sm:text-2xl">
            <button type="button" onClick={handleSearchClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </p>
          <p className="text-gray-600 text-md mt-6 text-center leading-8">
            點擊搜尋按鈕並點擊 +
            按鈕即可將股票加入追蹤名單，追蹤名單會自動開始監聽。
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleEmpty;
