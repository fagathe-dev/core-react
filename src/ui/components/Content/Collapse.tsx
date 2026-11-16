import type { HTMLAttributes } from 'react';
import { styled } from 'styled-components';

export interface CollapseProps extends HTMLAttributes<HTMLDivElement> {
  /** Contenu déplié. */
  isOpen: boolean;
  /** Durée de l'animation (ms), ramenée à 1 ms sous `prefers-reduced-motion`. */
  duration?: number;
}

/**
 * Zone repliable animée en hauteur, pilotée par `isOpen` ; le déclencheur porte `aria-expanded` et
 * `aria-controls={id}`. Animation CSS seule (`grid-template-rows` de `0fr` à `1fr`), sans mesure en JS ;
 * repliée, la zone est masquée (`visibility: hidden`) : ni lue, ni atteignable au clavier.
 * Équivalent Design System : `.collapse` / `.collapsing` / `.show` (+ `data-ds-toggle="collapse"`).
 */
export const Collapse = ({ isOpen, duration = 300, children, ...rest }: CollapseProps) => (
  <CollapseRoot $open={isOpen} $duration={duration} {...rest}>
    <CollapseInner>{children}</CollapseInner>
  </CollapseRoot>
);

const CollapseRoot = styled.div<{ $open: boolean; $duration: number }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  /* À la fermeture, la visibilité ne bascule qu'à la fin de l'animation */
  transition:
    grid-template-rows ${({ $duration }) => $duration}ms cubic-bezier(0.2, 0, 0, 1),
    visibility 0s linear ${({ $open, $duration }) => ($open ? 0 : $duration)}ms;

  @media (prefers-reduced-motion: reduce) {
    transition-duration: 1ms, 0s;
    transition-delay: 0s, ${({ $open }) => ($open ? 0 : 1)}ms;
  }
`;

const CollapseInner = styled.div`
  min-height: 0;
  overflow: hidden;
`;
