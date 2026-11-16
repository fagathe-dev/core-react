import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { styled } from 'styled-components';
import { Icon } from 'core-react/icons';

export interface SelectableCardProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'title'> {
  /** `radio` (choix unique dans un groupe : même `name`) ou `checkbox` (choix multiple). */
  type?: 'radio' | 'checkbox';
  /** Titre de la carte. */
  title: ReactNode;
  /** Précision sous le titre. */
  description?: ReactNode;
  /** Icône MDI à gauche. */
  icon?: string;
}

/**
 * Carte sélectionnable : un bouton radio ou une case à cocher natifs, masqués visuellement, dont la carte
 * entière est le libellé (clavier, groupe radio et formulaire natifs). Coche animée quand elle est choisie.
 * Équivalent Design System : `.form-selectable-card`, `.form-selectable-input`, `.form-selectable-label`, `.icon-check`.
 */
export const SelectableCard = forwardRef<HTMLInputElement, SelectableCardProps>(
  ({ type = 'radio', title, description, icon, id: customId, ...rest }, ref) => {
    const generatedId = useId();
    const id = customId || generatedId;

    return (
      <Root>
        <HiddenInput ref={ref} id={id} type={type} {...rest} />
        <CardLabel htmlFor={id}>
          {icon && (
            <CardIcon aria-hidden="true">
              <Icon name={icon} size={22} />
            </CardIcon>
          )}
          <CardText>
            <strong>{title}</strong>
            {description && <span>{description}</span>}
          </CardText>
          <Check aria-hidden="true">
            <Icon name="check-circle" size={22} />
          </Check>
        </CardLabel>
      </Root>
    );
  },
);

SelectableCard.displayName = 'SelectableCard';

const Root = styled.div`
  position: relative;
  display: flex;
`;

const HiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;

const Check = styled.span`
  display: inline-flex;
  margin-left: auto;
  color: ${({ theme }) => theme.colors.primary.base};
  opacity: 0;
  transform: scale(0.5);
  transition:
    opacity 0.15s ease,
    transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);

  @media (prefers-reduced-motion: reduce) {
    transition: opacity 0.15s ease;
  }
`;

const CardLabel = styled.label`
  display: flex;
  flex: 1;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.background.surface};
  box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.border.default};
  color: ${({ theme }) => theme.colors.text.body};
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.surfaceHover};
  }

  ${HiddenInput}:focus-visible + & {
    outline: 2px solid ${({ theme }) => theme.colors.primary.base};
    outline-offset: 2px;
  }

  ${HiddenInput}:checked + & {
    background-color: ${({ theme }) => theme.colors.primary.subtle};
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.primary.base};
    color: ${({ theme }) => theme.colors.primary.dark};
  }

  ${HiddenInput}:checked + & ${Check} {
    opacity: 1;
    transform: scale(1);
  }

  ${HiddenInput}:disabled + & {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const CardIcon = styled.span`
  display: inline-flex;
  color: ${({ theme }) => theme.colors.primary.base};
`;

const CardText = styled.span`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[0.5]};

  strong {
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
  }

  span {
    font-size: ${({ theme }) => theme.typography.sizes.sm};
    color: ${({ theme }) => theme.colors.text.muted};
  }
`;
