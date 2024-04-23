"use client";

import Link from "next/link";
import React, { Fragment, useState } from "react";
import useSearchTickers from "@/hooks/useSearchTickers";
import { Menu, Transition } from "@headlessui/react";
import { useClickAnyWhere, useDebounceCallback } from "usehooks-ts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchInput = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const searchTickers = useSearchTickers();

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    router.replace(`${pathname}?q=${query}`);
    setDropdownOpen(true);
  };

  const debounced = useDebounceCallback(onSearch, 200);

  useClickAnyWhere(() => {
    setDropdownOpen(false);
  });

  return (
    <div className="relative">
      <Menu>
        <input
          autoFocus
          onChange={debounced}
          type="text"
          placeholder="搜尋股票..."
          className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
        />

        <Transition
          show={dropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Menu.Items static>
            <div className="absolute left-35 z-10 mt-4 flex w-screen max-w-72 -translate-x-1/2 px-4">
              <div className="w-screen max-w-60 flex-auto overflow-hidden rounded-3xl border border-stroke bg-white text-sm leading-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="max-h-60 overflow-y-auto  p-4">
                  {searchTickers?.length === 0 && <div>無匹配資料</div>}

                  {searchTickers?.map((ticker) => (
                    <Menu.Item key={ticker.symbol}>
                      {({ active }) => (
                        <div className="group relative flex gap-x-6 rounded-lg p-2">
                          <Link
                            href={`/quote/${ticker.symbol}`}
                            className={`font-semibold  ${
                              active ? "text-gray-3" : "text-gray-1"
                            }`}
                          >
                            {ticker.name} ({ticker.symbol})
                            <span className="absolute inset-0" />
                          </Link>
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
    </div>
  );
};

export default SearchInput;
