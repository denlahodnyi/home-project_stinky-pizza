export type Price = {
  amount: number;
  currency: string;
  discount: number;
  discountUnit: 'percentage' | 'currency';
};

export type ProductCategories = 'pizzas' | 'drinks';

export type PizzaAllSizes = { size: 'sm' } | { size: 'md' } | { size: 'lg' };
export type PizzaSizes = PizzaAllSizes[];
export type DrinksAllSizes =
  | { size: 0.25; units: 'l' }
  | { size: 0.33; units: 'l' }
  | { size: 0.5; units: 'l' }
  | { size: 0.75; units: 'l' }
  | { size: 1; units: 'l' };
export type DrinksSizes = DrinksAllSizes[];

export type ProductCommon = {
  category: ProductCategories;
  description: string | null;
  id: string;
  imageUrl: string | null;
  price: Price;
  title: string;
};

export type Pizza = {
  category: 'pizzas';
  sizes: PizzaSizes;
};

export type Drink = {
  category: 'drinks';
  sizes: DrinksSizes;
};

export type Product = ProductCommon & (Pizza | Drink);
