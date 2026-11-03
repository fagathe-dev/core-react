import * as react from 'react';
import react__default, { ComponentType } from 'react';
import { BaseComponentProps } from 'core-react/ui';

/**
 * Téléverse un fichier et renvoie son URL publique définitive.
 * Fourni par la page (ex. upload vers /posts/{id}/medias) : l'UI kit ne connaît pas l'API.
 */
type MediaUploadHandler = (file: File) => Promise<string>;
interface MediaSourceFieldProps extends BaseComponentProps {
    /** Reçoit les URL des fichiers téléversés ou l'URL saisie manuellement */
    onSelect: (urls: string[]) => void;
    onUpload?: MediaUploadHandler;
    accept?: string;
    label?: string;
    maxSizeMb?: number;
    multiple?: boolean;
    urlLabel?: string;
    urlPlaceholder?: string;
    /** Texte affiché à la place de la zone de dépôt quand aucun `onUpload` n'est fourni */
    uploadUnavailableHint?: string;
}
/**
 * Source d'un média de bloc : zone de dépôt (si un `onUpload` est fourni) ou URL saisie à la main
 */
declare const MediaSourceField: ({ onSelect, onUpload, accept, label, maxSizeMb, multiple, urlLabel, urlPlaceholder, uploadUnavailableHint, ...rest }: MediaSourceFieldProps) => react.JSX.Element;

interface CarouselSlideItem {
    id: string;
    url: string;
    caption?: string;
}
interface CarouselBlockData {
    slides: CarouselSlideItem[];
    aspectRatio?: string;
    autoplay?: boolean;
    slideInterval?: number;
}
interface CarouselBlockProps extends BaseComponentProps {
    data: CarouselBlockData;
    onChange: (updated: CarouselBlockData) => void;
    /** Téléversement réel des diapositives ; sans lui, seule la saisie d'URL est proposée */
    onUpload?: MediaUploadHandler;
}
declare const CarouselBlock: ({ data, onChange, onUpload, ...rest }: CarouselBlockProps) => react.JSX.Element;

interface CodeBlockData {
    language: string;
    code: string;
    filename?: string;
}
interface CodeBlockProps extends BaseComponentProps {
    data: CodeBlockData;
    onChange: (updated: CodeBlockData) => void;
}
declare const CodeBlock: ({ data, onChange, ...rest }: CodeBlockProps) => react.JSX.Element;

type CtaVariant = 'primary' | 'secondary' | 'outline';
interface CtaBlockData {
    title: string;
    description?: string;
    buttonLabel: string;
    buttonUrl: string;
    variant: CtaVariant;
}
interface CtaBlockProps extends BaseComponentProps {
    data: CtaBlockData;
    onChange: (updated: CtaBlockData) => void;
}
declare const CtaBlock: ({ data, onChange, ...rest }: CtaBlockProps) => react.JSX.Element;

interface FaqItem {
    id: string;
    question: string;
    answer: string;
}
/**
 * Bloc FAQ : alimente aussi le schéma JSON-LD FAQPage côté front
 */
interface FaqBlockData {
    items: FaqItem[];
}
interface FaqBlockProps extends BaseComponentProps {
    data: FaqBlockData;
    onChange: (updated: FaqBlockData) => void;
}
declare const FaqBlock: ({ data, onChange, ...rest }: FaqBlockProps) => react.JSX.Element;

interface GalleryImageItem {
    id: string;
    url: string;
    alt?: string;
    caption?: string;
}
interface GalleryBlockData {
    images: GalleryImageItem[];
    columns: number;
}
interface GalleryBlockProps extends BaseComponentProps {
    data: GalleryBlockData;
    onChange: (updated: GalleryBlockData) => void;
    /** Téléversement réel des images ; sans lui, seule la saisie d'URL est proposée */
    onUpload?: MediaUploadHandler;
}
declare const GalleryBlock: ({ data, onChange, onUpload, ...rest }: GalleryBlockProps) => react.JSX.Element;

interface ImageBlockData {
    url: string;
    alt?: string;
    caption?: string;
    aspectRatio?: string;
}
interface ImageBlockProps extends BaseComponentProps {
    data: ImageBlockData;
    onChange: (updated: ImageBlockData) => void;
    /** Téléversement réel du fichier ; sans lui, seule la saisie d'URL est proposée */
    onUpload?: MediaUploadHandler;
}
declare const ImageBlock: ({ data, onChange, onUpload, ...rest }: ImageBlockProps) => react.JSX.Element;

interface QuoteBlockData {
    text: string;
    author?: string;
    source?: string;
}
interface QuoteBlockProps extends BaseComponentProps {
    data: QuoteBlockData;
    onChange: (updated: QuoteBlockData) => void;
}
declare const QuoteBlock: ({ data, onChange, ...rest }: QuoteBlockProps) => react.JSX.Element;

