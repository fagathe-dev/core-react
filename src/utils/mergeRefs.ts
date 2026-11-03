import type { Ref, RefCallback } from 'react';

type Cleanup = () => void;

/**
 * Fusionne plusieurs refs (objets ou callbacks) en une ref callback.
 * Compatible React 19 : les cleanups retournés par les refs callbacks sont appelés au détachement ;
 * à défaut, la ref reçoit `null` comme en React 18.
 */
export const mergeRefs = <T>(...refs: Array<Ref<T> | undefined>): RefCallback<T> => {
  return (node: T | null) => {
    const cleanups: Cleanup[] = [];

    for (const ref of refs) {
      if (!ref) continue;

      if (typeof ref === 'function') {
        const cleanup = ref(node);
        cleanups.push(typeof cleanup === 'function' ? cleanup : () => ref(null));
      } else {
        ref.current = node;
        cleanups.push(() => {
          ref.current = null;
        });
      }
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  };
};
