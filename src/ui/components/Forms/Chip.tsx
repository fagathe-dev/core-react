import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { styled } from 'styled-components';
import { Icon } from 'core-react/icons';
import type { ColorRole } from 'core-react/theme';

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Puce sélectionnée (filtre actif) : fond plein du rôle, `aria-pressed`. */
  selected?: boolean;
  /** Icône MDI avant le libellé ; une coche est affichée par défaut quand la puce est sélectionnée. */
  icon?: string;
  /** Rôle de couleur (défaut : `primary`). */
  $variant?: ColorRole;
  /** Forme pilule (rayon complet). */
  $pill?: boolean;
}

/**
 * Puce interactive : filtre, choix rapide ou étiquette cliquable (bascule `aria-pressed`).
 * Pour saisir une liste d'étiquettes, voir `TagInput`. Équivalent Design System : `.chip`, `.chip-pill`,
 * `.chip-{rôle}`, `.is-selected`.
 */
export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ selected, icon, $variant = 'primary', $pill = false, type = 'button', children, ...rest }, ref) => (
    <ChipRoot
      ref={ref}
      type={type}
      aria-pressed={selected === undefined ? undefined : selected}
      $selected={Boolean(selected)}
      $variant={$variant}
      $pill={$pill}
      {...rest}
    >
      {(icon || selected) && <Icon name={icon ?? 'check'} size={16} />}
      {children}
    </ChipRoot>
  ),
);

Chip.displayName = 'Chip';

const ChipRoot = styled.button<{ $selected: boolean; $variant: ColorRole; $pill: boolean }>`
  --chip-bg: ${({ theme, $variant, $selected }) => ($selected ? theme.colors[$variant].base : theme.colors[$variant].subtle)};
  --chip-color: ${({ theme, $variant, $selected }) => ($selected ? theme.colors.white : theme.colors[$variant].dark)};

  position: relative;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1.5]};
  height: 2rem;
  padding: 0 ${({ theme }) => theme.spacing[3]};
  border: 1px solid transparent;
  border-radius: ${({ theme, $pill }) => ($pill ? theme.radii.pill : theme.radii.sm)};
  background-color: var(--chip-bg);
  color: var(--chip-color);
  font: inherit;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  line-height: 1;
  cursor: pointer;
  user-select: none;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;

  /* Zone tactile de 44px */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: max(100%, 2.75rem);
    height: max(100%, 2.75rem);
    transform: translate(-50%, -50%);
  }

  &:hover:not(:disabled) {
    background-color: color-mix(in srgb, var(--chip-bg), var(--chip-color) 8%);
  }

  &:active:not(:disabled) {
    background-color: color-mix(in srgb, var(--chip-bg), var(--chip-color) 12%);
  }

  &:disabled {
    opacity: 0.38;
    cursor: not-allowed;
  }
`;
