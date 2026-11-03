import { BREAKPOINTS, type BreakPointType } from 'core-ts';

/**
 * Échelle d'espacement historique des apps (identique dans la base, le CMS et le social).
 * Non linéaire à partir de 5 : l'alignement sur l'échelle linéaire du DS est l'étape 6 de l'audit (§4b.2).
 */
export const spacing = {
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.5rem',
  6: '2rem',
  7: '3rem',
  8: '4rem',
  9: '5rem',
  10: '6rem',
} as const;

/** Rayons du social, alignés sur le DS (`md` = 0.75rem). */
export const radii = {
  none: '0',
  sm: '0.5rem',
  md: '0.75rem',
  base: '0.75rem',
  lg: '1rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.75rem',
  pill: '9999px',
  full: '9999px',
} as const;

/** Rayons historiques de l'app de base et du CMS, à passer en `overrides.radii` dans leurs proxies. */
export const LEGACY_RADII = {
  ...radii,
  sm: '0.375rem',
  md: '0.5rem',
  base: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
} as const;

export const typography = {
  fonts: {
    sans: "var(--font-inter, 'Inter'), 'Roboto', system-ui, -apple-system, sans-serif",
    mono: "'Fira Code', 'Consolas', monospace",
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
  },
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export interface Borders {
  widths: { none: '0px'; thin: '1px'; thick: '2px' };
  focusRing: { width: '3px'; offset: '2px'; color: string };
}

export type BreakpointKey = BreakPointType;

/** Breakpoints du DS (source : `BREAKPOINTS` de core-ts). */
export const breakpoints = Object.fromEntries(
  Object.entries(BREAKPOINTS).map(([key, value]) => [key, `${value}px`]),
) as Record<BreakpointKey, string>;

export const media = {
  up: (key: BreakpointKey) => `@media (min-width: ${breakpoints[key]})`,
  down: (key: BreakpointKey) => `@media (max-width: ${breakpoints[key]})`,
} as const;

export interface Shadows {
  none: string;
  sm: string;
  soft: string;
  card: string;
  base: string;
  md: string;
  lg: string;
  inset: string;
  focusRing: string;
}

const rgba = (hex: string, alpha: number): string => {
  const value = parseInt(hex.replace('#', ''), 16);
  return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${alpha})`;
};

/**
 * Ombres douces teintées. En sombre, une ombre noire est invisible sur fond quasi noir :
 * un liseré blanc translucide détache la carte.
 */
export const getShadows = (mode: 'light' | 'dark', ink: string, accent: string): Shadows => {
  if (mode === 'dark') {
    return {
      none: 'none',
      sm: '0 1px 3px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.04)',
      soft: '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
      card: '0 10px 30px -5px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.06)',
      base: '0 4px 15px -3px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.05)',
      md: '0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.07)',
      lg: '0 20px 40px -5px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.09)',
      inset: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.4)',
      focusRing: `0 0 0 3px ${rgba(accent, 0.35)}`,
    };
  }

  return {
    none: 'none',
    sm: `0 1px 2px 0 ${rgba(ink, 0.04)}`,
    soft: `0 4px 20px -2px ${rgba(ink, 0.04)}, 0 2px 6px -1px ${rgba(ink, 0.02)}`,
    card: `0 10px 30px -5px ${rgba(accent, 0.05)}, 0 4px 12px -2px ${rgba(ink, 0.03)}`,
    base: `0 4px 15px -3px ${rgba(ink, 0.06)}, 0 4px 6px -4px ${rgba(ink, 0.03)}`,
    md: `0 10px 25px -5px ${rgba(ink, 0.08)}, 0 8px 10px -6px ${rgba(ink, 0.04)}`,
    lg: `0 20px 40px -5px ${rgba(ink, 0.12)}, 0 10px 20px -5px ${rgba(ink, 0.06)}`,
    inset: `inset 0 2px 4px 0 ${rgba(ink, 0.04)}`,
    focusRing: `0 0 0 3px ${rgba(accent, 0.18)}`,
  };
};
