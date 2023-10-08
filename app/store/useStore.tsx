import { type StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import {
  createSlice as createCartSlice,
  type CartSlice,
} from '~/features/cart';
import {
  createSlice as createModalsSlice,
  type ModalsSlice,
} from './modalsSlice';

type Slices = CartSlice & ModalsSlice;

const middlewares = (f: StateCreator<Slices>) => immer(devtools(f));

const useStore = create<Slices>()(
  middlewares((...args) => {
    return {
      ...createModalsSlice(...args),
      ...createCartSlice(...args),
    };
  })
);

export default useStore;
