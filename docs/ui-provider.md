# UIProvider (`core-react`)

Le kit n'importe ni `next/*`, ni `react-router`, ni bibliothèque d'icônes. Ce qui dépend de l'app est injecté par `UIProvider`, exporté par `core-react` (et ré-exporté par `core-react/ui`).

```tsx
import { UIProvider } from 'core-react';
```

## Props

| Prop | Type | Défaut | Utilisé par |
|---|---|---|---|
| `linkComponent` | `ElementType` | `'a'` | `Button`, `IconButton`, `Link`, `NavbarLink`, `NavbarDropdownItem`, `SidebarLink`, `BreadcrumbItem` (dès qu'un `href` est fourni) |
| `linkHrefProp` | `'href' \| 'to'` | `'href'` | Nom de la prop d'URL du `linkComponent` (`to` pour react-router) |
| `imageComponent` | `ElementType` | `'img'` | `Avatar` (`width`/`height` toujours passés : compatible `next/image`) |
| `navigation` | `{ back(): void; push(url): void }` | `history.back()` / `location.assign()` | `BackButton`, `Link` avec `as` ≠ `'a'` |
| `iconAliases` | `Record<string, string>` | `{}` | `Icon` : renomme un nom d'icône (ex. `OUTLINE_COMPAT_ALIASES`) |
| `icons` | `Record<string, string>` | `{}` | `Icon` : icônes propres à l'app (`nom → d` SVG, grille 24 × 24) |

Les providers imbriqués **héritent** du parent : seules les props fournies sont remplacées, `iconAliases` et `icons` sont fusionnés.

## Exemples

```tsx
// react-router (base, CMS)
const navigate = useNavigate();
<UIProvider
  linkComponent={RouterLink}
  linkHrefProp="to"
  navigation={{ back: () => navigate(-1), push: (url) => navigate(url) }}
>
```

```tsx
// Next (social)
const router = useRouter();
<UIProvider
  linkComponent={NextLink}
  imageComponent={NextImage}
  navigation={{ back: router.back, push: router.push }}
  iconAliases={OUTLINE_COMPAT_ALIASES}
>
```

```tsx
// Une zone avec ses propres icônes
<UIProvider icons={{ 'logo-gather': 'M12 2L2 22h20Z' }}>
  <Icon name="logo-gather" />
</UIProvider>
```

## Hooks

```ts
const { linkComponent, imageComponent, navigation, iconAliases, icons } = useUI();

// Props de lien prêtes à étaler : { as, href } ou { as: RouterLink, to } selon le provider
const linkProps = useLinkProps(href, as);
<StyledAnchor {...linkProps}>…</StyledAnchor>
```

`useLinkProps(href, as)` :
- `as` fourni → `{ as, href }` (le composant explicite gagne) ;
- pas de `href` → `{ as, href: undefined }` (le composant garde son élément par défaut) ;
- sinon → `{ as: linkComponent, [linkHrefProp]: href }`.

## Écrire un composant « lien » dans le kit

`styled-components` résout `as` dans `.attrs()` sans accès au contexte React. Le kit sépare donc le style et la résolution :

```tsx
export const NavbarLinkBase = styled.button<NavbarLinkProps>`…`;

export const NavbarLink = ({ href, as, ...props }: ComponentProps<typeof NavbarLinkBase>) => (
  <NavbarLinkBase {...props} {...useLinkProps(href, as as ElementType | undefined)} />
);
```

Pour **étendre** le style, partir de la base (`styled(ButtonBase)`) : `styled(Button)` envelopperait un composant fonction, et styled-components ne lui transmettrait pas les props `$`.
