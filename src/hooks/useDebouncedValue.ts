import { useEffect, useState } from 'react';

/**
 * Retourne `value` après `delay` ms sans changement.
 * Chaque nouvelle valeur relance l'attente (ex. aperçu de lien, recherche à la frappe).
 */
export const useDebouncedValue = <T>(value: T, delay = 300): T => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
};
