import { type StateCreator } from 'zustand';
import type { Product, Cart } from '~/shared/types';

export interface CartSlice {
  cart: Cart;
  addToCart: (
    product: Product,
    productVariant: Product['productVariants'][number]
  ) => void;
  removeFromCart: (productId: string, productVariantId?: string) => void;
  changeQuantity: (
    quantity: number,
    productId: string,
    productVariantId: string
  ) => void;
  resetCart: () => void;
}

const initState = {
  cart: {
    price: {
      amount: 0,
      currency: 'USD',
    },
    products: {
      ids: [],
      byId: {},
    },
    quantity: 0,
  },
};

export const createSlice: StateCreator<
  CartSlice,
  [['zustand/immer', never]],
  [],
  CartSlice
> = (set) => ({
  ...initState,
  addToCart: (product, productVariant) =>
    set((state) => {
      const selectedProductVariants =
        state.cart.products.byId?.[product.id]?.productVariants;
      const { amountWithDiscount } = productVariant.price;

      state.cart.quantity += 1;
      state.cart.price.amount += amountWithDiscount;

      if (!state.cart.products.ids.includes(product.id)) {
        state.cart.products.ids.push(product.id);
        state.cart.products.byId[product.id] = {
          product,
          productVariants: {
            ids: [productVariant.id],
            byId: {
              [productVariant.id]: {
                productVariant,
                quantity: 1,
              },
            },
          },
        };
      } else if (!selectedProductVariants.ids.includes(productVariant.id)) {
        selectedProductVariants.ids.push(productVariant.id);
        selectedProductVariants.byId[productVariant.id] = {
          productVariant,
          quantity: 1,
        };
      } else {
        selectedProductVariants.byId[productVariant.id].quantity += 1;
      }
    }),
  removeFromCart: (productId, productVariantId) =>
    set((state) => {
      const selectedProduct = state.cart.products.byId[productId];
      const selectedProductVariants = selectedProduct.productVariants;

      if (!productVariantId) {
        const [priceDiff, quantityDiff] = selectedProductVariants.ids.reduce<
          [number, number]
        >(
          (accum, id) => {
            const productVariantById = selectedProductVariants.byId[id];
            const newPriceDiff =
              accum[0] +
              productVariantById.productVariant.price.amountWithDiscount *
                productVariantById.quantity;
            const newQuantityDiff = accum[1] + productVariantById.quantity;
            return [newPriceDiff, newQuantityDiff];
          },
          [0, 0]
        );

        state.cart.products.ids = state.cart.products.ids.filter(
          (id) => id !== productId
        );
        delete state.cart.products.byId[productId];
        state.cart.price.amount -= priceDiff;
        state.cart.quantity -= quantityDiff;
      } else {
        const productVariantById =
          selectedProductVariants.byId[productVariantId];
        const priceDiff =
          productVariantById.productVariant.price.amountWithDiscount *
          productVariantById.quantity;
        const quantityDiff = productVariantById.quantity;

        if (selectedProductVariants.ids.length === 1) {
          state.cart.products.ids = state.cart.products.ids.filter(
            (id) => id !== productId
          );
          delete state.cart.products.byId[productId];
        } else {
          delete selectedProductVariants.byId[productVariantId];
          selectedProductVariants.ids = selectedProductVariants.ids.filter(
            (id) => id !== productVariantId
          );
        }
        state.cart.price.amount -= priceDiff;
        state.cart.quantity -= quantityDiff;
      }
    }),
  changeQuantity: (quantity, productId, productVariantId) => {
    set((state) => {
      const selectedProductVariant =
        state.cart.products.byId[productId].productVariants.byId[
          productVariantId
        ];
      const price =
        selectedProductVariant.productVariant.price.amountWithDiscount;
      const prevQuantity = selectedProductVariant.quantity;
      const quantityDiff = quantity - prevQuantity;
      const priceDiff = price * quantity - price * prevQuantity;
      selectedProductVariant.quantity = quantity;
      state.cart.quantity += quantityDiff;
      state.cart.price.amount += priceDiff;
    });
  },
  resetCart: () => set(initState),
});
