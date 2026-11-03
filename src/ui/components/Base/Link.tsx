import React from 'react';
import { styled, css } from 'styled-components';
import { useLinkProps, useUI } from 'core-react';
import type { BaseComponentProps } from '../../types';

export interface LinkProps extends BaseComponentProps {
  href: string;
  target?: '_blank' | '_self';
  rel?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  as?: 'a' | 'button' | 'span' | 'div';
}

const linkStyles = css`
  color: ${({ theme }) => theme.colors.primary.base};
  text-decoration: none;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  transition: color 0.15s ease;
  background: none;
  border: none;
  padding: 0;
  font-size: inherit;
  font-family: inherit;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.hover};
    text-decoration: underline;
  }
`;

const StyledAnchor = styled.a`
  ${linkStyles}
`;

const StyledNonAnchor = styled.span`
  ${linkStyles}
`;

/**
 * Lien du kit. `as="a"` (défaut) : rendu par le composant de lien de `UIProvider` (navigation client).
 * Autre valeur : élément cliquable qui navigue via `UIProvider.navigation.push`.
 */
export const Link = ({ as = 'a', href, onClick, children, ...rest }: LinkProps) => {
  const linkProps = useLinkProps(href);
  const { navigation } = useUI();

  if (as === 'a') {
    return (
      <StyledAnchor {...linkProps} onClick={onClick} {...rest}>
        {children}
      </StyledAnchor>
    );
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    onClick?.(e);
    if (href && !e.defaultPrevented) navigation.push(href);
  };

  return (
    <StyledNonAnchor as={as} onClick={handleClick} {...rest}>
      {children}
    </StyledNonAnchor>
  );
};
