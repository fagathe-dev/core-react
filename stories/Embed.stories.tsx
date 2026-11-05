import type { Meta, StoryObj } from '@storybook/react-vite';
import { Carousel, Figure, Gallery, Image, Video } from 'core-react/ui';

const PLACEHOLDER = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><rect width="100%" height="100%" fill="#DFD9FC"/></svg>',
)}`;

const meta = {
  title: 'Embed/Image',
  component: Image,
  args: { src: PLACEHOLDER, alt: 'Illustration', width: 640, height: 360 },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { $radius: 'lg', $fit: 'cover' },
};

export const Thumbnail: Story = {
  args: { $thumbnail: true, width: 200, height: 112 },
};

export const WithCaption: Story = {
  render: (args) => (
    <Figure caption="Bandeau de la communauté Photographie" captionAlign="center">
      <Image {...args} $radius="lg" />
    </Figure>
  ),
};

export const Grid: Story = {
  render: (args) => (
    <Gallery $columns={3} $gap="0.75rem">
      {[1, 2, 3].map((n) => (
        <Gallery.Item key={n} $radius="lg" $hoverZoom>
          <Image {...args} alt={`Illustration ${n}`} />
        </Gallery.Item>
      ))}
    </Gallery>
  ),
};

export const Slides: Story = {
  render: (args) => (
    <div style={{ maxWidth: 640 }}>
      <Carousel>
        {[1, 2, 3].map((n) => (
          <Carousel.Item key={n}>
            <Image {...args} alt={`Diapositive ${n}`} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  ),
};

export const VideoPlayer: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      {/* Aucune vidéo versionnée dans le dépôt : l'affiche suffit à montrer le cadre et les contrôles */}
      <Video poster={PLACEHOLDER} aspectRatio="16/9" radius="lg" />
    </div>
  ),
};
