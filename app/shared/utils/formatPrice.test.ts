import type { Price } from '../types';
import formatPrice from './formatPrice';

describe('formatPrice', () => {
  test('returns correct result if price = 15000 and discount = 50', () => {
    const priceData: Price = {
      amount: 150_00,
      amountWithDiscount: 100_00,
      discount: 5000,
      discountUnit: 'currency',
      currency: 'USD',
    };
    expect(formatPrice(priceData)).toEqual({
      price: 150,
      priceWithDiscount: 100,
      priceWithCurrency: '$150.00',
      priceWithDiscountAndCurrency: '$100.00',
      discount: 50,
      formattedDiscount: '-$50.00',
    });
  });
  test('returns correct result if price = 15000 and discount = 50%', () => {
    const priceData: Price = {
      amount: 150_00,
      amountWithDiscount: 75_00,
      discount: 50,
      discountUnit: 'percentage',
      currency: 'USD',
    };
    expect(formatPrice(priceData)).toEqual({
      price: 150,
      priceWithDiscount: 75,
      priceWithCurrency: '$150.00',
      priceWithDiscountAndCurrency: '$75.00',
      discount: 50,
      formattedDiscount: '-50%',
    });
  });
});