/**
 * Tableau : `rows[0]` est la ligne d'en-tête quand `hasHeader` est vrai
 */
interface TableBlockData {
    rows: string[][];
    hasHeader: boolean;
    caption?: string;
}
interface TableBlockProps extends BaseComponentProps {
    data: TableBlockData;
    onChange: (updated: TableBlockData) => void;
}
declare const TableBlock: ({ data, onChange, ...rest }: TableBlockProps) => react.JSX.Element;

/**
 * Bloc texte : contenu Markdown (seul type indexé en full-text par BlocContent::syncSearchText)
 */
interface TextBlockData {
    content: string;
}
interface TextBlockProps extends BaseComponentProps {
    data: TextBlockData;
    onChange: (updated: TextBlockData) => void;
}
declare const TextBlock: ({ data, onChange, ...rest }: TextBlockProps) => react.JSX.Element;

interface VideoBlockData {
    url: string;
    caption?: string;
    aspectRatio?: string;
}
interface VideoBlockProps extends BaseComponentProps {
    data: VideoBlockData;
    onChange: (updated: VideoBlockData) => void;
    /** Téléversement réel du fichier ; sans lui, seule la saisie d'URL est proposée */
    onUpload?: MediaUploadHandler;
}
declare const VideoBlock: ({ data, onChange, onUpload, ...rest }: VideoBlockProps) => react.JSX.Element;

interface BlockTypeDefinition {
    type: string;
    label: string;
    icon: string;
    description?: string;
}
/**
 * Miroir de Fagathe\CmsCore\Enum\Post\BlockType
 */
declare const DEFAULT_CMS_BLOCKS: BlockTypeDefinition[];
declare const DEFAULT_TEXT_BLOCK_DATA: TextBlockData;
declare const DEFAULT_IMAGE_BLOCK_DATA: ImageBlockData;
declare const DEFAULT_VIDEO_BLOCK_DATA: VideoBlockData;
declare const DEFAULT_CAROUSEL_BLOCK_DATA: CarouselBlockData;
declare const DEFAULT_GALLERY_BLOCK_DATA: GalleryBlockData;
declare const DEFAULT_CODE_BLOCK_DATA: CodeBlockData;
declare const DEFAULT_QUOTE_BLOCK_DATA: QuoteBlockData;
declare const DEFAULT_TABLE_BLOCK_DATA: TableBlockData;
declare const createDefaultFaqBlockData: () => FaqBlockData;
declare const DEFAULT_CTA_BLOCK_DATA: CtaBlockData;
declare const CODE_LANGUAGES: {
    value: string;
    label: string;
}[];

/**
 * Identifiant stable des sous-éléments d'un bloc (diapositives, questions FAQ, images de galerie…)
 * utilisé comme `key` React et conservé dans le JSON du bloc.
 */
declare const createBlockItemId: () => string;

interface BlockPickerProps extends BaseComponentProps {
    onSelectBlock: (type: string) => void;
    availableBlocks?: BlockTypeDefinition[];
    /**
     * `button` (défaut) : bouton « Ajouter un bloc de contenu ».
     * `inline` : séparateur discret avec un « + », à placer entre deux blocs pour insérer à cet endroit.
     */
    variant?: 'button' | 'inline';
    /** Libellé accessible du « + » en variante `inline` */
    inlineLabel?: string;
}
declare const BlockPicker: ({ onSelectBlock, availableBlocks, variant, inlineLabel, ...rest }: BlockPickerProps) => react.JSX.Element;

interface BlockWrapperProps extends BaseComponentProps {
    blockType: string;
    /** Libellé lisible du type (ex. « Citation ») ; à défaut, `blockType` en majuscules */
    blockLabel?: string;
    position: number;
    isFirst?: boolean;
    isLast?: boolean;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    onDelete?: () => void;
    onOpenSettings?: () => void;
    /** Attributs et écouteurs de la poignée (ex. `{ ...attributes, ...listeners }` de `useSortable`) ; la poignée n'est affichée que s'ils sont fournis */
    dragHandleProps?: react__default.HTMLAttributes<HTMLSpanElement>;
    /** Ref de la poignée (ex. `setActivatorNodeRef` de `useSortable`) : rend le focus à la poignée après un déplacement au clavier */
    dragHandleRef?: react__default.Ref<HTMLSpanElement>;
    /** Bloc en cours de déplacement : mise en avant visuelle */
    isDragging?: boolean;
}
declare const BlockWrapper: ({ blockType, blockLabel, position, isFirst, isLast, onMoveUp, onMoveDown, onDelete, onOpenSettings, dragHandleProps, dragHandleRef, isDragging, children, ...rest }: BlockWrapperProps) => react__default.JSX.Element;

