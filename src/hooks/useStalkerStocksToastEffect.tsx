import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useSessionStorage } from "usehooks-ts";

const useStalkerStocksToastEffect = () => {
  // * 紀錄是否關閉過 toast
  const [stalkerStocksToast, setStalkerStocksToast] = useSessionStorage(
    "stalkerStocksToast",
    { closed: false },
  );

  useEffect(() => {
    const openDocumentToast = () => {
      toast(
        <div className="flex flex-col text-sm">
          <p>
            簡單的假設，當 <strong>MACD</strong>{" "}
            交叉時，代表某個方向的趨勢可能告一個小段落。當然還需其他指標搭配使用，
            <strong>Stalker</strong> 提供較短線的計算及監聽功能。
          </p>
        </div>,
        {
          toastId: "stalkerStocksToast",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          closeButton: false,
          onClick: () => {
            toast.dismiss();
            toast(
              <div className="flex flex-col text-sm">
                <div className="flex">
                  <span className="mr-2">
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
                  </span>
                  提供 {` `}
                  <strong>5</strong> 、<strong>15</strong>、<strong>30</strong>
                  、<strong>60</strong> {` `}分鐘線
                </div>
                <br />
                <div className="text-sm">
                  <svg
                    className="inline fill-current duration-300 ease-in-out"
                    width="16"
                    height="16"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.1999 14.9343L15.6374 14.0624C15.5249 13.8937 15.4687 13.7249 15.4687 13.528V7.67803C15.4687 6.01865 14.7655 4.47178 13.4718 3.31865C12.4312 2.39053 11.0812 1.7999 9.64678 1.6874V1.1249C9.64678 0.787402 9.36553 0.478027 8.9999 0.478027C8.6624 0.478027 8.35303 0.759277 8.35303 1.1249V1.65928C8.29678 1.65928 8.24053 1.65928 8.18428 1.6874C4.92178 2.05303 2.4749 4.66865 2.4749 7.79053V13.528C2.44678 13.8093 2.39053 13.9499 2.33428 14.0343L1.7999 14.9343C1.63115 15.2155 1.63115 15.553 1.7999 15.8343C1.96865 16.0874 2.2499 16.2562 2.55928 16.2562H8.38115V16.8749C8.38115 17.2124 8.6624 17.5218 9.02803 17.5218C9.36553 17.5218 9.6749 17.2405 9.6749 16.8749V16.2562H15.4687C15.778 16.2562 16.0593 16.0874 16.228 15.8343C16.3968 15.553 16.3968 15.2155 16.1999 14.9343ZM3.23428 14.9905L3.43115 14.653C3.5999 14.3718 3.68428 14.0343 3.74053 13.6405V7.79053C3.74053 5.31553 5.70928 3.23428 8.3249 2.95303C9.92803 2.78428 11.503 3.2624 12.6562 4.2749C13.6687 5.1749 14.2312 6.38428 14.2312 7.67803V13.528C14.2312 13.9499 14.3437 14.3437 14.5968 14.7374L14.7655 14.9905H3.23428Z"
                      fill=""
                    />
                  </svg>
                  當 <strong>MACD</strong> 黃金交叉時，卡片右上角的訊號源將由
                  <div
                    className="mx-2 h-3 w-3 rounded-full bg-yellow-400"
                    style={{ display: "inline-block" }}
                  />
                  轉變為
                  <div
                    className="mx-2 inline-block  h-3 w-3 rounded-full bg-meta-1"
                    style={{ display: "inline-block" }}
                  />
                  ，並將訊號源推送至右上角的通知中心。
                </div>
              </div>,
              {
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                closeButton: false,
                onClick: () => {
                  toast.dismiss();
                  toast(
                    <p className="text-sm">
                      最後，如果想收到更多即時通知，點擊{` `}
                      <a
                        className="inline-block text-blue-500 hover:underline"
                        href="https://reurl.cc/0vxA06"
                        target="_blank"
                        rel="noreferrer noopener nofollow"
                      >
                        <strong>此處</strong>
                      </a>{" "}
                      {` `}
                      開啟 Line Notify 設定。
                    </p>,
                    {
                      autoClose: false,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      closeButton: false,
                      onClick: () => {
                        toast.dismiss();
                        // TODO: 關閉 toast
                        // setStalkerStocksToast({ closed: true });
                      },
                    },
                  );
                },
              },
            );
          },
        },
      );
    };

    // * 顯示 toast，提醒使用者如何使用 Stalker
    if (!stalkerStocksToast.closed) {
      openDocumentToast();
    }
  }, [setStalkerStocksToast, stalkerStocksToast.closed]);
};

export default useStalkerStocksToastEffect;
