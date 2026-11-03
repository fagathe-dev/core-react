import { render, screen } from '@testing-library/react';
import { createRef, type Ref } from 'react';
import { describe, expect, it } from 'vitest';

import { withLegacyProps } from './withLegacyProps';

interface CoreButtonProps {
  $variant?: 'primary' | 'danger';
  $size?: 'sm' | 'md';
  children?: string;
  ref?: Ref<HTMLButtonElement>;
}

const CoreButton = ({ $variant = 'primary', $size = 'md', children, ref }: CoreButtonProps) => (
  <button ref={ref} data-variant={$variant} data-size={$size}>
    {children}
  </button>
);

const Button = withLegacyProps(CoreButton, { variant: '$variant', size: '$size' });

describe('withLegacyProps', () => {
  it('traduit les anciennes props en props transitoires', () => {
    render(
      <Button variant="danger" size="sm">
        Supprimer
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Supprimer' });
    expect(button).toHaveAttribute('data-variant', 'danger');
    expect(button).toHaveAttribute('data-size', 'sm');
  });

  it('accepte toujours les props transitoires, qui l’emportent sur les anciennes', () => {
    render(
      <Button variant="primary" $variant="danger">
        Ok
      </Button>,
    );

    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'danger');
  });

  it('transmet la ref et les autres props', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ok</Button>);

    expect(ref.current).toBe(screen.getByRole('button'));
  });

  it('nomme le composant pour les DevTools', () => {
    expect(Button.displayName).toBe('withLegacyProps(CoreButton)');
  });
});
