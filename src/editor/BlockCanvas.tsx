import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type Announcements,
  type DragEndEvent,
  type ScreenReaderInstructions,
  type UniqueIdentifier,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Fragment, memo, useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { styled } from 'styled-components';

import { EmptyState } from 'core-react/ui';
import { ConfirmDialog } from 'core-react/ui';
import { BlockPicker } from './blocks/BlockPicker';
import { BlockWrapper } from './blocks/BlockWrapper';
import type { MediaUploadHandler } from './blocks/MediaSourceField';
import type { BlockData, BlockRegistry } from './registry';
import type { EditorBlock } from './useBlocksState';

export interface BlockCanvasLabels {
  emptyTitle: string;
  emptyDescription: string;
  insertAt: (position: number) => string;
  dragHandle: (position: number, label: string) => string;
  deleteTitle: string;
  deleteMessage: string;
  deleteConfirm: string;
  screenReaderInstructions: string;
  onDragStart: (position: number) => string;
  onDragOver: (position: number, over: number, total: number) => string;
  onDragEnd: (over: number, total: number) => string;
  onDragDropped: (position: number) => string;
  onDragCancel: (position: number) => string;
}

export const DEFAULT_BLOCK_CANVAS_LABELS: BlockCanvasLabels = {
  emptyTitle: 'Ce contenu ne contient encore aucun bloc',
  emptyDescription: "Ajoutez un premier bloc de texte, d'image ou de code avec le sélecteur ci-dessous.",
  insertAt: (position) => `Insérer un bloc en position ${position}`,
  dragHandle: (position, label) => `Déplacer le bloc ${position} (${label})`,
  deleteTitle: 'Supprimer le bloc',
  deleteMessage: 'Le contenu de ce bloc sera retiré au prochain enregistrement.',
  deleteConfirm: 'Supprimer',
  screenReaderInstructions:
    'Pour déplacer un bloc, appuyez sur Espace ou Entrée, utilisez les flèches haut et bas, puis appuyez de nouveau sur Espace ou Entrée pour le déposer. Échap annule.',
  onDragStart: (position) => `Bloc ${position} saisi.`,
  onDragOver: (position, over, total) => `Bloc ${position} au-dessus de la position ${over} sur ${total}.`,
  onDragEnd: (over, total) => `Bloc déposé en position ${over} sur ${total}.`,
  onDragDropped: (position) => `Bloc ${position} relâché.`,
  onDragCancel: (position) => `Déplacement annulé, le bloc ${position} reste à sa place.`,
};

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

interface BlockItemProps<TType extends string> {
  registry: BlockRegistry<TType>;
  block: EditorBlock<TType>;
  index: number;
  count: number;
  /** Bloc tout juste inséré : amené à l'écran et premier champ focalisé. */
  isNew: boolean;
  labels: BlockCanvasLabels;
  onUpload?: MediaUploadHandler;
  onChange: (key: string, data: BlockData) => void;
  onMove: (key: string, direction: -1 | 1) => void;
  onDelete: (block: EditorBlock<TType>) => void;
}

const BlockItemInner = <TType extends string>({
  registry,
  block,
  index,
  count,
  isNew,
  labels,
  onUpload,
  onChange,
  onMove,
  onDelete,
}: BlockItemProps<TType>) => {
  const { Editor, definition } = registry.get(block.type);
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({
      id: block.key,
    });
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      nodeRef.current = node;
      setNodeRef(node);
    },
    [setNodeRef],
  );

  useEffect(() => {
    const node = nodeRef.current;
    if (!isNew || !node) return;
    node.scrollIntoView?.({ behavior: 'smooth', block: 'center' });
    node
      .querySelector<HTMLElement>('textarea, input:not([type="file"]):not([type="hidden"]), select')
      ?.focus({ preventScroll: true });
  }, [isNew]);

  // Translate (et non Transform) : évite d'étirer les blocs de hauteurs différentes pendant le déplacement
  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    position: 'relative',
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div ref={setRefs} style={style}>
      <BlockWrapper
        blockType={block.type}
        blockLabel={definition.label}
        position={index + 1}
        isFirst={index === 0}
        isLast={index === count - 1}
        isDragging={isDragging}
        dragHandleRef={setActivatorNodeRef}
        dragHandleProps={{
          ...attributes,
          ...listeners,
          'aria-label': labels.dragHandle(index + 1, definition.label),
        }}
        onMoveUp={() => onMove(block.key, -1)}
        onMoveDown={() => onMove(block.key, 1)}
        onDelete={() => onDelete(block)}
      >
        <Editor data={block.data} onChange={(data) => onChange(block.key, data)} onUpload={onUpload} />
      </BlockWrapper>
    </div>
  );
};

// Mémoïsé : modifier un bloc ne re-rend pas les autres (callbacks stables via useBlocksState)
const BlockItem = memo(BlockItemInner) as typeof BlockItemInner;

const isEmptyData = (data: BlockData) =>
  Object.values(data).every(
    (value) => value === '' || value === null || (Array.isArray(value) && value.length === 0),
  );

