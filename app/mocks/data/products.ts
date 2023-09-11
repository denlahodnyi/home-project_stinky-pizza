import { Factory } from 'fishery';
import { randNumber, randChanceBoolean } from '@ngneat/falso';
import { Product } from '~/shared/types';

const pizzasMenu = [
  { title: 'Rats tails' },
  { title: 'Cockroaches and rotten tomatoes' },
  { title: 'Fish market' },
  { title: 'Hot jellyfish' },
  { title: '13 mold cheeses' },
  { title: 'A tale of 5 bugs' },
];

const drinksMenu = [
  { title: 'Radioactive water' },
  { title: 'Crazy Cola' },
  { title: 'Crazy Fanta' },
  { title: 'Crazy Sprite' },
];

const pizzasFactory = Factory.define<Product>(({ sequence }) => {
  const isDiscount = randChanceBoolean({ chanceTrue: 5 });
  return {
    id: `pizzaId-${sequence}`,
    title: pizzasMenu[sequence - 1].title,
    price: {
      amount: randNumber({ min: 100_00, max: 200_00, precision: 100 }),
      currency: 'USD',
      discount: isDiscount ? 15 : 0,
      discountUnit: 'percentage',
    },
    category: 'pizzas',
    description:
      'Magna pariatur sunt laborum exercitation magna enim nostrud dolor pariatur labore ut tempor ipsum.',
    imageUrl: null,
    sizes: [{ size: 'sm' }, { size: 'md' }, { size: 'lg' }],
  };
});

const drinksFactory = Factory.define<Product>(({ sequence }) => {
  return {
    id: `drinkId-${sequence}`,
    title: drinksMenu[sequence - 1].title,
    price: {
      amount: randNumber({ min: 20_00, max: 50_00, precision: 10 }),
      currency: 'USD',
      discount: 0,
      discountUnit: 'percentage',
    },
    category: 'drinks',
    description:
      'Magna pariatur sunt laborum exercitation magna enim nostrud dolor pariatur labore ut tempor ipsum.',
    imageUrl: null,
    sizes: [
      { size: 0.5, units: 'l' },
      { size: 1, units: 'l' },
    ],
  };
});

export const fakePizzas = pizzasFactory.buildList(pizzasMenu.length);
export const fakeDrinks = drinksFactory.buildList(drinksMenu.length);
