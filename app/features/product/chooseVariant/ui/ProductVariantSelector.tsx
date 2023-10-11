import { cn } from '~/shared/utils';
import type { Product } from '~/shared/types';

type ProductVariantSelectorProps = {
  className?: string;
  classNames?: {
    label?: string;
  };
  productVariants: Product['productVariants'];
  selectedProductVariant: Product['productVariants'][number];
  onSelect: (
    e: React.FormEvent<HTMLInputElement>,
    productVariant: Product['productVariants'][number]
  ) => void;
};

export default function ProductVariantSelector(
  props: ProductVariantSelectorProps
) {
  const {
    className,
    classNames,
    productVariants,
    selectedProductVariant,
    onSelect,
  } = props;

  return (
    <div
      className={cn(
        'mb-3 grid auto-cols-fr grid-flow-col divide-x divide-accent rounded-md border border-accent',
        className
      )}
    >
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
              onChange={(e) => onSelect(e, productVariant)}
            />
            <label
              htmlFor={`product-size-${id}`}
              key={i}
              className={cn(
                'w-full cursor-pointer text-center uppercase peer-checked:bg-accent',
                classNames?.label
              )}
            >
              <span>{size}</span>
            </label>
          </span>
        );
      })}
    </div>
  );
}
