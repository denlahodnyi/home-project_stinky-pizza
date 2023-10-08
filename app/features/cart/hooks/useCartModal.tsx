import { useCallback } from 'react';
import { useStore } from '~/store';

export default function useCartModal() {
  const showModal = useStore((state) => state.showModal);
  const closeModal = useStore((state) => state.closeModal);
  const show = useCallback(() => showModal('cart'), []);
  const close = useCallback(() => closeModal('cart'), []);
  return { show, close };
}
