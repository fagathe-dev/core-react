import type { ReactNode } from 'react';
import { styled } from 'styled-components';
import type { BaseComponentProps } from '../../types';

type FooterRole = 'primary' | 'secondary' | 'tertiary';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterProps extends BaseComponentProps {
  /** Marque ou texte d'introduction, à gauche. */
  brand?: ReactNode;
  /** Liens de navigation du pied de page. */
  links?: FooterLink[];
  /** Ligne du bas (mentions, copyright…), séparée par un trait. */
  bottom?: ReactNode;
  /** Couleur de marque (fond `subtle`) ; surface neutre par défaut. */
  $variant?: FooterRole;
  /** Nom accessible de la navigation (défaut : « Liens du pied de page »). */
  navLabel?: string;
}

/**
 * Pied de page : marque, liens, ligne du bas. Le contenu est centré dans une largeur de lecture ;
 * placer le composant dans la page (pas de marge externe). Équivalent Design System : `.footer`,
 * `.footer-content`, `.footer-links`, `.footer-bottom`, `.footer-{primary|secondary|tertiary}`.
 */
export const Footer = ({
  brand,
  links = [],
  bottom,
  $variant,
  navLabel = 'Liens du pied de page',
  children,
  ...rest
}: FooterProps) => (
  <FooterRoot $variant={$variant} {...rest}>
    <FooterInner>
      {(brand || links.length > 0) && (
        <FooterContent>
          {brand && <div>{brand}</div>}
          {links.length > 0 && (
            <nav aria-label={navLabel}>
              <FooterLinks>
                {links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </FooterLinks>
            </nav>
          )}
        </FooterContent>
      )}
      {children}
      {bottom && <FooterBottom>{bottom}</FooterBottom>}
    </FooterInner>
  </FooterRoot>
);

const FooterRoot = styled.footer<{ $variant?: FooterRole }>`
  padding: ${({ theme }) => `${theme.spacing[7]} ${theme.spacing[4]}`};
  background-color: ${({ theme, $variant }) => ($variant ? theme.colors[$variant].subtle : theme.colors.background.surfaceHover)};
  color: ${({ theme, $variant }) => ($variant ? theme.colors[$variant].dark : theme.colors.text.body)};
`;

const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};

  ${({ theme }) => theme.media.up('md')} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const FooterLinks = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[5]}`};
  margin: 0;
  padding: 0;
  list-style: none;

  a {
    color: inherit;
    opacity: 0.85;
    text-decoration: none;
  }

  a:hover,
  a:focus-visible {
    opacity: 1;
    text-decoration: underline;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[6]};
  padding-top: ${({ theme }) => theme.spacing[5]};
  border-top: 1px solid color-mix(in srgb, currentColor 20%, transparent);
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  text-align: center;

  ${({ theme }) => theme.media.up('md')} {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;
