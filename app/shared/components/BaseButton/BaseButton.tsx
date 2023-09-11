import { forwardRef } from 'react';
import { Link, type LinkProps } from '@remix-run/react';

type BaseButtonRootProps = {
  children?: React.ReactNode;
  className?: string;
};

type PolymorphicButtonProps<A extends React.ElementType, B = false> = {
  isRouterLink?: B;
  as?: A;
} & React.ComponentPropsWithoutRef<A>;

type ButtonAsRouterLinkProps<B = true> = {
  isRouterLink: B;
} & LinkProps;

export type BaseButtonRef<
  A extends React.ElementType,
  B extends boolean,
> = B extends true
  ? React.ComponentPropsWithRef<'a'>['ref']
  : React.ComponentPropsWithRef<A>['ref'];

export type BaseButtonProps<
  A extends React.ElementType,
  B extends boolean,
> = BaseButtonRootProps &
  (B extends true ? ButtonAsRouterLinkProps<B> : PolymorphicButtonProps<A, B>);

function BaseButton<
  A extends React.ElementType = 'button',
  B extends boolean = false,
>(props: BaseButtonProps<A, B>, ref?: BaseButtonRef<A, B>) {
  if (props.isRouterLink) {
    const { isRouterLink, children, ...linkProps } = props;
    return (
      <Link {...linkProps} ref={ref}>
        {children}
      </Link>
    );
  }
  const { isRouterLink, as, children, ...elemProps } = props;
  const Component: React.ElementType = as || 'button';

  return (
    <Component {...elemProps} ref={ref}>
      {children}
    </Component>
  );
}

export type BaseButtonWithForwardRef<TProps> = <
  A extends React.ElementType = 'button',
  B extends boolean = false,
>(
  props: BaseButtonProps<A, B> & TProps & { ref?: BaseButtonRef<A, B> }
) => React.ReactElement;

export default forwardRef(BaseButton) as BaseButtonWithForwardRef<{}>;
