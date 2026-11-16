import type { ReactNode } from 'react';
import { css, styled } from 'styled-components';
import type { BaseComponentProps } from '../../types';

export interface HeroProps extends BaseComponentProps {
  title?: ReactNode;
  /** Image de fond : un voile sombre garde le texte lisible sur toute photo. */
  backgroundImage?: string;
  /** Hauteur minimale (défaut : 50vh). */
  minHeight?: string;
}

/**
 * Bandeau d'accroche centré (page d'accueil, lancement). Fond `primary` doux, ou image avec voile.
 * Équivalent Design System : `.hero`, `.hero-has-bg`, `.hero-content`, `.hero-title`.
 */
export const Hero = ({ title, backgroundImage, minHeight = '50vh', children, style, ...rest }: HeroProps) => (
  <HeroRoot
    $hasBg={Boolean(backgroundImage)}
    style={{
      minHeight,
      ...(backgroundImage ? { backgroundImage: `url(${JSON.stringify(backgroundImage)})` } : {}),
      ...style,
    }}
    {...rest}
  >
    <HeroContent>
      {title && <HeroTitle>{title}</HeroTitle>}
      {children}
    </HeroContent>
  </HeroRoot>
);

const HeroRoot = styled.section<{ $hasBg: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing[9]} ${theme.spacing[6]}`};
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.primary.subtle};
  color: ${({ theme }) => theme.colors.primary.dark};
  text-align: center;

  ${({ $hasBg, theme }) =>
    $hasBg &&
    css`
      color: ${theme.colors.white};
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background-color: color-mix(in srgb, ${theme.colors.black} 60%, transparent);
      }
    `}
`;

const HeroContent = styled.div`
  position: relative;
  max-width: 48rem;
`;

const HeroTitle = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing[4]};
  font-size: clamp(2.25rem, 4vw + 1rem, 3.5rem);
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: inherit;
`;
