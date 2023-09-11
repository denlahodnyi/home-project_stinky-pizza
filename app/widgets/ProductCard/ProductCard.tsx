import { Link, type LinkProps } from '@remix-run/react';
import clsx from 'clsx';
import type { ProductCategories, Product } from '~/shared/types';
import { Button } from '~/shared/components';
import { formatPrice } from '~/shared/utils';
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
  const { imageUrl, title, description = '', price } = data;
  const {
    discount,
    formattedDiscount,
    priceWithCurrency,
    priceWithDiscountAndCurrency,
  } = formatPrice(price);
  const imageAlt = '';

  return (
    <article
      className={clsx(
        className,
        'rounded-xl border-2 border-accent-light bg-surface shadow-sm transition-shadow hover:shadow-xl'
      )}
    >
      <ImgContainer to={to}>
        <img
          src={imageUrl || placeholderImg}
          alt={imageAlt}
          className="rounded-t-[calc(theme(borderRadius.xl)-2px)] object-cover"
        />
      </ImgContainer>
      <div className="space-y-2 p-2 pb-3">
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
        <form action="">
          <div className="text-center">
            <Button variant="primary" size="large">
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
