import { palettes as basePalettes, type ColorScale } from './palettes';
import {
  breakpoints,
  getShadows,
  media,
  radii,
  spacing,
  typography,
  type Borders,
  type Shadows,
} from './tokens';

export type ThemeMode = 'light' | 'dark';

export type ColorRole = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'info' | 'danger';

export interface SemanticColor {
  scale: ColorScale;
  base: string;
  hover: string;
  subtle: string;
  dark: string;
  emphasis: string;
}

export interface SurfaceColors {
  text: { body: string; muted: string; heading: string };
  background: { body: string; surface: string; surfaceHover: string; surfaceActive: string };
  border: { default: string; hover: string; strong: string };
}

/** Palettes disponibles : celles de core-react (toujours présentes), complétées ou remplacées par l'app. */
export type ThemePalettes = Record<Exclude<keyof typeof basePalettes, 'white' | 'black'>, ColorScale> &
  Record<string, ColorScale>;

export type ThemeColors = Record<ColorRole, SemanticColor> &
  SurfaceColors & {
    white: string;
    black: string;
    palettes: ThemePalettes;
  };

export interface AppTheme {
  name: ThemeMode;
  colors: ThemeColors;
  /** Clés fixes, valeurs surchargeables (ex. `LEGACY_RADII`). */
  radii: Record<keyof typeof radii, string>;
  spacing: Record<keyof typeof spacing, string>;
  typography: typeof typography;
  shadows: Shadows;
  borders: Borders;
  breakpoints: typeof breakpoints;
  media: typeof media;
}

/** Calcule les couleurs de surface (texte, fonds, bordures) à partir des palettes. */
export type SurfacePreset = (palettes: ThemePalettes, mode: ThemeMode) => SurfaceColors;

/** Surfaces de l'app de base et du CMS : texte et bordures slate, fond de page neutral-50, cartes blanches. */
export const SLATE_SURFACES: SurfacePreset = (p, mode) => {
  const isDark = mode === 'dark';
  const slate = p.slate!;
  const neutral = p.neutral!;
  return {
    text: {
      body: isDark ? slate[200] : slate[800],
      muted: isDark ? slate[400] : slate[500],
      heading: isDark ? slate[50] : slate[950],
    },
    background: {
      body: isDark ? slate[950] : neutral[50],
      surface: isDark ? slate[900] : basePalettes.white,
      // #283548 (entre slate 800 et 700) : survol visible tout en gardant le texte muted à 4,84:1
      surfaceHover: isDark ? '#283548' : slate[50],
      surfaceActive: isDark ? slate[700] : slate[100],
    },
    border: {
      default: isDark ? slate[700] : slate[200],
      hover: isDark ? slate[600] : slate[300],
      strong: slate[500],
    },
  };
};

/** Surfaces du social : gris teinté d'indigo (`neutral`). */
export const TINTED_SURFACES: SurfacePreset = (p, mode) => {
  const isDark = mode === 'dark';
  const neutral = p.neutral!;
  return {
    text: {
      body: isDark ? neutral[200] : neutral[700],
      muted: isDark ? neutral[400] : neutral[500],
      heading: isDark ? neutral[50] : neutral[900],
    },
    background: {
      body: isDark ? neutral[950] : neutral[50],
      surface: isDark ? neutral[900] : basePalettes.white,
      surfaceHover: isDark ? neutral[800] : neutral[50],
      surfaceActive: isDark ? neutral[700] : neutral[100],
    },
    border: {
      default: isDark ? neutral[700] : neutral[100],
      hover: isDark ? neutral[600] : neutral[200],
      // Contour des éléments interactifs : >= 3:1 (WCAG 1.4.11)
      strong: neutral[500],
    },
  };
};

/** Rôles du DS (et de l'app de base). */
export const DEFAULT_ROLES: Record<ColorRole, string> = {
  primary: 'indigo',
  secondary: 'neutral',
  tertiary: 'slate',
  success: 'green',
  warning: 'amber',
  info: 'blue',
  danger: 'red',
};

/** Identité Gather (social). */
export const GATHER_ROLES: Partial<Record<ColorRole, string>> = {
  tertiary: 'peach',
  success: 'mint',
  info: 'indigo',
  danger: 'rose',
};

/** Identité du back-office du CMS. */
export const CMS_ROLES: Partial<Record<ColorRole, string>> = {
  primary: 'olive',
  secondary: 'taupe',
};

type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

export interface CreateAppThemeOptions {
  /** Palettes ajoutées ou remplacées (ex. `{ neutral: palettes.gray }` pour le CMS). */
  palettes?: Record<string, ColorScale>;
  /** Palette de chaque rôle (défaut : DS). */
  roles?: Partial<Record<ColorRole, string>>;
  /** Couleurs de surface (défaut : `SLATE_SURFACES`). */
  surfaces?: SurfacePreset;
  /** Préfixe des variables CSS générées (défaut : `ds`). */
  cssPrefix?: string;
  /** Surcharges finales, appliquées aux deux modes (ex. `{ radii: LEGACY_RADII }`). */
  overrides?: DeepPartial<Omit<AppTheme, 'name' | 'media'>>;
}

