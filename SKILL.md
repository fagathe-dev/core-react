---
name: core-react
description: Développer, en expert front-end React/TypeScript, la bibliothèque partagée core-react (hooks génériques, UI Kit styled-components, thème à variables CSS, icônes SVG tracées depuis le Design System, Markdown sûr, éditeur de blocs) et l'intégrer dans les apps (base Vite, CMS Vite, social Next.js) via des fichiers proxies. À utiliser dès qu'il faut créer ou modifier un hook, un composant, un bloc d'éditeur, une icône, un token ou un preset de thème de core-react, brancher core-react dans une app (UIProvider, ThemeProvider, ThemeScript), migrer un fichier d'app vers un proxy, ou relire du code qui utilise core-react.
---

# core-react : hooks, UI Kit et éditeur React partagés

## Rôle

**Tout le code est écrit en expert front-end React 19 / TypeScript strict** : composants accessibles (WCAG AA, clavier, ARIA), compatibles SSR (Next App Router) et SPA (Vite), sans dépendance superflue, testés (Vitest + Testing Library), et conformes aux conventions de ce dépôt.

Références : [docs/README.md](docs/README.md) (index de la documentation) et [AUDIT_MIGRATION_CORE_REACT.md](AUDIT_MIGRATION_CORE_REACT.md) (plan de migration, §5.5 pour l'avancement).

## Quand utiliser ce skill

- Création ou modification d'un hook (`src/hooks/`), d'un composant du UI Kit (`src/ui/components/`), d'un bloc d'éditeur (`src/editor/blocks/`).
- Ajout d'une icône du Design System, d'une palette, d'un rôle de couleur ou d'un preset de marque.
- Intégration de core-react dans une app : providers, proxies, `withLegacyProps`, thème de marque.
- Revue de code qui touche au rendu SSR, au Markdown, aux liens/navigation ou aux icônes.

## Workflow

1. **Situer** le code : quel sous-chemin (`core-react`, `/ui`, `/theme`, `/icons`, `/editor`, `/compat`) ? Logique pure et agnostique : elle a sa place dans **core-ts**, pas ici.
2. **Écrire** en respectant les règles ci-dessous (props `$`, thème, `UIProvider`, SSR).
3. **Tester** à côté du fichier (`*.test.ts(x)`, `renderWithTheme` de `src/testing/`) ; ajouter le composant au test SSR (`src/ui/ssr.test.tsx`) s'il est rendu côté serveur ; ajouter les nouveaux exports au test de surface (`src/index.test.ts`).
4. **Vérifier** : `npm run format && npm run lint && npm run typecheck && npm test && npm run build` (le hook pre-commit refait les quatre premiers).
5. **Documenter** dans `docs/` (fichier existant de la famille, ou nouveau fichier lié depuis `docs/README.md`). **250 lignes maximum par fichier** : découper par bloc cohérent.
   Et **montrer** le composant dans la story de sa famille (`stories/<Famille>.stories.tsx`, vitrine Storybook : `npm run storybook`). Les apps n'ont pas de Storybook.
6. **Versionner `dist/`** : les apps installent core-react depuis git.

---

## 1. Sous-chemins et imports

| Sous-chemin | Dossier | `'use client'` |
|---|---|---|
| `core-react` | `src/index.ts`, `hooks/`, `provider/`, `utils/` | oui |
| `core-react/ui` | `src/ui/` | oui |
| `core-react/icons` | `src/icons/` | oui |
| `core-react/editor` | `src/editor/` | oui |
| `core-react/compat` | `src/compat/` | oui |
| `core-react/theme` | `src/theme/` | **non** (layout serveur Next) |

- Même sous-chemin : imports **relatifs**. Sous-chemins différents : import **par nom de paquet** (`import { Button } from 'core-react/ui'`). Résolu vers `src/` par `paths` (tsconfig) et `alias` (vitest) ; externe au build, donc instance unique du contexte et des stores.
- Graphe sans cycle : `core-react` ← `icons` ← `ui` ← `editor` ; `theme` est importé par `ui` et `editor`. Ne jamais importer `ui` depuis `icons` ou `core-react`.
- Jamais de `export * from 'core-react/…'` dans un bundle (perdu en ESM) : ré-exporter par nom.
- Toujours `import { styled, css } from 'styled-components'`, **jamais** l'import par défaut (cassé dans Node : styled-components n'a pas de champ `exports`).
- Types : `import type` (`verbatimModuleSyntax`).

## 2. Règles du UI Kit

1. **Props transitoires `$`** pour toute prop de style (`$variant`, `$size`, `$fullWidth`…) : elles n'atteignent pas le DOM. Les anciens noms (base, CMS) passent par `withLegacyProps` dans les proxies des apps, jamais dans le kit.
2. **Contrats** : étendre `BaseComponentProps`, `ClickableComponentProps`, `InputComponentProps` ou `OnInputComponentProps` (`src/ui/types`).
3. **Thème uniquement** : `theme.colors.<rôle>.{base,hover,subtle,dark,emphasis,scale}`, `theme.colors.text|background|border.*`, `theme.spacing[n]`, `theme.radii.*`, `theme.typography.*`, `theme.shadows.*`. Aucune couleur en dur (sauf `palettes` dans `src/theme`).
4. **Aucun `next/*`, `react-router`, ni bibliothèque d'icônes.** Lien : `useLinkProps(href, as)` ; image : `useUI().imageComponent` ; navigation : `useUI().navigation`.
5. **Composant « lien » stylé** : séparer `XxxBase = styled.button…` et `Xxx = (props) => <XxxBase {...props} {...useLinkProps(href, as)} />`. Étendre avec `styled(XxxBase)`, jamais `styled(Xxx)` (les props `$` seraient perdues).
6. **Pas de BEM**, pas de classe nommée : tout le style est dans styled-components.
7. **SSR** : aucun accès à `window`, `document`, `localStorage`, `navigator` pendant le rendu ni à l'import ; uniquement dans les effets et handlers. Valeur client après montage : `useSyncExternalStore` avec `getServerSnapshot`, ou `useIsClient`.
8. **Accessibilité** : rôles et `aria-*` explicites, focus visible (`:focus-visible` du `GlobalStyle`), contrôle clavier complet, libellés FR par défaut surchargeables.
9. **Motion** : transitions sur des propriétés ciblées (pas `transition: all` dans le nouveau code), respect de `prefers-reduced-motion`.

