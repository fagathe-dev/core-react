import type { ReactNode } from 'react';
import { css, styled } from 'styled-components';
import type { ColorRole } from 'core-react/theme';
import type { BaseComponentProps } from '../../types';

export interface JumbotronProps extends BaseComponentProps {
  title?: ReactNode;
  /** Chapô sous le titre (largeur de lecture limitée). */
  lead?: ReactNode;
  /** Rôle de couleur (fond `subtle`, texte `dark`) ; surface neutre par défaut. */
  $variant?: ColorRole;
  /** Bord à bord : le fond s'étend sur toute la largeur de la fenêtre, sans défilement horizontal. */
  $fluid?: boolean;
}

/**
 * Grand bloc de mise en avant, aligné à gauche (présentation d'une section, appel à l'action).
 * Équivalent Design System : `.jumbotron`, `.jumbotron-fluid`, `.jumbotron-title`, `.jumbotron-lead`, `.jumbotron-{rôle}`.
 */
export const Jumbotron = ({ title, lead, $variant, $fluid = false, children, ...rest }: JumbotronProps) => (
  <JumbotronRoot $variant={$variant} $fluid={$fluid} {...rest}>
    {title && <JumbotronTitle>{title}</JumbotronTitle>}
    {lead && <JumbotronLead>{lead}</JumbotronLead>}
    {children}
  </JumbotronRoot>
);

const JumbotronRoot = styled.section<{ $variant?: ColorRole; $fluid: boolean }>`
  --jumbotron-bg: ${({ theme, $variant }) => ($variant ? theme.colors[$variant].subtle : theme.colors.background.surfaceHover)};

  padding: ${({ theme }) => `${theme.spacing[9]} ${theme.spacing[6]}`};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: var(--jumbotron-bg);
  color: ${({ theme, $variant }) => ($variant ? theme.colors[$variant].dark : theme.colors.text.body)};

  ${({ theme }) => theme.media.up('md')} {
    padding: ${({ theme }) => `${theme.spacing[10]} ${theme.spacing[9]}`};
  }

  ${({ $fluid }) =>
    $fluid &&
    css`
      border-radius: 0;
      box-shadow: 0 0 0 100vmax var(--jumbotron-bg);
      clip-path: inset(0 -100vmax);
    `}
`;

const JumbotronTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing[4]};
  font-size: clamp(2rem, 3vw + 1rem, 2.75rem);
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: inherit;
`;

const JumbotronLead = styled.p`
  max-width: 65ch;
  margin: 0 0 ${({ theme }) => theme.spacing[5]};
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  color: inherit;
`;
