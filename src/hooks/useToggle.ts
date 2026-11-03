import { useCallback, useState } from 'react';

export type ToggleFn = (nextValue?: unknown) => void;

/**
 * Booléen basculable.
 * `toggle()` inverse la valeur ; `toggle(true | false)` la force.
 * Tout argument non booléen (ex. un événement passé par `onClick={toggle}`) est ignoré et inverse la valeur.
 */
export const useToggle = (initialState = false): [boolean, ToggleFn] => {
  const [value, setValue] = useState(initialState);

  const toggle = useCallback<ToggleFn>((nextValue) => {
    if (typeof nextValue === 'boolean') {
      setValue(nextValue);
    } else {
      setValue((prev) => !prev);
    }
  }, []);

  return [value, toggle];
};
