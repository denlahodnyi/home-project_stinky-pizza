export type Price = {
  amount: number;
  amountWithDiscount: number;
  currency: string;
  discount: number;
  discountUnit: 'percentage' | 'currency';
};

export type ProductCategories = 'pizzas' | 'drinks';

export type PizzaAllSizes = { size: 'sm' } | { size: 'md' } | { size: 'lg' };
export type PizzaSizes = PizzaAllSizes[];
export type DrinksAllSizes =
  | { size: 0.25; sizeUnits: 'l' }
  | { size: 0.33; sizeUnits: 'l' }
  | { size: 0.5; sizeUnits: 'l' }
  | { size: 0.75; sizeUnits: 'l' }
  | { size: 1; sizeUnits: 'l' };
export type DrinksSizes = DrinksAllSizes[];

export type ProductCommon = {
  category: ProductCategories;
  description: string | null;
  id: string;
  imageUrl: string | null;
  title: string;
};

export type ProductVariant = {
  id: string;
  price: Price;
};

export type Pizza = {
  id: string;
  size: PizzaAllSizes['size'];
  sizeUnits: null;
};

export type Drink = {
  size: DrinksAllSizes['size'];
  sizeUnits: DrinksAllSizes['sizeUnits'];
};

export type Product = ProductCommon &
  (
    | {
        category: 'pizzas';
        productVariants: (ProductVariant & Pizza)[];
      }
    | {
        category: 'drinks';
        productVariants: (ProductVariant & Drink)[];
      }
  );

export type CartProductsById = {
  [key: string]: {
    product: Product;
    subProductsQuantity: {
      [key: string]: number;
    };
  };
};

export type Cart = {
  price: {
    amount: number;
    currency: string;
  };
  products: {
    ids: string[];
    byId: {
      [index: string]: {
        product: Product;
        productVariants: {
          ids: string[];
          byId: {
            [index: string]: {
              productVariant: Product['productVariants'][number];
              quantity: number;
            };
          };
        };
      };
    };
  };
  quantity: number;
};
