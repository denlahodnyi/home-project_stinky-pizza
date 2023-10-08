import { useCallback } from 'react';
import { useStore } from '~/store';
import { CartModal } from '~/widgets';

export default function ModalsContainer() {
  const isCartOpen = useStore((state) => state.modals.cart);
  const closeModal = useStore((state) => state.closeModal);

  const closeCart = useCallback(() => closeModal('cart'), []);

  return (
    <>
      <CartModal isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}
