import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Transition } from 'react-transition-group';
import ModalContainer, { type ModalContainerProps } from './ModalContainer';
import ModalOverlay, { type ModalOverlayProps } from './ModalOverlay';
import { useMultiRefsCallback } from '../../hooks';
import { isServer } from '~/shared/utils';

const useSafeLayoutEffect = isServer() ? useEffect : useLayoutEffect;

export type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  overlayProps?: Omit<ModalOverlayProps, 'children'> & {
    innerRef?: React.MutableRefObject<HTMLDivElement>;
  };
  innerRef?: React.MutableRefObject<unknown>;
} & ModalContainerProps;

const FOCUSABLE_ELEMENTS =
  'a:not([disabled]),' +
  'button:not([disabled]),' +
  'input:not([disabled]):not([type="hidden"]),' +
  'select:not([disabled]),' +
  'textarea:not([disabled]),' +
  'details,' +
  '[tabindex]:not([disabled]):not([tabindex="-1"])';

export default function Modal(props: ModalProps) {
  const {
    isOpen,
    children,
    onClose,
    overlayProps = {},
    innerRef,
    ...rest
  } = props;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const focusGuardsRef = useRef<[HTMLDivElement, HTMLDivElement?] | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const modalMultiRefsCallback = useMultiRefsCallback(
    [modalRef, innerRef],
    [innerRef]
  );

  const rootMultiRefsCallback = useMultiRefsCallback(
    [rootRef, overlayProps?.innerRef],
    [overlayProps?.innerRef]
  );

  const focusGuardRefCallback = useCallback((node: HTMLDivElement) => {
    if (node) {
      if (!focusGuardsRef.current) {
        focusGuardsRef.current = [node];
      } else {
        const index = Number(node.dataset.index);
        focusGuardsRef.current[index] = node;
      }
    }
  }, []);

  useSafeLayoutEffect(() => {
    if (isOpen) {
      lastFocused.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // Lock page scroll
      document.body.style.setProperty('overflow', 'hidden');
    } else {
      // Unlock page scroll
      document.body.style.removeProperty('overflow');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && lastFocused.current) {
      // Focus on last focused after modal close
      lastFocused.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const modal = modalRef.current;

    if (isOpen && modal) {
      // Initial focus
      const focusable = modal.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS);
      if (focusable.length) focusable[0].focus();
      else modal.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    function onKeyUp(e: KeyboardEvent) {
      if (e.code === 'Escape') {
        onClose();
      }
    }
    function onGuardFocus(e: FocusEvent) {
      // Focus trap
      const modal = modalRef.current;

      if (modal) {
        const focusable =
          modal.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS);
        if (e.target === focusGuardsRef.current?.[0]) {
          if (focusable.length) focusable[focusable.length - 1].focus();
          else modal.focus();
        }
        if (e.target === focusGuardsRef.current?.[1]) {
          if (focusable.length) focusable[0].focus();
          else modal.focus();
        }
      }
    }

    if (isOpen) {
      document.addEventListener('keyup', onKeyUp);
      focusGuardsRef.current?.[0].addEventListener('focus', onGuardFocus);
      focusGuardsRef.current?.[1]?.addEventListener('focus', onGuardFocus);
    }
    return () => {
      document.removeEventListener('keyup', onKeyUp);
      focusGuardsRef.current?.[0].removeEventListener('focus', onGuardFocus);
      focusGuardsRef.current?.[1]?.removeEventListener('focus', onGuardFocus);
    };
  }, [isOpen]);

  const modal = (
    <ModalOverlay {...overlayProps} ref={rootMultiRefsCallback}>
      <div tabIndex={0} data-index={0} ref={focusGuardRefCallback} />
      <Transition
        nodeRef={modalRef}
        in={isOpen}
        appear
        timeout={300}
        mountOnEnter
      >
        {(state) => (
          <ModalContainer
            {...rest}
            ref={modalMultiRefsCallback}
            style={{
              opacity: state === 'entered' || state === 'entering' ? 1 : 0,
              transition: `opacity 300ms ease-in-out`,
            }}
          >
            {children}
          </ModalContainer>
        )}
      </Transition>
      <div tabIndex={0} data-index={1} ref={focusGuardRefCallback} />
    </ModalOverlay>
  );

  return isOpen && createPortal(modal, document.body);
}
