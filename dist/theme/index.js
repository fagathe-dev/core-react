// src/theme/palettes.ts
var palettes = {
  white: "#FFFFFF",
  black: "#000000",
  indigo: {
    50: "#F1EFFD",
    100: "#E5E0FA",
    200: "#DFD9FC",
    300: "#C1B6F7",
    400: "#9B8BF1",
    500: "#6E5CE6",
    600: "#4B3FD8",
    700: "#3E32B8",
    800: "#332996",
    900: "#2B237A",
    950: "#1A154B"
  },
  neutral: {
    50: "#F6F6FA",
    100: "#ECECF4",
    200: "#DCDCE8",
    300: "#C2C2D6",
    400: "#9E9EB8",
    500: "#6E6E82",
    600: "#525266",
    700: "#3D3D4E",
    800: "#2B2B38",
    900: "#1E1E2A",
    950: "#12121A"
  },
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172b",
    950: "#020617"
  },
  gray: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a"
  },
  olive: {
    50: "#f7f9f6",
    100: "#ebf1e9",
    200: "#d6e2d1",
    300: "#b7ceae",
    400: "#93b387",
    500: "#739566",
    600: "#58774c",
    700: "#465f3e",
    800: "#394d33",
    900: "#30402b",
    950: "#182315"
  },
  taupe: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917",
    950: "#0c0a09"
  },
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16"
  },
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03"
  },
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554"
  },
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a"
  },
  peach: {
    50: "#FAF3EF",
    100: "#F3DFD3",
    200: "#E8C5B0",
    300: "#DBA384",
    400: "#CB825C",
    500: "#B56B45",
    600: "#9A6344",
    700: "#7E4E34",
    800: "#68402C",
    900: "#563626",
    950: "#2F1B12"
  },
  mint: {
    50: "#EFFAF5",
    100: "#DDF3EA",
    200: "#BCE6D5",
    300: "#8ED3B8",
    400: "#58B894",
    500: "#369B76",
    600: "#2E7D5B",
    700: "#246449",
    800: "#1F503B",
    900: "#1B4232",
    950: "#0E251B"
  },
  rose: {
    50: "#FDF2F5",
    100: "#FCE2E8",
    200: "#F9C6D3",
    300: "#F49BB2",
    400: "#EC678B",
    500: "#DF3E6B",
    600: "#C83E65",
    700: "#A6264C",
    800: "#8B2242",
    900: "#77203B",
    950: "#430D1E"
  }
};

// src/theme/tokens.ts
import { BREAKPOINTS } from "core-ts";
var spacing = {
  0: "0",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.5rem",
  6: "2rem",
  7: "3rem",
  8: "4rem",
  9: "5rem",
  10: "6rem"
};
var radii = {
  none: "0",
  sm: "0.5rem",
  md: "0.75rem",
  base: "0.75rem",
  lg: "1rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.75rem",
  pill: "9999px",
  full: "9999px"
};
var LEGACY_RADII = {
  ...radii,
  sm: "0.375rem",
  md: "0.5rem",
  base: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem"
};
var typography = {
  fonts: {
    sans: "var(--font-inter, 'Inter'), 'Roboto', system-ui, -apple-system, sans-serif",
    mono: "'Fira Code', 'Consolas', monospace"
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  sizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem"
  },
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75
  }
};
var breakpoints = Object.fromEntries(
  Object.entries(BREAKPOINTS).map(([key, value]) => [key, `${value}px`])
);
var media = {
  up: (key) => `@media (min-width: ${breakpoints[key]})`,
  down: (key) => `@media (max-width: ${breakpoints[key]})`
};
var rgba = (hex, alpha) => {
  const value = parseInt(hex.replace("#", ""), 16);
  return `rgba(${value >> 16 & 255}, ${value >> 8 & 255}, ${value & 255}, ${alpha})`;
};
var getShadows = (mode, ink, accent) => {
  if (mode === "dark") {
    return {
      none: "none",
      sm: "0 1px 3px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.04)",
      soft: "0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)",
      card: "0 10px 30px -5px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.06)",
      base: "0 4px 15px -3px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.05)",
      md: "0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.07)",
      lg: "0 20px 40px -5px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.09)",
      inset: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.4)",
      focusRing: `0 0 0 3px ${rgba(accent, 0.35)}`
    };
  }
  return {
    none: "none",
    sm: `0 1px 2px 0 ${rgba(ink, 0.04)}`,
    soft: `0 4px 20px -2px ${rgba(ink, 0.04)}, 0 2px 6px -1px ${rgba(ink, 0.02)}`,
    card: `0 10px 30px -5px ${rgba(accent, 0.05)}, 0 4px 12px -2px ${rgba(ink, 0.03)}`,
    base: `0 4px 15px -3px ${rgba(ink, 0.06)}, 0 4px 6px -4px ${rgba(ink, 0.03)}`,
    md: `0 10px 25px -5px ${rgba(ink, 0.08)}, 0 8px 10px -6px ${rgba(ink, 0.04)}`,
    lg: `0 20px 40px -5px ${rgba(ink, 0.12)}, 0 10px 20px -5px ${rgba(ink, 0.06)}`,
    inset: `inset 0 2px 4px 0 ${rgba(ink, 0.04)}`,
    focusRing: `0 0 0 3px ${rgba(accent, 0.18)}`
  };
};

