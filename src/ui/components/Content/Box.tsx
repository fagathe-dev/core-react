import type { ReactNode } from 'react';
import { styled } from 'styled-components';
import type { ColorRole } from 'core-react/theme';
import type { BaseComponentProps } from '../../types';

export interface BoxProps extends BaseComponentProps {
  /** Titre du panneau (rendu en `<h3>` par défaut, voir `titleAs`). */
  title?: ReactNode;
  titleAs?: 'h2' | 'h3' | 'h4' | 'p';
  /** Rôle de couleur : fond « container » du rôle (`subtle`) et texte assorti (`dark`). Neutre par défaut. */
  $variant?: ColorRole;
}

/**
 * Panneau de contenu séparé de la page par sa surface (containment), sans bordure.
 * Équivalent Design System : `.box`, `.box-title`, `.box-{rôle}`.
 */
export const Box = ({ title, titleAs = 'h3', $variant, children, ...rest }: BoxProps) => (
  <BoxRoot $variant={$variant} {...rest}>
    {title && <BoxTitle as={titleAs}>{title}</BoxTitle>}
    {children}
  </BoxRoot>
);

const BoxRoot = styled.div<{ $variant?: ColorRole }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[5]};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme, $variant }) => ($variant ? theme.colors[$variant].subtle : theme.colors.background.surfaceHover)};
  color: ${({ theme, $variant }) => ($variant ? theme.colors[$variant].dark : theme.colors.text.body)};

  ${({ theme }) => theme.media.up('md')} {
    padding: ${({ theme }) => theme.spacing[6]};
  }

  & > :last-child {
    margin-bottom: 0;
  }
`;

const BoxTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: inherit;
`;
