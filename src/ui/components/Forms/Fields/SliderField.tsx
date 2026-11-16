import { forwardRef, useId } from 'react';
import { styled } from 'styled-components';
import type { FieldBaseProps } from '../form.types';
import { HelperText } from '../HelperText';
import { Label } from '../Label';
import type { SliderProps } from '../Slider';
import { Slider } from '../Slider';

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

export interface SliderFieldProps extends Omit<SliderProps, 'id'>, FieldBaseProps {}

/** Curseur avec libellé, aide et message d'erreur (même contrat que `TextField`). */
export const SliderField = forwardRef<HTMLInputElement, SliderFieldProps>(
  ({ label, error, hint, required, id: customId, ...sliderProps }, ref) => {
    const generatedId = useId();
    const id = customId || generatedId;
    const helperId = `${id}-helper`;
    const validationState = error ? 'invalid' : sliderProps.$validationState;

    return (
      <FieldWrapper>
        {label && (
          <Label htmlFor={id} $required={required}>
            {label}
          </Label>
        )}
        <Slider
          ref={ref}
          id={id}
          required={required}
          aria-describedby={error || hint ? helperId : undefined}
          {...sliderProps}
          $validationState={validationState}
        />
        {error && (
          <HelperText id={helperId} $state="invalid">
            {error}
          </HelperText>
        )}
        {!error && hint && <HelperText id={helperId}>{hint}</HelperText>}
      </FieldWrapper>
    );
  },
);

SliderField.displayName = 'SliderField';
