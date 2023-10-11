import { useState } from 'react';
import { json, type LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { fakeDrinks, fakePizzas } from '~/mocks/data/products';
import type { ProductCategories } from '~/shared/types';
import { Button, Icon } from '~/shared/components';
import { formatPrice } from '~/shared/utils';
import { ProductVariantSelector } from '~/features/product/chooseVariant';
import { useStore } from '~/store';
import imagePlaceholder from '~/assets/svg/placeholder_600x400.svg';

const fakeProducts = {
  pizzas: fakePizzas,
  drinks: fakeDrinks,
};

export const loader = async ({ params }: LoaderArgs) => {
  const { category, productId } = params;
  const product = fakeProducts[category as ProductCategories].find(
    (obj) => obj.id === productId
  );
  return json(product);
};

export default function ProductPage() {
  const product = useLoaderData<typeof loader>();
  const addToCart = useStore((state) => state.addToCart);
  const [selectedVariant, setSelectedVariant] = useState(
    product.productVariants[0]
  );
  const {
    priceWithCurrency,
    discount,
    priceWithDiscountAndCurrency,
    formattedDiscount,
  } = formatPrice(selectedVariant.price);

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    addToCart(product, selectedVariant);
  };

  return (
    <div className="grid flex-1 grid-rows-[min-content] gap-y-4 px-8 md:grid-cols-3 md:gap-x-4">
      <img
        src={product.imageUrl || imagePlaceholder}
        alt={`${product.title}`}
        className="aspect-square w-full object-cover md:w-auto"
      />
      <div className="md:col-span-2">
        <h1 className="mb-3 text-3xl font-bold md:text-5xl">{product.title}</h1>
        <p className="text-text/50 dark:text-textDark/50">
          {product.description}
        </p>
      </div>
      <div className="w-full ">
        <p className="mb-1 space-x-2 text-3xl" aria-live="polite" aria-atomic>
          {discount ? (
            <>
              <s>{priceWithCurrency}</s>
              <span>{priceWithDiscountAndCurrency}</span>
              <span className="rounded-md bg-secondary p-1 pt-[0.4rem] leading-none">
                {formattedDiscount}
              </span>
            </>
          ) : (
            <span>{priceWithCurrency}</span>
          )}
        </p>
        <form onSubmit={handleAddToCart}>
          <fieldset className="mb-4">
            <legend>Choose size</legend>
            <ProductVariantSelector
              productVariants={product.productVariants}
              selectedProductVariant={selectedVariant}
              onSelect={(_, productVariant) =>
                setSelectedVariant(productVariant)
              }
              classNames={{
                label: 'py-2',
              }}
            />
          </fieldset>
          <Button
            type="submit"
            variant="primary"
            size="large"
            rightElement={
              <Icon className="text-2xl" iconName="LiaCartPlusSolid" />
            }
          >
            Add to cart
          </Button>
        </form>
      </div>
    </div>
  );
}
