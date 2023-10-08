import { forwardRef } from 'react';
import { cn } from '~/shared/utils';

type LabelProps = { className?: string };
type ErrorProps = { className?: string };

export type BaseInputProps = {
  className?: string;
  variant?: 'unstyled' | 'default';
  error?: string;
  label?: React.ReactNode;
  labelProps?: LabelProps;
  errorProps?: ErrorProps;
  containerProps?: React.ComponentPropsWithoutRef<'div'>;
  inputWrapperProps?: React.ComponentPropsWithoutRef<'div'>;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'input'>;

export type Ref = React.Ref<HTMLInputElement>;

const styledVariants = {
  unstyled: {
    container: '',
    inputWrapper: '',
    input: '',
    label: '',
    error: '',
  },
  default: {
    container: '',
    inputWrapper:
      'group-[.error]:border-error flex items-center rounded-lg border-2 border-accent bg-background',
    input: 'w-full rounded-[inherit] bg-inherit px-1 py-1',
    label: 'group-[.error]:text-error font-bold',
    error: 'text-error',
  },
};

export default forwardRef(function BaseInput(props: BaseInputProps, ref: Ref) {
  const {
    className,
    variant = 'default',
    label,
    labelProps,
    error,
    errorProps,
    containerProps,
    inputWrapperProps,
    id,
    leftElement,
    rightElement,
    ...rest
  } = props;
  const { className: containerCn } = containerProps || {};
  const { className: labelCn } = labelProps || {};
  const { className: errorCn } = errorProps || {};
  const { className: inputWrapperCn } = inputWrapperProps || {};
  const descriptionId = id ? `description-${id}` : '';
  const isError = !!error;
  const defaultClassNames = styledVariants[variant];

  return (
    <div
      className={cn('group', isError && 'error', containerCn)}
      {...containerProps}
    >
      {label && (
        <label
          htmlFor={id}
          className={cn(defaultClassNames.label, labelCn)}
          {...labelProps}
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          'focus-within:app-outline',
          defaultClassNames.inputWrapper,
          inputWrapperCn
        )}
      >
        {leftElement}
        <input
          ref={ref}
          id={id}
          type="text"
          aria-describedby={descriptionId}
          aria-invalid={isError}
          className={cn(
            'focus:outline-none',
            defaultClassNames.input,
            className
          )}
          {...rest}
        />
        {rightElement}
      </div>
      {isError && (
        <p
          id={descriptionId}
          className={cn(defaultClassNames.error, errorCn)}
          {...errorProps}
        >
          {error}
        </p>
      )}
    </div>
  );
});
