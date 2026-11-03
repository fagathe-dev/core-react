import { getThemeInitScript, type CreateThemeStoreOptions } from './themeStore';

export type ThemeScriptProps = Pick<CreateThemeStoreOptions, 'storageKey' | 'legacyKeys' | 'attributes'> & {
  nonce?: string;
};

/**
 * Script anti-flash à placer dans `<head>` (Server Component compatible : aucun hook).
 * Le contenu est une constante générée par core-react, jamais une donnée utilisateur.
 */
export const ThemeScript = ({ nonce, ...config }: ThemeScriptProps) => (
  <script nonce={nonce} dangerouslySetInnerHTML={{ __html: getThemeInitScript(config) }} />
);
