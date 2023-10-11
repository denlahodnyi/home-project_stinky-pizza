import React, { forwardRef } from 'react';
import clsx from 'clsx';

export type ModalContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType<any>;
  style?: React.CSSProperties;
  position?: 'default' | 'centered';
};

const positionVariants = {
  default: '',
  centered: 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
};

function ModalContainer(
  {
    children,
    className,
    as: Component = 'div',
    position = 'centered',
    ...rest
  }: ModalContainerProps,
  ref: React.Ref<HTMLElement>
) {
  return (
    <Component
      ref={ref}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      className={clsx(
        'rounded-md bg-background dark:bg-backgroundDark',
        positionVariants[position],
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default forwardRef(ModalContainer);
