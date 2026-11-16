import { fireEvent, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithTheme } from '../../../../testing/renderWithTheme';
import { SliderField } from '../Fields/SliderField';
import { Slider, sliderMidpoint, sliderPercent } from './Slider';

describe('calculs du curseur', () => {
  it('place le milieu sur le pas et la position en pourcentage', () => {
    expect(sliderMidpoint(0, 10, 1)).toBe(5);
    expect(sliderMidpoint(1, 10, 1)).toBe(6);
    expect(sliderMidpoint(0, 1, 0.25)).toBe(0.5);
    expect(sliderPercent(8, 0, 10)).toBe(80);
    expect(sliderPercent(15, 0, 10)).toBe(100);
  });
});

const Controlled = ({ initial = null as number | null, onChange = vi.fn() }) => {
  const [value, setValue] = useState<number | null>(initial);
  return (
    <SliderField
      label="Recommanderiez-vous ce service ?"
      hint="0 = Pas du tout · 10 = Tout à fait"
      value={value}
      min={0}
      max={10}
      minLabel="Pas du tout"
      maxLabel="Absolument"
      showValue
      formatValue={(v) => `${v}/10`}
      onChange={(next) => {
        setValue(next);
        onChange(next);
      }}
    />
  );
};

describe('Slider', () => {
  it('expose un curseur natif accessible : libellé, valeur lue, extrémités et aide', () => {
    renderWithTheme(<Controlled initial={8} />);
    const slider = screen.getByRole('slider', { name: 'Recommanderiez-vous ce service ?' });

    expect(slider).toHaveValue('8');
    expect(slider).toHaveAttribute('aria-valuetext', '8/10');
    expect(screen.getByText('8/10')).toBeInTheDocument();
    expect(slider).toHaveAccessibleDescription('Pas du tout Absolument 0 = Pas du tout · 10 = Tout à fait');
    expect(slider.style.getPropertyValue('--slider-percent')).toBe('80%');
  });

  it("sans réponse : curseur au milieu, texte d'invite, la première interaction fixe la valeur", () => {
    const onChange = vi.fn();
    renderWithTheme(<Controlled onChange={onChange} />);
    const slider = screen.getByRole('slider');

    expect(slider).toHaveValue('5');
    expect(slider).toHaveAttribute('aria-valuetext', 'Déplacez le curseur');

    // Clic sur le curseur sans le déplacer : la position affichée devient la réponse
    fireEvent.pointerUp(slider);
    expect(onChange).toHaveBeenLastCalledWith(5);
    expect(slider).toHaveAttribute('aria-valuetext', '5/10');

    fireEvent.change(slider, { target: { value: '9' } });
    expect(onChange).toHaveBeenLastCalledWith(9);
    expect(screen.getByText('9/10')).toBeInTheDocument();
  });

  it('signale une erreur sur le champ', () => {
    renderWithTheme(
      <SliderField label="Note" value={null} onChange={vi.fn()} error="Cette question est obligatoire." />,
    );
    const slider = screen.getByRole('slider', { name: 'Note' });

    expect(slider).toHaveAttribute('aria-invalid', 'true');
    expect(slider).toHaveAccessibleDescription('Cette question est obligatoire.');
  });

  it('accepte un rendu direct, sans champ', () => {
    renderWithTheme(<Slider aria-label="Volume" value={30} onChange={vi.fn()} />);
    expect(screen.getByRole('slider', { name: 'Volume' })).toHaveValue('30');
  });
});
