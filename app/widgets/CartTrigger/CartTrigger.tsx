import { useCartModal } from '~/features/cart';
import { Icon, BaseButton } from '~/shared/components';
import { formatPrice } from '~/shared/utils';
import { useStore } from '~/store';

export default function CartTrigger() {
  const { show } = useCartModal();
  const amount = useStore((state) => state.cart.price.amount);
  const currency = useStore((state) => state.cart.price.currency);
  const { priceWithCurrency } = formatPrice({
    amount,
    amountWithDiscount: amount,
    currency,
    discount: 0,
    discountUnit: 'percentage',
  });

  return (
    <>
      <BaseButton
        aria-label={`Open cart. Total price: ${priceWithCurrency}`}
        className="flex items-center text-2xl"
        onClick={show}
      >
        <span className="inline-block align-middle">
          <Icon
            className="inline-block align-[initial] text-[50px]"
            iconName="LiaShoppingBagSolid"
          />
        </span>
        <span className="inline-block align-middle">{priceWithCurrency}</span>
      </BaseButton>
    </>
  );
}
