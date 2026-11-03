import { BREAKPOINTS, type BreakPointType } from 'core-ts';
import { useCallback, useSyncExternalStore } from 'react';

export type BreakpointDirection = 'up' | 'down';

export interface UseMediaQueryOptions {
  /** `up` : largeur ≥ breakpoint (défaut) ; `down` : largeur < breakpoint. Ignoré pour une requête brute. */
  direction?: BreakpointDirection;
  /** Valeur retournée côté serveur et au premier rendu d'hydratation (défaut : false). */
  defaultValue?: boolean;
}

const isBreakpoint = (value: string): value is BreakPointType => value in BREAKPOINTS;

/**
 * Construit la media query d'un breakpoint du Design System (valeurs de `BREAKPOINTS`, core-ts).
 * `down` retire 0,02px, comme Bootstrap/DS, pour éviter le chevauchement à la valeur exacte.
 */
export const getBreakpointQuery = (
  breakpoint: BreakPointType,
  direction: BreakpointDirection = 'up',
): string => {
  const width = BREAKPOINTS[breakpoint];
  return direction === 'up' ? `(min-width: ${width}px)` : `(max-width: ${width - 0.02}px)`;
};

/**
 * Évalue une media query (`'(prefers-reduced-motion: reduce)'`) ou un breakpoint (`'md'`).
 * Compatible SSR : retourne `defaultValue` côté serveur, puis la vraie valeur après hydratation.
 */
export const useMediaQuery = (
  queryOrBreakpoint: string | BreakPointType,
  { direction = 'up', defaultValue = false }: UseMediaQueryOptions = {},
): boolean => {
  const query = isBreakpoint(queryOrBreakpoint)
    ? getBreakpointQuery(queryOrBreakpoint, direction)
    : queryOrBreakpoint;

  const subscribe = useCallback(
    (onChange: () => void) => {
      if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return () => undefined;

      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [query],
  );

  const getSnapshot = () =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia(query).matches
      : defaultValue;

  return useSyncExternalStore(subscribe, getSnapshot, () => defaultValue);
};
