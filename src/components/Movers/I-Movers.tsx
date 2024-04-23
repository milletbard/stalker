"use client";

import useInView from "@/hooks/useInView";
import { IFugleResponse, ISnapshotMover } from "@/types/fugle";
import React, { useEffect, useState } from "react";
import MoversTable from "./MoversTable";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";

interface IMoversProps {
  snapshotMovers: IFugleResponse<ISnapshotMover[]>;
}
const IMovers = (props: IMoversProps) => {
  const snapshotMoverData = props.snapshotMovers.data;

  const [moversPayload, setMoversPayload] = useLocalStorage("movers-payload", {
    direction: "up",
  });

  const [items, setItems] = useState<ISnapshotMover[]>(
    snapshotMoverData.slice(0, 10),
  );
  const [inView, ref] = useInView();

  const toggleDirection = () => {
    setMoversPayload({
      direction: moversPayload.direction === "up" ? "down" : "up",
    });
  };

  // 模擬無限載入
  useEffect(() => {
    const onLoadMore = () => {
      setItems((prev) => [
        ...prev,
        ...snapshotMoverData.slice(prev.length, prev.length + 5),
      ]);
    };

    if (inView && items.length < snapshotMoverData.length) {
      onLoadMore();
    }
  }, [inView, items.length, snapshotMoverData]);

  return (
    <div>
      <MoversTable
        snapshotMovers={items}
        extra={
          <button onClick={toggleDirection}>
            {moversPayload.direction === "up" ? (
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
                  d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                />
              </svg>
            ) : (
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
                  d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
                />
              </svg>
            )}
          </button>
        }
      />
      <div ref={ref} />
    </div>
  );
};

export default IMovers;
