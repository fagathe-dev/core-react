# Éditeur de blocs (`core-react/editor`)

Éditeur de contenu modulaire façon Notion, extrait du back-office du CMS. Il se compose de quatre briques génériques et des dix blocs du CMS ([editor-blocks.md](editor-blocks.md)).

| Brique | Rôle |
|---|---|
| `createBlockRegistry` / `defineBlock` / `extendBlockRegistry` | Registre `type → { éditeur, vue de lecture, valeurs par défaut }` |
| `useBlocksState(registry, initialBlocks)` | État local : ajout, édition, déplacement, suppression, détection des modifications, charge utile |
| `<BlockCanvas>` | Interface d'édition : insertion à la volée, glisser-déposer accessible (@dnd-kit), monter/descendre, suppression confirmée |
| `<BlockList>` | Rendu de lecture (aperçu, page publique) |

Peer dependencies : `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` (uniquement pour `BlockCanvas`).

## Assemblage minimal

```tsx
import { BlockCanvas, BlockList, CMS_BLOCK_REGISTRY, useBlocksState, type MediaUploadHandler } from 'core-react/editor';

export const PostBlocksEditor = ({ post, onSave }: Props) => {
  const state = useBlocksState(CMS_BLOCK_REGISTRY, post.blocks);

  const handleUpload: MediaUploadHandler = async (file) => (await uploadPostMedia(post.id, { file })).filePath;

  return (
    <>
      <BlockCanvas
        registry={CMS_BLOCK_REGISTRY}
        blocks={state.blocks}
        onAdd={state.addBlock}
        onChange={state.updateBlock}
        onMove={state.moveBlock}
        onReorder={state.reorderBlocks}
        onRemove={state.removeBlock}
        onUpload={handleUpload}
      />
      <Button disabled={!state.isDirty} onClick={async () => state.resetBlocks(await onSave(state.toPayload()))}>
        Enregistrer
      </Button>
    </>
  );
};

// Aperçu / page publique
<BlockList registry={CMS_BLOCK_REGISTRY} blocks={post.blocks} />
```

## Registre

```ts
const entry = defineBlock<MapBlockData>({
  type: 'map',
  label: 'Carte',            // badge et sélecteur (défaut : type)
  icon: 'map-marker-outline', // icône du DS (défaut : cube-outline)
  description: 'Carte OpenStreetMap',
  Editor: MapBlock,          // ({ data, onChange, onUpload? }) => JSX
  View: MapBlockView,        // ({ data }) => JSX (optionnel : sinon « Bloc vide. »)
  createData: () => ({ lat: 48.85, lon: 2.35, zoom: 12 }),
});

export const REGISTRY = extendBlockRegistry(CMS_BLOCK_REGISTRY, { map: entry });
// ou createBlockRegistry({ text: …, map: entry }) pour une liste sur mesure
```

| Membre du registre | Description |
|---|---|
| `entries`, `types`, `definitions` | Entrées, types dans l'ordre, définitions pour `BlockPicker` |
| `isBlockType(type)` | Garde de type (`hasOwnProperty`) |
| `get(type)`, `createData(type)` | Entrée ; données neuves (copie profonde : aucun tableau partagé entre blocs) |

`CMS_BLOCK_REGISTRY` (type `CmsBlockType`) reprend `Fagathe\CmsCore\Enum\Post\BlockType` : `text`, `image`, `code`, `quote`, `video`, `gallery`, `carousel`, `table`, `faq`, `cta`.

## useBlocksState

```ts
const {
  blocks,          // EditorBlock[] : { key, id (null si nouveau), type, data, settings }
  addBlock,        // (type, index?) => key — insère à index (fin par défaut)
  updateBlock,     // (key, data)
  updateSettings,  // (key, settings | null)
  moveBlock,       // (key, -1 | 1)
  reorderBlocks,   // (activeKey, overKey) — glisser-déposer
  removeBlock,     // (key)
  resetBlocks,     // (savedBlocks) — après enregistrement : nouvel état de référence
  isDirty,         // modifications non enregistrées
  toPayload,       // () => { id, type, position (1…n), data, settings }[] (SavePostDto::$blocks)
} = useBlocksState(registry, initialBlocks);
```

À l'initialisation et au `resetBlocks`, les blocs sont triés par `position`, les types inconnus du registre sont ignorés, et les données incomplètes sont complétées par `createData(type)`. Les callbacks ont une identité stable (les blocs non modifiés ne se re-rendent pas).

## BlockCanvas

| Prop | Description |
|---|---|
| `registry`, `blocks` | Registre et `state.blocks` |
| `onAdd`, `onChange`, `onMove`, `onReorder`, `onRemove` | Branchés sur `useBlocksState` |
| `onUpload?` | `MediaUploadHandler` passé aux blocs média (zone de dépôt masquée sans lui) |
| `labels?` | Surcharge partielle des libellés FR (`DEFAULT_BLOCK_CANVAS_LABELS`) : état vide, insertion, suppression, annonces vocales |

Comportement :
- un `BlockPicker` « + » avant chaque bloc et un bouton « Ajouter un bloc de contenu » en fin de liste ; le bloc inséré défile à l'écran et son premier champ reçoit le focus ;
- glisser-déposer par la **poignée seule** (seuil de 6 px), clavier (Espace, flèches, Espace, Échap), annonces « bloc n sur total » ;
- un bloc **vide** est supprimé sans confirmation, sinon `ConfirmDialog`.

## BlockList

```tsx
<BlockList registry={REGISTRY} blocks={post.blocks} className="article-body" />
```

Trie par `position`, ignore les types inconnus, rend la `View` de chaque entrée. Les vues du CMS (`TextBlockView`, `ImageBlockView`…) sont exportées pour composer un rendu sur mesure ; `TextBlockView` utilise `MarkdownViewer` (titres décalés d'un niveau).

## Temps de lecture

```ts
computeReadingTime(blocks);                           // minutes (≥ 1) ou null si aucun mot
computeReadingTime(blocks, { wordsPerMinute: 230, ignoredKeys: [...READING_TIME_IGNORED_KEYS, 'slug'] });
```

Les clés techniques (`id`, `url`, `src`, `icon`, `language`, `variant`, `aspectRatio`) sont ignorées, comme côté API.
