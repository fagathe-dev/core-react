import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { getBreakpointQuery, useMediaQuery } from './useMediaQuery';

type Listener = () => void;

/** matchMedia minimal : une largeur de fenêtre simulée, évaluée sur min-width / max-width. */
const installMatchMedia = (initialWidth: number) => {
  let width = initialWidth;
  const listeners = new Set<Listener>();

  const evaluate = (query: string) => {
    const min = /min-width:\s*([\d.]+)px/.exec(query);
    const max = /max-width:\s*([\d.]+)px/.exec(query);
    if (min) return width >= Number(min[1]);
    if (max) return width <= Number(max[1]);
    return query.includes('reduce');
  };

  window.matchMedia = vi.fn((query: string) => ({
    get matches() {
      return evaluate(query);
    },
    media: query,
    onchange: null,
    addEventListener: (_: string, cb: Listener) => listeners.add(cb),
    removeEventListener: (_: string, cb: Listener) => listeners.delete(cb),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia;

  return {
    resize(next: number) {
      width = next;
      listeners.forEach((cb) => cb());
    },
    listeners,
  };
};

describe('getBreakpointQuery', () => {
  it('utilise les BREAKPOINTS de core-ts', () => {
    expect(getBreakpointQuery('md')).toBe('(min-width: 768px)');
    expect(getBreakpointQuery('lg', 'down')).toBe('(max-width: 991.98px)');
  });
});

describe('useMediaQuery', () => {
  const original = window.matchMedia;

  afterEach(() => {
    window.matchMedia = original;
  });

  describe('avec matchMedia', () => {
    let screen: ReturnType<typeof installMatchMedia>;

    beforeEach(() => {
      screen = installMatchMedia(1024);
    });

    it('évalue un breakpoint vers le haut et vers le bas', () => {
      expect(renderHook(() => useMediaQuery('lg')).result.current).toBe(true);
      expect(renderHook(() => useMediaQuery('xl')).result.current).toBe(false);
      expect(renderHook(() => useMediaQuery('xl', { direction: 'down' })).result.current).toBe(true);
    });

    it('accepte une media query brute', () => {
      expect(renderHook(() => useMediaQuery('(prefers-reduced-motion: reduce)')).result.current).toBe(true);
    });

    it('se met à jour au changement et se désabonne au démontage', () => {
      const { result, unmount } = renderHook(() => useMediaQuery('md'));
      expect(result.current).toBe(true);

      act(() => screen.resize(500));
      expect(result.current).toBe(false);

      unmount();
      expect(screen.listeners.size).toBe(0);
    });
  });

  it('retourne defaultValue sans matchMedia', () => {
    // @ts-expect-error simulation d'un environnement sans matchMedia
    window.matchMedia = undefined;

    expect(renderHook(() => useMediaQuery('md', { defaultValue: true })).result.current).toBe(true);
  });
});