## 3. Icônes

- `<Icon name="…">` avec un **nom MDI du Design System** (classes `.mdi-*` de `ds-icons.css`). SVG natif, `fill="currentColor"`, grille 24 × 24, `aria-hidden` sauf avec `title`.
- Nouvelle icône : ajouter le nom dans `scripts/icons/icons.config.json`, puis `npm run icons`. **Ne jamais éditer** `src/icons/generated/dsIcons.ts`, ni ajouter de dépendance d'icônes.
- Alias : `aliases` (noms hors MDI, toujours actifs) ou `outlineCompatAliases` (opt-in social via `UIProvider iconAliases`). Icône propre à une app : `UIProvider icons={{ nom: 'M…' }}`.

## 4. Thème

- `createAppTheme({ roles, palettes, surfaces, cssPrefix, overrides })` → `{ theme, cssVariables, lightTheme, darkTheme }`. Donner `theme` (valeurs en `var(--ds-…)`) au `ThemeProvider` et `cssVariables` à `<GlobalStyle $cssVariables>`.
- Presets : `DEFAULT_ROLES` (DS / base), `CMS_ROLES` + `palettes.gray`, `GATHER_ROLES` + `TINTED_SURFACES` (social), `LEGACY_RADII` (base, CMS).
- Mode sombre : attributs `data-theme`, `data-ds-theme`, `data-ui-theme` posés par le store ; sélecteur `DARK_MODE_SELECTOR`.
- Store : `createThemeStore(options)` (format de stockage `zustand/persist`, clé `ds-app-theme`) ; `initThemeStore()` après hydratation ; `<ThemeScript />` dans `<head>` contre le flash.
- Nouvelle palette : `src/theme/palettes.ts` (échelle 50 → 950 complète) ; nouveau rôle de marque : un preset `XXX_ROLES` dans `createAppTheme.ts`.

## 5. Markdown

- Affichage : `<MarkdownViewer>` (jetons `marked` → éléments React). **Jamais** `dangerouslySetInnerHTML` ni `innerHTML` pour du contenu utilisateur, jamais `convertMarkdownToHtml` de core-ts dans React.
- URL actives : `http(s):`, `mailto:`, relatives, ancres ; images opt-in (`allowImages`).
- Toute modification du rendu doit garder les vecteurs XSS de `MarkdownViewer.test.tsx` au vert (en ajouter si besoin).
- Édition : `<MarkdownEditor>` (contrôlé) ou `useMarkdownEditor()` (comportement seul).

## 6. Éditeur de blocs

- Nouveau type de bloc : composant `XxxBlock` (`{ data, onChange, onUpload? }`) + vue `XxxBlockView` (`{ data }`) + valeurs par défaut dans `blockDefaults.ts`, puis `defineBlock(...)` dans un registre (`CMS_BLOCK_REGISTRY` ou `extendBlockRegistry` côté app). Le canvas ne change pas.
- Les blocs ne connaissent pas l'API : téléversement via `onUpload: (file) => Promise<url>`, jamais d'URL `blob:` persistée.
- Sous-éléments (slides, images, questions) : `id` stable via `createBlockItemId()`, utilisé comme `key`.
- `BlockCanvas` : glisser-déposer par la poignée seule, clavier et annonces vocales conservés ; libellés via `labels`.

## 7. Hooks

- Callbacks des options stockés dans des refs (identité des fonctions retournées stable), timers nettoyés au démontage.
- Valeurs dépendantes du navigateur : `useSyncExternalStore` (+ snapshot serveur) plutôt que `useState(() => window…)`.
- Options et retours typés et exportés (`UseXxxOptions`, `UseXxxReturn`) ; alias historiques conservés (`hasCopied`, `feedbackDuration`) mais marqués `@deprecated`.

## 8. Intégration dans une app (proxies)

- Aucun import de page ne change : le fichier historique réexporte core-react avec la config de l'app ([docs/migration.md](docs/migration.md)).
- Providers : `ThemeProvider` + `GlobalStyle` + `UIProvider` (lien, image, navigation, alias d'icônes) + `ToastContainer` ([docs/getting-started.md](docs/getting-started.md)).

## Pièges à éviter

- `import styled from 'styled-components'` (casse le SSR non bundlé) → `import { styled }`.
- Activer `treeshake` dans tsup (supprime `'use client'`).
- Import relatif vers un autre sous-chemin (duplique le contexte `UIProvider` ou les stores dans le bundle).
- `styled(Button)` au lieu de `styled(ButtonBase)`.
- Lire `window`/`localStorage` dans le corps d'un composant ou à l'import d'un module.
- Couleur ou icône codée en dur (`#4B3FD8`, `<i class="mdi …">`, `lucide-react`).
- Oublier `npm run build` (dist versionné) ou la doc (250 lignes maximum par fichier).
