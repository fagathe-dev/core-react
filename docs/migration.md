# Migrer une app vers core-react (proxies « zéro casse »)

Principe (§5 de [l'audit](../AUDIT_MIGRATION_CORE_REACT.md)) : **aucun import de page ne change**. Chaque fichier actuel de l'app devient un **proxy** qui réexporte core-react avec la configuration de l'app, sous les mêmes noms.

Contrôle à chaque étape : `tsc --noEmit`, `npm test`, `npm run build`, recette visuelle.

## 1. Props transitoires : `withLegacyProps` (base, CMS)

Le kit utilise les props `$` du social (`$variant`, `$size`…). La base et le CMS passent encore `variant`, `size`… : leurs proxies enveloppent les composants concernés.

```ts
// src/ui/components/Base/Button.tsx (proxy)
import { withLegacyProps } from 'core-react/compat';
import { Button as CoreButton } from 'core-react/ui';
export type { ButtonProps, ButtonSize, ButtonVariant } from 'core-react/ui';

export const Button = withLegacyProps(CoreButton, {
  variant: '$variant', size: '$size', fullWidth: '$fullWidth', loading: '$loading',
});
```

- Les deux noms sont acceptés ; si les deux sont passés, la prop `$` l'emporte.
- `ref` est transmise (React 19 : prop ordinaire). `displayName` = `withLegacyProps(Button)`.

| Composant | Anciennes props → `$` |
|---|---|
| `Badge` | `variant, pill, color` |
| `Button` | `variant, size, fullWidth, loading` |
| `Divider` | `orientation, margin` |
| `Card` | `bordered, elevation` |
| `ListGroup` / `ListGroupItem` | `flush` / `action, active` |
| `Table` / `TRow` | `bordered, dense, hoverable, striped` / `selected` |
| `Figure`, `Gallery`, `GalleryItem`, `Image` | `align, position` ; `columns, gap, minColumnWidth, rule` ; `hoverZoom, radius` ; `aspectRatio, fit, fluid, radius, thumbnail` |
| `Skeleton` | `variant, width, height` |
| `HelperText`, `Label` | `state`, `required` |
| `Col`, `Columns`, `Container`, `Flex`, `Grid`, `Row` | `span, sm…xl, offset` ; `fluid` ; `direction, gap, justify, align, wrap`… ; `gutter` |
| `NavbarLink` | `active` |
| `Display`, `Text`, `Title` | `level` ; `size, weight` ; `align, color` |

Les composants identiques dans les trois apps (Accordion, Modal, Tabs, Sidebar…) se réexportent directement.

## 2. Barrels UI

```ts
// src/ui/components/Feedback/index.ts (base, CMS)
export * from 'core-react/ui'; // ou une liste nommée, si des proxies withLegacyProps coexistent
```

Ordre conseillé : réexporter tout `core-react/ui`, puis **redéfinir** dans le même barrel les composants enveloppés (un export nommé local masque l'export `*`).

## 3. Thème

```ts
// Base : src/ui/theme/index.ts
import { createAppTheme, LEGACY_RADII } from 'core-react/theme';
export const { lightTheme, darkTheme, theme: appTheme, cssVariables } = createAppTheme({ overrides: { radii: LEGACY_RADII } });

// CMS
import { CMS_ROLES, palettes } from 'core-react/theme';
export const { lightTheme, darkTheme, theme: appTheme, cssVariables } = createAppTheme({
  roles: CMS_ROLES, palettes: { neutral: palettes.gray }, overrides: { radii: LEGACY_RADII },
});

// Social
import { GATHER_ROLES, TINTED_SURFACES } from 'core-react/theme';
export const { theme: appTheme, cssVariables: themeVariables } = createAppTheme({ roles: GATHER_ROLES, surfaces: TINTED_SURFACES });
```

Le social utilisait des variables `--gather-*` ; passer `cssPrefix: 'gather'` les conserve à l'identique si du CSS de l'app les référence.

## 4. Hook de thème

```ts
// Base : src/hooks/useTheme.ts — conserve `theme` dans le retour et la migration v0 { mode }
import { createThemeStore } from 'core-react/theme';
import { darkTheme, lightTheme } from '@/ui/theme';
export type { ThemeMode, ThemePreference, UseThemeReturn } from 'core-react/theme';

export const { useTheme, initThemeStore, resolveMode } = createThemeStore({
  migrations: { 0: (legacy) => ({ preference: (legacy as { mode?: string })?.mode === 'dark' ? 'dark' : 'light' }) },
  themes: { light: lightTheme, dark: darkTheme },
  autoInit: true,
});
```

```ts
// Social : src/hooks/useTheme.ts + themeScript.ts
export { useTheme, initThemeStore, resolveMode, themeScript, THEME_STORAGE_KEY } from 'core-react/theme';
export type { ThemeMode, ThemePreference, UseThemeReturn } from 'core-react/theme';
```

`useThemeStore` (zustand) n'existe plus : remplacer ses usages directs par `useTheme()` ou `themeStore.getState()`.

## 5. Icônes

```ts
// src/ui/components/Base/Icon.tsx (les trois apps)
export { Icon, iconNames, type IconProps } from 'core-react/icons';
```

- Base / CMS : les noms MDI restent valides ; `iconSet` est ignoré. Supprimer `public/assets/ds-icons.css` et sa balise `<link>` une fois la recette faite.
- Social : ajouter `iconAliases={OUTLINE_COMPAT_ALIASES}` au `UIProvider`, puis **retirer `lucide-react`** de `package.json`.

## 6. Hooks génériques

```ts
export { useToggle } from 'core-react';
export { useActionTimer, type UseActionTimerOptions } from 'core-react';
export { useClipboard, type UseClipboardOptions } from 'core-react'; // feedbackDuration et hasCopied acceptés
export { useMarkdownEditor, type MarkdownAction, type MarkdownMode } from 'core-react'; // social
```

`useCodeTimers` (social) :

```ts
import { formatDuration, useCountdown } from 'core-react';
export { formatDuration };
export const useCodeTimers = () => {
  const expiry = useCountdown();
  const resend = useCountdown();
  return {
    isPending: expiry.isActive, expiresIn: expiry.secondsLeft, resendIn: resend.secondsLeft,
    start: (expiresIn: number, resendIn: number) => { expiry.start(expiresIn); resend.start(resendIn); },
    stop: () => { expiry.stop(); resend.stop(); },
  };
};
```

## 7. Markdown

- Social : `MarkdownContent` et `MarkdownEditor` se réexportent depuis `core-react/ui` (même API).
- Base : les 5 usages `convertMarkdownToHtml` + `dangerouslySetInnerHTML` peuvent passer à `<MarkdownViewer>` (recommandé tant que core-ts n'est pas durci).
- CMS : `pages/post/blocks/Markdown.tsx` → `<MarkdownViewer headingOffset={1}>` (rendu plus complet : tableaux, citations, tâches).

## 8. Éditeur de blocs (CMS)

| Fichier du CMS | Remplacement |
|---|---|
| `ui/components/Editor/*` | `export * from 'core-react/editor'` + `withLegacyProps` inutile (aucune prop `$` exposée) |
| `pages/post/blocks/blockEditors.ts` | `CMS_BLOCK_REGISTRY` (ou `extendBlockRegistry`) ; `AVAILABLE_BLOCKS` = `CMS_BLOCK_REGISTRY.definitions` |
| `pages/post/blocks/blockViewRegistry.ts`, `BlockViews.tsx` | Vues du registre + `<BlockList>` |
| `pages/post/hooks/useBlocksState.ts` | `useBlocksState(CMS_BLOCK_REGISTRY, post.blocks)` ; `toPayload()` a la forme de `SaveBlocContentPayload` |
| `pages/post/components/editor/BlockCanvas.tsx` | `<BlockCanvas registry={CMS_BLOCK_REGISTRY} … />` (libellés : `labels`) |
| `pages/post/blocks/readingTime.ts` | `computeReadingTime` |

## 9. Toasts

`useToast` et `ToastContainer` gardent leur API ; `useToastStore(selector)` aussi (store sans zustand). Monter `<ToastContainer />` une fois dans les providers (il ne l'était pas dans la base).

## 10. Ce qui reste dans les apps

Composants métier (`Social/*`, pages), `useJournalAutoLock` (s'appuie sur `useActionTimer` + `usePageFocus`), `useLinkPreview` (peut utiliser `useDebouncedValue`), services API, `StyledComponentsRegistry` (social).
