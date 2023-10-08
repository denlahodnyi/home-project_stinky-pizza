import { useCallback } from 'react';

/**
 * `useMultiRefsCallback` returns ref callback that sets single node to several `refs`
 * @param refs an array of refs
 * @param deps dependencies array
 * @returns
 */
const useMultiRefsCallback = <T,>(
  refs: (React.ForwardedRef<T> | undefined)[],
  deps: React.DependencyList | null = []
) => {
  return useCallback(
    (node: T) => {
      refs.forEach((ref) => {
        if (typeof ref === 'function') {
          ref(node);
          return;
        }
        if (ref) {
          ref.current = node;
        }
      });
    },
    [...(deps ?? [])]
  );
};

export default useMultiRefsCallback;
