# Blocs de l'éditeur (`core-react/editor`)

Composants unitaires de l'éditeur de blocs : l'enveloppe, le sélecteur, les dix éditeurs de bloc et la source de média. Leur assemblage est décrit dans [editor.md](editor.md).

> Les blocs ne connaissent pas l'API : le téléversement leur est injecté par `onUpload`.

## 1. BlockWrapper

Enveloppe de chaque bloc. Barre supérieure : poignée de glisser-déposer (si `dragHandleProps`), numéro d'ordre, badge du type, boutons Monter / Descendre / Réglages / Supprimer.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `blockType` | `string` | — | Type du bloc |
| `blockLabel` | `string` | type en majuscules | Libellé du badge |
| `position` | `number` | — | Ordre affiché (`#1`, `#2`…) |
| `isFirst` / `isLast` | `boolean` | `false` | Désactive Monter / Descendre |
| `onMoveUp` / `onMoveDown` / `onOpenSettings` / `onDelete` | `() => void` | — | Bouton masqué si absent |
| `dragHandleProps` | `HTMLAttributes<HTMLSpanElement>` | — | `{ ...attributes, ...listeners }` de `useSortable` ; poignée masquée sans eux |
| `dragHandleRef` | `Ref<HTMLSpanElement>` | — | `setActivatorNodeRef` : le focus y revient après un déplacement au clavier |
| `isDragging` | `boolean` | `false` | Met le bloc en avant pendant le déplacement |

## 2. BlockPicker

Bouton d'insertion qui déploie la grille des types disponibles ; le choix appelle `onSelectBlock(type)` et referme la grille.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `onSelectBlock` | `(type: string) => void` | — | Type choisi |
| `availableBlocks` | `BlockTypeDefinition[]` | `DEFAULT_CMS_BLOCKS` | Liste proposée (`registry.definitions`) |
| `variant` | `'button' \| 'inline'` | `'button'` | `inline` : séparateur discret avec un « + » (visible au survol / focus) |
| `inlineLabel` | `string` | `'Insérer un bloc ici'` | Libellé accessible du « + » |

```ts
interface BlockTypeDefinition { type: string; label: string; icon: string; description?: string }
```

## 3. Éditeurs de bloc

Contrat commun (registre) :

```ts
interface XxxBlockProps {
  data: XxxBlockData;                    // JSON du bloc (BlocContent::$data)
  onChange: (updated: XxxBlockData) => void;
  onUpload?: MediaUploadHandler;         // blocs média uniquement
}
```

| Composant | Type | Données (`data`) | Valeur initiale |
|---|---|---|---|
| `TextBlock` | `text` | `{ content }` (Markdown, seul type indexé en full-text) | `DEFAULT_TEXT_BLOCK_DATA` |
| `ImageBlock` | `image` | `{ url, alt?, caption?, aspectRatio? }` — « Changer l'image » ouvre la source de média sous l'image actuelle (« Annuler » possible) | `DEFAULT_IMAGE_BLOCK_DATA` |
| `VideoBlock` | `video` | `{ url, caption?, aspectRatio? }` | `DEFAULT_VIDEO_BLOCK_DATA` |
| `GalleryBlock` | `gallery` | `{ images: { id, url, alt?, caption? }[], columns }` | `DEFAULT_GALLERY_BLOCK_DATA` |
| `CarouselBlock` | `carousel` | `{ slides: { id, url, caption? }[], aspectRatio?, autoplay?, slideInterval? }` | `DEFAULT_CAROUSEL_BLOCK_DATA` |
| `CodeBlock` | `code` | `{ language, code, filename? }` (Tab insère 2 espaces) | `DEFAULT_CODE_BLOCK_DATA` |
| `QuoteBlock` | `quote` | `{ text, author?, source? }` | `DEFAULT_QUOTE_BLOCK_DATA` |
| `TableBlock` | `table` | `{ rows: string[][], hasHeader, caption? }` (`rows[0]` = en-tête) | `DEFAULT_TABLE_BLOCK_DATA` |
| `FaqBlock` | `faq` | `{ items: { id, question, answer }[] }` | `createDefaultFaqBlockData()` |
| `CtaBlock` | `cta` | `{ title, description?, buttonLabel, buttonUrl, variant }` | `DEFAULT_CTA_BLOCK_DATA` |

- Les sous-éléments (diapositives, images, questions) portent un `id` stable (`createBlockItemId()`), utilisé comme `key`.
- `CODE_LANGUAGES` liste les langages proposés par `CodeBlock`.
- Valeurs par défaut regroupées dans `blockDefaults.ts`, avec `DEFAULT_CMS_BLOCKS` (définitions des 10 types).

```tsx
import { CodeBlock, DEFAULT_CODE_BLOCK_DATA, type CodeBlockData } from 'core-react/editor';

const [data, setData] = useState<CodeBlockData>(DEFAULT_CODE_BLOCK_DATA);
<CodeBlock data={data} onChange={setData} />;
```

## 4. Vues de lecture

Une vue par bloc, utilisée par `BlockList` : `TextBlockView` (`MarkdownViewer`), `ImageBlockView`, `VideoBlockView`, `GalleryBlockView`, `CarouselBlockView`, `CodeBlockView`, `QuoteBlockView`, `TableBlockView`, `FaqBlockView` (`Accordion`), `CtaBlockView` (`Button` avec `href`, donc le lien de `UIProvider`). `EmptyBlockView` affiche « Bloc vide. ».

## 5. MediaSourceField et téléversement

Source de média commune à `ImageBlock`, `VideoBlock`, `GalleryBlock` et `CarouselBlock` :
- **zone de dépôt** affichée seulement si `onUpload` est fourni ; les fichiers sont téléversés dans l'ordre et `onSelect` reçoit les URL définitives ;
- **saisie d'URL** validée par « Utiliser » ou Entrée.

```ts
export type MediaUploadHandler = (file: File) => Promise<string>; // renvoie l'URL publique
```

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `onSelect` | `(urls: string[]) => void` | — | URL téléversées ou saisies |
| `onUpload` | `MediaUploadHandler` | — | Téléversement réel ; sans lui, seule l'URL est proposée |
| `accept` | `string` | `'image/*'` | Types MIME acceptés |
| `multiple` | `boolean` | `false` | Sélection multiple |
| `maxSizeMb` | `number` | `10` | Poids maximal par fichier |
| `label`, `urlLabel`, `urlPlaceholder` | `string` | — | Libellés |
| `uploadUnavailableHint` | `string` | — | Message affiché sans `onUpload` |

> Les fichiers ne sont jamais conservés en `URL.createObjectURL` : une URL `blob:` disparaît au rechargement et ne peut pas être enregistrée en base.
