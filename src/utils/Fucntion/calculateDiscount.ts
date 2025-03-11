export const calculateDiscountedPrice = (
  mainTaka: number,
  percentage: number,
  coupon?: number
): number => {
  // Calculate the percentage discount
  const discountAmount = (mainTaka * percentage) / 100;
  let finalPrice = mainTaka - discountAmount;

  // Apply coupon discount if available
  if (coupon) {
    const couponDiscount = (finalPrice * coupon) / 100;
    finalPrice -= couponDiscount;
  }

  return finalPrice;
};
