import { useSyncExternalStore } from 'react';

const subscribe = () => () => undefined;

/**
 * `false` au rendu serveur et pendant l'hydratation, `true` ensuite.
 * Sert à différer un rendu qui dépend du navigateur sans provoquer d'écart d'hydratation.
 */
export const useIsClient = (): boolean =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
