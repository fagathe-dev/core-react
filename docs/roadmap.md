# Avancement de la migration

Séquencement du §5.5 de [l'audit](AUDIT_MIGRATION_CORE_REACT.md).

| Étape | Statut |
|---|---|
| 0. Patch core-ts (exports, Markdown durci, SSR `StorageService`) | À faire, dans le dépôt core-ts |
| 1. `design-tokens` dans core-ts | À faire (palettes et tokens provisoirement dans `core-react/theme`) |
| 2. Modules purs core-ts 1.1 (geo, auth, markdown-editor, selection, file, theme, http) | À faire |
| 3. core-react : hooks génériques + `compat` | ✅ Fait |
| 3 bis. UI Kit, thème, icônes SVG du DS, Markdown, éditeur de blocs | ✅ Fait (source : social ; orchestration de l'éditeur : CMS) |
| 4–5. Proxies base, CMS | À faire ([migration.md](migration.md)) |
| 5. Social (Gather) | ✅ Fait : imports directs de `core-react/*`, sans proxy ; kit local, hooks, thème et Storybook retirés de l'app |
| Vitrine Storybook du kit | ✅ Fait (`stories/`, sélecteur de marque) |
| 6. Alignement visuel DA (§4b.3), échelle d'espacement linéaire | À faire |
| Hooks dépendant de core-ts 1.1 : `useGeolocation`, `createAuth`, `useSelectable`, `useFileUploader` | À faire |
| Sous-chemin `core-react/next` (`StyledComponentsRegistry`, adaptateur de navigation) | À faire |