/** JSON libre d'un bloc (`BlocContent::$data` côté API). */
type BlockData = Record<string, unknown>;
interface BlockEditorProps<T = BlockData> {
    data: T;
    onChange: (data: T) => void;
    /** Téléversement injecté par l'app (blocs média uniquement). */
    onUpload?: MediaUploadHandler;
}
interface BlockViewProps<T = BlockData> {
    data: T;
}
interface BlockRegistryEntry {
    definition: BlockTypeDefinition;
    Editor: ComponentType<BlockEditorProps>;
    View?: ComponentType<BlockViewProps>;
    /** Données d'un bloc neuf (nouvel objet à chaque appel : aucun partage de tableaux). */
    createData: () => BlockData;
}
interface DefineBlockOptions<T extends object> {
    type: string;
    label?: string;
    icon?: string;
    description?: string;
    Editor: ComponentType<BlockEditorProps<T>>;
    View?: ComponentType<BlockViewProps<T>>;
    createData: () => T;
}
/**
 * Déclare un type de bloc. Les données sont typées pour l'éditeur et la vue ; le registre, lui,
 * manipule un JSON libre comme l'API.
 */
declare const defineBlock: <T extends object>({ type, label, icon, description, Editor, View, createData, }: DefineBlockOptions<T>) => BlockRegistryEntry;
interface BlockRegistry<TType extends string = string> {
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
declare const createBlockRegistry: <TType extends string>(entries: Record<TType, BlockRegistryEntry>) => BlockRegistry<TType>;
/** Étend un registre existant (ajout ou remplacement d'entrées). */
declare const extendBlockRegistry: <TBase extends string, TExtra extends string>(base: BlockRegistry<TBase>, extra: Record<TExtra, BlockRegistryEntry>) => BlockRegistry<TBase | TExtra>;

/** Bloc tel que renvoyé par l'API (`BlocContent`). */
interface PersistedBlock {
    id: string;
    type: string;
    position: number;
    data: BlockData;
    settings?: Record<string, unknown> | null;
}
interface EditorBlock<TType extends string = string> {
    /** Clé React stable, y compris pour un bloc pas encore enregistré. */
    key: string;
    /** Identifiant en base (`null` tant que le bloc n'est pas enregistré). */
    id: string | null;
    type: TType;
    data: BlockData;
    settings: Record<string, unknown> | null;
}
/** Charge utile d'enregistrement (`SaveBlocContentPayload`), positions recalculées à partir de 1. */
interface BlockPayload<TType extends string = string> {
    id: string | null;
    type: TType;
    position: number;
    data: BlockData;
    settings: Record<string, unknown> | null;
}
/**
 * État local des blocs d'un éditeur : ajout, édition, réordonnancement, suppression et détection des
 * modifications non enregistrées. Les types inconnus du registre sont ignorés ; les données incomplètes
 * sont complétées par les valeurs par défaut du type.
 */
declare const useBlocksState: <TType extends string>(registry: BlockRegistry<TType>, initialBlocks?: readonly PersistedBlock[]) => {
    blocks: EditorBlock<TType>[];
    addBlock: (type: TType, index?: number) => string;
    updateBlock: (key: string, data: BlockData) => void;
    updateSettings: (key: string, settings: Record<string, unknown> | null) => void;
    moveBlock: (key: string, direction: -1 | 1) => void;
    reorderBlocks: (activeKey: string, overKey: string) => void;
    removeBlock: (key: string) => void;
    resetBlocks: (saved: readonly PersistedBlock[]) => void;
    isDirty: boolean;
    toPayload: () => BlockPayload<TType>[];
};
type UseBlocksStateReturn<TType extends string = string> = ReturnType<typeof useBlocksState<TType>>;

interface BlockCanvasLabels {
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
declare const DEFAULT_BLOCK_CANVAS_LABELS: BlockCanvasLabels;
interface BlockCanvasProps<TType extends string> {
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
declare const BlockCanvas: <TType extends string>({ registry, blocks, onAdd, onChange, onMove, onReorder, onRemove, onUpload, labels: labelOverrides, }: BlockCanvasProps<TType>) => react.JSX.Element;

interface BlockListProps<TType extends string> {
    registry: BlockRegistry<TType>;
    /** Blocs à afficher, dans l'ordre (API ou `useBlocksState().blocks`). */
    blocks: readonly {
        type: string;
        data: BlockData;
        key?: string;
        id?: string | null;
        position?: number;
    }[];
    className?: string;
}
/**
 * Rendu de lecture d'une suite de blocs (aperçu d'article, page publique) via les `View` du registre.
 * Les types inconnus ou sans vue sont ignorés.
 */
declare const BlockList: <TType extends string>({ registry, blocks, className }: BlockListProps<TType>) => react.JSX.Element;

/** Rendu d'un bloc sans contenu (aperçu de l'éditeur). */
declare const EmptyBlockView: () => react.JSX.Element;
declare const TextBlockView: ({ data }: BlockViewProps<TextBlockData>) => react.JSX.Element;
declare const ImageBlockView: ({ data }: BlockViewProps<ImageBlockData>) => react.JSX.Element;
declare const VideoBlockView: ({ data }: BlockViewProps<VideoBlockData>) => react.JSX.Element;
declare const CodeBlockView: ({ data }: BlockViewProps<CodeBlockData>) => react.JSX.Element;
declare const QuoteBlockView: ({ data }: BlockViewProps<QuoteBlockData>) => react.JSX.Element;
declare const GalleryBlockView: ({ data }: BlockViewProps<GalleryBlockData>) => react.JSX.Element;
declare const CarouselBlockView: ({ data }: BlockViewProps<CarouselBlockData>) => react.JSX.Element;
declare const TableBlockView: ({ data }: BlockViewProps<TableBlockData>) => react.JSX.Element;
declare const FaqBlockView: ({ data }: BlockViewProps<FaqBlockData>) => react.JSX.Element;
declare const CtaBlockView: ({ data }: BlockViewProps<CtaBlockData>) => react.JSX.Element;

/** Miroir de `Fagathe\CmsCore\Enum\Post\BlockType`. */
type CmsBlockType = 'text' | 'image' | 'code' | 'quote' | 'video' | 'gallery' | 'carousel' | 'table' | 'faq' | 'cta';
/**
 * Registre des 10 blocs du CMS (éditeur + vue de lecture). Les composants de bloc ont des props plus
 * larges que `BlockEditorProps` (`id`, `className`…) : seules `data`, `onChange` et `onUpload` sont passées.
 */
declare const CMS_BLOCK_REGISTRY: BlockRegistry<CmsBlockType>;

/** Clés techniques ignorées, comme `BlocContent::IGNORED_SEARCH_KEYS` côté API. */
declare const READING_TIME_IGNORED_KEYS: string[];
/**
 * Temps de lecture estimé (minutes, arrondi, minimum 1) à partir du contenu textuel des blocs.
 * `null` si les blocs ne contiennent aucun mot.
 */
declare const computeReadingTime: (blocks: readonly {
    data: unknown;
}[], { wordsPerMinute, ignoredKeys }?: {
    wordsPerMinute?: number | undefined;
    ignoredKeys?: string[] | undefined;
}) => number | null;

export { BlockCanvas, BlockList, BlockPicker, BlockWrapper, CMS_BLOCK_REGISTRY, CODE_LANGUAGES, CarouselBlock, CarouselBlockView, CodeBlock, CodeBlockView, CtaBlock, CtaBlockView, DEFAULT_BLOCK_CANVAS_LABELS, DEFAULT_CAROUSEL_BLOCK_DATA, DEFAULT_CMS_BLOCKS, DEFAULT_CODE_BLOCK_DATA, DEFAULT_CTA_BLOCK_DATA, DEFAULT_GALLERY_BLOCK_DATA, DEFAULT_IMAGE_BLOCK_DATA, DEFAULT_QUOTE_BLOCK_DATA, DEFAULT_TABLE_BLOCK_DATA, DEFAULT_TEXT_BLOCK_DATA, DEFAULT_VIDEO_BLOCK_DATA, EmptyBlockView, FaqBlock, FaqBlockView, GalleryBlock, GalleryBlockView, ImageBlock, ImageBlockView, MediaSourceField, QuoteBlock, QuoteBlockView, READING_TIME_IGNORED_KEYS, TableBlock, TableBlockView, TextBlock, TextBlockView, VideoBlock, VideoBlockView, computeReadingTime, createBlockItemId, createBlockRegistry, createDefaultFaqBlockData, defineBlock, extendBlockRegistry, useBlocksState };
export type { BlockCanvasLabels, BlockCanvasProps, BlockData, BlockEditorProps, BlockListProps, BlockPayload, BlockPickerProps, BlockRegistry, BlockRegistryEntry, BlockTypeDefinition, BlockViewProps, BlockWrapperProps, CarouselBlockData, CarouselBlockProps, CarouselSlideItem, CmsBlockType, CodeBlockData, CodeBlockProps, CtaBlockData, CtaBlockProps, CtaVariant, DefineBlockOptions, EditorBlock, FaqBlockData, FaqBlockProps, FaqItem, GalleryBlockData, GalleryBlockProps, GalleryImageItem, ImageBlockData, ImageBlockProps, MediaSourceFieldProps, MediaUploadHandler, PersistedBlock, QuoteBlockData, QuoteBlockProps, TableBlockData, TableBlockProps, TextBlockData, TextBlockProps, UseBlocksStateReturn, VideoBlockData, VideoBlockProps };
