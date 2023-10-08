import { forwardRef, useCallback, useEffect, useRef } from 'react';
import { useMultiRefsCallback } from '~/shared/hooks';
import BaseInput, { type BaseInputProps } from '../BaseInput/BaseInput';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';

type StepperInputProps = {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
} & Omit<BaseInputProps, 'value'>;

type Ref = React.Ref<HTMLInputElement>;

const changeInputProgrammatically = (
  value: any,
  inputElement: HTMLInputElement
) => {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value'
  )?.set;
  if (nativeInputValueSetter) {
    nativeInputValueSetter.call(inputElement, value);
    inputElement.dispatchEvent(
      new Event('change', { bubbles: true, cancelable: true })
    );
  }
};

export default forwardRef(function StepperInput(
  props: StepperInputProps,
  ref: Ref
) {
  const {
    min = 0,
    max = 100,
    step = 1,
    defaultValue = 1,
    onChange,
    ...rest
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const prevValue = useRef(props.value || min);

  const inputRefCallback = useMultiRefsCallback([inputRef, ref], [ref]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
  };

  const increase = useCallback(() => {
    const input = inputRef?.current;
    if (input) {
      const prevValue = Number(input.value);
      const nextValue = prevValue + step;
      if (max != undefined && (prevValue >= max || nextValue > max)) return;
      input.ariaValueNow = String(nextValue);
      changeInputProgrammatically(nextValue, input);
    }
  }, [max, step]);

  const decrease = useCallback(() => {
    const input = inputRef?.current;
    if (input) {
      const prevValue = Number(input.value);
      const nextValue = prevValue - step;
      if (min != undefined && (prevValue <= min || nextValue < min)) return;
      input.ariaValueNow = String(nextValue);
      changeInputProgrammatically(nextValue, input);
    }
  }, [min, step]);

  useEffect(() => {
    const input = inputRef.current;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowUp') increase();
      if (e.code === 'ArrowDown') decrease();
    };

    if (input) {
      input.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (input) {
        input.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [decrease, increase]);

  useEffect(() => {
    const input = inputRef.current;
    const onInput = (e: any) => {
      if (input && e instanceof InputEvent) {
        const value = (e.target as HTMLInputElement)?.value;
        const numValue = Number(value);
        if (
          /\D/.test(value) ||
          numValue === 0 ||
          numValue < min ||
          numValue > max
        ) {
          input.value = String(prevValue.current);
          return;
        }
        input.ariaValueNow = value;
        prevValue.current = Number(value);
      }
    };
    input?.addEventListener('input', onInput);
    return () => {
      input?.removeEventListener('input', onInput);
    };
  }, [max, min]);

  return (
    <BaseInput
      {...rest}
      type="text"
      ref={inputRefCallback}
      defaultValue={defaultValue}
      onChange={handleChange}
      role="spinbutton"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={Number(defaultValue)}
      inputMode="numeric"
      pattern="[0-9]*"
      rightElement={
        <span className="flex flex-col">
          <Button
            aria-label="Increase"
            tabIndex={-1}
            variant=""
            className="bg-accent px-4 py-0 text-sm"
            onClick={increase}
          >
            <Icon iconName="LiaPlusSolid" />
          </Button>
          <Button
            aria-label="Decrease"
            tabIndex={-1}
            variant=""
            className="bg-accent px-4 py-0 text-sm"
            onClick={decrease}
          >
            <Icon iconName="LiaMinusSolid" />
          </Button>
        </span>
      }
    />
  );
});
