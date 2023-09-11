import { forwardRef } from 'react';
import BaseButton, {
  type BaseButtonProps,
  type BaseButtonRef,
  type BaseButtonWithForwardRef,
} from '../BaseButton/BaseButton';
import clsx from 'clsx';

type ButtonOwnProps = {
  variant?: 'primary' | 'secondary';
  size?: 'default' | 'large';
};

export type ButtonProps<
  A extends React.ElementType,
  B extends boolean,
> = BaseButtonProps<A, B> & ButtonOwnProps;

// const styledVariants = {
//   primary: 'button button-primary',
//   secondary: 'button button-secondary',
// };

function Button<A extends React.ElementType, B extends boolean>(
  props: ButtonProps<A, B>,
  ref?: BaseButtonRef<A, B>
) {
  const {
    children,
    className,
    variant = 'primary',
    size = 'default',
    ...rest
  } = props;

  return (
    <BaseButton
      {...rest}
      data-size={size}
      data-variant={variant}
      className={clsx('button', className)}
      ref={ref}
    >
      {children}
    </BaseButton>
  );
}

export default forwardRef(Button) as BaseButtonWithForwardRef<ButtonOwnProps>;
