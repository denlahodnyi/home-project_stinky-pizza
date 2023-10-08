import { forwardRef } from 'react';
import BaseButton, {
  type BaseButtonProps,
  type BaseButtonRef,
  type BaseButtonWithForwardRef,
} from '../BaseButton/BaseButton';
import { cn } from '~/shared/utils';

type ButtonOwnProps = {
  variant?: '' | 'primary' | 'secondary';
  size?: 'default' | 'large';
  leftElement?: JSX.Element;
  rightElement?: JSX.Element;
};

export type ButtonProps<
  A extends React.ElementType,
  B extends boolean,
> = BaseButtonProps<A, B> & ButtonOwnProps;

function Button<A extends React.ElementType, B extends boolean>(
  props: ButtonProps<A, B>,
  ref?: BaseButtonRef<A, B>
) {
  const {
    children,
    className,
    variant = 'primary',
    size = 'default',
    leftElement,
    rightElement,
    ...rest
  } = props;

  return (
    <BaseButton
      {...rest}
      data-size={size}
      data-variant={variant}
      className={cn('button', className)}
      ref={ref}
    >
      <span className="button-inner inline-flex space-x-0.5">
        {leftElement && <span>{leftElement}</span>}
        <span>{children}</span>
        {rightElement && <span>{rightElement}</span>}
      </span>
    </BaseButton>
  );
}

export default forwardRef(Button) as BaseButtonWithForwardRef<ButtonOwnProps>;
