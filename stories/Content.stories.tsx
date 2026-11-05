import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Card,
  MarkdownContent,
  EmptyState,
  ListGroup,
  ListGroupItem,
  StatCard,
  Table,
  Tbody,
  Tfoot,
  Td,
  Th,
  Thead,
  TRow,
} from 'core-react/ui';

const meta = {
  title: 'Content/Card',
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      <Card.Header>
        <Card.Title>Photographie</Card.Title>
      </Card.Header>
      <Card.Body>2,4 k membres partagent leurs meilleurs clichés.</Card.Body>
      <Card.Footer>
        <Button $size="sm">Rejoindre</Button>
      </Card.Footer>
    </Card>
  ),
  args: { $elevation: 'sm' },
};

export const Stat: Story = {
  render: () => (
    <div style={{ maxWidth: 280 }}>
      <StatCard label="Membres" value="2 400" icon="check-circle" trend="+12 %" />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <EmptyState
      icon="image-outline"
      title="Aucune publication"
      description="Soyez la première personne à publier ici."
      action={<Button>Publier</Button>}
    />
  ),
};

export const Lists: Story = {
  render: () => (
    <ListGroup style={{ maxWidth: 320 }}>
      <ListGroupItem $active>Découvrir</ListGroupItem>
      <ListGroupItem>Mes communautés</ListGroupItem>
      <ListGroupItem>Tendances</ListGroupItem>
    </ListGroup>
  ),
};

export const DataTable: Story = {
  render: () => (
    <Table $hoverable $bordered>
      <Thead>
        <TRow>
          <Th>Communauté</Th>
          <Th $align="right">Membres</Th>
        </TRow>
      </Thead>
      <Tbody>
        <TRow>
          <Td>Photographie</Td>
          <Td $align="right">2 400</Td>
        </TRow>
        <TRow $selected>
          <Td>Randonnée</Td>
          <Td $align="right">1 150</Td>
        </TRow>
      </Tbody>
    </Table>
  ),
};

export const Faq: Story = {
  render: () => (
    <Accordion defaultActiveKeys={['a']}>
      <AccordionItem itemKey="a">
        <AccordionTrigger>Comment rejoindre une communauté ?</AccordionTrigger>
        <AccordionContent>Ouvrez sa page et cliquez sur « Rejoindre ».</AccordionContent>
      </AccordionItem>
      <AccordionItem itemKey="b">
        <AccordionTrigger>Puis-je rester anonyme ?</AccordionTrigger>
        <AccordionContent>Oui, un pseudo suffit.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const DataTableWithFooter: Story = {
  render: () => (
    <Table $dense>
      <Tbody>
        <TRow>
          <Td>Photographie</Td>
          <Td $align="right">2 400</Td>
        </TRow>
      </Tbody>
      <Tfoot>
        <TRow>
          <Td>Total</Td>
          <Td $align="right">2 400</Td>
        </TRow>
      </Tfoot>
    </Table>
  ),
};

const MARKDOWN_SAMPLE = `## Un titre

Du **gras**, de l'_italique_, du ~~barré~~, du ==surligné== et du \`code\`.

- [github](https://github.com)
- [ ] tâche à faire
- [x] tâche faite

> Une citation

\`\`\`
bloc de code
\`\`\``;

export const Markdown: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <MarkdownContent>{MARKDOWN_SAMPLE}</MarkdownContent>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('link', { name: 'github' })).toHaveAttribute('href', 'https://github.com');
    await expect(canvasElement.querySelector('mark')).toHaveTextContent('surligné');
    await expect(canvasElement.querySelectorAll('input[type="checkbox"]')).toHaveLength(2);
    await expect(canvasElement.querySelector('input[type="checkbox"]:checked')).not.toBeNull();
  },
};

/** Contenu écrit par un membre : rien ne doit pouvoir s'exécuter ni charger de ressource. */
export const MarkdownUntrusted: Story = {
  render: () => (
    <div data-testid="root">
      <MarkdownContent>
        {
          '<img src=x onerror="window.pwned=1"> <script>window.pwned=1</script>\n\n[piège](javascript:window.pwned=1) [autre](data:text/html,x) ![image](https://exemple.test/pixel.png) <a href="https://exemple.test">lien brut</a> & < >'
        }
      </MarkdownContent>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('img')).toBeNull();
    await expect(canvasElement.querySelector('script')).toBeNull();
    await expect(canvasElement.querySelector('a')).toBeNull();
    await expect((window as unknown as { pwned?: number }).pwned).toBeUndefined();
    await expect(canvasElement).toHaveTextContent('piège');
    await expect(canvasElement).toHaveTextContent('& < >');
  },
};
