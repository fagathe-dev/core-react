import { styled } from 'styled-components';
import type { FormElementBaseProps } from './form.types';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, FormElementBaseProps {
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' | 'date';
}

export const Input = styled.input<InputProps>`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text.body};
  background-color: ${({ theme }) => theme.colors.background.surface};
  border: 1px solid
    ${({ $validationState, theme }) => {
      if ($validationState === 'invalid') return theme.colors.danger.base;
      if ($validationState === 'valid') return theme.colors.success.base;
      return theme.colors.border.default;
    }};
  border-radius: ${({ theme }) => theme.radii.base};
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }

  &:focus {
    outline: none;
    border-color: ${({ $validationState, theme }) => {
      if ($validationState === 'invalid') return theme.colors.danger.base;
      if ($validationState === 'valid') return theme.colors.success.base;
      return theme.colors.primary.base;
    }};
    box-shadow: ${({ $validationState, theme }) => {
      if ($validationState === 'invalid')
        return `0 0 0 3px color-mix(in srgb, ${theme.colors.danger.base} 20%, transparent)`;
      if ($validationState === 'valid')
        return `0 0 0 3px color-mix(in srgb, ${theme.colors.success.base} 20%, transparent)`;
      return theme.shadows.focusRing;
    }};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background.surfaceHover};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;
