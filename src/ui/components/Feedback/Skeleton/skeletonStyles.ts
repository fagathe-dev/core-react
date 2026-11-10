import { css, keyframes } from 'styled-components';

export type SkeletonAnimation = 'shimmer' | 'pulse' | 'none';

/** Dimension CSS : un nombre est lu en pixels, une chaîne est utilisée telle quelle (`'60%'`, `'2rem'`). */
export type SkeletonSize = string | number;

export const toCssSize = (value: SkeletonSize): string => (typeof value === 'number' ? `${value}px` : value);

const shimmerMove = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
`;

/**
 * Surface d'un squelette : fond neutre + animation. `shimmer` fait passer un reflet teinté de la couleur primaire,
 * `pulse` fait respirer l'opacité. Aucune animation si l'utilisateur demande moins de mouvements.
 */
export const skeletonSurface = css<{ $animation?: SkeletonAnimation }>`
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.background.surfaceActive};

  ${({ $animation = 'shimmer' }) =>
    $animation === 'pulse' &&
    css`
      animation: ${pulse} 1.6s ease-in-out infinite;
    `}

  ${({ $animation = 'shimmer', theme }) =>
    $animation === 'shimmer' &&
    css`
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        transform: translateX(-100%);
        background: linear-gradient(
          90deg,
          transparent 0%,
          color-mix(in srgb, ${theme.colors.primary.base} 10%, transparent) 40%,
          color-mix(in srgb, ${theme.colors.background.surface} 60%, transparent) 50%,
          color-mix(in srgb, ${theme.colors.primary.base} 10%, transparent) 60%,
          transparent 100%
        );
        animation: ${shimmerMove} 1.8s ease-in-out infinite;
      }
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;

    &::after {
      display: none;
    }
  }
`;
