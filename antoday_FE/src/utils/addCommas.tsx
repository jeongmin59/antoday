export const addCommas = (num: string | number | undefined): string => {
  const numberString = num?.toString();

  return numberString?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}