import type { CSSProperties, ElementType, ReactNode } from 'react';
import { styled, css, keyframes } from 'styled-components';

import { useUI } from 'core-react';
import { DS_ICON_ALIASES, DS_ICONS } from './generated/dsIcons';

/** Noms disponibles sans configuration (icônes du DS + alias historiques). */
export const iconNames: readonly string[] = [
  ...Object.keys(DS_ICONS),
  ...Object.keys(DS_ICON_ALIASES),
].sort();

export interface IconProps {
  /** Nom MDI du Design System (`trash-can-outline`), avec ou sans préfixe `mdi-`, ou alias. */
  name: string;
  /** Taille en px (nombre) ou en unité CSS. Défaut : 20. */
  size?: number | string;
  color?: string;
  spin?: boolean;
  rotate?: 90 | 180 | 270;
  /** Variante pleine : `heart-outline` → `heart` si elle existe. */
  filled?: boolean;
  /** Libellé accessible : sans lui, l'icône est décorative (`aria-hidden`). */
  title?: string;
  /** @deprecated Ignoré : toutes les icônes viennent du Design System (MDI). */
  iconSet?: string;
  id?: string;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
  children?: ReactNode;
}

const spinAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const StyledSvg = styled.svg<{ $spin?: boolean; $rotate?: number }>`
  display: inline-block;
  flex-shrink: 0;
  vertical-align: middle;

  ${({ $rotate }) =>
    $rotate &&
    css`
      transform: rotate(${$rotate}deg);
    `}

  ${({ $spin }) =>
    $spin &&
    css`
      animation: ${spinAnimation} 2s linear infinite;

      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    `}
`;

const resolvePath = (
  rawName: string,
  filled: boolean,
  icons: Readonly<Record<string, string>>,
  aliases: Readonly<Record<string, string>>,
): string | undefined => {
  const name = rawName.replace(/^mdi-/, '');
  const lookup = (key: string): string | undefined => icons[key] ?? (DS_ICONS as Record<string, string>)[key];

  let resolved = aliases[name] ?? (lookup(name) ? name : (DS_ICON_ALIASES[name] ?? name));
  if (filled && resolved.endsWith('-outline') && lookup(resolved.slice(0, -'-outline'.length))) {
    resolved = resolved.slice(0, -'-outline'.length);
  }
  return lookup(resolved);
};

/**
 * Icône SVG native, tracée depuis la police d'icônes du Design System (aucune police ni bibliothèque chargée).
 * Couleur : `currentColor` par défaut.
 */
export const Icon = ({
  name,
  size = 20,
  color,
  spin,
  rotate,
  filled = false,
  title,
  iconSet: _iconSet,
  style,
  children: _children,
  as: _as,
  ...rest
}: IconProps) => {
  const { icons, iconAliases } = useUI();
  const d = resolvePath(name, filled, icons, iconAliases);
  const dimension = typeof size === 'number' ? `${size}px` : size;

  return (
    <StyledSvg
      viewBox="0 0 24 24"
      width={dimension}
      height={dimension}
      fill="currentColor"
      focusable="false"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      data-icon={name}
      data-missing-icon={d ? undefined : true}
      $spin={spin}
      $rotate={rotate}
      style={color ? { color, ...style } : style}
      {...rest}
    >
      {title && <title>{title}</title>}
      {d && <path d={d} />}
    </StyledSvg>
  );
};
