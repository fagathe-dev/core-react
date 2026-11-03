import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../../../testing/renderWithTheme';
import { MarkdownContent, MarkdownViewer } from './MarkdownViewer';

const html = (source: string, props: Record<string, unknown> = {}) =>
  renderWithTheme(<MarkdownViewer {...props}>{source}</MarkdownViewer>).container.innerHTML;

/** Vecteurs de l'audit (§1.3.1) et de l'OWASP XSS cheat sheet. */
const XSS_VECTORS = [
  '<script>alert(1)</script>',
  '<img src=x onerror=alert(2)>',
  '[x](javascript:alert(3))',
  '[x](&#106;avascript:alert(4))',
  '[x](data:text/html;base64,PHNjcmlwdD5hbGVydCg1KTwvc2NyaXB0Pg==)',
  '==<b onmouseover=alert(6)>x</b>==',
  '<svg onload=alert(7)>',
  '<iframe src="https://evil.example"></iframe>',
  '| a |\n|---|\n| <img src=x onerror=alert(8)> |',
  '- [ ] <script>alert(9)</script>',
  '[lien](https://ok.example "titre\\" onmouseover=alert(10)")',
];

describe('MarkdownViewer — sécurité', () => {
  it.each(XSS_VECTORS)('neutralise %s', (vector) => {
    const output = html(vector, { allowImages: true });

    expect(output).not.toMatch(/<script/i);
    expect(output).not.toMatch(/<(img|svg|iframe|b)\b[^>]*\son\w+=/i);
    expect(output).not.toMatch(/href="(javascript|data):/i);
    expect(output).not.toMatch(/<iframe/i);
  });

  it('garde le contenu des blocs de code comme du texte inerte', () => {
    const { container } = renderWithTheme(
      <MarkdownViewer>
        {'```html\n<script>alert(1)</script>\n```\n\n`<img src=x onerror=alert(2)>`'}
      </MarkdownViewer>,
    );

    expect(container.querySelector('script')).toBeNull();
    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('pre code')).toHaveTextContent('<script>alert(1)</script>');
    expect(container.querySelector('pre code')).toHaveClass('language-html');
  });
});

describe('MarkdownViewer — rendu', () => {
  it('rend GFM : titres, listes, tâches, tableaux, surlignage, barré', () => {
    const { container } = renderWithTheme(
      <MarkdownViewer>
        {'# Titre\n\n- [x] fait\n- **gras** ~~barré~~ ==surligné==\n\n| a | b |\n|---|---|\n| 1 | 2 |'}
      </MarkdownViewer>,
    );

    expect(container.querySelector('h1')).toHaveTextContent('Titre');
    expect(container.querySelector('input[type="checkbox"]')).toBeChecked();
    expect(container.querySelector('strong')).toHaveTextContent('gras');
    expect(container.querySelector('del')).toHaveTextContent('barré');
    expect(container.querySelector('mark')).toHaveTextContent('surligné');
    expect(container.querySelectorAll('td')).toHaveLength(2);
  });

  it('ouvre les liens externes dans un nouvel onglet, pas les liens relatifs', () => {
    renderWithTheme(<MarkdownViewer>{'[ext](https://a.example) [int](/page) [ancre](#top)'}</MarkdownViewer>);

    expect(screen.getByRole('link', { name: 'ext' })).toHaveAttribute('target', '_blank');
    expect(screen.getByRole('link', { name: 'ext' })).toHaveAttribute(
      'rel',
      'noopener noreferrer nofollow ugc',
    );
    expect(screen.getByRole('link', { name: 'int' })).not.toHaveAttribute('target');
    expect(screen.getByRole('link', { name: 'ancre' })).toHaveAttribute('href', '#top');
  });

  it('masque les images par défaut et les affiche avec allowImages', () => {
    const source = '![logo](https://cdn.example/logo.png)';
    expect(
      renderWithTheme(<MarkdownViewer>{source}</MarkdownViewer>).container.querySelector('img'),
    ).toBeNull();
    expect(screen.getByText('logo')).toBeInTheDocument();

    const { container } = renderWithTheme(<MarkdownViewer allowImages>{source}</MarkdownViewer>);
    expect(container.querySelector('img')).toHaveAttribute('src', 'https://cdn.example/logo.png');
  });

  it('MarkdownContent (alias du social) décale les titres de 2 et garde les retours à la ligne', () => {
    const { container } = renderWithTheme(<MarkdownContent>{'# Titre\n\nligne 1\nligne 2'}</MarkdownContent>);

    expect(container.querySelector('h3')).toHaveTextContent('Titre');
    expect(container.querySelector('p br')).not.toBeNull();
  });
});