// src/theme/createAppTheme.ts
var SLATE_SURFACES = (p, mode) => {
  const isDark = mode === "dark";
  const slate = p.slate;
  const neutral = p.neutral;
  return {
    text: {
      body: isDark ? slate[200] : slate[800],
      muted: isDark ? slate[400] : slate[500],
      heading: isDark ? slate[50] : slate[950]
    },
    background: {
      body: isDark ? slate[950] : neutral[50],
      surface: isDark ? slate[900] : palettes.white,
      // #283548 (entre slate 800 et 700) : survol visible tout en gardant le texte muted à 4,84:1
      surfaceHover: isDark ? "#283548" : slate[50],
      surfaceActive: isDark ? slate[700] : slate[100]
    },
    border: {
      default: isDark ? slate[700] : slate[200],
      hover: isDark ? slate[600] : slate[300],
      strong: slate[500]
    }
  };
};
var TINTED_SURFACES = (p, mode) => {
  const isDark = mode === "dark";
  const neutral = p.neutral;
  return {
    text: {
      body: isDark ? neutral[200] : neutral[700],
      muted: isDark ? neutral[400] : neutral[500],
      heading: isDark ? neutral[50] : neutral[900]
    },
    background: {
      body: isDark ? neutral[950] : neutral[50],
      surface: isDark ? neutral[900] : palettes.white,
      surfaceHover: isDark ? neutral[800] : neutral[50],
      surfaceActive: isDark ? neutral[700] : neutral[100]
    },
    border: {
      default: isDark ? neutral[700] : neutral[100],
      hover: isDark ? neutral[600] : neutral[200],
      // Contour des éléments interactifs : >= 3:1 (WCAG 1.4.11)
      strong: neutral[500]
    }
  };
};
var DEFAULT_ROLES = {
  primary: "indigo",
  secondary: "neutral",
  tertiary: "slate",
  success: "green",
  warning: "amber",
  info: "blue",
  danger: "red"
};
var GATHER_ROLES = {
  tertiary: "peach",
  success: "mint",
  info: "indigo",
  danger: "rose"
};
var CMS_ROLES = {
  primary: "olive",
  secondary: "taupe"
};
var isObject = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
var deepMerge = (base, patch) => {
  if (!isObject(base) || !isObject(patch)) return patch === void 0 ? base : patch;
  const out = { ...base };
  for (const [key, value] of Object.entries(patch)) out[key] = deepMerge(out[key], value);
  return out;
};
var createSemanticRole = (scale, mode) => {
  const isDark = mode === "dark";
  return {
    scale,
    base: isDark ? scale[500] : scale[600],
    hover: isDark ? scale[400] : scale[700],
    subtle: isDark ? scale[900] : scale[100],
    dark: isDark ? scale[300] : scale[800],
    emphasis: isDark ? scale[100] : scale[950]
  };
};
var toVariables = (light, dark, path, variables) => {
  if (isObject(light)) {
    return Object.fromEntries(
      Object.entries(light).map(([key, value]) => [
        key,
        toVariables(value, dark[key], [...path, key], variables)
      ])
    );
  }
  if (light === dark) return light;
  const name = `--${path.join("-")}`;
  variables.light.push(`${name}: ${String(light)};`);
  variables.dark.push(`${name}: ${String(dark)};`);
  return `var(${name})`;
};
var DARK_MODE_SELECTOR = ":root[data-theme='dark'], :root[data-ui-theme='dark']";
var createAppTheme = ({
  palettes: extraPalettes = {},
  roles: roleOverrides = {},
  surfaces = SLATE_SURFACES,
  cssPrefix = "ds",
  overrides
} = {}) => {
  const { white, black, ...scales } = palettes;
  const allPalettes = { ...scales, ...extraPalettes };
  const roles = { ...DEFAULT_ROLES, ...roleOverrides };
  const paletteOf = (role) => {
    const scale = allPalettes[roles[role]];
    if (!scale) throw new Error(`createAppTheme : palette \xAB ${roles[role]} \xBB inconnue pour le r\xF4le ${role}.`);
    return scale;
  };
  const build = (mode) => {
    const primary = paletteOf("primary");
    const surface = surfaces(allPalettes, mode);
    const colors = {
      white,
      black,
      palettes: allPalettes,
      ...Object.fromEntries(
        Object.keys(DEFAULT_ROLES).map((role) => [
          role,
          createSemanticRole(paletteOf(role), mode)
        ])
      ),
      ...surface
    };
    const theme2 = {
      name: mode,
      colors,
      radii,
      spacing,
      typography,
      shadows: getShadows(mode, surface.text.heading, primary[600]),
      borders: {
        widths: { none: "0px", thin: "1px", thick: "2px" },
        // Opaque, contraste >= 3:1 : ton 600 sur fond clair, 300 sur fond sombre
        focusRing: { width: "3px", offset: "2px", color: mode === "dark" ? primary[300] : primary[600] }
      },
      breakpoints,
      media
    };
    return overrides ? deepMerge(theme2, overrides) : theme2;
  };
  const lightTheme = build("light");
  const darkTheme = build("dark");
  const variables = { light: [], dark: [] };
  const theme = {
    ...lightTheme,
    colors: toVariables(lightTheme.colors, darkTheme.colors, [cssPrefix, "color"], variables),
    shadows: toVariables(lightTheme.shadows, darkTheme.shadows, [cssPrefix, "shadow"], variables),
    borders: toVariables(lightTheme.borders, darkTheme.borders, [cssPrefix, "border"], variables)
  };
  const cssVariables = `
  :root {
    color-scheme: light;
    ${variables.light.join("\n    ")}
  }

  ${DARK_MODE_SELECTOR} {
    color-scheme: dark;
    ${variables.dark.join("\n    ")}
  }
`;
  return { lightTheme, darkTheme, theme, cssVariables };
};

