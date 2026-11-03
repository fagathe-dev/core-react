import type { AppTheme } from './createAppTheme';

// Augmentation de module : `theme` est typé dans tous les styled-components des apps et du kit.
declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}

export type { AppTheme };
