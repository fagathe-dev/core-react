import { styled } from 'styled-components';

import { Button } from 'core-react/ui';
import { Accordion } from 'core-react/ui';
import { MarkdownViewer, type MarkdownOptions } from 'core-react/ui';
import { Table, Tbody, Td, Th, Thead, TRow } from 'core-react/ui';
import { Carousel } from 'core-react/ui';
import { Figure } from 'core-react/ui';
import { Gallery } from 'core-react/ui';
import { Image } from 'core-react/ui';
import { Video } from 'core-react/ui';
import { Text } from 'core-react/ui';
import { Title } from 'core-react/ui';
import type { CarouselBlockData } from './blocks/CarouselBlock';
import type { CodeBlockData } from './blocks/CodeBlock';
import type { CtaBlockData } from './blocks/CtaBlock';
import type { FaqBlockData } from './blocks/FaqBlock';
import type { GalleryBlockData } from './blocks/GalleryBlock';
import type { ImageBlockData } from './blocks/ImageBlock';
import type { QuoteBlockData } from './blocks/QuoteBlock';
import type { TableBlockData } from './blocks/TableBlock';
import type { TextBlockData } from './blocks/TextBlock';
import type { VideoBlockData } from './blocks/VideoBlock';
import type { BlockViewProps } from './registry';

const CodeFrame = styled.figure`
  margin: 0;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.base};
  overflow: hidden;

  figcaption {
    padding: ${({ theme }) => `${theme.spacing[1.5]} ${theme.spacing[3]}`};
    font-family: ${({ theme }) => theme.typography.fonts.mono};
    font-size: ${({ theme }) => theme.typography.sizes.xs};
    color: ${({ theme }) => theme.colors.text.muted};
    background-color: ${({ theme }) => theme.colors.background.surfaceHover};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
  }

  pre {
    margin: 0;
    padding: ${({ theme }) => theme.spacing[4]};
    overflow-x: auto;
    font-family: ${({ theme }) => theme.typography.fonts.mono};
    font-size: ${({ theme }) => theme.typography.sizes.sm};
    background-color: ${({ theme }) => theme.colors.background.surface};
  }
`;

const Blockquote = styled.blockquote`
  margin: 0;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[5]}`};
  border-left: 4px solid ${({ theme }) => theme.colors.primary.base};
  background-color: ${({ theme }) => theme.colors.background.surfaceHover};
  border-radius: ${({ theme }) => theme.radii.sm};

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.sizes.lg};
    font-style: italic;
  }

  footer {
    margin-top: ${({ theme }) => theme.spacing[2]};
  }
