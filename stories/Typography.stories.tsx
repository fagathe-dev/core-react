import type { Meta, StoryObj } from '@storybook/react-vite';
import { Display, Lead, Text, Title } from 'core-react/ui';

const meta = {
  title: 'Typo/Text',
  component: Text,
  args: { children: 'Les passions se partagent.' },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Hierarchy: Story = {
  render: () => (
    <>
      <Display $level={2}>Gather</Display>
      <Title as="h2">Votre espace communautaire</Title>
      <Lead>Retrouvez les personnes qui partagent vos passions.</Lead>
      <Text>Texte de corps : publications, commentaires et descriptions.</Text>
      <Text $color="muted">Communauté Photographie · 2 h</Text>
    </>
  ),
};

export const SemanticColors: Story = {
  render: () => (
    <>
      <Text $color="primary">Primary</Text>
      <Text $color="secondary">Secondary</Text>
      <Text $color="tertiary">Tertiary</Text>
      <Text $color="success">Success</Text>
      <Text $color="warning">Warning</Text>
      <Text $color="info">Info</Text>
      <Text $color="danger">Danger</Text>
    </>
  ),
};
