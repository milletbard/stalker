/**
 * @param data 新到舊的收盤列表
 * @param period 週期
 * 起始點:將n日間的收盤價的合計除以n算出平均值，作為第一日的EMA。
 * 翌日:以前一日的EMA+平滑化常數 α *（當日收盤價-前日EMA）算出
 */
export const ema = (data: number[], period: number) => {
  // 舊到新的收盤列表
  const reversCloses = data.slice(0, period).reverse();
  // 平滑化常數
  const a = 2 / (period + 1);

  // 起始EMA，以 n 天的平均值作為起始值
  const initEma = Number(
    (reversCloses.reduce((acc, cur) => acc + cur, 0) / period).toFixed(2),
  );

  const emaArray = [initEma];

  // 計算第二天開始的 EMA
  for (let i = 0; i < period; i++) {
    if (i > 0) {
      // 第2日起，以前一日的EMA+平滑化常數 α *（當日收盤價-前日EMA）算出
      // 平滑化常數為α＝2÷（n+1）。
      const prevEma = emaArray[i - 1];

      const ema = Number(
        (prevEma + a * (reversCloses[i] - prevEma)).toFixed(2),
      );
      emaArray.push(ema);
    }
  }

  // 反轉回來，保持新到舊的 ema 列表
  return emaArray.reverse();
};

/**
  計算 MACD
 * @param ema12Array 
 * @param ema26Array
 * @returns
 */
export const macd = ({
  ema12Array,
  ema26Array,
}: {
  ema12Array: number[];
  ema26Array: number[];
}) => {
  const ema12 = ema12Array[0];
  const ema26 = ema26Array[0];

  const dif = ema12 - ema26;

  const macdLine = [];
  for (let i = 0; i < ema12Array.length; i++) {
    macdLine.push(ema12Array[i] - ema26Array[i]);
  }
  const dea = ema(macdLine, 9)[0];

  const bar = (dif - dea) * 2;

  return {
    dif: Number(dif.toFixed(2)),
    dea: Number(dea.toFixed(2)),
    bar: Number(bar.toFixed(2)),
    ema12: Number(ema12.toFixed(2)),
    ema26: Number(ema26.toFixed(2)),
  };
};
