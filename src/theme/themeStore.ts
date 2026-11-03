import { useCallback, useSyncExternalStore } from 'react';

import type { ThemeMode } from './createAppTheme';

export type { ThemeMode };

/** Choix de l'utilisateur : 'system' suit le réglage de l'appareil. */
export type ThemePreference = ThemeMode | 'system';

export interface ThemeState {
  preference: ThemePreference;
  /** Réglage courant de l'appareil (lu à l'initialisation, puis suivi en direct). */
  systemMode: ThemeMode;
}

export const THEME_STORAGE_KEY = 'ds-app-theme';
export const DEFAULT_THEME_ATTRIBUTES = ['data-theme', 'data-ds-theme', 'data-ui-theme'] as const;
const DARK_QUERY = '(prefers-color-scheme: dark)';

export interface CreateThemeStoreOptions<TTheme = never> {
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
  migrations?: Record<number, (persisted: unknown) => { preference?: unknown }>;
  /** Synchronise les onglets via l'événement `storage` (défaut : true). */
  syncTabs?: boolean;
  /** SPA uniquement : initialise dès la création (lecture du stockage, attributs, suivi système). */
  autoInit?: boolean;
  /** Objets de thème : ajoute `theme` au retour de `useTheme` (compatibilité de l'app de base). */
  themes?: Record<ThemeMode, TTheme>;
}

export interface UseThemeReturn<TTheme = never> {
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
export const resolveMode = ({ preference, systemMode }: ThemeState): ThemeMode =>
  preference === 'system' ? systemMode : preference;

const normalizePreference = (value: unknown): ThemePreference | null => {
  if (value === 'auto') return 'system';
  return value === 'light' || value === 'dark' || value === 'system' ? value : null;
};

/**
 * Script exécuté dans le `<head>` avant le premier affichage (anti-flash). Constant, sans donnée utilisateur.
 */
export const getThemeInitScript = ({
  storageKey = THEME_STORAGE_KEY,
  legacyKeys = [],
  attributes = DEFAULT_THEME_ATTRIBUTES,
}: Pick<CreateThemeStoreOptions, 'storageKey' | 'legacyKeys' | 'attributes'> = {}): string => `(function () {
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

/**
 * Store de thème SSR-safe (aucun accès DOM à l'import, sauf `autoInit`).
 * Côté Next : appeler `initThemeStore()` dans un `useEffect` du provider et rendre `getThemeInitScript()` dans `<head>`.
 */
export const createThemeStore = <TTheme = never>(options: CreateThemeStoreOptions<TTheme> = {}) => {
  const {
    storageKey = THEME_STORAGE_KEY,
    legacyKeys = [],
    attributes = DEFAULT_THEME_ATTRIBUTES,
    defaultPreference = 'system',
    version = 1,
    migrations = {},
    syncTabs = true,
    autoInit = false,
    themes,
  } = options;

  const serverState: ThemeState = { preference: defaultPreference, systemMode: 'light' };
  let state: ThemeState = serverState;
  const listeners = new Set<() => void>();

  const applyToDocument = (mode: ThemeMode) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    attributes.forEach((name) => root.setAttribute(name, mode));
    root.style.colorScheme = mode;
  };

  const setState = (patch: Partial<ThemeState>) => {
    const previous = state;
    state = { ...state, ...patch };
    if (state.preference === previous.preference && state.systemMode === previous.systemMode) return;
    if (resolveMode(state) !== resolveMode(previous)) applyToDocument(resolveMode(state));
    listeners.forEach((listener) => listener());
  };

  const readStored = (): ThemePreference | null => {
    try {
      for (const key of [storageKey, ...legacyKeys]) {
        const raw = localStorage.getItem(key);
        if (raw === null) continue;
        let parsed: unknown;
        try {
          parsed = JSON.parse(raw);
        } catch {
          parsed = raw; // valeur brute (ex. `ds-theme` du DS : "dark")
        }
        if (parsed && typeof parsed === 'object' && 'state' in parsed) {
          const { state: persisted, version: storedVersion = 0 } = parsed as {
            state: unknown;
            version?: number;
          };
          const migrate = storedVersion !== version ? migrations[storedVersion] : undefined;
          const value = migrate
            ? migrate(persisted).preference
            : (persisted as { preference?: unknown })?.preference;
          const preference = normalizePreference(value);
          if (preference) return preference;
        } else {
          const preference = normalizePreference(parsed);
          if (preference) return preference;
        }
      }
    } catch {
      // stockage indisponible (navigation privée, iframe sandbox)
    }
    return null;
  };

  const persist = (preference: ThemePreference) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ state: { preference }, version }));
    } catch {
      // stockage indisponible : la préférence reste en mémoire
    }
  };

  const setPreference = (preference: ThemePreference) => {
    setState({ preference });
    persist(preference);
  };

  let cleanup: (() => void) | null = null;

  /** À appeler une fois après l'hydratation. Idempotent ; retourne la fonction de nettoyage. */
  const initThemeStore = (): (() => void) => {
    if (cleanup || typeof window === 'undefined') return cleanup ?? (() => undefined);

    const media = window.matchMedia?.(DARK_QUERY);
    setState({
      preference: readStored() ?? defaultPreference,
      systemMode: media?.matches ? 'dark' : 'light',
    });
    applyToDocument(resolveMode(state));

    const onSystemChange = (event: MediaQueryListEvent) =>
      setState({ systemMode: event.matches ? 'dark' : 'light' });
    const onStorage = (event: StorageEvent) => {
      if (event.key === storageKey) setState({ preference: readStored() ?? defaultPreference });
    };
    media?.addEventListener('change', onSystemChange);
    if (syncTabs) window.addEventListener('storage', onStorage);

    cleanup = () => {
      media?.removeEventListener('change', onSystemChange);
      window.removeEventListener('storage', onStorage);
      cleanup = null;
    };
    return cleanup;
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const getState = () => state;

  const useTheme = (): UseThemeReturn<TTheme> => {
    const current = useSyncExternalStore(subscribe, getState, () => serverState);
    const mode = resolveMode(current);
    const toggleTheme = useCallback(() => setPreference(mode === 'dark' ? 'light' : 'dark'), [mode]);

    return {
      mode,
      preference: current.preference,
      isDark: mode === 'dark',
      setPreference,
      setMode: setPreference,
      toggleTheme,
      theme: (themes ? themes[mode] : undefined) as UseThemeReturn<TTheme>['theme'],
    };
  };

  if (autoInit) initThemeStore();

  return {
    useTheme,
    initThemeStore,
    getState,
    subscribe,
    setPreference,
    resolveMode,
    storageKey,
    initScript: getThemeInitScript({ storageKey, legacyKeys, attributes }),
  };
};

export type ThemeStore = ReturnType<typeof createThemeStore>;

/** Store par défaut (clé `ds-app-theme`, commune aux apps) : utilisé par `ThemeModeSwitcher`. */
export const themeStore = createThemeStore();
export const useTheme = themeStore.useTheme;
export const initThemeStore = themeStore.initThemeStore;
export const themeScript = themeStore.initScript;
