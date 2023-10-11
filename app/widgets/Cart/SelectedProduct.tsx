import type { Product, Cart } from '~/shared/types';
import { IconButton, StepperInput } from '~/shared/components';
import placeholderImg from '~/assets/svg/placeholder_600x400.svg';
import formatPrice from '~/shared/utils/formatPrice';

type SelectedProductProps = {
  product: Product;
  productVariants: Cart['products']['byId'][string]['productVariants'];
  onQuantityChange: (
    quantity: number,
    productId: string,
    productVariantId: string
  ) => void;
  onProductDelete: (productId: string, productVariantId?: string) => void;
};

export default function SelectedProduct(props: SelectedProductProps) {
  const {
    product,
    productVariants: selectedProductVariants,
    onQuantityChange,
    onProductDelete,
  } = props;
  const { title, imageUrl } = product;
  const isSingleProduct = selectedProductVariants.ids.length === 1;
  const singleProduct =
    selectedProductVariants.byId[selectedProductVariants.ids[0]];
  const singleProductQuantity = singleProduct.quantity;
  const singleProductPrice = isSingleProduct
    ? formatPrice({
        ...singleProduct.productVariant.price,
        amountWithDiscount:
          singleProduct.productVariant.price.amountWithDiscount *
          singleProductQuantity,
      })
    : { priceWithDiscountAndCurrency: '' };

  return (
    <div className="py-2">
      <section className="flex">
        <div>
          <img
            src={imageUrl || placeholderImg}
            alt=""
            // width={150}
            className="w-[75px] rounded-md object-cover md:w-[150px]"
          />
        </div>
        <div className="flex-1 px-2">
          <h2 className="text-xl">
            {title}{' '}
            {isSingleProduct && (
              <span className="uppercase">
                ({singleProduct.productVariant.size}
                {singleProduct.productVariant.sizeUnits})
              </span>
            )}
          </h2>
        </div>
        <div className="flex flex-col items-end">
          {isSingleProduct && (
            <>
              <StepperInput
                value={singleProductQuantity}
                min={1}
                max={100}
                containerProps={{
                  className: 'max-w-[120px]',
                }}
                onChange={(e) =>
                  onQuantityChange(
                    Number(e.target.value),
                    product.id,
                    singleProduct.productVariant.id
                  )
                }
              />
              <div>{singleProductPrice.priceWithDiscountAndCurrency}</div>
            </>
          )}
        </div>
        <div className="ml-1 flex items-start justify-center">
          <IconButton
            aria-label="Remove from cart"
            iconProps={{ iconName: 'LiaTimesSolid', className: 'text-base' }}
            variant="primary"
            onClick={() => onProductDelete(product.id)}
          />
        </div>
      </section>
      {!isSingleProduct &&
        selectedProductVariants.ids.map((id) => {
          const { productVariant, quantity } = selectedProductVariants.byId[id];
          const { priceWithDiscountAndCurrency } = formatPrice({
            ...productVariant.price,
            amount: productVariant.price.amount * quantity,
            amountWithDiscount:
              productVariant.price.amountWithDiscount * quantity,
          });
          return (
            <section key={id} className="flex py-1">
              <div className="flex-1">
                <h3>
                  Size:{' '}
                  <span className="uppercase">
                    {productVariant.size}
                    {productVariant.sizeUnits}
                  </span>
                </h3>
              </div>
              <div className="flex flex-col items-end">
                <StepperInput
                  value={quantity}
                  min={1}
                  max={100}
                  containerProps={{
                    className: 'max-w-[120px]',
                  }}
                  onChange={(e) =>
                    onQuantityChange(
                      Number(e.target.value),
                      product.id,
                      productVariant.id
                    )
                  }
                />
                <div>{priceWithDiscountAndCurrency}</div>
              </div>
              <div className="ml-1 flex items-start justify-center">
                <IconButton
                  aria-label="Remove from cart"
                  iconProps={{
                    iconName: 'LiaTimesSolid',
                    className: 'text-base',
                  }}
                  variant="primary"
                  onClick={() => onProductDelete(product.id, productVariant.id)}
                />
              </div>
            </section>
          );
        })}
    </div>
  );
}
