import { useSyncExternalStore } from 'react';

/** La page est « active » si l'onglet est visible ET que la fenêtre a le focus. */
export const isPageFocused = (): boolean =>
  typeof document !== 'undefined' && document.visibilityState === 'visible' && document.hasFocus();

const subscribe = (onChange: () => void): (() => void) => {
  window.addEventListener('focus', onChange);
  window.addEventListener('blur', onChange);
  document.addEventListener('visibilitychange', onChange);

  return () => {
    window.removeEventListener('focus', onChange);
    window.removeEventListener('blur', onChange);
    document.removeEventListener('visibilitychange', onChange);
  };
};

/** Côté serveur, la page est considérée comme active (aucun effet de verrouillage au premier rendu). */
const getServerSnapshot = (): boolean => true;

/**
 * Suit le focus de la page : onglet masqué, fenêtre réduite ou autre fenêtre au premier plan.
 * Extrait de `useJournalAutoLock` (app de base).
 */
export const usePageFocus = (): boolean => useSyncExternalStore(subscribe, isPageFocused, getServerSnapshot);