`;

const CtaBox = styled.aside`
  padding: ${({ theme }) => theme.spacing[5]};
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.background.surfaceHover};
`;

/** Rendu d'un bloc sans contenu (aperçu de l'éditeur). */
export const EmptyBlockView = () => (
  <Text $size="sm" $color="muted">
    Bloc vide.
  </Text>
);

/** Options Markdown du bloc texte : titres de l'article décalés d'un niveau (le titre de page est le h1). */
const TEXT_MARKDOWN: MarkdownOptions = { headingOffset: 1 };

export const TextBlockView = ({ data }: BlockViewProps<TextBlockData>) =>
  data.content ? <MarkdownViewer {...TEXT_MARKDOWN}>{data.content}</MarkdownViewer> : <EmptyBlockView />;

export const ImageBlockView = ({ data }: BlockViewProps<ImageBlockData>) =>
  data.url ? (
    <Figure caption={data.caption} captionAlign="center">
      <Image
        src={data.url}
        alt={data.alt || ''}
        $aspectRatio={data.aspectRatio || '16/9'}
        $fit="cover"
        $radius="base"
      />
    </Figure>
  ) : (
    <EmptyBlockView />
  );

export const VideoBlockView = ({ data }: BlockViewProps<VideoBlockData>) =>
  data.url ? (
    <Figure caption={data.caption} captionAlign="center">
      <Video src={data.url} aspectRatio={data.aspectRatio || '16/9'} radius="base" controls />
    </Figure>
  ) : (
    <EmptyBlockView />
  );

export const CodeBlockView = ({ data }: BlockViewProps<CodeBlockData>) =>
  data.code ? (
    <CodeFrame>
      <figcaption>{data.filename || data.language}</figcaption>
      <pre>
        <code>{data.code}</code>
      </pre>
    </CodeFrame>
  ) : (
    <EmptyBlockView />
  );

export const QuoteBlockView = ({ data }: BlockViewProps<QuoteBlockData>) =>
  data.text ? (
    <Blockquote cite={data.source?.startsWith('http') ? data.source : undefined}>
      <p>{data.text}</p>
      {(data.author || data.source) && (
        <footer>
          <Text $size="sm" $color="muted">
            — {data.author}
            {data.author && data.source ? ', ' : ''}
            {data.source && <cite>{data.source}</cite>}
          </Text>
        </footer>
      )}
    </Blockquote>
  ) : (
    <EmptyBlockView />
  );

export const GalleryBlockView = ({ data }: BlockViewProps<GalleryBlockData>) =>
  data.images?.length ? (
    <Gallery $columns={data.columns || 3} $minColumnWidth="160px" $gap="0.75rem">
      {data.images.map((image) => (
        <Gallery.Item key={image.id} $hoverZoom>
          <Image src={image.url} alt={image.alt || ''} $radius="base" />
        </Gallery.Item>
      ))}
    </Gallery>
  ) : (
    <EmptyBlockView />
  );

export const CarouselBlockView = ({ data }: BlockViewProps<CarouselBlockData>) =>
  data.slides?.length ? (
    <Carousel
      aspectRatio={data.aspectRatio || '16/9'}
      autoplay={data.autoplay}
      slideInterval={data.slideInterval}
    >
      {data.slides.map((slide) => (
        <Carousel.Item key={slide.id}>
          <Image
            src={slide.url}
            alt={slide.caption || ''}
            $fit="cover"
            style={{ width: '100%', height: '100%' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  ) : (
    <EmptyBlockView />
  );

export const TableBlockView = ({ data }: BlockViewProps<TableBlockData>) => {
  const rows = data.rows ?? [];
  if (rows.length === 0) return <EmptyBlockView />;

  const [header, ...body] = data.hasHeader ? rows : [undefined, ...rows];

  return (
    <Figure caption={data.caption} captionAlign="center">
      <Table $bordered $striped>
        {header && (
          <Thead>
            <TRow>
              {header.map((cell, idx) => (
                <Th key={idx}>{cell}</Th>
              ))}
            </TRow>
          </Thead>
        )}
        <Tbody>
          {body.map((row, rowIdx) => (
            <TRow key={rowIdx}>
              {row?.map((cell, idx) => (
                <Td key={idx}>{cell}</Td>
              ))}
            </TRow>
          ))}
        </Tbody>
      </Table>
    </Figure>
  );
};

export const FaqBlockView = ({ data }: BlockViewProps<FaqBlockData>) =>
  data.items?.length ? (
    <Accordion multiple>
      {data.items.map((item) => (
        <Accordion.Item key={item.id} itemKey={item.id}>
          <Accordion.Trigger>{item.question || 'Question sans titre'}</Accordion.Trigger>
          <Accordion.Content>
            <Text as="p" style={{ margin: 0 }}>
              {item.answer}
            </Text>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  ) : (
    <EmptyBlockView />
  );

export const CtaBlockView = ({ data }: BlockViewProps<CtaBlockData>) =>
  data.title || data.buttonLabel ? (
    <CtaBox>
      {data.title && <Title as="h3">{data.title}</Title>}
      {data.description && (
        <Text as="p" style={{ marginTop: 0 }}>
          {data.description}
        </Text>
      )}
      {data.buttonLabel && (
        <Button
          href={data.buttonUrl || '#'}
          target="_blank"
          rel="noreferrer"
          $variant={data.variant || 'primary'}
        >
          {data.buttonLabel}
        </Button>
      )}
    </CtaBox>
  ) : (
    <EmptyBlockView />
  );
