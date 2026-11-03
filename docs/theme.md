# Thème (`core-react/theme`)

```ts
import {
  createAppTheme, GATHER_ROLES, CMS_ROLES, SLATE_SURFACES, TINTED_SURFACES, LEGACY_RADII, palettes,
  createThemeStore, useTheme, initThemeStore, ThemeScript, getThemeInitScript, resolveMode,
} from 'core-react/theme';
```

Ce point d'entrée **n'est pas** marqué `'use client'` : `createAppTheme`, `ThemeScript` et `getThemeInitScript` s'utilisent dans un layout serveur Next.

## 1. createAppTheme

Construit le thème styled-components d'une app à partir des palettes et des **rôles** de couleur.

```ts
const { lightTheme, darkTheme, theme, cssVariables } = createAppTheme(options);
```

| Retour | Usage |
|---|---|
| `theme` | Thème unique à donner au `ThemeProvider` : les valeurs qui diffèrent entre clair et sombre sont des `var(--ds-…)`. HTML serveur identique dans les deux modes. |
| `cssVariables` | Déclarations `:root { … }` + mode sombre, à passer à `<GlobalStyle $cssVariables={cssVariables} />` |
| `lightTheme` / `darkTheme` | Objets « en dur » (valeurs réelles), pour une app qui bascule d'objet de thème (compatibilité de la base) |

| Option | Défaut | Description |
|---|---|---|
| `roles` | `DEFAULT_ROLES` (DS) | Palette de chaque rôle : `primary`, `secondary`, `tertiary`, `success`, `warning`, `info`, `danger` |
| `palettes` | — | Palettes ajoutées ou remplacées (`Record<string, ColorScale>`) |
| `surfaces` | `SLATE_SURFACES` | Calcul des couleurs de texte, fond et bordure |
| `cssPrefix` | `'ds'` | Préfixe des variables (`--ds-color-primary-base`) |
| `overrides` | — | Surcharge profonde finale (ex. `{ radii: LEGACY_RADII }`) |

### Identités des apps

| App | Appel |
|---|---|
| Base (DS) | `createAppTheme()` |
| CMS | `createAppTheme({ roles: CMS_ROLES, palettes: { neutral: palettes.gray }, overrides: { radii: LEGACY_RADII } })` |
| Social (Gather) | `createAppTheme({ roles: GATHER_ROLES, surfaces: TINTED_SURFACES })` |

`DEFAULT_ROLES` : primary `indigo`, secondary `neutral`, tertiary `slate`, success `green`, warning `amber`, info `blue`, danger `red`. `GATHER_ROLES` remplace tertiary/success/info/danger par `peach`/`mint`/`indigo`/`rose` ; `CMS_ROLES` passe primary/secondary en `olive`/`taupe`.

### Forme du thème (`AppTheme`)

```ts
theme.colors.primary.{ scale, base, hover, subtle, dark, emphasis }   // idem pour chaque rôle
theme.colors.text.{ body, muted, heading }
theme.colors.background.{ body, surface, surfaceHover, surfaceActive }
theme.colors.border.{ default, hover, strong }
theme.colors.{ white, black, palettes }
theme.radii.{ none, sm, md, base, lg, xl, '2xl', '3xl', pill, full }
theme.spacing[0 … 10]                     // échelle historique des apps (non linéaire à partir de 5)
theme.typography.{ fonts, weights, sizes, lineHeights }
theme.shadows.{ none, sm, soft, card, base, md, lg, inset, focusRing }
theme.borders.{ widths, focusRing: { width, offset, color } }
theme.breakpoints / theme.media.up('md') / theme.media.down('lg')
```

Le focus ring est dérivé du rôle primaire (ton 600 en clair, 300 en sombre, contraste ≥ 3:1). `DefaultTheme` de styled-components est augmenté : `theme` est typé dans tous les `styled.*`.

### Mode sombre

Le sélecteur sombre est `:root[data-theme='dark'], :root[data-ui-theme='dark']` (`DARK_MODE_SELECTOR`), soit l'attribut des apps et celui du DS pendant la transition. Le store de thème pose les deux (plus `data-ds-theme`).

## 2. Store de thème

### Store par défaut

```ts
const { mode, preference, isDark, setPreference, setMode, toggleTheme } = useTheme();
```

Clé `ds-app-theme`, celle des apps. `ThemeModeSwitcher` (UI Kit) l'utilise. `initThemeStore()` doit être appelé **une fois après l'hydratation** (provider) ; il retourne sa fonction de nettoyage.

### createThemeStore

```ts
export const themeStore = createThemeStore({
  storageKey: 'ds-app-theme',            // défaut
  legacyKeys: ['ds-theme'],              // lit la clé du DS si la principale est absente ('auto' = 'system')
  attributes: ['data-theme', 'data-ds-theme', 'data-ui-theme'], // défaut
  defaultPreference: 'system',
  version: 1,
  migrations: { 0: (legacy) => ({ preference: (legacy as { mode?: string }).mode }) }, // base : v0 { mode }
  syncTabs: true,                        // événement `storage`
  autoInit: true,                        // SPA uniquement : initialisation à la création
  themes: { light: lightTheme, dark: darkTheme }, // ajoute `theme` au retour de useTheme
});
export const { useTheme, initThemeStore } = themeStore;
```

- Format de stockage identique à `zustand/persist` : `{"state":{"preference":"dark"},"version":1}`. Les préférences déjà enregistrées par les apps sont relues telles quelles.
- Aucune dépendance (le store repose sur `useSyncExternalStore`).
- Rendu serveur : `preference = defaultPreference`, `mode = 'light'`, sans accès au DOM.

## 3. Anti-flash : ThemeScript / getThemeInitScript

Le script lit le stockage et pose les attributs **avant le premier affichage**.

```tsx
// Next : app/layout.tsx
<head><ThemeScript /></head>          // mêmes options que createThemeStore (storageKey, legacyKeys, attributes)
```

```ts
// Vite : injecter la chaîne dans index.html (plugin transformIndexHtml) ou un <script> inline
const script = getThemeInitScript({ storageKey: 'ds-app-theme' });
// ou themeStore.initScript (même configuration que le store)
```

Le contenu du script est une constante générée par core-react, jamais une donnée utilisateur.

## 4. Tokens et palettes

`palettes` : `indigo`, `neutral` (gris teinté d'indigo), `slate`, `gray`, `olive`, `taupe`, `green`, `amber`, `blue`, `red`, `peach`, `mint`, `rose` (échelles 50 → 950), plus `white`/`black`.

`spacing`, `radii`, `LEGACY_RADII` (rayons de la base et du CMS), `typography`, `breakpoints`, `media`, `getShadows(mode, ink, accent)`.

> **Évolution prévue** (§4b de l'audit) : les palettes et tokens migreront dans core-ts (`design-tokens`) comme source unique pour le SCSS du DS et ce thème, puis l'espacement passera à l'échelle linéaire du DS (`LEGACY_SPACING` dans les proxies).
