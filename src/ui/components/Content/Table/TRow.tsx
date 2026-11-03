import { styled, css } from 'styled-components';
import type { BaseComponentProps } from '../../../types';

export interface TRowProps extends React.HTMLAttributes<HTMLTableRowElement>, BaseComponentProps {
  $selected?: boolean;
}

export const TRow = styled.tr<TRowProps>`
  transition: background-color 0.15s ease;

  ${({ $selected, theme }) =>
    $selected &&
    css`
      background-color: ${theme.colors.primary.subtle} !important;
    `}
`;
