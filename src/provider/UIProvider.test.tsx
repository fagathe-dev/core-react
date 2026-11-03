import { fireEvent, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithTheme } from '../testing/renderWithTheme';
import { BackButton, Button, Link, NavbarLink } from 'core-react/ui';

/** Simule un `<Link to>` de react-router. */
const RouterLink = ({ to, children, ...rest }: { to: string; children?: ReactNode }) => (
  <a data-router="true" href={`#${to}`} {...rest}>
    {children}
  </a>
);

describe('UIProvider', () => {
  it('rend Button avec href comme un <a> par défaut', () => {
    renderWithTheme(<Button href="/posts">Articles</Button>);
    const link = screen.getByRole('link', { name: 'Articles' });

    expect(link).toHaveAttribute('href', '/posts');
    expect(link).not.toHaveAttribute('type');
  });

  it('rend Button sans href comme un <button type="button">', () => {
    renderWithTheme(<Button>Valider</Button>);
    expect(screen.getByRole('button', { name: 'Valider' })).toHaveAttribute('type', 'button');
  });

  it('utilise le composant de lien et la prop d’URL fournis (react-router : `to`)', () => {
    renderWithTheme(
      <>
        <Button href="/a">A</Button>
        <NavbarLink href="/b">B</NavbarLink>
        <Link href="/c">C</Link>
      </>,
      { uiProvider: { linkComponent: RouterLink, linkHrefProp: 'to' } },
    );

    for (const [name, to] of [
      ['A', '/a'],
      ['B', '/b'],
      ['C', '/c'],
    ] as const) {
      const link = screen.getByRole('link', { name });
      expect(link).toHaveAttribute('data-router', 'true');
      expect(link).toHaveAttribute('href', `#${to}`);
    }
  });

  it('BackButton passe par la navigation injectée', () => {
    const navigation = { back: vi.fn(), push: vi.fn() };
    Object.defineProperty(window.history, 'length', { value: 2, configurable: true });

    renderWithTheme(<BackButton />, { uiProvider: { navigation } });
    fireEvent.click(screen.getByRole('button', { name: 'Retour' }));

    expect(navigation.back).toHaveBeenCalledTimes(1);
  });

  it('les providers imbriqués héritent du parent', () => {
    renderWithTheme(<Button href="/x">X</Button>, {
      uiProvider: { linkComponent: RouterLink, linkHrefProp: 'to', icons: { a: 'M0 0Z' } },
    });
    expect(screen.getByRole('link', { name: 'X' })).toHaveAttribute('data-router', 'true');
  });
});
