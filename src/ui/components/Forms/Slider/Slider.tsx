import { forwardRef, useId, type CSSProperties, type InputHTMLAttributes } from 'react';
import { css, styled } from 'styled-components';
import type { FormElementBaseProps } from '../form.types';

export interface SliderProps
  extends
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'type' | 'value' | 'defaultValue' | 'onChange' | 'min' | 'max' | 'step' | 'size'
    >,
    FormElementBaseProps {
  /** Valeur courante ; `null` = pas encore de réponse (curseur au centre, grisé). */
  value: number | null;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Libellés des extrémités (ex. « Pas du tout » / « Absolument »), affichés sous la piste. */
  minLabel?: string;
  maxLabel?: string;
  /** Affiche la valeur en grand au-dessus de la piste (ex. « 8/10 »). */
  showValue?: boolean;
  /** Mise en forme de la valeur (affichage et `aria-valuetext`), ex. `(v) => \`${v}/10\``. */
  formatValue?: (value: number) => string;
  /** Texte affiché et lu tant qu'aucune valeur n'est choisie. */
  emptyText?: string;
}

/** Valeur la plus proche du milieu, alignée sur le pas. */
export const sliderMidpoint = (min: number, max: number, step: number): number => {
  const steps = Math.round((max - min) / 2 / step);
  return Number((min + steps * step).toFixed(10));
};

/** Position du curseur en pourcentage de la piste. */
export const sliderPercent = (value: number, min: number, max: number): number =>
  max === min ? 0 : Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

/**
 * Curseur (`<input type="range">` natif : clavier, lecteurs d'écran et tactile gratuits), avec valeur
 * mise en évidence et libellés d'extrémités. Contrôlé ; `value={null}` représente « pas encore de réponse » :
 * le premier geste (glisser, clic, flèche, Espace) fixe la valeur.
 */
export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      value,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      minLabel,
      maxLabel,
      showValue = false,
      formatValue = String,
      emptyText = 'Déplacez le curseur',
      disabled,
      id: customId,
      'aria-describedby': describedBy,
      $validationState,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = customId || generatedId;
    const endsId = `${id}-ends`;
    const empty = value === null;
    const position = empty ? sliderMidpoint(min, max, step) : value;
    const text = empty ? emptyText : formatValue(value);

    /** Clic ou appui sur le curseur sans le déplacer : la position affichée devient la réponse. */
    const commitIfEmpty = (raw: string) => {
      if (empty) onChange(Number(raw));
    };

    return (
      <Wrapper>
        {showValue && (
          <Value aria-hidden="true" $empty={empty}>
            {text}
          </Value>
        )}
        <Range
          ref={ref}
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={position}
          disabled={disabled}
          aria-valuetext={text}
          aria-describedby={
            [minLabel || maxLabel ? endsId : null, describedBy].filter(Boolean).join(' ') || undefined
          }
          aria-invalid={$validationState === 'invalid' || undefined}
          style={{ '--slider-percent': `${sliderPercent(position, min, max)}%` } as CSSProperties}
          $empty={empty}
          $validationState={$validationState}
          onChange={(event) => onChange(Number(event.target.value))}
          onPointerUp={(event) => commitIfEmpty(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === ' ' || event.key === 'Enter') commitIfEmpty(event.currentTarget.value);
          }}
          {...rest}
        />
        {(minLabel || maxLabel) && (
          <Ends id={endsId}>
            {/* Espace entre les deux libellés pour une description lisible (« Pas du tout Absolument ») */}
            <span>{minLabel}</span> <span>{maxLabel}</span>
          </Ends>
        )}
      </Wrapper>
    );
  },
);

Slider.displayName = 'Slider';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  width: 100%;
`;

const Value = styled.output<{ $empty: boolean }>`
  font-size: ${({ $empty, theme }) => ($empty ? theme.typography.sizes.base : theme.typography.sizes['3xl'])};
  font-weight: ${({ $empty, theme }) => ($empty ? theme.typography.weights.regular : theme.typography.weights.bold)};
  font-variant-numeric: tabular-nums;
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  color: ${({ $empty, theme }) => ($empty ? theme.colors.text.muted : theme.colors.text.heading)};
`;

const trackHeight = '0.5rem';
const thumbSize = '1.5rem';

const thumb = css<{ $empty: boolean }>`
  width: ${thumbSize};
  height: ${thumbSize};
  border: 2px solid
    ${({ $empty, theme }) => ($empty ? theme.colors.border.strong : theme.colors.primary.base)};
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  cursor: grab;
  transition:
    transform 0.15s ease,
    border-color 0.15s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Range = styled.input<{ $empty: boolean } & FormElementBaseProps>`
  --slider-fill: ${({ $empty, $validationState, theme }) =>
    $empty
      ? 'transparent'
      : $validationState === 'invalid'
        ? theme.colors.danger.base
        : theme.colors.primary.base};
  --slider-track: ${({ $validationState, theme }) =>
    $validationState === 'invalid' ? theme.colors.danger.subtle : theme.colors.background.surfaceActive};

  appearance: none;
  width: 100%;
  /* Zone tactile de 44px, piste fine centrée */
  height: 2.75rem;
  margin: 0;
  background: transparent;
  cursor: pointer;

  &::-webkit-slider-runnable-track {
    height: ${trackHeight};
    border-radius: ${({ theme }) => theme.radii.pill};
    background: linear-gradient(
      to right,
      var(--slider-fill) var(--slider-percent),
      var(--slider-track) var(--slider-percent)
    );
  }

  &::-webkit-slider-thumb {
    appearance: none;
    margin-top: calc((${trackHeight} - ${thumbSize}) / 2);
    ${thumb}
  }

  &::-moz-range-track {
    height: ${trackHeight};
    border-radius: ${({ theme }) => theme.radii.pill};
    background: var(--slider-track);
  }

  &::-moz-range-progress {
    height: ${trackHeight};
    border-radius: ${({ theme }) => theme.radii.pill};
    background: var(--slider-fill);
  }

  &::-moz-range-thumb {
    ${thumb}
  }

  &:active::-webkit-slider-thumb {
    cursor: grabbing;
    transform: scale(1.1);
  }

  &:active::-moz-range-thumb {
    cursor: grabbing;
    transform: scale(1.1);
  }

  /* Anneau de focus porté par le curseur */
  &:focus-visible {
    outline: none;
  }

  &:focus-visible::-webkit-slider-thumb {
    box-shadow: 0 0 0 ${({ theme }) => theme.borders.focusRing.width}
      ${({ theme }) => theme.borders.focusRing.color};
  }

  &:focus-visible::-moz-range-thumb {
    box-shadow: 0 0 0 ${({ theme }) => theme.borders.focusRing.width}
      ${({ theme }) => theme.borders.focusRing.color};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Ends = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};

  span:last-child {
    text-align: right;
  }
`;