// src/theme/themeStore.ts
import { useCallback, useSyncExternalStore } from "react";
var THEME_STORAGE_KEY = "ds-app-theme";
var DEFAULT_THEME_ATTRIBUTES = ["data-theme", "data-ds-theme", "data-ui-theme"];
var DARK_QUERY = "(prefers-color-scheme: dark)";
var resolveMode = ({ preference, systemMode }) => preference === "system" ? systemMode : preference;
var normalizePreference = (value) => {
  if (value === "auto") return "system";
  return value === "light" || value === "dark" || value === "system" ? value : null;
};
var getThemeInitScript = ({
  storageKey = THEME_STORAGE_KEY,
  legacyKeys = [],
  attributes = DEFAULT_THEME_ATTRIBUTES
} = {}) => `(function () {
  var mode = 'light';
  try {
    var keys = ${JSON.stringify([storageKey, ...legacyKeys])};
    var preference;
    for (var i = 0; i < keys.length && !preference; i++) {
      var raw = localStorage.getItem(keys[i]);
      if (!raw) continue;
      try { var parsed = JSON.parse(raw); preference = parsed && parsed.state ? parsed.state.preference : parsed; } catch (e) { preference = raw; }
    }
    mode = preference === 'dark' || preference === 'light' ? preference : matchMedia('${DARK_QUERY}').matches ? 'dark' : 'light';
  } catch (e) {}
  var root = document.documentElement;
  ${JSON.stringify(attributes)}.forEach(function (name) { root.setAttribute(name, mode); });
  root.style.colorScheme = mode;
})();`;
var createThemeStore = (options = {}) => {
  const {
    storageKey = THEME_STORAGE_KEY,
    legacyKeys = [],
    attributes = DEFAULT_THEME_ATTRIBUTES,
    defaultPreference = "system",
    version = 1,
    migrations = {},
    syncTabs = true,
    autoInit = false,
    themes
  } = options;
  const serverState = { preference: defaultPreference, systemMode: "light" };
  let state = serverState;
  const listeners = /* @__PURE__ */ new Set();
  const applyToDocument = (mode) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    attributes.forEach((name) => root.setAttribute(name, mode));
    root.style.colorScheme = mode;
  };
  const setState = (patch) => {
    const previous = state;
    state = { ...state, ...patch };
    if (state.preference === previous.preference && state.systemMode === previous.systemMode) return;
    if (resolveMode(state) !== resolveMode(previous)) applyToDocument(resolveMode(state));
    listeners.forEach((listener) => listener());
  };
  const readStored = () => {
    try {
      for (const key of [storageKey, ...legacyKeys]) {
        const raw = localStorage.getItem(key);
        if (raw === null) continue;
        let parsed;
        try {
          parsed = JSON.parse(raw);
        } catch {
          parsed = raw;
        }
        if (parsed && typeof parsed === "object" && "state" in parsed) {
          const { state: persisted, version: storedVersion = 0 } = parsed;
          const migrate = storedVersion !== version ? migrations[storedVersion] : void 0;
          const value = migrate ? migrate(persisted).preference : persisted?.preference;
          const preference = normalizePreference(value);
          if (preference) return preference;
        } else {
          const preference = normalizePreference(parsed);
          if (preference) return preference;
        }
      }
    } catch {
    }
    return null;
  };
  const persist = (preference) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ state: { preference }, version }));
    } catch {
    }
  };
  const setPreference = (preference) => {
    setState({ preference });
    persist(preference);
  };
  let cleanup = null;
  const initThemeStore2 = () => {
    if (cleanup || typeof window === "undefined") return cleanup ?? (() => void 0);
    const media2 = window.matchMedia?.(DARK_QUERY);
    setState({
      preference: readStored() ?? defaultPreference,
      systemMode: media2?.matches ? "dark" : "light"
    });
    applyToDocument(resolveMode(state));
    const onSystemChange = (event) => setState({ systemMode: event.matches ? "dark" : "light" });
    const onStorage = (event) => {
      if (event.key === storageKey) setState({ preference: readStored() ?? defaultPreference });
    };
    media2?.addEventListener("change", onSystemChange);
    if (syncTabs) window.addEventListener("storage", onStorage);
    cleanup = () => {
      media2?.removeEventListener("change", onSystemChange);
      window.removeEventListener("storage", onStorage);
      cleanup = null;
    };
    return cleanup;
  };
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const getState = () => state;
  const useTheme2 = () => {
    const current = useSyncExternalStore(subscribe, getState, () => serverState);
    const mode = resolveMode(current);
    const toggleTheme = useCallback(() => setPreference(mode === "dark" ? "light" : "dark"), [mode]);
    return {
      mode,
      preference: current.preference,
      isDark: mode === "dark",
      setPreference,
      setMode: setPreference,
      toggleTheme,
      theme: themes ? themes[mode] : void 0
    };
  };
  if (autoInit) initThemeStore2();
  return {
    useTheme: useTheme2,
    initThemeStore: initThemeStore2,
    getState,
    subscribe,
    setPreference,
    resolveMode,
    storageKey,
    initScript: getThemeInitScript({ storageKey, legacyKeys, attributes })
  };
};
var themeStore = createThemeStore();
var useTheme = themeStore.useTheme;
var initThemeStore = themeStore.initThemeStore;
var themeScript = themeStore.initScript;

// src/theme/ThemeScript.tsx
import { jsx } from "react/jsx-runtime";
var ThemeScript = ({ nonce, ...config }) => /* @__PURE__ */ jsx("script", { nonce, dangerouslySetInnerHTML: { __html: getThemeInitScript(config) } });
export {
  CMS_ROLES,
  DARK_MODE_SELECTOR,
  DEFAULT_ROLES,
  DEFAULT_THEME_ATTRIBUTES,
  GATHER_ROLES,
  LEGACY_RADII,
  SLATE_SURFACES,
  THEME_STORAGE_KEY,
  TINTED_SURFACES,
  ThemeScript,
  breakpoints,
  createAppTheme,
  createThemeStore,
  getShadows,
  getThemeInitScript,
  initThemeStore,
  media,
  palettes,
  radii,
  resolveMode,
  spacing,
  themeScript,
  themeStore,
  typography,
  useTheme
};
//# sourceMappingURL=index.js.map