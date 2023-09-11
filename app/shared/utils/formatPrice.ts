import type { Price } from '../types';

const formatPrice = (price: Price) => {
  const calculatedPrice = price.amount / 100;
  let calculatedDiscount: number;
  let priceWithDiscount: number;
  let formattedDiscount: string;

  if (price.discountUnit === 'percentage') {
    calculatedDiscount = price.discount;
    priceWithDiscount = (price.amount * price.discount) / 100 / 100;
    formattedDiscount = `-${calculatedDiscount}%`;
  } else {
    calculatedDiscount = price.discount / 100;
    priceWithDiscount = (price.amount - price.discount) / 100;
    formattedDiscount = `-${new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currency,
    }).format(calculatedDiscount)}`;
  }

  return {
    price: calculatedPrice,
    priceWithDiscount,
    priceWithCurrency: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currency,
    }).format(calculatedPrice),
    priceWithDiscountAndCurrency: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currency,
    }).format(priceWithDiscount),
    discount: calculatedDiscount,
    formattedDiscount,
  };
};

export default formatPrice;
