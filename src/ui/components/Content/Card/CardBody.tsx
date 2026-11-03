import { styled } from 'styled-components';
import type { BaseComponentProps } from '../../../types';

export const CardBody = styled.div<BaseComponentProps>`
  padding: ${({ theme }) => theme.spacing[4]};
  flex: 1 1 auto;
`;
