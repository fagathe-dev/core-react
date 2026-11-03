import { describe, expect, it } from 'vitest';

import { CMS_ROLES, createAppTheme, GATHER_ROLES, LEGACY_RADII, palettes, TINTED_SURFACES } from './index';

describe('createAppTheme', () => {
  it('applique par défaut les rôles du Design System', () => {
    const { lightTheme, darkTheme } = createAppTheme();

    expect(lightTheme.colors.primary.base).toBe(palettes.indigo[600]);
    expect(darkTheme.colors.primary.base).toBe(palettes.indigo[500]);
    expect(lightTheme.colors.danger.base).toBe(palettes.red[600]);
    expect(lightTheme.colors.text.body).toBe(palettes.slate[800]);
    expect(lightTheme.borders.focusRing.color).toBe(palettes.indigo[600]);
    expect(darkTheme.borders.focusRing.color).toBe(palettes.indigo[300]);
  });

  it('reproduit l’identité Gather (social) et celle du CMS', () => {
    const gather = createAppTheme({ roles: GATHER_ROLES, surfaces: TINTED_SURFACES }).lightTheme;
    expect(gather.colors.tertiary.base).toBe(palettes.peach[600]);
    expect(gather.colors.success.base).toBe(palettes.mint[600]);
    expect(gather.colors.danger.base).toBe(palettes.rose[600]);
    expect(gather.colors.text.body).toBe(palettes.neutral[700]);

    const cms = createAppTheme({ roles: CMS_ROLES, palettes: { neutral: palettes.gray } }).lightTheme;
    expect(cms.colors.primary.base).toBe(palettes.olive[600]);
    expect(cms.colors.secondary.base).toBe(palettes.taupe[600]);
    expect(cms.colors.palettes.neutral).toBe(palettes.gray);
  });

  it('produit un thème unique à variables CSS, identique côté serveur dans les deux modes', () => {
    const { theme, cssVariables } = createAppTheme();

    expect(theme.colors.primary.base).toBe('var(--ds-color-primary-base)');
    expect(theme.colors.text.body).toBe('var(--ds-color-text-body)');
    // Valeur identique en clair et en sombre : laissée telle quelle
    expect(theme.colors.white).toBe(palettes.white);
    expect(theme.spacing[4]).toBe('1rem');

    expect(cssVariables).toContain(`--ds-color-primary-base: ${palettes.indigo[600]};`);
    expect(cssVariables).toContain(`--ds-color-primary-base: ${palettes.indigo[500]};`);
    expect(cssVariables).toContain(":root[data-theme='dark'], :root[data-ui-theme='dark']");
  });

  it('accepte un préfixe de variables et des surcharges', () => {
    const { theme, lightTheme } = createAppTheme({ cssPrefix: 'gather', overrides: { radii: LEGACY_RADII } });

    expect(theme.colors.primary.base).toBe('var(--gather-color-primary-base)');
    expect(lightTheme.radii.base).toBe('0.5rem');
    expect(lightTheme.radii.full).toBe('9999px');
  });

  it('refuse une palette inconnue', () => {
    expect(() => createAppTheme({ roles: { primary: 'turquoise' } })).toThrow(/turquoise/);
  });
});
