import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";

const solutions = [
  {
    name: "5分",
    timeframe: "5",
    icon: "",
  },
  {
    name: "15分",
    timeframe: "15",
    icon: "",
  },
  {
    name: "30分",
    timeframe: "30",
    icon: "",
  },
  {
    name: "60分",
    timeframe: "60",
    icon: "",
  },
];

const DropdownMenu = () => {
  const [kdTimeframe, setKdTimeframe, removeKdTimeframe] = useLocalStorage(
    "kd-timeframe",
    "15",
  );

  return (
    <li className="relative">
      <Menu>
        <Menu.Button className="text-gray-900 inline-flex h-8.5 w-8.5 items-center justify-center gap-x-1 text-sm font-semibold leading-6">
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
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Menu.Items>
            <div className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
              <div className="w-screen max-w-44 flex-auto overflow-hidden rounded-3xl border border-stroke bg-white text-sm leading-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="p-4">
                  <Menu.Item>
                    {({ active }) => (
                      <div className="group relative flex gap-x-6 rounded-lg p-2">
                        <Link
                          href="/movers"
                          className={`font-semibold  ${
                            active ? "text-gray-3" : "text-gray-1"
                          }`}
                        >
                          漲跌幅排行
                          <span className="absolute inset-0" />
                        </Link>
                      </div>
                    )}
                  </Menu.Item>
                  <hr className="m-2 text-slate-600" />
                  {solutions.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <div
                          onClick={() => setKdTimeframe(item.timeframe)}
                          className="group relative flex cursor-pointer gap-x-6 rounded-lg p-2"
                        >
                          {item.timeframe === kdTimeframe && (
                            <span className="absolute right-5 top-[14px] flex h-3 w-3 items-center justify-center self-end">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75"></span>
                              <span className="relative inline-flex h-3 w-5 rounded-full bg-yellow-500"></span>
                            </span>
                          )}

                          <div
                            className={`font-semibold ${
                              active ? "text-gray-3" : "text-gray-1"
                            }`}
                          >
                            {item.name}
                          </div>
                        </div>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </div>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </li>
  );
};

export default DropdownMenu;
