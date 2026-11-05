import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Avatar,
  BackButton,
  Badge,
  Button,
  Divider,
  Flex,
  Icon,
  IconButton,
  iconNames,
  Link,
  SegmentedControl,
} from 'core-react/ui';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'Base/Button',
  component: Button,
  argTypes: {
    $variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger', 'ghost', 'outline'],
    },
    $size: { control: 'inline-radio', options: ['sm', 'base', 'lg'] },
  },
  args: { children: 'Publier' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { $variant: 'primary', $size: 'base' },
};

export const Variants: Story = {
  render: () => (
    <Flex $gap="0.75rem" $wrap="wrap">
      <Button $variant="primary">Primary</Button>
      <Button $variant="secondary">Secondary</Button>
      <Button $variant="tertiary">Tertiary</Button>
      <Button $variant="danger">Danger</Button>
      <Button $variant="outline">Outline</Button>
      <Button $variant="ghost">Ghost</Button>
      <Button disabled>Désactivé</Button>
      <Button $loading>Chargement</Button>
    </Flex>
  ),
};

export const Badges: Story = {
  render: () => (
    <Flex $gap="0.5rem" $wrap="wrap">
      <Badge $variant="primary">Primary</Badge>
      <Badge $variant="success">Validé</Badge>
      <Badge $variant="warning">En attente</Badge>
      <Badge $variant="danger">Signalé</Badge>
      <Badge $variant="info">Info</Badge>
      <Badge $variant="neutral">Neutre</Badge>
      <Badge $pill $variant="primary">
        Pilule
      </Badge>
      <Badge $color="#9A6344">Lifestyle</Badge>
    </Flex>
  ),
};

export const Avatars: Story = {
  render: () => (
    <Flex $gap="0.75rem" $align="center">
      <Avatar name="Clara Martin" size="sm" />
      <Avatar name="Clara Martin" />
      <Avatar name="Clara Martin" size="lg" />
    </Flex>
  ),
};

export const Icons: Story = {
  render: () => (
    <Flex $gap="1rem" $wrap="wrap">
      {iconNames.map((name) => (
        <Icon key={name} name={name} size={24} />
      ))}
    </Flex>
  ),
};

export const IconButtons: Story = {
  render: () => (
    <Flex $gap="0.5rem" $align="center">
      <IconButton name="plus" aria-label="Ajouter" variant="primary" size="sm" />
      <IconButton name="cog-outline" aria-label="Paramètres" />
      <IconButton name="close" aria-label="Fermer" variant="outline" size="lg" round />
    </Flex>
  ),
};

export const Dividers: Story = {
  render: () => (
    <div>
      <p>Au-dessus</p>
      <Divider $margin="1rem 0" />
      <p>En-dessous</p>
    </div>
  ),
};

const SegmentedExample = () => {
  const [value, setValue] = useState('discover');
  return (
    <SegmentedControl
      aria-label="Fil d'actualité"
      value={value}
      onChange={setValue}
      options={[
        { value: 'discover', label: 'Découvrir' },
        { value: 'communities', label: 'Mes communautés' },
        { value: 'trends', label: 'Tendances' },
      ]}
    />
  );
};

export const Segmented: Story = {
  render: () => <SegmentedExample />,
};

const AVATAR_IMAGE = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="100%" height="100%" fill="#DFD9FC"/></svg>',
)}`;

export const AsLink: Story = {
  render: () => <Button href="/communautes">Explorer les communautés</Button>,
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole('link', { name: 'Explorer les communautés' });
    await expect(link).toHaveAttribute('href', '/communautes');
    await expect(link).not.toHaveAttribute('type');
  },
};

export const AvatarWithImage: Story = {
  render: () => <Avatar src={AVATAR_IMAGE} name="Clara Martin" size="lg" />,
  play: async ({ canvasElement }) => {
    const image = within(canvasElement).getByRole('img', { name: 'Clara Martin' });
    await expect(image).toHaveAttribute('width', '48');
    await expect(image).toHaveAttribute('height', '48');
  },
};

export const Links: Story = {
  render: () => (
    <Flex $gap="1rem" $align="center">
      <Link href="/tendances">Tout voir</Link>
      <Link href="https://example.com" target="_blank" rel="noopener noreferrer">
        Lien externe
      </Link>
      <BackButton fallbackUrl="/" />
    </Flex>
  ),
};
