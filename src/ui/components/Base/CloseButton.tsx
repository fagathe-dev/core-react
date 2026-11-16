import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { styled } from 'styled-components';
import { Icon } from 'core-react/icons';

export interface CloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Nom accessible (défaut : « Fermer »). */
  'aria-label'?: string;
  /** Taille visuelle de la croix (px) ; la zone cliquable fait toujours au moins 44px. */
  size?: number;
}

/**
 * Bouton « fermer » : croix qui prend la couleur de son conteneur (alerte, toast, modale), zone cliquable
 * étendue à 44px. Équivalent Design System : `.btn-close`.
 */
export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ 'aria-label': ariaLabel = 'Fermer', size = 20, type = 'button', ...rest }, ref) => (
    <CloseButtonRoot ref={ref} type={type} aria-label={ariaLabel} {...rest}>
      <Icon name="close" size={size} />
    </CloseButtonRoot>
  ),
);

CloseButton.displayName = 'CloseButton';

const CloseButtonRoot = styled.button`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[1]};
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background-color: transparent;
  color: inherit;
  cursor: pointer;
  transition: background-color 0.15s ease;

  /* Zone tactile de 44px sans changer la taille visuelle */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: max(100%, 2.75rem);
    height: max(100%, 2.75rem);
    transform: translate(-50%, -50%);
  }

  &:hover {
    background-color: color-mix(in srgb, currentColor 8%, transparent);
  }

  &:active {
    background-color: color-mix(in srgb, currentColor 12%, transparent);
  }

  &:disabled {
    opacity: 0.38;
    pointer-events: none;
  }
`;
