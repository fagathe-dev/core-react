import { styled } from 'styled-components';

import { EmptyBlockView } from './BlockViews';
import type { BlockData, BlockRegistry } from './registry';

const Flow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
`;

export interface BlockListProps<TType extends string> {
  registry: BlockRegistry<TType>;
  /** Blocs à afficher, dans l'ordre (API ou `useBlocksState().blocks`). */
  blocks: readonly { type: string; data: BlockData; key?: string; id?: string | null; position?: number }[];
  className?: string;
}

/**
 * Rendu de lecture d'une suite de blocs (aperçu d'article, page publique) via les `View` du registre.
 * Les types inconnus ou sans vue sont ignorés.
 */
export const BlockList = <TType extends string>({ registry, blocks, className }: BlockListProps<TType>) => (
  <Flow className={className}>
    {[...blocks]
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
      .map((block, index) => {
        if (!registry.isBlockType(block.type)) return null;
        const View = registry.get(block.type).View ?? EmptyBlockView;
        return <View key={block.key ?? block.id ?? index} data={block.data} />;
      })}
  </Flow>
);
