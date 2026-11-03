import { useCallback, useMemo, useState } from 'react';

import { createBlockItemId } from './blocks/blockItemId';
import type { BlockData, BlockRegistry } from './registry';

/** Bloc tel que renvoyé par l'API (`BlocContent`). */
export interface PersistedBlock {
  id: string;
  type: string;
  position: number;
  data: BlockData;
  settings?: Record<string, unknown> | null;
}

export interface EditorBlock<TType extends string = string> {
  /** Clé React stable, y compris pour un bloc pas encore enregistré. */
  key: string;
  /** Identifiant en base (`null` tant que le bloc n'est pas enregistré). */
  id: string | null;
  type: TType;
  data: BlockData;
  settings: Record<string, unknown> | null;
}

/** Charge utile d'enregistrement (`SaveBlocContentPayload`), positions recalculées à partir de 1. */
export interface BlockPayload<TType extends string = string> {
  id: string | null;
  type: TType;
  position: number;
  data: BlockData;
  settings: Record<string, unknown> | null;
}

const arrayMove = <T>(items: T[], from: number, to: number): T[] => {
  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved as T);
  return next;
};

const serialize = (blocks: EditorBlock[]) =>
  JSON.stringify(blocks.map(({ id, type, data, settings }) => ({ id, type, data, settings })));

/**
 * État local des blocs d'un éditeur : ajout, édition, réordonnancement, suppression et détection des
 * modifications non enregistrées. Les types inconnus du registre sont ignorés ; les données incomplètes
 * sont complétées par les valeurs par défaut du type.
 */
export const useBlocksState = <TType extends string>(
  registry: BlockRegistry<TType>,
  initialBlocks: readonly PersistedBlock[] = [],
) => {
  const toEditorBlocks = useCallback(
    (blocks: readonly PersistedBlock[]): EditorBlock<TType>[] =>
      [...blocks]
        .sort((a, b) => a.position - b.position)
        .filter((block): block is PersistedBlock & { type: TType } => registry.isBlockType(block.type))
        .map((block) => ({
          key: block.id,
          id: block.id,
          type: block.type,
          data: { ...registry.createData(block.type), ...block.data },
          settings: block.settings ?? null,
        })),
    [registry],
  );

  const [blocks, setBlocks] = useState<EditorBlock<TType>[]>(() => toEditorBlocks(initialBlocks));
  const [snapshot, setSnapshot] = useState(() => serialize(toEditorBlocks(initialBlocks)));

  /** Insère un bloc vide à `index` (à la fin par défaut) et renvoie sa clé. */
  const addBlock = useCallback(
    (type: TType, index?: number): string => {
      const block: EditorBlock<TType> = {
        key: createBlockItemId(),
        id: null,
        type,
        data: registry.createData(type),
        settings: null,
      };
      setBlocks((current) => {
        const at = index === undefined ? current.length : Math.max(0, Math.min(index, current.length));
        return [...current.slice(0, at), block, ...current.slice(at)];
      });
      return block.key;
    },
    [registry],
  );

  const updateBlock = useCallback((key: string, data: BlockData) => {
    setBlocks((current) => current.map((block) => (block.key === key ? { ...block, data } : block)));
  }, []);

  const updateSettings = useCallback((key: string, settings: Record<string, unknown> | null) => {
    setBlocks((current) => current.map((block) => (block.key === key ? { ...block, settings } : block)));
  }, []);

  const moveBlock = useCallback((key: string, direction: -1 | 1) => {
    setBlocks((current) => {
      const index = current.findIndex((block) => block.key === key);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= current.length) return current;
      return arrayMove(current, index, target);
    });
  }, []);

  /** Glisser-déposer : place le bloc `activeKey` à la position du bloc `overKey`. */
  const reorderBlocks = useCallback((activeKey: string, overKey: string) => {
    if (activeKey === overKey) return;
    setBlocks((current) => {
      const from = current.findIndex((block) => block.key === activeKey);
      const to = current.findIndex((block) => block.key === overKey);
      return from < 0 || to < 0 ? current : arrayMove(current, from, to);
    });
  }, []);

  const removeBlock = useCallback((key: string) => {
    setBlocks((current) => current.filter((block) => block.key !== key));
  }, []);

  /** Réinitialise l'état à partir des blocs renvoyés par l'API après enregistrement. */
  const resetBlocks = useCallback(
    (saved: readonly PersistedBlock[]) => {
      const next = toEditorBlocks(saved);
      setBlocks(next);
      setSnapshot(serialize(next));
    },
    [toEditorBlocks],
  );

  const isDirty = useMemo(() => serialize(blocks) !== snapshot, [blocks, snapshot]);

  const toPayload = useCallback(
    (): BlockPayload<TType>[] =>
      blocks.map((block, index) => ({
        id: block.id,
        type: block.type,
        position: index + 1,
        data: block.data,
        settings: block.settings,
      })),
    [blocks],
  );

  return {
    blocks,
    addBlock,
    updateBlock,
    updateSettings,
    moveBlock,
    reorderBlocks,
    removeBlock,
    resetBlocks,
    isDirty,
    toPayload,
  };
};

export type UseBlocksStateReturn<TType extends string = string> = ReturnType<typeof useBlocksState<TType>>;
