import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { usePageFocus } from './usePageFocus';

describe('usePageFocus', () => {
  it('suit le focus de la fenêtre et la visibilité de l’onglet', () => {
    const hasFocus = vi.spyOn(document, 'hasFocus').mockReturnValue(true);
    const visibility = vi.spyOn(document, 'visibilityState', 'get').mockReturnValue('visible');

    const { result } = renderHook(() => usePageFocus());
    expect(result.current).toBe(true);

    hasFocus.mockReturnValue(false);
    act(() => {
      window.dispatchEvent(new Event('blur'));
    });
    expect(result.current).toBe(false);

    hasFocus.mockReturnValue(true);
    act(() => {
      window.dispatchEvent(new Event('focus'));
    });
    expect(result.current).toBe(true);

    visibility.mockReturnValue('hidden');
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });
    expect(result.current).toBe(false);
  });
});
