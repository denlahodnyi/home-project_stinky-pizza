import React, { forwardRef } from 'react';
import BaseButton, {
  type BaseButtonProps,
  type BaseButtonRef,
  type BaseButtonWithForwardRef,
} from '../BaseButton/BaseButton';
import Icon, { type IconProps } from '../Icon/Icon';
import clsx from 'clsx';

type ButtonOwnProps = {
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'default' | 'large';
  children?: React.ReactNode;
  iconProps?: IconProps;
};

export type ButtonProps<
  A extends React.ElementType,
  B extends boolean,
> = BaseButtonProps<A, B> & ButtonOwnProps;

function IconButton<A extends React.ElementType, B extends boolean>(
  props: ButtonProps<A, B>,
  ref?: BaseButtonRef<A, B>
) {
  const {
    children,
    className,
    iconProps,
    variant = 'default',
    size = 'default',
    ...rest
  } = props;

  return (
    <BaseButton
      {...rest}
      data-size={size}
      data-variant={variant}
      className={clsx('iconButton', className)}
      ref={ref}
    >
      {children || (
        <Icon
          aria-hidden="true"
          iconName={iconProps?.iconName || 'LiaAccessibleIcon'}
          {...iconProps}
        />
      )}
    </BaseButton>
  );
}

export default forwardRef(
  IconButton
) as BaseButtonWithForwardRef<ButtonOwnProps>;
