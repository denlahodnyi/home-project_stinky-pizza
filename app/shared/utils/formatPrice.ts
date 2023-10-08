import type { Price } from '../types';

const formatPrice = (price: Price) => {
  const calculatedPrice = price.amount / 100;
  const calculatedPriceWithDiscount = price.amountWithDiscount / 100;
  let calculatedDiscount: number;
  let formattedDiscount: string;

  if (price.discountUnit === 'percentage') {
    // minor unit for discount is 1
    calculatedDiscount = price.discount;
    formattedDiscount = `-${calculatedDiscount}%`;
  } else {
    // minor unit for discount is same as for price
    calculatedDiscount = price.discount / 100;
    formattedDiscount = `-${new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currency,
    }).format(calculatedDiscount)}`;
  }

  return {
    price: calculatedPrice,
    priceWithDiscount: calculatedPriceWithDiscount,
    priceWithCurrency: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currency,
    }).format(calculatedPrice),
    priceWithDiscountAndCurrency: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currency,
    }).format(calculatedPriceWithDiscount),
    discount: calculatedDiscount,
    formattedDiscount,
  };
};

export default formatPrice;
