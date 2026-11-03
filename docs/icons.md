# Icônes (`core-react/icons`)

Les icônes sont des **SVG natifs** dont les tracés sont extraits de la police d'icônes du Design System (`sf-p05-design-system/public/assets/ds-icons.css`, Material Design Icons 7.2.96). Aucune police d'icônes n'est chargée et aucune bibliothèque externe n'est utilisée.

```tsx
import { Icon, iconNames, DS_ICONS, DS_ICON_ALIASES, OUTLINE_COMPAT_ALIASES } from 'core-react/icons';
// Icon est aussi ré-exporté par core-react/ui
```

## Icon

```tsx
<Icon name="trash-can-outline" />
<Icon name="check-circle" size={24} color="var(--ds-color-success-base)" />
<Icon name="loading" spin />
<Icon name="chevron-right" rotate={90} />
<Icon name="heart-outline" filled />           {/* → heart */}
<Icon name="alert-circle" title="Erreur" />     {/* role="img" + libellé accessible */}
```

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `name` | `string` | — | Nom MDI du DS (`trash-can-outline`), avec ou sans préfixe `mdi-`, ou alias |
| `size` | `number \| string` | `20` | px si nombre, sinon unité CSS |
| `color` | `string` | `currentColor` | Couleur de remplissage |
| `spin` | `boolean` | `false` | Rotation continue (désactivée sous `prefers-reduced-motion`) |
| `rotate` | `90 \| 180 \| 270` | — | Rotation statique |
| `filled` | `boolean` | `false` | Remplace `xxx-outline` par `xxx` si la variante pleine existe |
| `title` | `string` | — | Rend l'icône porteuse de sens (`role="img"`) ; sinon `aria-hidden` |
| `iconSet` | `string` | — | **Déprécié**, ignoré (ancienne prop `mdi \| bx` de la base) |

Rendu : `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false"><path d="…"/></svg>`.
Une icône inconnue rend un SVG vide marqué `data-missing-icon` (pas d'erreur).

## Noms disponibles

- **223 icônes MDI** embarquées : toutes celles utilisées par la base, le CMS et le social (`iconNames` les liste, alias compris).
- **Alias historiques** (`DS_ICON_ALIASES`, toujours actifs) : les noms façon lucide du social qui n'existent pas dans MDI : `search` → `magnify`, `bold` → `format-bold`, `users` → `account-group-outline`, `log-out` → `logout`, `more-horizontal` → `dots-horizontal`…
- **Alias de compatibilité « contour »** (`OUTLINE_COMPAT_ALIASES`, opt-in) : le social affichait `heart`, `bell`, `bookmark`… en contour (lucide) alors que ces noms MDI sont pleins. Les activer dans le social :

```tsx
<UIProvider iconAliases={OUTLINE_COMPAT_ALIASES}>…</UIProvider>
```

Ordre de résolution : `iconAliases` (UIProvider) → icône MDI du même nom → `DS_ICON_ALIASES` ; puis `filled`.

## Ajouter une icône du DS

1. Ajouter son nom MDI (celui de la classe `.mdi-<nom>` de `ds-icons.css`) dans `scripts/icons/icons.config.json` (`icons`, ou `aliases` pour un alias).
2. Régénérer :

```bash
npm run icons
# DS ailleurs que ../sf-p05-design-system :
DS_PATH=/chemin/vers/sf-p05-design-system npm run icons
```

Le script (`scripts/icons/generate.mjs`, sans dépendance) lit le codepoint de chaque icône dans `ds-icons.css`, extrait le contour du glyphe de la police TrueType (`cmap` format 12, `glyf`) et l'écrit, normalisé sur une grille 24 × 24, dans `src/icons/generated/dsIcons.ts`. Il échoue si un nom est introuvable. Ne pas modifier le fichier généré à la main.

## Icône propre à une app

Sans toucher à core-react :

```tsx
<UIProvider icons={{ 'logo-app': 'M12 2L2 22h20Z' }}>
  <Icon name="logo-app" />
</UIProvider>
```

Le tracé suit la même grille 24 × 24 et le même `fill="currentColor"`.

## Licence

Tracés issus de Material Design Icons (Pictogrammers) : icônes sous Apache 2.0, police sous SIL OFL 1.1. Voir `src/icons/LICENSE`.
