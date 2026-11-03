import { fireEvent, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../testing/renderWithTheme';
import { BlockCanvas } from './BlockCanvas';
import { BlockList } from './BlockList';
import { CMS_BLOCK_REGISTRY } from './defaultRegistry';
import { useBlocksState, type PersistedBlock } from './useBlocksState';

const Editor = ({ initial = [] }: { initial?: PersistedBlock[] }) => {
  const state = useBlocksState(CMS_BLOCK_REGISTRY, initial);
  return (
    <>
      <BlockCanvas
        registry={CMS_BLOCK_REGISTRY}
        blocks={state.blocks}
        onAdd={state.addBlock}
        onChange={state.updateBlock}
        onMove={state.moveBlock}
        onReorder={state.reorderBlocks}
        onRemove={state.removeBlock}
      />
      <output data-testid="payload">{JSON.stringify(state.toPayload())}</output>
    </>
  );
};

const payload = () => JSON.parse(screen.getByTestId('payload').textContent ?? '[]') as { type: string }[];

describe('BlockCanvas', () => {
  it('affiche l’état vide puis ajoute un bloc texte depuis le sélecteur', () => {
    renderWithTheme(<Editor />);
    expect(screen.getByText('Ce contenu ne contient encore aucun bloc')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Ajouter un bloc de contenu/ }));
    fireEvent.click(screen.getByRole('button', { name: /Texte/ }));

    expect(payload()).toEqual([expect.objectContaining({ type: 'text' })]);
    fireEvent.change(screen.getByLabelText('Contenu'), { target: { value: '## Bonjour' } });
    expect(payload()[0]).toMatchObject({ data: { content: '## Bonjour' } });
  });

  it('supprime un bloc vide sans confirmation, et demande confirmation sinon', () => {
    renderWithTheme(
      <Editor
        initial={[
          { id: 'a', type: 'text', position: 1, data: { content: '' } },
          { id: 'b', type: 'text', position: 2, data: { content: 'contenu' } },
        ]}
      />,
    );

    const [first, second] = screen.getAllByRole('button', { name: 'Supprimer le bloc' });
    fireEvent.click(first!);
    expect(payload()).toHaveLength(1);

    fireEvent.click(second!);
    const dialog = screen.getByRole('dialog');
    fireEvent.click(within(dialog).getByRole('button', { name: 'Supprimer' }));
    expect(payload()).toHaveLength(0);
  });

  it('insère un bloc à une position donnée avec le « + » intermédiaire', () => {
    renderWithTheme(<Editor initial={[{ id: 'a', type: 'quote', position: 1, data: { text: 'x' } }]} />);

    fireEvent.click(screen.getByRole('button', { name: 'Insérer un bloc en position 1' }));
    fireEvent.click(screen.getAllByRole('button', { name: /Code/ })[0]!);

    expect(payload().map((block) => block.type)).toEqual(['code', 'quote']);
  });
});

describe('BlockList', () => {
  it('rend les blocs en lecture via les vues du registre', () => {
    renderWithTheme(
      <BlockList
        registry={CMS_BLOCK_REGISTRY}
        blocks={[
          { type: 'quote', position: 2, data: { text: 'Une citation', author: 'Ada' } },
          { type: 'text', position: 1, data: { content: '## Intro\n\n**Gras**' } },
          { type: 'inconnu', position: 3, data: {} },
        ]}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Intro' }).tagName).toBe('H3');
    expect(screen.getByText('Gras').tagName).toBe('STRONG');
    expect(screen.getByText('Une citation')).toBeInTheDocument();
  });
});
