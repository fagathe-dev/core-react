import {
  createDefaultFaqBlockData,
  DEFAULT_CAROUSEL_BLOCK_DATA,
  DEFAULT_CODE_BLOCK_DATA,
  DEFAULT_CTA_BLOCK_DATA,
  DEFAULT_GALLERY_BLOCK_DATA,
  DEFAULT_IMAGE_BLOCK_DATA,
  DEFAULT_QUOTE_BLOCK_DATA,
  DEFAULT_TABLE_BLOCK_DATA,
  DEFAULT_TEXT_BLOCK_DATA,
  DEFAULT_VIDEO_BLOCK_DATA,
} from './blocks/blockDefaults';
import { DEFAULT_CMS_BLOCKS } from './blocks/blockDefaults';
import { CarouselBlock } from './blocks/CarouselBlock';
import { CodeBlock } from './blocks/CodeBlock';
import { CtaBlock } from './blocks/CtaBlock';
import { FaqBlock } from './blocks/FaqBlock';
import { GalleryBlock } from './blocks/GalleryBlock';
import { ImageBlock } from './blocks/ImageBlock';
import { QuoteBlock } from './blocks/QuoteBlock';
import { TableBlock } from './blocks/TableBlock';
import { TextBlock } from './blocks/TextBlock';
import { VideoBlock } from './blocks/VideoBlock';
import {
  CarouselBlockView,
  CodeBlockView,
  CtaBlockView,
  FaqBlockView,
  GalleryBlockView,
  ImageBlockView,
  QuoteBlockView,
  TableBlockView,
  TextBlockView,
  VideoBlockView,
} from './BlockViews';
import { createBlockRegistry, defineBlock, type BlockEditorProps, type BlockViewProps } from './registry';
import type { ComponentType } from 'react';

/** Miroir de `Fagathe\CmsCore\Enum\Post\BlockType`. */
export type CmsBlockType =
  'text' | 'image' | 'code' | 'quote' | 'video' | 'gallery' | 'carousel' | 'table' | 'faq' | 'cta';

const cms = <T extends object>(
  type: CmsBlockType,
  Editor: ComponentType<BlockEditorProps<T>>,
  View: ComponentType<BlockViewProps<T>>,
  createData: () => T,
) => {
  const definition = DEFAULT_CMS_BLOCKS.find((item) => item.type === type);
  return defineBlock<T>({
    type,
    label: definition?.label,
    icon: definition?.icon,
    description: definition?.description,
    Editor,
    View,
    createData,
  });
};

/**
 * Registre des 10 blocs du CMS (éditeur + vue de lecture). Les composants de bloc ont des props plus
 * larges que `BlockEditorProps` (`id`, `className`…) : seules `data`, `onChange` et `onUpload` sont passées.
 */
export const CMS_BLOCK_REGISTRY = createBlockRegistry<CmsBlockType>({
  text: cms('text', TextBlock, TextBlockView, () => DEFAULT_TEXT_BLOCK_DATA),
  image: cms('image', ImageBlock, ImageBlockView, () => DEFAULT_IMAGE_BLOCK_DATA),
  code: cms('code', CodeBlock, CodeBlockView, () => DEFAULT_CODE_BLOCK_DATA),
  quote: cms('quote', QuoteBlock, QuoteBlockView, () => DEFAULT_QUOTE_BLOCK_DATA),
  video: cms('video', VideoBlock, VideoBlockView, () => DEFAULT_VIDEO_BLOCK_DATA),
  gallery: cms('gallery', GalleryBlock, GalleryBlockView, () => ({
    ...DEFAULT_GALLERY_BLOCK_DATA,
    images: [],
  })),
  carousel: cms('carousel', CarouselBlock, CarouselBlockView, () => ({
    ...DEFAULT_CAROUSEL_BLOCK_DATA,
    slides: [],
  })),
  table: cms('table', TableBlock, TableBlockView, () => DEFAULT_TABLE_BLOCK_DATA),
  faq: cms('faq', FaqBlock, FaqBlockView, createDefaultFaqBlockData),
  cta: cms('cta', CtaBlock, CtaBlockView, () => DEFAULT_CTA_BLOCK_DATA),
});
