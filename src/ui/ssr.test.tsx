// @vitest-environment node
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';
import { describe, expect, it } from 'vitest';

import { UIProvider } from 'core-react';
import { BlockList, CMS_BLOCK_REGISTRY } from 'core-react/editor';
import { Icon } from 'core-react/icons';
import { createAppTheme, GATHER_ROLES, ThemeScript } from 'core-react/theme';
import {
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  GlobalStyle,
  MarkdownViewer,
  TextField,
  ThemeModeSwitcher,
} from 'core-react/ui';

/** Rendu serveur sans `window` ni `document` : condition pour le social (Next, App Router). */
describe('rendu serveur (Node, sans DOM)', () => {
  it('rend le kit sans accéder au navigateur', () => {
    expect(typeof window).toBe('undefined');
    const { theme, cssVariables } = createAppTheme({ roles: GATHER_ROLES });
    const sheet = new ServerStyleSheet();

    const html = renderToString(
      sheet.collectStyles(
        <ThemeProvider theme={theme}>
          <UIProvider>
            <ThemeScript />
            <GlobalStyle $cssVariables={cssVariables} />
            <ThemeModeSwitcher />
            <Card>
              <Badge $variant="primary">Nouveau</Badge>
              <Avatar name="Ada Lovelace" />
              <Icon name="heart" />
              <Button href="/posts">Articles</Button>
              <Alert variant="info">Info</Alert>
              <TextField label="Titre" value="" onChange={() => undefined} />
              <MarkdownViewer>{'**Bonjour** <script>alert(1)</script>'}</MarkdownViewer>
              <BlockList
                registry={CMS_BLOCK_REGISTRY}
                blocks={[{ type: 'text', data: { content: 'Texte' } }]}
              />
              <Breadcrumb items={[{ label: 'Accueil', to: '/' }]} />
            </Card>
          </UIProvider>
        </ThemeProvider>,
      ),
    );
    const css = sheet.getStyleTags();
    sheet.seal();

    expect(html).toContain('href="/posts"');
    expect(html).toContain('<strong>Bonjour</strong>');
    expect(html).not.toContain('<script>alert');
    expect(html).toContain('<path d="');
    expect(css).toContain('--ds-color-primary-base');
  });
});
