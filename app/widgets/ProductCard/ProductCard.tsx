import { useState } from 'react';
import { Link, type LinkProps } from '@remix-run/react';
import clsx from 'clsx';
import type { Product } from '~/shared/types';
import { Button, Icon } from '~/shared/components';
import { formatPrice } from '~/shared/utils';
import { useStore } from '~/store';
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
        'grid grid-rows-[auto,1fr] rounded-xl border-2 border-accent-light bg-surface shadow-sm transition-shadow hover:shadow-xl'
      )}
    >
      <ImgContainer to={to}>
        <img
          src={imageUrl || placeholderImg}
          alt={imageAlt || `${title} image`}
          className="w-full rounded-t-[calc(theme(borderRadius.xl)-2px)] object-cover"
        />
      </ImgContainer>
      <div className=" grid grid-rows-[1fr,auto] p-2 pb-3">
        <div className="space-y-2">
          <div>
            <Heading className="text-2xl font-[500]">{title}</Heading>
            <p className="mb-1 space-x-2 text-xl">
              {discount ? (
                <>
                  <s>{priceWithCurrency}</s>
                  <span>{priceWithDiscountAndCurrency}</span>
                  <span className="rounded-md bg-accent p-1 pt-[0.4rem] leading-none">
                    {formattedDiscount}
                  </span>
                </>
              ) : (
                <span>{priceWithCurrency}</span>
              )}
            </p>
          </div>
          {description && (
            <p className="line-clamp-3 leading-5 text-text/50">{description}</p>
          )}
        </div>
        <form onSubmit={handleAddToCart} className="space-y-2">
          {productVariants.length > 1 && (
            <fieldset>
              <legend>Choose size</legend>
              <div className="mb-3 grid auto-cols-fr grid-flow-col divide-x divide-accent rounded-md border border-accent">
                {productVariants.map((productVariant, i) => {
                  const { size, id } = productVariant;
                  const isChecked = selectedProductVariant.size === size;
                  return (
                    <span className="inline-flex text-center" key={id}>
                      <input
                        type="radio"
                        id={`product-size-${id}`}
                        name="size"
                        value={size}
                        checked={isChecked}
                        className="peer sr-only"
                        onChange={(e) =>
                          setSelectedProductVariant(productVariant)
                        }
                      />
                      <label
                        htmlFor={`product-size-${id}`}
                        key={i}
                        className="w-full cursor-pointer text-center uppercase peer-checked:bg-accent"
                      >
                        <span>{size}</span>
                      </label>
                    </span>
                  );
                })}
              </div>
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
