# Architecture et contribution

## Arborescence

```
src/
  index.ts                 → core-react (hooks + provider + utils)
  hooks/                   useToggle, useClipboard, useMarkdownEditor… (+ tests)
  provider/UIProvider.tsx  contexte partagé par ui, icons et editor
  utils/mergeRefs.ts
  compat/                  → core-react/compat (withLegacyProps)
  theme/                   → core-react/theme (sans 'use client')
  icons/                   → core-react/icons ; generated/dsIcons.ts est GÉNÉRÉ
  ui/                      → core-react/ui
    components/{Base,Content,Embed,Feedback,Forms,Grid,Navigation,Typo}/
    types/                 contrats de props (BaseComponentProps…)
    GlobalStyle.tsx
  editor/                  → core-react/editor
    blocks/                BlockWrapper, BlockPicker, *Block, MediaSourceField, blockDefaults
    registry.ts, useBlocksState.ts, BlockCanvas.tsx, BlockList.tsx, BlockViews.tsx, defaultRegistry.ts
  testing/renderWithTheme.tsx   utilitaire de test (non publié)
stories/                   vitrine Storybook, une story par famille (non publiée)
.storybook/                config Storybook : alias vers src/, sélecteur de marque et de thème
scripts/icons/             générateur d'icônes (npm run icons) + icons.config.json
docs/                      cette documentation
```

## Imports entre sous-chemins

Règle : **à l'intérieur** d'un sous-chemin, imports relatifs ; **entre** sous-chemins, import par nom de paquet.

```ts
// src/editor/BlockCanvas.tsx
import { EmptyState, ConfirmDialog } from 'core-react/ui';   // autre sous-chemin
import { BlockPicker } from './blocks/BlockPicker';           // même sous-chemin
```

- `tsconfig.json` (`paths`) et `vitest.config.ts` (`alias`) résolvent `core-react/*` vers `src/*/index.ts`.
- Au build, ces imports restent **externes** : chaque module partagé (contexte `UIProvider`, store de thème, store de toasts) n'existe qu'une fois, en ESM comme en CJS.
- Graphe sans cycle : `core-react` ← `icons` ← `ui` ← `editor` ; `theme` est importé par `ui` et `editor`.
- Pas de `export * from 'core-react/…'` à l'intérieur d'un bundle : esbuild le perd en ESM. Ré-exporter par nom (voir `src/ui/index.ts`).

## Build (tsup)

`npm run build` vide `dist/` puis lance deux configurations (`tsup.config.ts`) :

| Configuration | Entrées | Bannière |
|---|---|---|
| Client | `index`, `compat`, `ui`, `icons`, `editor` | `'use client';` |
| Serveur-compatible | `theme` | aucune |

- Formats ESM (`.js`) + CJS (`.cjs`) + types (`.d.ts`, `.d.cts`), `splitting: false`.
- **Ne pas activer `treeshake`** : sa passe rollup supprime la bannière `'use client'`.
- `react`, `react-dom`, `styled-components`, `core-ts`, `marked`, `@dnd-kit/*` et `core-react/*` sont externes.
- `dist/` est **versionné** (installation depuis git) : relancer `npm run build` avant de commiter une modification de `src/`.

### styled-components dans Node

styled-components 6 n'a pas de champ `exports` ; dans Node (SSR non bundlé), l'import par défaut renvoie l'objet module. Le kit importe donc toujours l'export nommé :

```ts
import { styled, css } from 'styled-components'; // et jamais `import styled from …`
```

## Ajouter un sous-chemin

1. `src/<nom>/index.ts`.
2. Entrée dans `tsup.config.ts` (client ou serveur).
3. Entrée `./<nom>` dans `exports` de `package.json`.
4. Nom ajouté à l'alias de `vitest.config.ts`.
5. Symboles ajoutés au test de surface publique `src/index.test.ts`.

## Ajouter un composant au UI Kit

1. Fichier dans la famille (`src/ui/components/<Famille>/<Composant>.tsx`), export dans l'`index.ts` de la famille.
2. Props : étendre un contrat de `ui/types` ([components/contracts.md](components/contracts.md)) ; préfixer par `$` les props de style.
3. Styles : uniquement des valeurs du thème (`theme.colors.*`, `theme.spacing[n]`…), pas de couleur en dur. Pas de classe BEM.
4. Liens / images / navigation : `useLinkProps`, `useUI` (jamais `next/*`). Icônes : `<Icon name>` avec un nom du DS.
5. Aucun accès à `window`/`document` pendant le rendu (effets et handlers seulement).
6. Test à côté du composant (`*.test.tsx`, `renderWithTheme`) ; l'ajouter au test SSR (`src/ui/ssr.test.tsx`) s'il est utilisé côté serveur.
7. Documenter dans `docs/components/<famille>.md` (250 lignes maximum par fichier).
8. Le montrer dans la story de sa famille (`stories/<Famille>.stories.tsx`). Thème, marque et `UIProvider` sont fournis par `.storybook/preview.tsx` : ne pas les ajouter dans la story.

## Qualité

| Script | Rôle |
|---|---|
| `npm run typecheck` | `tsc --noEmit` (strict, `noUncheckedIndexedAccess`, `verbatimModuleSyntax`), puis les stories (`tsconfig.storybook.json`) |
| `npm run lint` | ESLint (typescript-eslint, react-hooks, `consistent-type-imports`) |
| `npm run format` / `format:check` | Prettier (le fichier d'icônes généré est ignoré) |
| `npm test` | Vitest + jsdom + Testing Library ; `ui/ssr.test.tsx` tourne en environnement Node |
| `npm run icons` | Régénère les icônes depuis le Design System |
| `npm run storybook` / `build-storybook` | Vitrine du kit (port 6006), avec le choix de la marque (DS, Gather, CMS) et du mode clair ou sombre |

Le hook Husky `pre-commit` enchaîne `format:check`, `lint`, `typecheck` et `test`.