export interface AppThemeResult {
  lightTheme: AppTheme;
  darkTheme: AppTheme;
  /**
   * Thème unique à donner au ThemeProvider : les valeurs qui diffèrent entre clair et sombre sont des
   * `var(--ds-…)`. Le HTML serveur convient donc aux deux modes (SSR, Suspense hydraté tard).
   */
  theme: AppTheme;
  /** Déclarations `:root { … }` et sombre, à injecter dans les styles globaux. */
  cssVariables: string;
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const deepMerge = <T>(base: T, patch: unknown): T => {
  if (!isObject(base) || !isObject(patch)) return (patch === undefined ? base : patch) as T;
  const out: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(patch)) out[key] = deepMerge(out[key], value);
  return out as T;
};

const createSemanticRole = (scale: ColorScale, mode: ThemeMode): SemanticColor => {
  const isDark = mode === 'dark';
  return {
    scale,
    base: isDark ? scale[500] : scale[600],
    hover: isDark ? scale[400] : scale[700],
    subtle: isDark ? scale[900] : scale[100],
    dark: isDark ? scale[300] : scale[800],
    emphasis: isDark ? scale[100] : scale[950],
  };
};

/** Remplace par `var(--prefix-…)` chaque valeur qui diffère entre clair et sombre, et relève sa déclaration. */
const toVariables = <T>(
  light: T,
  dark: T,
  path: string[],
  variables: { light: string[]; dark: string[] },
): T => {
  if (isObject(light)) {
    return Object.fromEntries(
      Object.entries(light).map(([key, value]) => [
        key,
        toVariables(value, (dark as Record<string, unknown>)[key], [...path, key], variables),
      ]),
    ) as T;
  }
  if (light === dark) return light;

  const name = `--${path.join('-')}`;
  variables.light.push(`${name}: ${String(light)};`);
  variables.dark.push(`${name}: ${String(dark)};`);
  return `var(${name})` as T;
};

/** Sélecteurs du mode sombre pendant la transition (§4b.2) : attribut des apps et attribut du DS. */
export const DARK_MODE_SELECTOR = ":root[data-theme='dark'], :root[data-ui-theme='dark']";

/**
 * Construit le thème styled-components d'une app.
 *
 * @example
 * // Social (identité Gather)
 * export const { theme, cssVariables } = createAppTheme({ roles: GATHER_ROLES, surfaces: TINTED_SURFACES });
 * // CMS
 * export const { lightTheme, darkTheme } = createAppTheme({ roles: CMS_ROLES, palettes: { neutral: palettes.gray } });
 */
export const createAppTheme = ({
  palettes: extraPalettes = {},
  roles: roleOverrides = {},
  surfaces = SLATE_SURFACES,
  cssPrefix = 'ds',
  overrides,
}: CreateAppThemeOptions = {}): AppThemeResult => {
  const { white, black, ...scales } = basePalettes;
  const allPalettes: ThemePalettes = { ...scales, ...extraPalettes };
  const roles = { ...DEFAULT_ROLES, ...roleOverrides };

  const paletteOf = (role: ColorRole): ColorScale => {
    const scale = allPalettes[roles[role]];
    if (!scale) throw new Error(`createAppTheme : palette « ${roles[role]} » inconnue pour le rôle ${role}.`);
    return scale;
  };

  const build = (mode: ThemeMode): AppTheme => {
    const primary = paletteOf('primary');
    const surface = surfaces(allPalettes, mode);
    const colors = {
      white,
      black,
      palettes: allPalettes,
      ...(Object.fromEntries(
        (Object.keys(DEFAULT_ROLES) as ColorRole[]).map((role) => [
          role,
          createSemanticRole(paletteOf(role), mode),
        ]),
      ) as Record<ColorRole, SemanticColor>),
      ...surface,
    };

    const theme: AppTheme = {
      name: mode,
      colors,
      radii,
      spacing,
      typography,
      shadows: getShadows(mode, surface.text.heading, primary[600]),
      borders: {
        widths: { none: '0px', thin: '1px', thick: '2px' },
        // Opaque, contraste >= 3:1 : ton 600 sur fond clair, 300 sur fond sombre
        focusRing: { width: '3px', offset: '2px', color: mode === 'dark' ? primary[300] : primary[600] },
      },
      breakpoints,
      media,
    };
    return overrides ? deepMerge(theme, overrides) : theme;
  };

  const lightTheme = build('light');
  const darkTheme = build('dark');

  const variables = { light: [] as string[], dark: [] as string[] };
  const theme: AppTheme = {
    ...lightTheme,
    colors: toVariables(lightTheme.colors, darkTheme.colors, [cssPrefix, 'color'], variables),
    shadows: toVariables(lightTheme.shadows, darkTheme.shadows, [cssPrefix, 'shadow'], variables),
    borders: toVariables(lightTheme.borders, darkTheme.borders, [cssPrefix, 'border'], variables),
  };

  const cssVariables = `
  :root {
    color-scheme: light;
    ${variables.light.join('\n    ')}
  }

  ${DARK_MODE_SELECTOR} {
    color-scheme: dark;
    ${variables.dark.join('\n    ')}
  }
`;

  return { lightTheme, darkTheme, theme, cssVariables };
};
