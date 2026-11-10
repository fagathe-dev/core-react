# Squelettes de chargement

Briques à composer pour dessiner l'interface attendue pendant un chargement : on assemble des formes, des traits et des cercles aux dimensions du contenu réel, ce qui évite tout saut de mise en page à l'affichage des données.

```tsx
import { Skeleton, SkeletonCircle, SkeletonGroup, SkeletonLine, SkeletonText } from 'core-react/ui';
```

| Composant | Rôle |
|---|---|
| `Skeleton` | Forme libre : carré, rectangle, pastille, bannière, image… |
| `SkeletonLine` | Trait figurant une ligne de texte (titre, libellé, date) |
| `SkeletonText` | Paragraphe : plusieurs traits, la dernière ligne plus courte |
| `SkeletonCircle` | Cercle (avatar, icône, pastille d'humeur) |
| `SkeletonGroup` | Conteneur accessible de l'interface de chargement |

Dimensions : un **nombre** est lu en pixels (`48` → `48px`), une **chaîne** est utilisée telle quelle (`'60%'`, `'2rem'`, `'calc(100% - 3rem)'`).

## Animation

Toutes les formes acceptent `$animation` :

| Valeur | Effet |
|---|---|
| `'shimmer'` (défaut) | Reflet qui balaie la forme, légèrement teinté de la couleur primaire |
| `'pulse'` | Respiration de l'opacité |
| `'none'` | Forme fixe |

Avec `prefers-reduced-motion: reduce`, aucune animation n'est jouée. Le fond suit le thème (`background.surfaceActive`) en clair comme en sombre.

## Skeleton

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `$variant` | `'text' \| 'circular' \| 'rectangular' \| 'rounded'` | `'text'` | Rayon : petit (`text`), plein (`circular`), de base (`rectangular`), large (`rounded`) |
| `$width` | `string \| number` | `'100%'` | Largeur |
| `$height` | `string \| number` | `1rem` pour `text`, sinon `100%` | Hauteur |
| `$radius` | `string \| number` | — | Rayon libre, prioritaire sur la variante (ex. `'50% 0'`) |
| `$animation` | `'shimmer' \| 'pulse' \| 'none'` | `'shimmer'` | Voir plus haut |

```tsx
<Skeleton $variant="rectangular" $width={64} $height={64} />   {/* carré */}
<Skeleton $variant="rounded" $height={180} />                  {/* image de carte */}
<Skeleton $width={96} $height={28} $radius={999} />             {/* pastille */}
```

## SkeletonLine et SkeletonText

| Prop (`SkeletonLine`) | Défaut | Description |
|---|---|---|
| `$width` | `'100%'` | Longueur du trait |
| `$height` | `'0.75rem'` | Épaisseur (proche d'un corps de texte ; `'1.25rem'` pour un titre) |

| Prop (`SkeletonText`) | Défaut | Description |
|---|---|---|
| `lines` | `3` | Nombre de lignes (ignoré si `widths` est fourni) |
| `widths` | — | Longueur de chaque ligne, dans l'ordre |
| `$lastLineWidth` | `'60%'` | Longueur de la dernière ligne quand `widths` est absent |
| `$lineHeight` | `'0.75rem'` | Épaisseur des lignes |
| `$gap` | `'0.625rem'` | Espace entre les lignes |

```tsx
<SkeletonLine $width="45%" $height="1.25rem" />          {/* titre */}
<SkeletonText lines={4} />
<SkeletonText widths={['100%', '92%', '40%']} />          {/* longueurs variées : rendu plus naturel */}
```

## SkeletonCircle

| Prop | Défaut | Description |
|---|---|---|
| `$size` | `40` | Diamètre |

## SkeletonGroup (accessibilité)

Les formes sont `aria-hidden` : une interface de chargement s'enveloppe dans **un** `SkeletonGroup`, qui porte `role="status"`, `aria-busy="true"` et un libellé lu par les lecteurs d'écran.

| Prop | Défaut | Description |
|---|---|---|
| `label` | `'Chargement…'` | Texte annoncé (masqué visuellement) |
| `as` | `'div'` | Élément rendu ; la mise en page est libre (`style`, `className`) |

## Composer une interface de chargement

Reproduire la structure du composant réel avec ses propres conteneurs (même grille, mêmes marges), en remplaçant chaque contenu par une forme :

```tsx
const PostCardSkeleton = () => (
  <Card>
    <Flex $gap="0.75rem" $align="center">
      <SkeletonCircle $size={36} />
      <Flex $direction="column" $gap="0.375rem" style={{ flex: 1 }}>
        <SkeletonLine $width="50%" $height="0.875rem" />
        <SkeletonLine $width="30%" $height="0.625rem" />
      </Flex>
    </Flex>
    <Skeleton $variant="rounded" $height={160} />
    <SkeletonText lines={3} />
  </Card>
);

export const FeedSkeleton = () => (
  <SkeletonGroup label="Chargement du fil…">
    {Array.from({ length: 3 }, (_, index) => <PostCardSkeleton key={index} />)}
  </SkeletonGroup>
);
```

- Varier les longueurs (`widths`) et la présence d'images d'une carte à l'autre : un squelette trop régulier paraît artificiel.
- Afficher le squelette **à la place** du contenu, dans le même conteneur, pour que les données le remplacent sans décalage.
