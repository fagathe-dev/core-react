import { forwardRef, useId } from 'react';
import { css, styled } from 'styled-components';
import type { FieldBaseProps } from '../form.types';
import { HelperText } from '../HelperText';
import type { InputProps } from '../Input';
import { Input } from '../Input';

export interface FloatingFieldProps
  extends Omit<InputProps, 'id' | 'placeholder'>, Omit<FieldBaseProps, 'label'> {
  /** Libellé : dans le champ quand il est vide, il remonte au-dessus de la saisie. */
  label: string;
  /** Variante « soulignée » : sans cadre, simple trait sous le champ. */
  $flushed?: boolean;
}

/**
 * Champ à libellé flottant : le libellé occupe le champ vide et se réduit au-dessus de la saisie au focus
 * ou dès qu'il y a une valeur. Le libellé reste un vrai `<label>` (pas un placeholder).
 * Équivalent Design System : `.form-floating`, `.form-floating-flushed`.
 */
export const FloatingField = forwardRef<HTMLInputElement, FloatingFieldProps>(
  ({ label, error, hint, required, id: customId, $flushed = false, ...inputProps }, ref) => {
    const generatedId = useId();
    const id = customId || generatedId;
    const helperId = `${id}-helper`;

    return (
      <Wrapper>
        <Floating $flushed={$flushed}>
          {/* Placeholder d'une espace : sert uniquement à détecter un champ vide (:placeholder-shown) */}
          <FloatingInput
            ref={ref}
            id={id}
            placeholder=" "
            required={required}
            aria-describedby={error || hint ? helperId : undefined}
            aria-invalid={Boolean(error) || undefined}
            $flushed={$flushed}
            $validationState={error ? 'invalid' : inputProps.$validationState}
            {...inputProps}
          />
          <FloatingLabel htmlFor={id} $flushed={$flushed}>
            {label}
            {required && <span aria-hidden="true"> *</span>}
          </FloatingLabel>
        </Floating>
        {error && (
          <HelperText id={helperId} $state="invalid">
            {error}
          </HelperText>
        )}
        {!error && hint && <HelperText id={helperId}>{hint}</HelperText>}
      </Wrapper>
    );
  },
);

FloatingField.displayName = 'FloatingField';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const Floating = styled.div<{ $flushed: boolean }>`
  position: relative;
`;

const FloatingInput = styled(Input)<{ $flushed: boolean }>`
  height: ${({ $flushed }) => ($flushed ? '3rem' : '3.5rem')};
  padding: ${({ theme, $flushed }) => ($flushed ? `${theme.spacing[4]} 0 ${theme.spacing[1]}` : `${theme.spacing[5]} ${theme.spacing[3]} ${theme.spacing[1.5]}`)};

  ${({ $flushed }) =>
    $flushed &&
    css`
      border-width: 0 0 1px;
      border-radius: 0;
      background-color: transparent;

      &:focus {
        box-shadow: none;
        border-bottom-width: 2px;
      }
    `}
`;

const FloatingLabel = styled.label<{ $flushed: boolean }>`
  position: absolute;
  top: 0;
  left: ${({ theme, $flushed }) => ($flushed ? 0 : theme.spacing[3])};
  right: ${({ theme, $flushed }) => ($flushed ? 0 : theme.spacing[3])};
  display: flex;
  align-items: center;
  height: ${({ $flushed }) => ($flushed ? '3rem' : '3.5rem')};
  overflow: hidden;
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  white-space: nowrap;
  text-overflow: ellipsis;
  pointer-events: none;
  transform-origin: 0 0;
  transition:
    transform 0.2s cubic-bezier(0.2, 0, 0, 1),
    color 0.15s ease;

  span {
    color: ${({ theme }) => theme.colors.danger.base};
  }

  ${FloatingInput}:focus ~ &,
  ${FloatingInput}:not(:placeholder-shown) ~ & {
    transform: ${({ $flushed }) => ($flushed ? 'translateY(-0.9rem) scale(0.8)' : 'translateY(-0.85rem) scale(0.8)')};
  }

  ${FloatingInput}:focus ~ & {
    color: ${({ theme }) => theme.colors.primary.base};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: color 0.15s ease;
  }
`;
