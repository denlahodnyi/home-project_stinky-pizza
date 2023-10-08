import { Factory } from 'fishery';
import { randChanceBoolean } from '@ngneat/falso';
import type { Product, PizzaAllSizes, DrinksAllSizes } from '~/shared/types';

const pizzasMenu = [
  {
    title: 'Rats tails',
    productVariants: [
      { size: 'sm', price: 89_99 },
      { size: 'md', price: 120_00 },
      { size: 'lg', price: 180_00 },
    ],
  },
  {
    title: 'Cockroaches and rotten tomatoes',
    productVariants: [
      { size: 'sm', price: 89_99 },
      { size: 'md', price: 120_00 },
      { size: 'lg', price: 180_00 },
    ],
  },
  {
    title: 'Fish market',
    productVariants: [
      { size: 'sm', price: 89_99 },
      { size: 'md', price: 120_00 },
      { size: 'lg', price: 180_00 },
    ],
  },
  {
    title: 'Hot jellyfish',
    productVariants: [
      { size: 'sm', price: 89_99 },
      { size: 'md', price: 120_00 },
      { size: 'lg', price: 180_00 },
    ],
  },
  {
    title: '13 mold cheeses',
    productVariants: [
      { size: 'sm', price: 89_99 },
      { size: 'md', price: 120_00 },
      { size: 'lg', price: 180_00 },
    ],
  },
  {
    title: 'A tale of 5 bugs',
    productVariants: [
      { size: 'sm', price: 89_99 },
      { size: 'md', price: 120_00 },
      { size: 'lg', price: 180_00 },
    ],
  },
];

const drinksMenu = [
  {
    title: 'Radioactive water',
    productVariants: [
      { size: 0.5, price: 10_00, sizeUnits: 'l' },
      { size: 1, price: 19_99, sizeUnits: 'l' },
    ],
  },
  {
    title: 'Crazy Cola',
    productVariants: [
      { size: 0.5, price: 15_00, sizeUnits: 'l' },
      { size: 1, price: 35_00, sizeUnits: 'l' },
    ],
  },
  {
    title: 'Crazy Fanta',
    productVariants: [
      { size: 0.5, price: 15_00, sizeUnits: 'l' },
      { size: 1, price: 35_00, sizeUnits: 'l' },
    ],
  },
  {
    title: 'Crazy Sprite',
    productVariants: [
      { size: 0.5, price: 15_00, sizeUnits: 'l' },
      { size: 1, price: 35_00, sizeUnits: 'l' },
    ],
  },
];

const pizzasFactory = Factory.define<Product>(({ sequence }) => {
  const pizza = pizzasMenu[sequence - 1];
  return {
    id: `pizzaId-${sequence}`,
    title: pizza.title,
    category: 'pizzas',
    description:
      'Magna pariatur sunt laborum exercitation magna enim nostrud dolor pariatur labore ut tempor ipsum.',
    imageUrl: `https://loremflickr.com/320/240/pizza?random=${sequence}`,
    productVariants: pizza.productVariants.map((productVar, i) => {
      const isDiscount = randChanceBoolean({ chanceTrue: 0.15 });
      const discountPercentage = 15;
      const size = productVar.size as PizzaAllSizes['size'];
      return {
        id: `pizzaId-${sequence}-${i}`,
        size,
        sizeUnits: null,
        price: {
          amount: productVar.price,
          amountWithDiscount: isDiscount
            ? productVar.price - (productVar.price * discountPercentage) / 100
            : productVar.price,
          currency: 'USD',
          discount: isDiscount ? 15 : 0,
          discountUnit: 'percentage',
        },
      };
    }),
  };
});

const drinksFactory = Factory.define<Product>(({ sequence }) => {
  const drink = drinksMenu[sequence - 1];
  return {
    id: `drinkId-${sequence}`,
    title: drink.title,
    category: 'drinks',
    description:
      'Magna pariatur sunt laborum exercitation magna enim nostrud dolor pariatur labore ut tempor ipsum.',
    imageUrl: `https://loremflickr.com/320/240/drink?random=${sequence}`,
    productVariants: drink.productVariants.map((product, i) => {
      const isDiscount = randChanceBoolean({ chanceTrue: 0.15 });
      const discountPercentage = 5;
      const size = product.size as DrinksAllSizes['size'];
      const sizeUnits = product.sizeUnits as DrinksAllSizes['sizeUnits'];
      return {
        id: `drinkId-${sequence}-${i}`,
        size,
        sizeUnits,
        price: {
          amount: product.price,
          amountWithDiscount: isDiscount
            ? product.price - (product.price * discountPercentage) / 100
            : product.price,
          currency: 'USD',
          discount: isDiscount ? 15 : 0,
          discountUnit: 'percentage',
        },
      };
    }),
  };
});

export const fakePizzas = pizzasFactory.buildList(pizzasMenu.length);
export const fakeDrinks = drinksFactory.buildList(drinksMenu.length);
