import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import { UIProvider, type UIProviderProps } from 'core-react';
import { createAppTheme } from 'core-react/theme';

export const { theme: testTheme } = createAppTheme();

export const TestProviders = ({
  children,
  ui,
}: {
  children?: ReactNode;
  ui?: Omit<UIProviderProps, 'children'>;
}) => (
  <ThemeProvider theme={testTheme}>
    <UIProvider {...ui}>{children}</UIProvider>
  </ThemeProvider>
);

/** Rendu de test avec le thème du kit et un `UIProvider` (configurable). Réservé aux tests. */
export const renderWithTheme = (
  ui: ReactElement,
  { uiProvider, ...options }: RenderOptions & { uiProvider?: Omit<UIProviderProps, 'children'> } = {},
) =>
  render(ui, {
    wrapper: ({ children }) => <TestProviders ui={uiProvider}>{children}</TestProviders>,
    ...options,
  });
