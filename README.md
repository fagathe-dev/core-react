# core-react

Bibliothèque React partagée par mes applications : l'app de base (Vite), le back-office du CMS (Vite) et le social Gather (Next.js). Elle regroupe des hooks génériques, un UI Kit styled-components, un thème à variables CSS, des icônes SVG tracées depuis le Design System, un rendu Markdown sûr et un éditeur de blocs. Elle est construite sur [core-ts](https://github.com/fagathe-dev/core-ts) et alignée sur le Design System `sf-p05-design-system`.

```bash
# package.json de l'app (+ allow-git=root dans son .npmrc)
"core-react": "git+https://github.com/fagathe-dev/core-react.git#master"
```

```tsx
import { useClipboard, UIProvider } from 'core-react';
import { Button, Card } from 'core-react/ui';
import { createAppTheme } from 'core-react/theme';
```

## Documentation

Tout est dans [`docs/`](docs/README.md) :

- [Prise en main](docs/getting-started.md) : installation, providers Vite et Next
- [Hooks](docs/hooks.md) · [UIProvider](docs/ui-provider.md) · [Thème](docs/theme.md) · [Icônes](docs/icons.md) · [Markdown](docs/markdown.md)
- [UI Kit](docs/README.md#composants-du-ui-kit) : un fichier par famille de composants
- [Éditeur de blocs](docs/editor.md) et [ses blocs](docs/editor-blocks.md)
- [Migration des apps](docs/migration.md) · [Architecture et contribution](docs/architecture.md) · [Avancement](docs/roadmap.md)

Les règles de développement (pour les humains et les agents) sont dans [SKILL.md](SKILL.md), et le plan de migration dans [AUDIT_MIGRATION_CORE_REACT.md](AUDIT_MIGRATION_CORE_REACT.md).

## Développement

```bash
npm install
npm test           # Vitest
npm run storybook  # Vitrine du kit sur http://localhost:6006 (marques DS, Gather, CMS)
npm run build      # dist/ est versionné : à relancer avant chaque commit qui touche src/
```

Les autres scripts et le hook pre-commit sont décrits dans [docs/architecture.md](docs/architecture.md#qualité).
