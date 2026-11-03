// frontend/src/ui/components/Navigation/Pagination/PaginationItem.tsx
import type { BaseComponentProps } from '../../../types';
import type React from 'react';
import { styled } from 'styled-components';

export interface PaginationItemProps extends React.LiHTMLAttributes<HTMLLIElement>, BaseComponentProps {}

export const PaginationItem = styled.li<PaginationItemProps>`
  display: inline-flex;
`;
