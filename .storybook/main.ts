import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';

const src = (path: string) => fileURLToPath(new URL(`../src/${path}`, import.meta.url));

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: '@storybook/react-vite',
  viteFinal: (viteConfig) => {
    // Comme vitest.config.ts : les sous-chemins `core-react/…` pointent vers les sources, pas vers dist/
    viteConfig.resolve ??= {};
    viteConfig.resolve.alias = [
      { find: /^core-react\/(compat|ui|theme|icons|editor)$/, replacement: src('$1/index.ts') },
      { find: /^core-react$/, replacement: src('index.ts') },
    ];
    return viteConfig;
  },
};

export default config;
