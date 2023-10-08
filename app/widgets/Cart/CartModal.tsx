import { useMemo } from 'react';
import { Modal, IconButton, Button } from '~/shared/components';
import SelectedCartProduct from './SelectedProduct';
import { useStore } from '~/store';
import type { ProductCategories, Cart } from '~/shared/types';
import { formatPrice } from '~/shared/utils';

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const groupProductsIdsByCategory = (products: Cart['products']) => {
  const allProducts = products.ids.map((id) => products.byId[id]);
  return allProducts.reduce<{ [Key in ProductCategories]?: string[] }>(
    (accumulator, productById) => {
      const { id, category } = productById.product;
      return {
        ...accumulator,
        [category]: [...(accumulator?.[category] || []), id],
      };
    },
    {}
  );
};

export default function CartModal(props: CartModalProps) {
  const { isOpen, onClose } = props;
  const { price, products, quantity } = useStore((state) => state.cart);
  const changeQuantity = useStore((state) => state.changeQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const { amount, currency } = price;
  const { priceWithCurrency } = formatPrice({
    amount,
    amountWithDiscount: amount,
    currency,
    discount: 0,
    discountUnit: 'percentage',
  });

  const productsIdsByCategory = useMemo(
    () => groupProductsIdsByCategory(products),
    [products]
  );
  const categories = Object.keys(productsIdsByCategory) as ProductCategories[];

  const handleChangeQuantity = (
    ...params: Parameters<typeof changeQuantity>
  ) => {
    changeQuantity(...params);
  };

  return (
    <Modal
      as="aside"
      isOpen={isOpen}
      onClose={onClose}
      position="default"
      className="absolute bottom-0 right-0 top-0 flex w-full max-w-[50%] flex-col rounded-none"
    >
      <div className="grid grid-cols-[1fr_auto_minmax(20px,1fr)] px-2 py-4">
        <span className="flex">
          <IconButton
            aria-label="Close modal"
            variant="default"
            iconProps={{ iconName: 'LiaTimesSolid' }}
            className="text-3xl font-bold"
            onClick={onClose}
          />
        </span>
        <h1 className="mx-1 flex-1 text-center text-2xl font-bold">
          Your cart
        </h1>
        <span />
      </div>
      {categories.length ? (
        <div className="flex-1 space-y-4 overflow-auto px-4">
          {categories.map((category) => {
            return (
              <div key={category}>
                <h2 className="text-2xl font-bold capitalize">{category}</h2>
                <div className="divide-y">
                  {(productsIdsByCategory?.[category] || []).map((id) => {
                    const { product, productVariants } = products.byId[id];
                    return (
                      <SelectedCartProduct
                        key={id}
                        product={product}
                        productVariants={productVariants}
                        onQuantityChange={handleChangeQuantity}
                        onProductDelete={removeFromCart}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-text/50">Your cart is empty</p>
        </div>
      )}
      <div className="flex items-center justify-between border-t px-4 py-2">
        <div aria-live="polite" aria-atomic="true">
          <p>Total price: {priceWithCurrency}</p>
          <p>Total number: {quantity}</p>
        </div>
        <Button variant="primary" size="large">
          Order
        </Button>
      </div>
    </Modal>
  );
}