export interface BlockCanvasProps<TType extends string> {
  registry: BlockRegistry<TType>;
  blocks: EditorBlock<TType>[];
  /** Insère un bloc à `index` (à la fin si absent) et renvoie sa clé (`useBlocksState().addBlock`). */
  onAdd: (type: TType, index?: number) => string;
  onChange: (key: string, data: BlockData) => void;
  onMove: (key: string, direction: -1 | 1) => void;
  onReorder: (activeKey: string, overKey: string) => void;
  onRemove: (key: string) => void;
  onUpload?: MediaUploadHandler;
  /** Libellés (FR par défaut), surchargeables un par un. */
  labels?: Partial<BlockCanvasLabels>;
}

/**
 * Éditeur de blocs façon Notion : insertion à la volée (« + » entre les blocs), glisser-déposer accessible
 * (@dnd-kit, poignée seule, clavier, annonces vocales), monter/descendre, suppression confirmée.
 * À brancher sur `useBlocksState(registry, initialBlocks)`.
 */
export const BlockCanvas = <TType extends string>({
  registry,
  blocks,
  onAdd,
  onChange,
  onMove,
  onReorder,
  onRemove,
  onUpload,
  labels: labelOverrides,
}: BlockCanvasProps<TType>) => {
  const labels = useMemo(() => ({ ...DEFAULT_BLOCK_CANVAS_LABELS, ...labelOverrides }), [labelOverrides]);
  const [toDelete, setToDelete] = useState<EditorBlock<TType> | null>(null);
  const [lastAddedKey, setLastAddedKey] = useState<string | null>(null);

  const insertBlock = useCallback(
    (type: string, index?: number) => {
      if (registry.isBlockType(type)) setLastAddedKey(onAdd(type, index));
    },
    [onAdd, registry],
  );

  const sensors = useSensors(
    // Le glisser ne démarre qu'après 6 px : un simple clic sur la poignée ne déplace rien
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const itemIds = useMemo(() => blocks.map((block) => block.key), [blocks]);

  // Annonces vocales : position « n sur total » plutôt que les identifiants techniques
  const announcements = useMemo<Announcements>(() => {
    const positionOf = (id: UniqueIdentifier | undefined) => itemIds.indexOf(String(id)) + 1;
    const total = itemIds.length;
    return {
      onDragStart: ({ active }) => labels.onDragStart(positionOf(active.id)),
      onDragOver: ({ active, over }) =>
        over ? labels.onDragOver(positionOf(active.id), positionOf(over.id), total) : undefined,
      onDragEnd: ({ active, over }) =>
        over ? labels.onDragEnd(positionOf(over.id), total) : labels.onDragDropped(positionOf(active.id)),
      onDragCancel: ({ active }) => labels.onDragCancel(positionOf(active.id)),
    };
  }, [itemIds, labels]);

  const screenReaderInstructions = useMemo<ScreenReaderInstructions>(
    () => ({ draggable: labels.screenReaderInstructions }),
    [labels],
  );

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (over && active.id !== over.id) onReorder(String(active.id), String(over.id));
    },
    [onReorder],
  );

  // Un bloc encore vide est supprimé sans confirmation
  const requestDelete = useCallback(
    (block: EditorBlock<TType>) => {
      if (isEmptyData(block.data)) onRemove(block.key);
      else setToDelete(block);
    },
    [onRemove],
  );

  return (
    <Stack>
      {blocks.length === 0 ? (
        <EmptyState
          icon="view-dashboard-variant-outline"
          title={labels.emptyTitle}
          description={labels.emptyDescription}
        />
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          accessibility={{ announcements, screenReaderInstructions }}
        >
          <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
            <Stack>
              {blocks.map((block, index) => (
                <Fragment key={block.key}>
                  {/* Insertion à la volée : avant chaque bloc (le bouton du bas ajoute à la fin) */}
                  <BlockPicker
                    variant="inline"
                    inlineLabel={labels.insertAt(index + 1)}
                    availableBlocks={registry.definitions}
                    onSelectBlock={(type) => insertBlock(type, index)}
                  />
                  <BlockItem
                    registry={registry}
                    block={block}
                    index={index}
                    count={blocks.length}
                    isNew={block.key === lastAddedKey}
                    labels={labels}
                    onUpload={onUpload}
                    onChange={onChange}
                    onMove={onMove}
                    onDelete={requestDelete}
                  />
                </Fragment>
              ))}
            </Stack>
          </SortableContext>
        </DndContext>
      )}

      <BlockPicker availableBlocks={registry.definitions} onSelectBlock={(type) => insertBlock(type)} />

      <ConfirmDialog
        isOpen={toDelete !== null}
        onClose={() => setToDelete(null)}
        onConfirm={() => {
          if (toDelete) onRemove(toDelete.key);
          setToDelete(null);
        }}
        title={labels.deleteTitle}
        message={labels.deleteMessage}
        confirmLabel={labels.deleteConfirm}
      />
    </Stack>
  );
};
