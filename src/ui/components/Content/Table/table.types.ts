import type { BaseComponentProps } from '../../../types';

export type CellAlign = 'left' | 'center' | 'right';

export interface CellProps extends BaseComponentProps {
  $align?: CellAlign;
  $width?: string | number;
}
