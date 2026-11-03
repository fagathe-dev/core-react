import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../testing/renderWithTheme';
import { DS_ICON_ALIASES, DS_ICONS, OUTLINE_COMPAT_ALIASES } from './generated/dsIcons';
import { Icon, iconNames } from './Icon';

const pathOf = (container: HTMLElement) => container.querySelector('path')?.getAttribute('d');

describe('icônes du Design System', () => {
  it('reprennent le tracé MDI officiel (check)', () => {
    // MDI 7 : "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.58L21,7Z", normalisé par la police
    expect(DS_ICONS.check).toBe('M21 6.984L9 18.984L3.516 13.5L4.922 12.094L9 16.172L19.594 5.578L21 6.984Z');
  });

  it('tous les alias pointent vers une icône embarquée', () => {
    for (const target of [...Object.values(DS_ICON_ALIASES), ...Object.values(OUTLINE_COMPAT_ALIASES)]) {
      expect(DS_ICONS).toHaveProperty(target);
    }
    expect(iconNames).toContain('search');
    expect(iconNames).toContain('trash-can-outline');
  });
});

describe('Icon', () => {
  it('rend un SVG natif décoratif, à la taille demandée', () => {
    const { container } = renderWithTheme(<Icon name="trash-can-outline" size={24} />);
    const svg = container.querySelector('svg')!;

    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).toHaveAttribute('width', '24px');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('fill', 'currentColor');
    expect(pathOf(container)).toBe(DS_ICONS['trash-can-outline']);
  });

  it('accepte le préfixe mdi- et les alias historiques', () => {
    const prefixed = renderWithTheme(<Icon name="mdi-check" />);
    expect(pathOf(prefixed.container)).toBe(DS_ICONS.check);

    const alias = renderWithTheme(<Icon name="search" />);
    expect(pathOf(alias.container)).toBe(DS_ICONS.magnify);
  });

  it('filled remplace la variante -outline par la variante pleine', () => {
    const { container } = renderWithTheme(<Icon name="heart-outline" filled />);
    expect(pathOf(container)).toBe(DS_ICONS.heart);
  });

  it('applique les alias et icônes fournis par UIProvider', () => {
    const { container } = renderWithTheme(<Icon name="heart" />, {
      uiProvider: { iconAliases: OUTLINE_COMPAT_ALIASES },
    });
    expect(pathOf(container)).toBe(DS_ICONS['heart-outline']);

    const custom = renderWithTheme(<Icon name="mon-icone" />, {
      uiProvider: { icons: { 'mon-icone': 'M0 0L24 24Z' } },
    });
    expect(pathOf(custom.container)).toBe('M0 0L24 24Z');
  });

  it('expose un libellé accessible avec title', () => {
    renderWithTheme(<Icon name="check" title="Validé" />);
    expect(screen.getByRole('img', { name: 'Validé' })).toBeInTheDocument();
  });

  it('signale une icône inconnue sans planter', () => {
    const { container } = renderWithTheme(<Icon name="inexistante" />);
    expect(container.querySelector('svg')).toHaveAttribute('data-missing-icon', 'true');
    expect(container.querySelector('path')).toBeNull();
  });
});
