import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../../../../testing/renderWithTheme';
import { Skeleton, SkeletonCircle, SkeletonGroup, SkeletonLine, SkeletonText } from './Skeleton';
import { toCssSize } from './skeletonStyles';

describe('toCssSize', () => {
  it('lit un nombre en pixels et garde une chaîne telle quelle', () => {
    expect(toCssSize(48)).toBe('48px');
    expect(toCssSize('60%')).toBe('60%');
  });
});

describe('formes de squelette', () => {
  it('applique les dimensions et le rayon libres', () => {
    renderWithTheme(<Skeleton data-testid="shape" $width={120} $height="30%" $radius={12} />);
    const shape = screen.getByTestId('shape');

    expect(shape).toHaveStyle({ width: '120px', height: '30%', borderRadius: '12px' });
  });

  it('dessine un trait et un cercle aux dimensions demandées', () => {
    renderWithTheme(
      <>
        <SkeletonLine data-testid="line" $width="40%" $height={10} />
        <SkeletonCircle data-testid="circle" $size={32} />
      </>,
    );

    expect(screen.getByTestId('line')).toHaveStyle({ width: '40%', height: '10px' });
    expect(screen.getByTestId('circle')).toHaveStyle({ width: '32px', height: '32px' });
  });

  it('masque les formes aux technologies d’assistance', () => {
    renderWithTheme(<Skeleton data-testid="shape" />);

    expect(screen.getByTestId('shape')).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('SkeletonText', () => {
  it('raccourcit la dernière ligne par défaut', () => {
    const { container } = renderWithTheme(<SkeletonText lines={3} />);
    const lines = container.firstElementChild?.children ?? [];

    expect(lines).toHaveLength(3);
    expect(lines[0]).toHaveStyle({ width: '100%' });
    expect(lines[2]).toHaveStyle({ width: '60%' });
  });

  it('suit les largeurs données ligne par ligne', () => {
    const { container } = renderWithTheme(<SkeletonText widths={['80%', 120]} />);
    const lines = container.firstElementChild?.children ?? [];

    expect(lines).toHaveLength(2);
    expect(lines[1]).toHaveStyle({ width: '120px' });
  });
});

describe('SkeletonGroup', () => {
  it('annonce le chargement une seule fois', () => {
    renderWithTheme(
      <SkeletonGroup label="Chargement des notes…">
        <SkeletonLine />
        <SkeletonLine />
      </SkeletonGroup>,
    );
    const status = screen.getByRole('status');

    expect(status).toHaveAttribute('aria-busy', 'true');
    expect(status).toHaveTextContent('Chargement des notes…');
  });
});
