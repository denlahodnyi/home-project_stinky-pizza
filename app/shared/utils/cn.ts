import { twMerge } from 'tailwind-merge';
import clsx, { type ClassArray } from 'clsx';

const cn = (...args: ClassArray) => {
  return twMerge(clsx(args));
};

export default cn;
