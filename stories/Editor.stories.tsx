import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  BlockPicker,
  BlockWrapper,
  CarouselBlock,
  CodeBlock,
  CtaBlock,
  FaqBlock,
  GalleryBlock,
  ImageBlock,
  QuoteBlock,
  TableBlock,
  TextBlock,
  VideoBlock,
  type CarouselBlockData,
  type CodeBlockData,
  type CtaBlockData,
  type FaqBlockData,
  type GalleryBlockData,
  type ImageBlockData,
  type QuoteBlockData,
  type TableBlockData,
  type TextBlockData,
  type VideoBlockData,
} from 'core-react/editor';
import { type ReactNode, useState } from 'react';

const PLACEHOLDER = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><rect width="100%" height="100%" fill="#DDF3EA"/></svg>',
)}`;

const uploadLocally = async (file: File) => URL.createObjectURL(file);

const Stateful = <T,>({
  initial,
  render,
}: {
  initial: T;
  render: (data: T, onChange: (updated: T) => void) => ReactNode;
}) => {
  const [data, setData] = useState(initial);
  return <div style={{ maxWidth: 640 }}>{render(data, setData)}</div>;
};

const meta = {
  title: 'Editor/BlockWrapper',
  component: BlockWrapper,
  args: {
    blockType: 'text',
    blockLabel: 'Texte',
    position: 1,
    onMoveUp: () => {},
    onMoveDown: () => {},
    onDelete: () => {},
    onOpenSettings: () => {},
    children: 'Contenu du bloc',
  },
} satisfies Meta<typeof BlockWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Wrapper: Story = {};

export const Picker: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <BlockPicker onSelectBlock={() => {}} />
      <BlockPicker variant="inline" onSelectBlock={() => {}} />
    </div>
  ),
};

export const Text: Story = {
  render: () => (
    <Stateful<TextBlockData>
      initial={{ content: 'Les passions **se partagent**.' }}
      render={(data, onChange) => <TextBlock data={data} onChange={onChange} />}
    />
  ),
};

export const Code: Story = {
  render: () => (
    <Stateful<CodeBlockData>
      initial={{ language: 'typescript', code: "const gather = 'hello';", filename: 'gather.ts' }}
      render={(data, onChange) => <CodeBlock data={data} onChange={onChange} />}
    />
  ),
};

export const Quote: Story = {
  render: () => (
    <Stateful<QuoteBlockData>
      initial={{ text: 'Les passions se partagent.', author: 'Clara' }}
      render={(data, onChange) => <QuoteBlock data={data} onChange={onChange} />}
    />
  ),
};

export const CallToAction: Story = {
  render: () => (
    <Stateful<CtaBlockData>
      initial={{
        title: 'Rejoignez-nous',
        description: 'Une communauté pour chaque passion.',
        buttonLabel: 'Explorer',
        buttonUrl: '/',
        variant: 'primary' as const,
      }}
      render={(data, onChange) => <CtaBlock data={data} onChange={onChange} />}
    />
  ),
};

export const Faq: Story = {
  render: () => (
    <Stateful<FaqBlockData>
      initial={{
        items: [{ id: 'a', question: 'Comment rejoindre ?', answer: 'Cliquez sur « Rejoindre ».' }],
      }}
      render={(data, onChange) => <FaqBlock data={data} onChange={onChange} />}
    />
  ),
};

export const DataTable: Story = {
  render: () => (
    <Stateful<TableBlockData>
      initial={{
        hasHeader: true,
        caption: 'Communautés',
        rows: [
          ['Nom', 'Membres'],
          ['Photographie', '2 400'],
        ],
      }}
      render={(data, onChange) => <TableBlock data={data} onChange={onChange} />}
    />
  ),
};

export const ImageEditor: Story = {
  render: () => (
    <Stateful<ImageBlockData>
      initial={{ url: PLACEHOLDER, alt: 'Illustration', caption: 'Bandeau' }}
      render={(data, onChange) => <ImageBlock data={data} onChange={onChange} onUpload={uploadLocally} />}
    />
  ),
};

export const VideoEditor: Story = {
  render: () => (
    <Stateful<VideoBlockData>
      initial={{ url: '', caption: 'Présentation' }}
      render={(data, onChange) => <VideoBlock data={data} onChange={onChange} onUpload={uploadLocally} />}
    />
  ),
};

export const GalleryEditor: Story = {
  render: () => (
    <Stateful<GalleryBlockData>
      initial={{
        columns: 2,
        images: [
          { id: 'a', url: PLACEHOLDER, alt: 'Première image' },
          { id: 'b', url: PLACEHOLDER, alt: 'Deuxième image' },
        ],
      }}
      render={(data, onChange) => <GalleryBlock data={data} onChange={onChange} onUpload={uploadLocally} />}
    />
  ),
};

export const CarouselEditor: Story = {
  render: () => (
    <Stateful<CarouselBlockData>
      initial={{ aspectRatio: '16/9', slides: [{ id: 'a', url: PLACEHOLDER, caption: 'Diapositive' }] }}
      render={(data, onChange) => <CarouselBlock data={data} onChange={onChange} onUpload={uploadLocally} />}
    />
  ),
};
