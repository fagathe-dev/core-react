import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const src = (path: string) => fileURLToPath(new URL(`./src/${path}`, import.meta.url));

export default defineConfig({
  resolve: {
    // Imports entre sous-chemins (`core-react/ui`…) résolus vers les sources, comme les `paths` de tsconfig
    alias: [
      { find: /^core-react\/(compat|ui|theme|icons|editor)$/, replacement: src('$1/index.ts') },
      { find: /^core-react$/, replacement: src('index.ts') },
    ],
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    restoreMocks: true,
  },
});
