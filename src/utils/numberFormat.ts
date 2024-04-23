export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat("en").format(number);
};
