import type { ComponentType } from 'react';

import type { BlockTypeDefinition } from './blocks/blockDefaults';
import type { MediaUploadHandler } from './blocks/MediaSourceField';

/** JSON libre d'un bloc (`BlocContent::$data` côté API). */
export type BlockData = Record<string, unknown>;

export interface BlockEditorProps<T = BlockData> {
  data: T;
  onChange: (data: T) => void;
  /** Téléversement injecté par l'app (blocs média uniquement). */
  onUpload?: MediaUploadHandler;
}

export interface BlockViewProps<T = BlockData> {
  data: T;
}

export interface BlockRegistryEntry {
  definition: BlockTypeDefinition;
  Editor: ComponentType<BlockEditorProps>;
  View?: ComponentType<BlockViewProps>;
  /** Données d'un bloc neuf (nouvel objet à chaque appel : aucun partage de tableaux). */
  createData: () => BlockData;
}

export interface DefineBlockOptions<T extends object> {
  type: string;
  label?: string;
  icon?: string;
  description?: string;
  Editor: ComponentType<BlockEditorProps<T>>;
  View?: ComponentType<BlockViewProps<T>>;
  createData: () => T;
}

/** Copie profonde des valeurs par défaut (tableaux et objets JSON). */
const clone = <T>(value: T): T =>
  typeof structuredClone === 'function' ? structuredClone(value) : JSON.parse(JSON.stringify(value));

/**
 * Déclare un type de bloc. Les données sont typées pour l'éditeur et la vue ; le registre, lui,
 * manipule un JSON libre comme l'API.
 */
export const defineBlock = <T extends object>({
  type,
  label = type,
  icon = 'cube-outline',
  description,
  Editor,
  View,
  createData,
}: DefineBlockOptions<T>): BlockRegistryEntry => ({
  definition: { type, label, icon, description },
  Editor: Editor as unknown as ComponentType<BlockEditorProps>,
  View: View as unknown as ComponentType<BlockViewProps> | undefined,
  createData: () => clone(createData()) as BlockData,
});

export interface BlockRegistry<TType extends string = string> {
  entries: Readonly<Record<TType, BlockRegistryEntry>>;
  /** Types dans l'ordre du registre. */
  types: readonly TType[];
  /** Définitions pour `BlockPicker` (`availableBlocks`). */
  definitions: BlockTypeDefinition[];
  isBlockType: (type: string) => type is TType;
  get: (type: TType) => BlockRegistryEntry;
  createData: (type: TType) => BlockData;
}

/**
 * Registre `type → { éditeur, vue, valeurs par défaut }`. Ajouter un type de bloc = ajouter une entrée,
 * sans toucher au canvas (principe ouvert/fermé).
 */
export const createBlockRegistry = <TType extends string>(
  entries: Record<TType, BlockRegistryEntry>,
): BlockRegistry<TType> => {
  const types = Object.keys(entries) as TType[];
  return {
    entries,
    types,
    definitions: types.map((type) => entries[type].definition),
    isBlockType: (type: string): type is TType => Object.prototype.hasOwnProperty.call(entries, type),
    get: (type) => entries[type],
    createData: (type) => entries[type].createData(),
  };
};

/** Étend un registre existant (ajout ou remplacement d'entrées). */
export const extendBlockRegistry = <TBase extends string, TExtra extends string>(
  base: BlockRegistry<TBase>,
  extra: Record<TExtra, BlockRegistryEntry>,
): BlockRegistry<TBase | TExtra> =>
  createBlockRegistry({ ...base.entries, ...extra } as Record<TBase | TExtra, BlockRegistryEntry>);
