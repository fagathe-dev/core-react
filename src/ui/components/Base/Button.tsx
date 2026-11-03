import type { ComponentProps, ElementType } from 'react';
import { styled, css } from 'styled-components';
import { useLinkProps } from 'core-react';
import type { ClickableComponentProps } from '../../types';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost' | 'outline';

export type ButtonSize = 'sm' | 'base' | 'lg';

export interface ButtonProps extends ClickableComponentProps {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $fullWidth?: boolean;
  $loading?: boolean;
  href?: string;
  target?: '_blank' | '_self';
  rel?: string;
}

const sizeStyles = {
  sm: css`
    padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[2]}`};
    font-size: ${({ theme }) => theme.typography.sizes.xs};
  `,
  base: css`
    padding: ${({ theme }) => `${theme.spacing[1.5]} ${theme.spacing[3.5]}`};
    font-size: ${({ theme }) => theme.typography.sizes.sm};
  `,
  lg: css`
    padding: ${({ theme }) => `${theme.spacing[2.5]} ${theme.spacing[5]}`};
    font-size: ${({ theme }) => theme.typography.sizes.base};
  `,
};

/**
 * Bouton stylé brut (sans résolution du lien). À étendre avec `styled(ButtonBase)` : les props `$`
 * restent transmises, ce qui n'est pas le cas avec `styled(Button)`.
 */
export const ButtonBase = styled.button.attrs<ButtonProps>((props) => ({
  type: props.href || (props.as && props.as !== 'button') ? undefined : props.type || 'button',
}))<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-family: inherit;
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid transparent;
  cursor: pointer;
  line-height: 1.2;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    opacity 0.15s ease;
  white-space: nowrap;
  user-select: none;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  ${({ $size = 'base' }) => sizeStyles[$size]}

  ${({ $variant = 'primary', theme }) => {
    switch ($variant) {
      case 'secondary':
        return css`
          background-color: ${theme.colors.secondary.base};
          color: ${theme.colors.white};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.secondary.hover};
          }
        `;
      case 'tertiary':
        return css`
          background-color: ${theme.colors.tertiary.base};
          color: ${theme.colors.white};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.tertiary.hover};
          }
        `;
      case 'danger':
        return css`
          background-color: ${theme.colors.danger.base};
          color: ${theme.colors.white};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.danger.hover};
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          border-color: ${theme.colors.border.default};
          color: ${theme.colors.text.body};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.background.surfaceHover};
            border-color: ${theme.colors.border.hover};
          }
        `;
      case 'ghost':
        return css`
          background-color: transparent;
          color: ${theme.colors.text.body};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.background.surfaceHover};
          }
        `;
      case 'primary':
      default:
        return css`
          background-color: ${theme.colors.primary.base};
          color: ${theme.colors.white};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary.hover};
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ $loading }) =>
    $loading &&
    css`
      pointer-events: none;
      opacity: 0.7;
    `}
`;

/**
 * Bouton du kit. Avec `href`, il est rendu par le composant de lien de `UIProvider`
 * (`NextLink`, `RouterLink`, ou `<a>` par défaut).
 */
export const Button = ({ href, as, ...props }: ComponentProps<typeof ButtonBase>) => (
  <ButtonBase {...props} {...useLinkProps(href, as as ElementType | undefined)} />
);
