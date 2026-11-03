import type {} from 'core-react/theme';

export * from './components';
export * from './GlobalStyle';
export * from './types';
export {
  UIProvider,
  useLinkProps,
  useUI,
  type UIContextValue,
  type UINavigation,
  type UIProviderProps,
} from 'core-react';
// Ré-exports nommés (un `export *` d'un module externe est perdu par esbuild dans le bundle ESM)
export {
  DS_ICON_ALIASES,
  DS_ICONS,
  Icon,
  iconNames,
  OUTLINE_COMPAT_ALIASES,
  type DsIconName,
  type IconProps,
} from 'core-react/icons';
