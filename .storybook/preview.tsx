import type { Preview } from '@storybook/react-vite';
import { UIProvider } from 'core-react';
import { OUTLINE_COMPAT_ALIASES } from 'core-react/icons';
import { CMS_ROLES, createAppTheme, GATHER_ROLES, palettes, TINTED_SURFACES } from 'core-react/theme';
import { GlobalStyle, ToastContainer } from 'core-react/ui';
import { ThemeProvider } from 'styled-components';

// Une entrée par app : la même vitrine montre le kit avec l'identité de chacune
const BRANDS = {
  ds: { label: 'Design System (base)', ...createAppTheme(), iconAliases: undefined },
  gather: {
    label: 'Gather (social)',
    ...createAppTheme({ roles: GATHER_ROLES, surfaces: TINTED_SURFACES }),
    iconAliases: OUTLINE_COMPAT_ALIASES,
  },
  cms: {
    label: 'CMS',
    ...createAppTheme({ roles: CMS_ROLES, palettes: { neutral: palettes.gray } }),
    iconAliases: undefined,
  },
};

type Brand = keyof typeof BRANDS;

const preview: Preview = {
  globalTypes: {
    brand: {
      description: "Identité de l'app",
      toolbar: {
        title: 'Marque',
        icon: 'paintbrush',
        items: (Object.keys(BRANDS) as Brand[]).map((value) => ({ value, title: BRANDS[value].label })),
        dynamicTitle: true,
      },
    },
    theme: {
      description: 'Mode clair ou sombre',
      toolbar: {
        title: 'Thème',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Clair', icon: 'sun' },
          { value: 'dark', title: 'Sombre', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { brand: 'gather', theme: 'light' },
  decorators: [
    (Story, context) => {
      const brand = BRANDS[(context.globals.brand as Brand) ?? 'gather'];
      for (const attribute of ['data-theme', 'data-ds-theme', 'data-ui-theme']) {
        document.documentElement.setAttribute(attribute, context.globals.theme as string);
      }

      return (
        <ThemeProvider theme={brand.theme}>
          <GlobalStyle $cssVariables={brand.cssVariables} />
          <UIProvider iconAliases={brand.iconAliases}>
            <Story />
            <ToastContainer />
          </UIProvider>
        </ThemeProvider>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: 'todo' },
  },
};

export default preview;
