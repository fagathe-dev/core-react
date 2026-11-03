import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CMS_BLOCK_REGISTRY } from './defaultRegistry';
import { computeReadingTime } from './readingTime';
import { createBlockRegistry, defineBlock, extendBlockRegistry } from './registry';
import { useBlocksState, type PersistedBlock } from './useBlocksState';

const saved: PersistedBlock[] = [
  { id: 'b2', type: 'quote', position: 2, data: { text: 'Citation' } },
  { id: 'b1', type: 'text', position: 1, data: { content: 'Bonjour' } },
  { id: 'b3', type: 'inconnu', position: 3, data: {} },
];

describe('registre de blocs', () => {
  it('expose les 10 blocs du CMS dans l’ordre, avec leurs définitions', () => {
    expect(CMS_BLOCK_REGISTRY.types).toEqual([
      'text',
      'image',
      'code',
      'quote',
      'video',
      'gallery',
      'carousel',
      'table',
      'faq',
      'cta',
    ]);
    expect(CMS_BLOCK_REGISTRY.definitions[0]).toMatchObject({
      type: 'text',
      label: 'Texte',
      icon: 'format-pilcrow',
    });
    expect(CMS_BLOCK_REGISTRY.isBlockType('text')).toBe(true);
    expect(CMS_BLOCK_REGISTRY.isBlockType('toString')).toBe(false);
  });

  it('crée des données neuves à chaque appel (aucun tableau partagé)', () => {
    const first = CMS_BLOCK_REGISTRY.createData('table') as { rows: string[][] };
    first.rows[0]![0] = 'modifié';
    expect((CMS_BLOCK_REGISTRY.createData('table') as { rows: string[][] }).rows[0]![0]).not.toBe('modifié');
  });

  it('s’étend avec un type propre à l’app', () => {
    const Editor = () => null;
    const registry = extendBlockRegistry(CMS_BLOCK_REGISTRY, {
      map: defineBlock({ type: 'map', label: 'Carte', Editor, createData: () => ({ lat: 0 }) }),
    });
    expect(registry.types).toContain('map');
    expect(createBlockRegistry({}).types).toEqual([]);
  });
});

describe('useBlocksState', () => {
  it('trie les blocs, ignore les types inconnus et complète les données', () => {
    const { result } = renderHook(() => useBlocksState(CMS_BLOCK_REGISTRY, saved));

    expect(result.current.blocks.map((block) => block.id)).toEqual(['b1', 'b2']);
    expect(result.current.blocks[1]!.data).toEqual({ text: 'Citation', author: '', source: '' });
    expect(result.current.isDirty).toBe(false);
  });

  it('ajoute, modifie, déplace, réordonne et supprime', () => {
    const { result } = renderHook(() => useBlocksState(CMS_BLOCK_REGISTRY, saved));
    let key = '';

    act(() => {
      key = result.current.addBlock('code', 0);
    });
    expect(result.current.blocks[0]).toMatchObject({ key, id: null, type: 'code' });
    expect(result.current.isDirty).toBe(true);

    act(() => result.current.updateBlock(key, { language: 'ts', code: 'let a = 1;' }));
    act(() => result.current.moveBlock(key, 1));
    expect(result.current.blocks.map((block) => block.key)).toEqual(['b1', key, 'b2']);

    act(() => result.current.reorderBlocks('b2', 'b1'));
    expect(result.current.blocks.map((block) => block.key)).toEqual(['b2', 'b1', key]);

    act(() => result.current.removeBlock('b1'));
    expect(result.current.toPayload()).toEqual([
      {
        id: 'b2',
        type: 'quote',
        position: 1,
        data: { text: 'Citation', author: '', source: '' },
        settings: null,
      },
      { id: null, type: 'code', position: 2, data: { language: 'ts', code: 'let a = 1;' }, settings: null },
    ]);
  });

  it('resetBlocks remet l’état « enregistré »', () => {
    const { result } = renderHook(() => useBlocksState(CMS_BLOCK_REGISTRY, saved));

    act(() => {
      result.current.addBlock('text');
    });
    act(() => result.current.resetBlocks(saved));
    expect(result.current.isDirty).toBe(false);
  });
});

describe('computeReadingTime', () => {
  it('compte les mots des blocs en ignorant les clés techniques', () => {
    const words = Array.from({ length: 400 }, () => 'mot').join(' ');
    expect(computeReadingTime([{ data: { content: words, url: 'https://ignoré.example' } }])).toBe(2);
    expect(computeReadingTime([{ data: { id: 'abc', language: 'ts' } }])).toBeNull();
  });
});
