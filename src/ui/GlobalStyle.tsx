import { createGlobalStyle } from 'styled-components';

export interface GlobalStyleProps {
  /** Déclarations `cssVariables` retournées par `createAppTheme()` (obligatoire avec le thème à variables). */
  $cssVariables?: string;
}

/**
 * Styles de base du kit (reset léger, typo, focus visible).
 *
 * @example
 * const { theme, cssVariables } = createAppTheme({ roles: GATHER_ROLES });
 * <ThemeProvider theme={theme}><GlobalStyle $cssVariables={cssVariables} />…</ThemeProvider>
 */
export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  ${({ $cssVariables = '' }) => $cssVariables}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 100%;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.typography.fonts.sans};
    font-size: ${({ theme }) => theme.typography.sizes.base};
    line-height: ${({ theme }) => theme.typography.lineHeights.normal};
    color: ${({ theme }) => theme.colors.text.body};
    background-color: ${({ theme }) => theme.colors.background.body};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.text.heading};
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.spacing[2]};
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  }

  p {
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.spacing[3]};
  }

  button, input, optgroup, select, textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: inherit;
    margin: 0;
  }

  :focus-visible {
    outline: ${({ theme }) => `${theme.borders.focusRing.width} solid ${theme.borders.focusRing.color}`};
    outline-offset: ${({ theme }) => theme.borders.focusRing.offset};
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
