import type { Meta, StoryObj } from '@storybook/react-vite';
import { Col, Columns, Container, Flex, Grid, Row } from 'core-react/ui';
import { styled } from 'styled-components';

const Cell = styled.div`
  padding: ${({ theme }) => theme.spacing[3]};
  text-align: center;
  color: ${({ theme }) => theme.colors.primary.dark};
  background-color: ${({ theme }) => theme.colors.primary.subtle};
  border-radius: ${({ theme }) => theme.radii.sm};
`;

const meta = {
  title: 'Grid/Flex',
  component: Flex,
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    $gap: '1rem',
    $justify: 'space-between',
    children: (
      <>
        <Cell>A</Cell>
        <Cell>B</Cell>
        <Cell>C</Cell>
      </>
    ),
  },
};

export const CssGrid: Story = {
  render: () => (
    <Grid $columns={3} $gap="1rem">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <Cell key={n}>{n}</Cell>
      ))}
    </Grid>
  ),
};

export const RowsAndCols: Story = {
  render: () => (
    <Container>
      <Row>
        <Col $span={8}>
          <Cell>8</Cell>
        </Col>
        <Col $span={4}>
          <Cell>4</Cell>
        </Col>
      </Row>
    </Container>
  ),
};

export const TextColumns: Story = {
  render: () => (
    <Columns $count={2} $gap="2rem">
      <p>Première colonne de texte, utile pour les contenus éditoriaux.</p>
      <p>Deuxième colonne de texte, équilibrée automatiquement par le navigateur.</p>
    </Columns>
  ),
};
