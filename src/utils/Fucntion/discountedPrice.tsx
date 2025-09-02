export const discountedPrice = (price: number, discount: number): number => {
  if (!price) return 0;
  return Math.floor(price - (price * discount) / 100);
};
