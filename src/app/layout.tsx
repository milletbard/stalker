"use client";

import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import "react-toastify/dist/ReactToastify.css";
import { Flip, ToastContainer } from "react-toastify";
import React, { Suspense, useEffect, useState } from "react";
import Loader from "@/components/common/Loader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="h-[100vh] dark:bg-boxdark-2 dark:text-bodydark">
          <ToastContainer
            theme="light"
            transition={Flip}
            toastClassName="top-12 opacity-90"
          />

          {loading ? <Loader /> : <Suspense>{children}</Suspense>}
        </div>
      </body>
    </html>
  );
}
