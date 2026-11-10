import type { ReactNode } from 'react';
import { styled } from 'styled-components';

import type { BaseComponentProps } from '../../../types';
import { skeletonSurface, toCssSize, type SkeletonAnimation, type SkeletonSize } from './skeletonStyles';

export type { SkeletonAnimation, SkeletonSize } from './skeletonStyles';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

export interface SkeletonProps extends BaseComponentProps {
  /** Forme : `text` (ligne), `circular`, `rectangular` (angles légers), `rounded` (rayon large) */
  $variant?: SkeletonVariant;
  $width?: SkeletonSize;
  $height?: SkeletonSize;
  /** Rayon libre : prioritaire sur celui de la variante (ex. `'50% 0'`, `16`) */
  $radius?: SkeletonSize;
  $animation?: SkeletonAnimation;
}

/**
 * Forme de chargement libre (carré, rectangle, pastille, bannière…) à dimensionner selon le contenu attendu.
 * Masquée aux technologies d'assistance : l'annonce du chargement est portée par `SkeletonGroup`.
 */
export const Skeleton = styled.div.attrs({ 'aria-hidden': true })<SkeletonProps>`
  ${skeletonSurface}
  display: block;
  width: ${({ $width = '100%' }) => toCssSize($width)};
  height: ${({ $height, $variant = 'text' }) => {
    if ($height !== undefined) return toCssSize($height);
    return $variant === 'text' ? '1rem' : '100%';
  }};
  border-radius: ${({ $radius, $variant = 'text', theme }) => {
    if ($radius !== undefined) return toCssSize($radius);
    if ($variant === 'circular') return theme.radii.full;
    if ($variant === 'rounded') return theme.radii.xl;
    if ($variant === 'text') return theme.radii.sm;
    return theme.radii.base;
  }};
`;

export interface SkeletonLineProps extends BaseComponentProps {
  /** Longueur du trait (défaut `100%`) */
  $width?: SkeletonSize;
  /** Épaisseur du trait (défaut `0.75rem`, proche d'un corps de texte) */
  $height?: SkeletonSize;
  $animation?: SkeletonAnimation;
}

/** Trait figurant une ligne de texte (titre, libellé, date…). */
export const SkeletonLine = styled.div.attrs({ 'aria-hidden': true })<SkeletonLineProps>`
  ${skeletonSurface}
  display: block;
  width: ${({ $width = '100%' }) => toCssSize($width)};
  height: ${({ $height = '0.75rem' }) => toCssSize($height)};
  border-radius: ${({ theme }) => theme.radii.full};
`;

export interface SkeletonCircleProps extends BaseComponentProps {
  /** Diamètre (défaut `40`) */
  $size?: SkeletonSize;
  $animation?: SkeletonAnimation;
}

/** Cercle (avatar, icône, pastille). */
export const SkeletonCircle = styled.div.attrs({ 'aria-hidden': true })<SkeletonCircleProps>`
  ${skeletonSurface}
  display: block;
  width: ${({ $size = 40 }) => toCssSize($size)};
  height: ${({ $size = 40 }) => toCssSize($size)};
  border-radius: ${({ theme }) => theme.radii.full};
`;

const TextStack = styled.div.attrs({ 'aria-hidden': true })<{ $gap: SkeletonSize }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => toCssSize($gap)};
  width: 100%;
`;

export interface SkeletonTextProps extends BaseComponentProps {
  /** Nombre de lignes (défaut `3`), ignoré si `widths` est fourni */
  lines?: number;
  /** Longueur de chaque ligne, dans l'ordre (ex. `['100%', '90%', '40%']`) */
  widths?: SkeletonSize[];
  /** Longueur de la dernière ligne quand `widths` est absent (défaut `60%`) */
  $lastLineWidth?: SkeletonSize;
  /** Épaisseur des lignes (défaut `0.75rem`) */
  $lineHeight?: SkeletonSize;
  /** Espace entre les lignes (défaut `0.625rem`) */
  $gap?: SkeletonSize;
  $animation?: SkeletonAnimation;
}

/** Paragraphe : plusieurs traits empilés, la dernière ligne plus courte par défaut. */
export const SkeletonText = ({
  lines = 3,
  widths,
  $lastLineWidth = '60%',
  $lineHeight = '0.75rem',
  $gap = '0.625rem',
  $animation,
  ...rest
}: SkeletonTextProps) => {
  const lineWidths =
    widths ??
    Array.from({ length: Math.max(1, lines) }, (_, index) =>
      index === lines - 1 && lines > 1 ? $lastLineWidth : '100%',
    );

  return (
    <TextStack $gap={$gap} {...rest}>
      {lineWidths.map((width, index) => (
        <SkeletonLine key={index} $width={width} $height={$lineHeight} $animation={$animation} />
      ))}
    </TextStack>
  );
};

const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
`;

export interface SkeletonGroupProps extends BaseComponentProps {
  /** Texte annoncé aux lecteurs d'écran (défaut `Chargement…`) */
  label?: string;
  children?: ReactNode;
}

/**
 * Conteneur d'une interface de chargement : annonce l'attente une seule fois (`role="status"`),
 * les formes qu'il contient restant muettes. La mise en page est libre (`style`, `className`, `as`).
 */
export const SkeletonGroup = ({
  label = 'Chargement…',
  children,
  as: Component = 'div',
  ...rest
}: SkeletonGroupProps) => (
  <Component role="status" aria-live="polite" aria-busy="true" {...rest}>
    <VisuallyHidden>{label}</VisuallyHidden>
    {children}
  </Component>
);
