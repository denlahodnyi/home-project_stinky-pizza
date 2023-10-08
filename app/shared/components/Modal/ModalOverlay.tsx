import { forwardRef } from 'react';
import clsx from 'clsx';

export type ModalOverlayProps = {
  children: React.ReactNode;
  className?: string;
};

export default forwardRef(function ModalOverlay(
  { children, className }: ModalOverlayProps,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={clsx(
        'bg-slate-500/25 fixed left-0 top-0 z-[99999] h-screen w-screen overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
});
