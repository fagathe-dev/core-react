/** Échelle de couleur 50 → 950 (forme Tailwind, commune au DS et aux apps). */
export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

/**
 * Palettes partagées.
 * - DS / app de base : indigo, neutral (gris teinté d'indigo), slate, green, amber, blue, red ;
 * - CMS : olive, taupe ;
 * - identité Gather (social) : peach, mint, rose.
 * TODO(core-ts design-tokens) : à déplacer dans core-ts comme source unique (§4b.2 de l'audit).
 */
export const palettes = {
  white: '#FFFFFF',
  black: '#000000',
  indigo: {
    50: '#F1EFFD',
    100: '#E5E0FA',
    200: '#DFD9FC',
    300: '#C1B6F7',
    400: '#9B8BF1',
    500: '#6E5CE6',
    600: '#4B3FD8',
    700: '#3E32B8',
    800: '#332996',
    900: '#2B237A',
    950: '#1A154B',
  },
  neutral: {
    50: '#F6F6FA',
    100: '#ECECF4',
    200: '#DCDCE8',
    300: '#C2C2D6',
    400: '#9E9EB8',
    500: '#6E6E82',
    600: '#525266',
    700: '#3D3D4E',
    800: '#2B2B38',
    900: '#1E1E2A',
    950: '#12121A',
  },
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172b',
    950: '#020617',
  },
  gray: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
  olive: {
    50: '#f7f9f6',
    100: '#ebf1e9',
    200: '#d6e2d1',
    300: '#b7ceae',
    400: '#93b387',
    500: '#739566',
    600: '#58774c',
    700: '#465f3e',
    800: '#394d33',
    900: '#30402b',
    950: '#182315',
  },
  taupe: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
    950: '#0c0a09',
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
  peach: {
    50: '#FAF3EF',
    100: '#F3DFD3',
    200: '#E8C5B0',
    300: '#DBA384',
    400: '#CB825C',
    500: '#B56B45',
    600: '#9A6344',
    700: '#7E4E34',
    800: '#68402C',
    900: '#563626',
    950: '#2F1B12',
  },
  mint: {
    50: '#EFFAF5',
    100: '#DDF3EA',
    200: '#BCE6D5',
    300: '#8ED3B8',
    400: '#58B894',
    500: '#369B76',
    600: '#2E7D5B',
    700: '#246449',
    800: '#1F503B',
    900: '#1B4232',
    950: '#0E251B',
  },
  rose: {
    50: '#FDF2F5',
    100: '#FCE2E8',
    200: '#F9C6D3',
    300: '#F49BB2',
    400: '#EC678B',
    500: '#DF3E6B',
    600: '#C83E65',
    700: '#A6264C',
    800: '#8B2242',
    900: '#77203B',
    950: '#430D1E',
  },
} as const;

export type Palettes = typeof palettes;
export type PaletteName = { [K in keyof Palettes]: Palettes[K] extends string ? never : K }[keyof Palettes];
