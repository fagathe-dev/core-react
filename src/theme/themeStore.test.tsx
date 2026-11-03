import { act, renderHook } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createThemeStore, getThemeInitScript, resolveMode } from './themeStore';

const mockSystemDark = (dark: boolean) => {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  window.matchMedia = vi.fn(() => ({
    matches: dark,
    addEventListener: (_: string, cb: (event: MediaQueryListEvent) => void) => listeners.add(cb),
    removeEventListener: (_: string, cb: (event: MediaQueryListEvent) => void) => listeners.delete(cb),
  })) as unknown as typeof window.matchMedia;
  return (next: boolean) => listeners.forEach((cb) => cb({ matches: next } as MediaQueryListEvent));
};

const root = document.documentElement;

describe('createThemeStore', () => {
  beforeEach(() => {
    localStorage.clear();
    ['data-theme', 'data-ds-theme', 'data-ui-theme'].forEach((name) => root.removeAttribute(name));
  });
  afterEach(() => vi.restoreAllMocks());

  it('résout la préférence', () => {
    expect(resolveMode({ preference: 'system', systemMode: 'dark' })).toBe('dark');
    expect(resolveMode({ preference: 'light', systemMode: 'dark' })).toBe('light');
  });

  it('ne touche pas au DOM avant initThemeStore et rend la valeur par défaut côté serveur', () => {
    const store = createThemeStore({ storageKey: 'k1' });
    const Probe = () => <span>{store.useTheme().mode}</span>;

    expect(renderToString(<Probe />)).toContain('light');
    expect(root.hasAttribute('data-theme')).toBe(false);
  });

  it('lit le format zustand/persist des apps et pose les trois attributs', () => {
    mockSystemDark(false);
    localStorage.setItem('k2', JSON.stringify({ state: { preference: 'dark' }, version: 1 }));
    const store = createThemeStore({ storageKey: 'k2' });

    const cleanup = store.initThemeStore();
    const { result } = renderHook(() => store.useTheme());

    expect(result.current).toMatchObject({ mode: 'dark', preference: 'dark', isDark: true });
    expect(root.getAttribute('data-theme')).toBe('dark');
    expect(root.getAttribute('data-ds-theme')).toBe('dark');
    expect(root.getAttribute('data-ui-theme')).toBe('dark');
    cleanup();
  });

  it('applique les migrations et lit les anciennes clés (DS : `auto`)', () => {
    mockSystemDark(true);
    localStorage.setItem('k3', JSON.stringify({ state: { mode: 'light' }, version: 0 }));
    const migrated = createThemeStore({
      storageKey: 'k3',
      migrations: { 0: (legacy) => ({ preference: (legacy as { mode?: string }).mode }) },
    });
    migrated.initThemeStore()();
    expect(migrated.getState().preference).toBe('light');

    localStorage.setItem('ds-theme', 'auto');
    const legacy = createThemeStore({ storageKey: 'k4', legacyKeys: ['ds-theme'] });
    legacy.initThemeStore()();
    expect(legacy.getState()).toEqual({ preference: 'system', systemMode: 'dark' });
  });

  it('persiste le choix, suit le réglage système et expose `theme`', () => {
    const emitSystem = mockSystemDark(false);
    const store = createThemeStore({ storageKey: 'k5', themes: { light: { id: 'L' }, dark: { id: 'D' } } });
    const cleanup = store.initThemeStore();
    const { result } = renderHook(() => store.useTheme());

    expect(result.current.theme).toEqual({ id: 'L' });
    act(() => emitSystem(true));
    expect(result.current.mode).toBe('dark');

    act(() => result.current.toggleTheme());
    expect(result.current.preference).toBe('light');
    expect(JSON.parse(localStorage.getItem('k5')!)).toEqual({ state: { preference: 'light' }, version: 1 });
    cleanup();
  });
});

describe('getThemeInitScript', () => {
  it('applique le thème enregistré avant le premier rendu', () => {
    mockSystemDark(false);
    localStorage.setItem('ds-app-theme', JSON.stringify({ state: { preference: 'dark' }, version: 1 }));

    new Function(getThemeInitScript())();

    expect(root.getAttribute('data-theme')).toBe('dark');
    expect(root.style.colorScheme).toBe('dark');
  });
});
