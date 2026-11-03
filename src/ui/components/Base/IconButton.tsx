import { styled } from 'styled-components';
import { ButtonBase, type ButtonProps } from './Button';
import { useLinkProps } from 'core-react';
import { Icon } from 'core-react/icons';

export interface IconButtonProps extends Omit<ButtonProps, 'children' | '$size' | '$variant'> {
  name: string;
  size?: ButtonProps['$size'];
  variant?: ButtonProps['$variant'];
  'aria-label': string;
  round?: boolean;
}

const dimensions = {
  sm: '28px',
  base: '36px',
  lg: '44px',
};

const iconSizes = {
  sm: 14,
  base: 18,
  lg: 22,
};

const StyledIconButton = styled(ButtonBase)<{ $round?: boolean }>`
  padding: 0;
  width: ${({ $size = 'base' }) => dimensions[$size as keyof typeof dimensions]};
  height: ${({ $size = 'base' }) => dimensions[$size as keyof typeof dimensions]};
  border-radius: ${({ $round, theme }) => ($round ? theme.radii.full : theme.radii.base)};
  flex-shrink: 0;
`;

export const IconButton = ({
  name,
  size = 'base',
  variant = 'ghost',
  round = false,
  ...rest
}: IconButtonProps) => {
  return (
    <StyledIconButton
      type="button"
      $size={size}
      $variant={variant}
      $round={round}
      {...rest}
      {...useLinkProps(rest.href, rest.as)}
    >
      <Icon name={name} size={iconSizes[size as keyof typeof iconSizes]} />
    </StyledIconButton>
  );
};
