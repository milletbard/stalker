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
  };

  const onRemoveStalkerStocks = (symbol: string) => {
    const filteredStocks = stalkerStocks.filter(
      (stock) => stock.symbol !== symbol,
    );
    setStalkerStocks(filteredStocks);
  };

  return { stalkerStocks, onAddStalkerStocks, onRemoveStalkerStocks };
};

export default useStalkerStocksLocalStorage;
