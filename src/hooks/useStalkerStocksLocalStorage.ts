import { useLocalStorage } from "usehooks-ts";
import { toast } from "react-toastify";

const useStalkerStocksLocalStorage = () => {
  const [stalkerStocks, setStalkerStocks] = useLocalStorage<
    { symbol: string; name?: string }[]
  >("stalker-stocks", []);

  const onAddStalkerStocks = (newStocks: { symbol: string; name?: string }) => {
    if (stalkerStocks.some((stock) => stock.symbol === newStocks.symbol)) {
      return;
    }

    if (stalkerStocks.length >= 12) {
      toast("追蹤名單最多只能有 12 檔股票", {
        position: "top-center",
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setStalkerStocks([...stalkerStocks, newStocks]);

    toast(`新增 ${newStocks.name}(${newStocks.symbol})`, {
      position: "top-center",
      autoClose: 800,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const onRemoveStalkerStocks = (newStocks: {
    symbol: string;
    name?: string;
  }) => {
    const filteredStocks = stalkerStocks.filter(
      (stock) => stock.symbol !== newStocks.symbol,
    );

    toast(`移除 ${newStocks.name}(${newStocks.symbol})`, {
      position: "top-center",
      autoClose: 800,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setStalkerStocks(filteredStocks);
  };

  return { stalkerStocks, onAddStalkerStocks, onRemoveStalkerStocks };
};

export default useStalkerStocksLocalStorage;
