import { defineConfig, type Options } from 'tsup';

/**
 * Un point d'entrée par sous-chemin public. Pour en ajouter un : une entrée ici, une entrée dans `exports`
 * (package.json), l'alias de vitest.config.ts. Entre sous-chemins, le code importe `core-react/<entrée>`
 * (résolu vers `src/` par les `paths` de tsconfig) : ces imports restent externes au build, donc chaque
 * module partagé (contexte UIProvider, store de thème, store de toasts) n'existe qu'une fois.
 */
const shared: Options = {
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  target: 'es2022',
  // Aucun chunk partagé : les entrées ne partagent du code que via les imports `core-react/…`.
  splitting: false,
  // Ne PAS activer `treeshake` : la passe rollup supprime la bannière 'use client' (« Module level
  // directives cause errors when bundled »). Le tree-shaking est laissé aux apps (`sideEffects: false`).
  external: [
    /^react($|\/)/,
    /^react-dom($|\/)/,
    'styled-components',
    'core-ts',
    'marked',
    /^@dnd-kit\//,
    /^core-react($|\/)/,
  ],
  outExtension: ({ format }) => ({ js: format === 'cjs' ? '.cjs' : '.js' }),
};

export default defineConfig([
  {
    ...shared,
    // Points d'entrée « client » (hooks, composants, contexte) : directive posée en bannière,
    // car esbuild retire les directives de module lors du bundling.
    entry: {
      index: 'src/index.ts',
      'compat/index': 'src/compat/index.ts',
      'ui/index': 'src/ui/index.ts',
      'icons/index': 'src/icons/index.ts',
      'editor/index': 'src/editor/index.ts',
    },
    clean: false, // nettoyage fait par le script build (les deux configurations tournent en parallèle)
    banner: { js: "'use client';" },
  },
  {
    ...shared,
    // Thème : sans 'use client', pour que createAppTheme, ThemeScript et getThemeInitScript restent
    // utilisables dans un Server Component (layout Next). Les hooks du store ne s'appellent que côté client.
    entry: { 'theme/index': 'src/theme/index.ts' },
    clean: false,
  },
]);
