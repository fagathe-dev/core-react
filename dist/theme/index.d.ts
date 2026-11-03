import { BreakPointType } from 'core-ts';
import * as react from 'react';

/** Échelle de couleur 50 → 950 (forme Tailwind, commune au DS et aux apps). */
interface ColorScale {
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
declare const palettes: {
    readonly white: "#FFFFFF";
    readonly black: "#000000";
    readonly indigo: {
        readonly 50: "#F1EFFD";
        readonly 100: "#E5E0FA";
        readonly 200: "#DFD9FC";
        readonly 300: "#C1B6F7";
        readonly 400: "#9B8BF1";
        readonly 500: "#6E5CE6";
        readonly 600: "#4B3FD8";
        readonly 700: "#3E32B8";
        readonly 800: "#332996";
        readonly 900: "#2B237A";
        readonly 950: "#1A154B";
    };
    readonly neutral: {
        readonly 50: "#F6F6FA";
        readonly 100: "#ECECF4";
        readonly 200: "#DCDCE8";
        readonly 300: "#C2C2D6";
        readonly 400: "#9E9EB8";
        readonly 500: "#6E6E82";
        readonly 600: "#525266";
        readonly 700: "#3D3D4E";
        readonly 800: "#2B2B38";
        readonly 900: "#1E1E2A";
        readonly 950: "#12121A";
    };
    readonly slate: {
        readonly 50: "#f8fafc";
        readonly 100: "#f1f5f9";
        readonly 200: "#e2e8f0";
        readonly 300: "#cbd5e1";
        readonly 400: "#94a3b8";
        readonly 500: "#64748b";
        readonly 600: "#475569";
        readonly 700: "#334155";
        readonly 800: "#1e293b";
        readonly 900: "#0f172b";
        readonly 950: "#020617";
    };
    readonly gray: {
        readonly 50: "#fafafa";
        readonly 100: "#f5f5f5";
        readonly 200: "#e5e5e5";
        readonly 300: "#d4d4d4";
        readonly 400: "#a3a3a3";
        readonly 500: "#737373";
        readonly 600: "#525252";
        readonly 700: "#404040";
        readonly 800: "#262626";
        readonly 900: "#171717";
        readonly 950: "#0a0a0a";
    };
    readonly olive: {
        readonly 50: "#f7f9f6";
        readonly 100: "#ebf1e9";
        readonly 200: "#d6e2d1";
        readonly 300: "#b7ceae";
        readonly 400: "#93b387";
        readonly 500: "#739566";
        readonly 600: "#58774c";
        readonly 700: "#465f3e";
        readonly 800: "#394d33";
        readonly 900: "#30402b";
        readonly 950: "#182315";
    };
    readonly taupe: {
        readonly 50: "#fafaf9";
        readonly 100: "#f5f5f4";
        readonly 200: "#e7e5e4";
        readonly 300: "#d6d3d1";
        readonly 400: "#a8a29e";
        readonly 500: "#78716c";
        readonly 600: "#57534e";
        readonly 700: "#44403c";
        readonly 800: "#292524";
        readonly 900: "#1c1917";
        readonly 950: "#0c0a09";
    };
    readonly green: {
        readonly 50: "#f0fdf4";
        readonly 100: "#dcfce7";
        readonly 200: "#bbf7d0";
        readonly 300: "#86efac";
        readonly 400: "#4ade80";
        readonly 500: "#22c55e";
        readonly 600: "#16a34a";
        readonly 700: "#15803d";
        readonly 800: "#166534";
        readonly 900: "#14532d";
        readonly 950: "#052e16";
    };
    readonly amber: {
        readonly 50: "#fffbeb";
        readonly 100: "#fef3c7";
        readonly 200: "#fde68a";
        readonly 300: "#fcd34d";
        readonly 400: "#fbbf24";
        readonly 500: "#f59e0b";
        readonly 600: "#d97706";
        readonly 700: "#b45309";
        readonly 800: "#92400e";
        readonly 900: "#78350f";
        readonly 950: "#451a03";
    };
    readonly blue: {
        readonly 50: "#eff6ff";
        readonly 100: "#dbeafe";
        readonly 200: "#bfdbfe";
        readonly 300: "#93c5fd";
        readonly 400: "#60a5fa";
        readonly 500: "#3b82f6";
        readonly 600: "#2563eb";
        readonly 700: "#1d4ed8";
        readonly 800: "#1e40af";
        readonly 900: "#1e3a8a";
        readonly 950: "#172554";
    };
    readonly red: {
        readonly 50: "#fef2f2";
        readonly 100: "#fee2e2";
        readonly 200: "#fecaca";
        readonly 300: "#fca5a5";
        readonly 400: "#f87171";
        readonly 500: "#ef4444";
        readonly 600: "#dc2626";
        readonly 700: "#b91c1c";
        readonly 800: "#991b1b";
        readonly 900: "#7f1d1d";
        readonly 950: "#450a0a";
    };
    readonly peach: {
        readonly 50: "#FAF3EF";
        readonly 100: "#F3DFD3";
        readonly 200: "#E8C5B0";
        readonly 300: "#DBA384";
        readonly 400: "#CB825C";
        readonly 500: "#B56B45";
        readonly 600: "#9A6344";
        readonly 700: "#7E4E34";
        readonly 800: "#68402C";
        readonly 900: "#563626";
        readonly 950: "#2F1B12";
    };
    readonly mint: {
        readonly 50: "#EFFAF5";
        readonly 100: "#DDF3EA";
        readonly 200: "#BCE6D5";
        readonly 300: "#8ED3B8";
        readonly 400: "#58B894";
        readonly 500: "#369B76";
        readonly 600: "#2E7D5B";
        readonly 700: "#246449";
        readonly 800: "#1F503B";
        readonly 900: "#1B4232";
        readonly 950: "#0E251B";
    };
    readonly rose: {
        readonly 50: "#FDF2F5";
        readonly 100: "#FCE2E8";
        readonly 200: "#F9C6D3";
        readonly 300: "#F49BB2";
        readonly 400: "#EC678B";
        readonly 500: "#DF3E6B";
        readonly 600: "#C83E65";
        readonly 700: "#A6264C";
        readonly 800: "#8B2242";
        readonly 900: "#77203B";
        readonly 950: "#430D1E";
    };
};
type Palettes = typeof palettes;
type PaletteName = {
    [K in keyof Palettes]: Palettes[K] extends string ? never : K;
}[keyof Palettes];

/**
 * Échelle d'espacement historique des apps (identique dans la base, le CMS et le social).
 * Non linéaire à partir de 5 : l'alignement sur l'échelle linéaire du DS est l'étape 6 de l'audit (§4b.2).
 */
declare const spacing: {
    readonly 0: "0";
    readonly 0.5: "0.125rem";
    readonly 1: "0.25rem";
    readonly 1.5: "0.375rem";
    readonly 2: "0.5rem";
    readonly 2.5: "0.625rem";
    readonly 3: "0.75rem";
    readonly 3.5: "0.875rem";
    readonly 4: "1rem";
    readonly 5: "1.5rem";
    readonly 6: "2rem";
    readonly 7: "3rem";
    readonly 8: "4rem";
    readonly 9: "5rem";
    readonly 10: "6rem";
};
/** Rayons du social, alignés sur le DS (`md` = 0.75rem). */
declare const radii: {
    readonly none: "0";
    readonly sm: "0.5rem";
    readonly md: "0.75rem";
    readonly base: "0.75rem";
    readonly lg: "1rem";
    readonly xl: "1.25rem";
    readonly '2xl': "1.5rem";
    readonly '3xl': "1.75rem";
    readonly pill: "9999px";
    readonly full: "9999px";
};
/** Rayons historiques de l'app de base et du CMS, à passer en `overrides.radii` dans leurs proxies. */
declare const LEGACY_RADII: {
    readonly sm: "0.375rem";
    readonly md: "0.5rem";
    readonly base: "0.5rem";
    readonly lg: "0.75rem";
    readonly xl: "1rem";
    readonly '2xl': "1.5rem";
    readonly none: "0";
    readonly '3xl': "1.75rem";
    readonly pill: "9999px";
    readonly full: "9999px";
};
declare const typography: {
    readonly fonts: {
        readonly sans: "var(--font-inter, 'Inter'), 'Roboto', system-ui, -apple-system, sans-serif";
        readonly mono: "'Fira Code', 'Consolas', monospace";
    };
    readonly weights: {
        readonly regular: 400;
        readonly medium: 500;
        readonly semibold: 600;
        readonly bold: 700;
    };
    readonly sizes: {
        readonly xs: "0.75rem";
        readonly sm: "0.875rem";
        readonly base: "1rem";
        readonly lg: "1.125rem";
        readonly xl: "1.25rem";
        readonly '2xl': "1.5rem";
        readonly '3xl': "1.875rem";
    };
    readonly lineHeights: {
        readonly tight: 1.25;
        readonly normal: 1.5;
        readonly relaxed: 1.75;
    };
};
interface Borders {
    widths: {
        none: '0px';
        thin: '1px';
        thick: '2px';
    };
    focusRing: {
        width: '3px';
        offset: '2px';
        color: string;
    };
}
type BreakpointKey = BreakPointType;
/** Breakpoints du DS (source : `BREAKPOINTS` de core-ts). */
declare const breakpoints: Record<BreakpointKey, string>;
declare const media: {
    readonly up: (key: BreakpointKey) => string;
    readonly down: (key: BreakpointKey) => string;
};
interface Shadows {
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
/**
 * Ombres douces teintées. En sombre, une ombre noire est invisible sur fond quasi noir :
 * un liseré blanc translucide détache la carte.
 */
declare const getShadows: (mode: "light" | "dark", ink: string, accent: string) => Shadows;

type ThemeMode = 'light' | 'dark';
type ColorRole = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'info' | 'danger';
interface SemanticColor {
    scale: ColorScale;
    base: string;
    hover: string;
    subtle: string;
    dark: string;
    emphasis: string;
}
interface SurfaceColors {
    text: {
        body: string;
        muted: string;
        heading: string;
    };
    background: {
        body: string;
        surface: string;
        surfaceHover: string;
        surfaceActive: string;
    };
    border: {
        default: string;
        hover: string;
        strong: string;
    };
}
/** Palettes disponibles : celles de core-react (toujours présentes), complétées ou remplacées par l'app. */
type ThemePalettes = Record<Exclude<keyof typeof palettes, 'white' | 'black'>, ColorScale> & Record<string, ColorScale>;
type ThemeColors = Record<ColorRole, SemanticColor> & SurfaceColors & {
    white: string;
    black: string;
    palettes: ThemePalettes;
};
interface AppTheme {
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
type SurfacePreset = (palettes: ThemePalettes, mode: ThemeMode) => SurfaceColors;
/** Surfaces de l'app de base et du CMS : texte et bordures slate, fond de page neutral-50, cartes blanches. */
declare const SLATE_SURFACES: SurfacePreset;
/** Surfaces du social : gris teinté d'indigo (`neutral`). */
declare const TINTED_SURFACES: SurfacePreset;
/** Rôles du DS (et de l'app de base). */
declare const DEFAULT_ROLES: Record<ColorRole, string>;
/** Identité Gather (social). */
declare const GATHER_ROLES: Partial<Record<ColorRole, string>>;
/** Identité du back-office du CMS. */
declare const CMS_ROLES: Partial<Record<ColorRole, string>>;
type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
interface CreateAppThemeOptions {
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
interface AppThemeResult {
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
/** Sélecteurs du mode sombre pendant la transition (§4b.2) : attribut des apps et attribut du DS. */
declare const DARK_MODE_SELECTOR = ":root[data-theme='dark'], :root[data-ui-theme='dark']";
/**
 * Construit le thème styled-components d'une app.
 *
 * @example
 * // Social (identité Gather)
 * export const { theme, cssVariables } = createAppTheme({ roles: GATHER_ROLES, surfaces: TINTED_SURFACES });
 * // CMS
 * export const { lightTheme, darkTheme } = createAppTheme({ roles: CMS_ROLES, palettes: { neutral: palettes.gray } });
 */
declare const createAppTheme: ({ palettes: extraPalettes, roles: roleOverrides, surfaces, cssPrefix, overrides, }?: CreateAppThemeOptions) => AppThemeResult;

declare module 'styled-components' {
    interface DefaultTheme extends AppTheme {
    }
}

/** Choix de l'utilisateur : 'system' suit le réglage de l'appareil. */
type ThemePreference = ThemeMode | 'system';
interface ThemeState {
    preference: ThemePreference;
    /** Réglage courant de l'appareil (lu à l'initialisation, puis suivi en direct). */
    systemMode: ThemeMode;
}
declare const THEME_STORAGE_KEY = "ds-app-theme";
declare const DEFAULT_THEME_ATTRIBUTES: readonly ["data-theme", "data-ds-theme", "data-ui-theme"];
interface CreateThemeStoreOptions<TTheme = never> {
    /** Clé localStorage (défaut : `ds-app-theme`, celle des apps). */
    storageKey?: string;
    /** Anciennes clés lues si la clé principale est absente (ex. `ds-theme` du DS). */
    legacyKeys?: string[];
    /** Attributs posés sur `<html>` (défaut : `data-theme`, `data-ds-theme`, `data-ui-theme`). */
    attributes?: readonly string[];
    defaultPreference?: ThemePreference;
    /** Version écrite dans le stockage (format `zustand/persist` : `{ state, version }`). */
    version?: number;
    /** Migrations par version d'origine (ex. `{ 0: (legacy) => ({ preference: legacy.mode }) }`). */
    migrations?: Record<number, (persisted: unknown) => {
        preference?: unknown;
    }>;
    /** Synchronise les onglets via l'événement `storage` (défaut : true). */
    syncTabs?: boolean;
    /** SPA uniquement : initialise dès la création (lecture du stockage, attributs, suivi système). */
    autoInit?: boolean;
    /** Objets de thème : ajoute `theme` au retour de `useTheme` (compatibilité de l'app de base). */
    themes?: Record<ThemeMode, TTheme>;
}
interface UseThemeReturn<TTheme = never> {
    /** Thème effectivement appliqué (jamais 'system'). */
    mode: ThemeMode;
    preference: ThemePreference;
    isDark: boolean;
    setPreference: (preference: ThemePreference) => void;
    /** Alias de `setPreference` (compatibilité). */
    setMode: (preference: ThemePreference) => void;
    /** Bascule clair ↔ sombre à partir du thème appliqué. */
    toggleTheme: () => void;
    /** Présent si `themes` a été fourni à `createThemeStore`. */
    theme: [TTheme] extends [never] ? undefined : TTheme;
}
/** Transforme la préférence en thème réellement appliqué. */
declare const resolveMode: ({ preference, systemMode }: ThemeState) => ThemeMode;
/**
 * Script exécuté dans le `<head>` avant le premier affichage (anti-flash). Constant, sans donnée utilisateur.
 */
declare const getThemeInitScript: ({ storageKey, legacyKeys, attributes, }?: Pick<CreateThemeStoreOptions, "storageKey" | "legacyKeys" | "attributes">) => string;
/**
 * Store de thème SSR-safe (aucun accès DOM à l'import, sauf `autoInit`).
 * Côté Next : appeler `initThemeStore()` dans un `useEffect` du provider et rendre `getThemeInitScript()` dans `<head>`.
 */
declare const createThemeStore: <TTheme = never>(options?: CreateThemeStoreOptions<TTheme>) => {
    useTheme: () => UseThemeReturn<TTheme>;
    initThemeStore: () => (() => void);
    getState: () => ThemeState;
    subscribe: (listener: () => void) => () => boolean;
    setPreference: (preference: ThemePreference) => void;
    resolveMode: ({ preference, systemMode }: ThemeState) => ThemeMode;
    storageKey: string;
    initScript: string;
};
type ThemeStore = ReturnType<typeof createThemeStore>;
/** Store par défaut (clé `ds-app-theme`, commune aux apps) : utilisé par `ThemeModeSwitcher`. */
declare const themeStore: {
    useTheme: () => UseThemeReturn<never>;
    initThemeStore: () => () => void;
    getState: () => ThemeState;
    subscribe: (listener: () => void) => () => boolean;
    setPreference: (preference: ThemePreference) => void;
    resolveMode: ({ preference, systemMode }: ThemeState) => ThemeMode;
    storageKey: string;
    initScript: string;
};
declare const useTheme: () => UseThemeReturn<never>;
declare const initThemeStore: () => () => void;
declare const themeScript: string;

type ThemeScriptProps = Pick<CreateThemeStoreOptions, 'storageKey' | 'legacyKeys' | 'attributes'> & {
    nonce?: string;
};
/**
 * Script anti-flash à placer dans `<head>` (Server Component compatible : aucun hook).
 * Le contenu est une constante générée par core-react, jamais une donnée utilisateur.
 */
declare const ThemeScript: ({ nonce, ...config }: ThemeScriptProps) => react.JSX.Element;

export { CMS_ROLES, DARK_MODE_SELECTOR, DEFAULT_ROLES, DEFAULT_THEME_ATTRIBUTES, GATHER_ROLES, LEGACY_RADII, SLATE_SURFACES, THEME_STORAGE_KEY, TINTED_SURFACES, ThemeScript, breakpoints, createAppTheme, createThemeStore, getShadows, getThemeInitScript, initThemeStore, media, palettes, radii, resolveMode, spacing, themeScript, themeStore, typography, useTheme };
export type { AppTheme, AppThemeResult, Borders, BreakpointKey, ColorRole, ColorScale, CreateAppThemeOptions, CreateThemeStoreOptions, PaletteName, Palettes, SemanticColor, Shadows, SurfaceColors, SurfacePreset, ThemeColors, ThemeMode, ThemePalettes, ThemePreference, ThemeScriptProps, ThemeState, ThemeStore, UseThemeReturn };
