import { StateCreator } from 'zustand';

type ModalTypes = 'cart';

export interface ModalsSlice {
  modals: {
    cart: boolean;
  };
  showModal: (modalType: ModalTypes) => void;
  closeModal: (modalType: ModalTypes) => void;
  resetModals: () => void;
}

const initState = {
  modals: {
    cart: false,
  },
};

export const createSlice: StateCreator<ModalsSlice> = (set) => ({
  ...initState,
  showModal: (modalType) =>
    set((state) => ({
      ...state,
      modals: { ...state.modals, [modalType]: true },
    })),
  closeModal: (modalType) =>
    set((state) => ({
      ...state,
      modals: { ...state.modals, [modalType]: false },
    })),
  resetModals: () => set(initState),
});
