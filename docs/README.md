# Documentation de core-react

Hooks, UI Kit, thème, icônes, Markdown et éditeur de blocs React partagés par l'app de base (Vite), le back-office du CMS (Vite) et le social (Next.js). Construit sur [core-ts](https://github.com/fagathe-dev/core-ts) et aligné sur le Design System (`sf-p05-design-system`).

## Par où commencer

| Je veux… | Lire |
|---|---|
| Installer core-react et brancher les providers (Vite ou Next) | [getting-started.md](getting-started.md) |
| Migrer une app existante sans casser ses imports (proxies) | [migration.md](migration.md) |
| Comprendre le build, les sous-chemins, ajouter un composant | [architecture.md](architecture.md) |
| Savoir ce qui est fait et ce qui reste | [roadmap.md](roadmap.md) |

## Référence par module

| Sous-chemin | Contenu | Doc |
|---|---|---|
| `core-react` | Hooks génériques, `UIProvider`, `mergeRefs` | [hooks.md](hooks.md), [ui-provider.md](ui-provider.md) |
| `core-react/theme` | `createAppTheme`, palettes, tokens, store de thème, `ThemeScript` | [theme.md](theme.md) |
| `core-react/icons` | `Icon` SVG natif tracé depuis `ds-icons.css` | [icons.md](icons.md) |
| `core-react/ui` | UI Kit (styled-components, props transitoires `$`) | [components/](#composants-du-ui-kit) |
| `core-react/editor` | Éditeur de blocs (registre, canvas triable, vues de lecture) | [editor.md](editor.md), [editor-blocks.md](editor-blocks.md) |
| `core-react/compat` | `withLegacyProps` (anciens noms de props) | [migration.md](migration.md) |

Markdown (rendu sûr, éditeur, hook) : [markdown.md](markdown.md).

## Composants du UI Kit

| Famille | Composants | Doc |
|---|---|---|
| Contrats | `BaseComponentProps`, `ClickableComponentProps`… | [components/contracts.md](components/contracts.md) |
| Base | `Button`, `IconButton`, `Avatar`, `Badge`, `Link`, `Divider`, `SegmentedControl` | [components/base.md](components/base.md) |
| Content | `Accordion`, `Card`, `EmptyState`, `ListGroup`, `StatCard`, `Table`, `MarkdownViewer` | [components/content.md](components/content.md) |
| Embed | `Image`, `Video`, `Figure`, `Gallery`, `Carousel` | [components/embed.md](components/embed.md) |
| Feedback | `Alert`, `Loading`, `Progress`, `Skeleton`, `Modal`, `ConfirmDialog`, `Toast`, `Drawer`, `Tooltip` | [components/feedback.md](components/feedback.md) |
| Forms | `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Toggle`, champs `*Field`, `TagInput`, `FileDropzone`, `MarkdownEditor` | [components/forms.md](components/forms.md) |
| Grid | `Container`, `Row`, `Col`, `Grid`, `Flex`, `Columns` | [components/grid.md](components/grid.md) |
| Navigation | `Navbar`, `Sidebar`, `Tabs`, `Dropdown`, `Breadcrumb`, `Pagination`, `BackButton`, `ThemeModeSwitcher` | [components/navigation.md](components/navigation.md) |
| Typo | `Title`, `Display`, `Lead`, `Text` | [components/typo.md](components/typo.md) |

## Règles du kit (rappel)

- **Props transitoires `$`** pour tout ce qui ne doit pas atteindre le DOM (`$variant`, `$size`…). Les anciens noms passent par `withLegacyProps` dans les proxies des apps.
- **Aucun import `next/*`, `react-router` ou bibliothèque d'icônes** dans le kit : liens, images et navigation sont injectés par `UIProvider`.
- **SVG natifs uniquement**, tracés depuis la police du Design System.
- **Pas de BEM** : styles portés par styled-components, aucune classe nommée.
- **Aucun `innerHTML`** pour du contenu utilisateur : le Markdown est rendu en éléments React.
- **SSR-safe** : aucun accès à `window`/`document` pendant le rendu ni à l'import.
