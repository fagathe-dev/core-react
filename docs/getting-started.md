# Prise en main

## 1. Installation

```json
// package.json de l'app
"dependencies": {
  "core-react": "git+https://github.com/fagathe-dev/core-react.git#master",
  "core-ts": "git+https://github.com/fagathe-dev/core-ts.git#master",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "styled-components": "^6.5.0"
}
```

```ini
# .npmrc de l'app : npm 12 bloque les dépendances git par défaut
allow-git=root
```

L'éditeur de blocs (`core-react/editor`) demande en plus `@dnd-kit/core`, `@dnd-kit/sortable` et `@dnd-kit/utilities` (peer dependencies optionnelles).

`marked` est une dépendance directe de core-react (rendu Markdown) : rien à installer.

## 2. Points d'entrée

```ts
import { useClipboard, useToggle, UIProvider } from 'core-react';
import { Button, Card, GlobalStyle, ToastContainer } from 'core-react/ui';
import { createAppTheme, createThemeStore, ThemeScript } from 'core-react/theme';
import { Icon } from 'core-react/icons';
import { BlockCanvas, CMS_BLOCK_REGISTRY, useBlocksState } from 'core-react/editor';
import { withLegacyProps } from 'core-react/compat';
```

Tous les points d'entrée portent `'use client'`, sauf `core-react/theme`, utilisable dans un Server Component (layout Next).

## 3. Brancher les providers — app Vite (base, CMS)

```tsx
// src/app/AppProviders.tsx
import { UIProvider } from 'core-react';
import { createAppTheme, createThemeStore } from 'core-react/theme';
import { GlobalStyle, ToastContainer } from 'core-react/ui';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

const { theme, cssVariables } = createAppTheme(); // CMS : createAppTheme({ roles: CMS_ROLES })
export const themeStore = createThemeStore({ autoInit: true }); // SPA : initialisation immédiate

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle $cssVariables={cssVariables} />
      <UIProvider
        linkComponent={RouterLink}
        linkHrefProp="to"
        navigation={{ back: () => navigate(-1), push: (url) => navigate(url) }}
      >
        {children}
        <ToastContainer />
      </UIProvider>
    </ThemeProvider>
  );
};
```

Le thème unique (`theme`) contient des `var(--ds-…)` : le passage clair/sombre ne recrée aucune classe. Ajouter le script anti-flash dans `index.html` si besoin (voir [theme.md](theme.md)).

## 4. Brancher les providers — app Next (social)

```tsx
// app/layout.tsx (Server Component)
import { ThemeScript } from 'core-react/theme';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

```tsx
// app/providers.tsx
'use client';
import { UIProvider } from 'core-react';
import { OUTLINE_COMPAT_ALIASES } from 'core-react/icons';
import { createAppTheme, GATHER_ROLES, initThemeStore, TINTED_SURFACES } from 'core-react/theme';
import { GlobalStyle, ToastContainer } from 'core-react/ui';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { StyledComponentsRegistry } from '@/ui/theme/StyledComponentsRegistry';

const { theme, cssVariables } = createAppTheme({ roles: GATHER_ROLES, surfaces: TINTED_SURFACES });

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const navigation = useMemo(() => ({ back: router.back, push: router.push }), [router]);
  useEffect(() => initThemeStore(), []); // après hydratation : lecture du stockage, suivi système

  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyle $cssVariables={cssVariables} />
        <UIProvider linkComponent={NextLink} imageComponent={NextImage} navigation={navigation} iconAliases={OUTLINE_COMPAT_ALIASES}>
          {children}
          <ToastContainer />
        </UIProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
};
```

`StyledComponentsRegistry` (collecte des styles SSR via `useServerInsertedHTML`) reste dans l'app tant que le sous-chemin `core-react/next` n'existe pas.

## 5. Premier composant

```tsx
import { Button, Card, CardBody, CardTitle, useToast } from 'core-react/ui';

export const Welcome = () => {
  const { success } = useToast();
  return (
    <Card>
      <CardBody>
        <CardTitle>Bienvenue</CardTitle>
        <Button $variant="primary" onClick={() => success('Enregistré')}>Enregistrer</Button>
        <Button $variant="ghost" href="/aide">Aide</Button>
      </CardBody>
    </Card>
  );
};
```

## Suite

- Thème et marque de l'app : [theme.md](theme.md)
- Migration d'une app existante : [migration.md](migration.md)
- Référence des composants : [README.md](README.md#composants-du-ui-kit)
