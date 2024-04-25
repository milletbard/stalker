"use client";

import { getIntradayTickers } from "@/service/fugle";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const useSearchTickers = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  const data = useQuery({
    queryKey: ["/intraday/tickers"],
    queryFn: getIntradayTickers,
  });

  if (!q || q.length < 2) return [];

  // 模糊搜尋
  const filteredTickers = data?.data?.data.filter((ticker) => {
    return ticker.name?.includes(q) || ticker.symbol.includes(q);
  });

  return filteredTickers;
};

export default useSearchTickers;
