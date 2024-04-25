import toast from "react-hot-toast";
import { useLocalStorage } from "usehooks-ts";

const useStalkerStocksLocalStorage = () => {
  const [stalkerStocks, setStalkerStocks] = useLocalStorage<
    { symbol: string; name?: string }[]
  >("stalker-stocks", []);

  const onAddStalkerStocks = (newStocks: { symbol: string; name?: string }) => {
    if (stalkerStocks.some((stock) => stock.symbol === newStocks.symbol)) {
      return;
    }

    setStalkerStocks([...stalkerStocks, newStocks]);

    toast(`新增 ${newStocks.name}(${newStocks.symbol})`);
  };

  const onRemoveStalkerStocks = (newStocks: {
    symbol: string;
    name?: string;
  }) => {
    const filteredStocks = stalkerStocks.filter(
      (stock) => stock.symbol !== newStocks.symbol,
    );
    toast(`移除 ${newStocks.name}(${newStocks.symbol})`);
    setStalkerStocks(filteredStocks);
  };

  return { stalkerStocks, onAddStalkerStocks, onRemoveStalkerStocks };
};

export default useStalkerStocksLocalStorage;
