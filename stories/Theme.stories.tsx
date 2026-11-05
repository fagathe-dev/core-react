import type { Meta, StoryObj } from '@storybook/react-vite';
import { palettes } from 'core-react/theme';
import { styled } from 'styled-components';

const Swatches = styled.div`
  display: grid;
  grid-template-columns: repeat(11, minmax(56px, 1fr));
  gap: ${({ theme }) => theme.spacing[1]};
  margin-bottom: ${({ theme }) => theme.spacing[5]};
`;

const Swatch = styled.div<{ $color: string }>`
  height: 56px;
  background-color: ${({ $color }) => $color};
  border-radius: ${({ theme }) => theme.radii.sm};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const Shade = styled.small`
  display: block;
  margin-top: ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.text.muted};
`;

const scales = Object.entries(palettes).filter(
  (entry): entry is [string, Exclude<(typeof palettes)[keyof typeof palettes], string>] =>
    typeof entry[1] !== 'string',
);

const meta = {
  title: 'Theme/Palettes',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Palettes: Story = {
  render: () => (
    <>
      {scales.map(([name, scale]) => (
        <section key={name}>
          <h3>{name}</h3>
          <Swatches>
            {Object.entries(scale).map(([shade, color]) => (
              <div key={shade}>
                <Swatch $color={color} />
                <Shade>
                  {shade} · {color}
                </Shade>
              </div>
            ))}
          </Swatches>
        </section>
      ))}
    </>
  ),
};
