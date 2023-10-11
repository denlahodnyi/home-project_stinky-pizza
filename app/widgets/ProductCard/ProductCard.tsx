import { useState } from 'react';
import { Link, type LinkProps } from '@remix-run/react';
import clsx from 'clsx';
import type { Product } from '~/shared/types';
import { Button, Icon } from '~/shared/components';
import { formatPrice } from '~/shared/utils';
import { useStore } from '~/store';
import { ProductVariantSelector } from '~/features/product/chooseVariant';
import placeholderImg from '~/assets/svg/placeholder_600x400.svg';

type HeadingLvl = 1 | 2 | 3 | 4 | 5 | 6;
type ProductCardBaseProps = {
  className?: string;
  heading?: `h${HeadingLvl}`;
  data: Product;
};
type ProductCardProps = ProductCardBaseProps & { to?: string };

export default function ProductCard(props: ProductCardProps) {
  const { to, data, heading: Heading = 'h2', className } = props;
  const { imageUrl, title, description = '', productVariants } = data;
  const imageAlt = '';
  const addToCart = useStore((state) => state.addToCart);

  const [selectedProductVariant, setSelectedProductVariant] = useState(
    productVariants[0]
  );

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    addToCart(data, selectedProductVariant);
  };

  const {
    discount,
    formattedDiscount,
    priceWithCurrency,
    priceWithDiscountAndCurrency,
  } = formatPrice(selectedProductVariant.price);

  return (
    <article
      className={clsx(
        className,
        'grid rounded-xl border-2 border-secondary bg-surface shadow-sm transition-shadow hover:shadow-xl dark:bg-surfaceDark md:grid-rows-[minmax(0,45%)_auto]'
      )}
    >
      <ImgContainer to={to}>
        <img
          src={imageUrl || placeholderImg}
          alt={imageAlt || `${title} image`}
          className="h-full w-full rounded-t-[calc(theme(borderRadius.xl)-2px)] object-cover"
        />
      </ImgContainer>
      <div className=" grid grid-rows-[1fr,auto] p-3 pb-3">
        <div className="space-y-2">
          <div>
            <Heading className="text-2xl font-[500]">{title}</Heading>
            <p
              className="mb-1 space-x-2 text-xl"
              aria-live="polite"
              aria-atomic
            >
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
          </div>
          {description && (
            <p className="line-clamp-3 leading-5 text-text/50 dark:text-textDark/50">
              {description}
            </p>
          )}
        </div>
        <form onSubmit={handleAddToCart} className="space-y-2">
          {productVariants.length > 1 && (
            <fieldset>
              <legend>Choose size</legend>
              <ProductVariantSelector
                productVariants={productVariants}
                selectedProductVariant={selectedProductVariant}
                onSelect={(_, productVariant) =>
                  setSelectedProductVariant(productVariant)
                }
              />
            </fieldset>
          )}
          <div className="text-center">
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
          </div>
        </form>
      </div>
    </article>
  );
}

type ImgContainerBaseProps = {
  children: React.ReactNode;
  to?: string;
};
type ImgContainerProps<TProps> = TProps extends { to: string }
  ? ImgContainerBaseProps & LinkProps
  : ImgContainerBaseProps;

function ImgContainer<TProps>({
  children,
  to,
  ...rest
}: ImgContainerProps<TProps>) {
  if (to)
    return (
      <Link to={to} {...rest}>
        {children}
      </Link>
    );
  return <div {...rest}>{children}</div>;
}
