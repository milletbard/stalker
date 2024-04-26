"use client";

import React, { Fragment, useEffect, useState } from "react";
import useSearchTickers from "@/hooks/useSearchTickers";
import { Menu, Transition } from "@headlessui/react";
import { useClickAnyWhere, useDebounceCallback } from "usehooks-ts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useStalkerStocksLocalStorage from "@/hooks/useStalkerStocksLocalStorage";

interface ISearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
}

const SearchInput = ({ wrapperClassName, ...rest }: ISearchInputProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  const [input, setInput] = useState(q || "");

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { onAddStalkerStocks } = useStalkerStocksLocalStorage();

  const searchTickers = useSearchTickers();

  useClickAnyWhere(() => {
    setDropdownOpen(false);
  });

  useEffect(() => {
    setInput("");
  }, [pathname]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    router.replace(`${pathname}?q=${query}`);
    setDropdownOpen(true);
  };

  const debounced = useDebounceCallback(onSearch, 200);

  return (
    <div
      className={`relative flex h-8 items-center justify-center rounded-lg border  border-graydark
    ${wrapperClassName || ""}
    `}
    >
      <button className="absolute left-2 top-1/2 -translate-y-1/2">
        <svg
          className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
            fill=""
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
            fill=""
          />
        </svg>
      </button>

      <Menu>
        <input
          autoComplete="off"
          value={input}
          autoFocus
          onChange={(e) => {
            debounced(e);
            setInput(e.target.value);
          }}
          type="text"
          placeholder="搜尋股票..."
          className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125 "
          {...rest}
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
                        <div className="group relative flex justify-between gap-x-6 rounded-lg p-2">
                          <a
                            target="_blank"
                            rel="noreferrer noopener nofollow"
                            href={
                              process.env.NEXT_PUBLIC_FUGLE_DOMAIN +
                              `/ai/${ticker.symbol}`
                            }
                            className={`font-semibold  ${
                              active ? "text-gray-3" : "text-gray-1"
                            }`}
                          >
                            {ticker.name} ({ticker.symbol})
                          </a>

                          <span
                            onClick={() => {
                              onAddStalkerStocks(ticker);
                              setInput("");
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
