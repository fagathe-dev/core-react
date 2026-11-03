import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useClipboard } from './useClipboard';

const mockClipboard = (clipboard: Partial<Clipboard> | undefined) => {
  Object.defineProperty(navigator, 'clipboard', { value: clipboard, configurable: true });
};

describe('useClipboard', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'isSecureContext', { value: true, configurable: true });
  });

  afterEach(() => {
    vi.useRealTimers();
    mockClipboard(undefined);
  });

  it('copie le texte, passe isCopied à true puis le remet à false après le délai', async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    mockClipboard({ writeText });
    const onSuccess = vi.fn();

    const { result } = renderHook(() => useClipboard({ timeout: 1000, onSuccess }));

    let copied = false;
    await act(async () => {
      copied = await result.current.copy('bonjour');
    });

    expect(copied).toBe(true);
    expect(writeText).toHaveBeenCalledWith('bonjour');
    expect(result.current.isCopied).toBe(true);
    expect(result.current.hasCopied).toBe(true);
    expect(onSuccess).toHaveBeenCalledWith('bonjour');

    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.isCopied).toBe(false);
  });

  it('accepte feedbackDuration comme alias de timeout', async () => {
    vi.useFakeTimers();
    mockClipboard({ writeText: vi.fn().mockResolvedValue(undefined) });

    const { result } = renderHook(() => useClipboard({ feedbackDuration: 500 }));

    await act(async () => {
      await result.current.copy('x');
    });

    act(() => vi.advanceTimersByTime(499));
    expect(result.current.isCopied).toBe(true);
    act(() => vi.advanceTimersByTime(1));
    expect(result.current.isCopied).toBe(false);
  });

  it("expose l'erreur et appelle onError si la copie échoue", async () => {
    mockClipboard({ writeText: vi.fn().mockRejectedValue(new Error('refus')) });
    const onError = vi.fn();

    const { result } = renderHook(() => useClipboard({ onError }));

    let copied = true;
    await act(async () => {
      copied = await result.current.copy('x');
    });

    expect(copied).toBe(false);
    expect(result.current.error).toBe('refus');
    expect(result.current.isCopied).toBe(false);
    expect(onError).toHaveBeenCalledWith('refus');
  });

  it('ignore une chaîne vide', async () => {
    const writeText = vi.fn();
    mockClipboard({ writeText });
    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      expect(await result.current.copy('')).toBe(false);
    });
    expect(writeText).not.toHaveBeenCalled();
  });

  it('utilise toujours le dernier onSuccess sans recréer copy', async () => {
    mockClipboard({ writeText: vi.fn().mockResolvedValue(undefined) });
    const first = vi.fn();
    const second = vi.fn();

    const { result, rerender } = renderHook((props: { onSuccess: () => void }) => useClipboard(props), {
      initialProps: { onSuccess: first },
    });
    const copyBefore = result.current.copy;

    rerender({ onSuccess: second });
    expect(result.current.copy).toBe(copyBefore);

    await act(async () => {
      await result.current.copy('x');
    });
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });

  it('reset remet isCopied et error à zéro', async () => {
    mockClipboard({ writeText: vi.fn().mockResolvedValue(undefined) });
    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      await result.current.copy('x');
    });
    act(() => result.current.reset());

    expect(result.current.isCopied).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('calcule isSupported après le montage', () => {
    mockClipboard({ writeText: vi.fn() });
    const { result } = renderHook(() => useClipboard());

    expect(result.current.isSupported).toBe(true);
  });

  describe('paste', () => {
    it('retourne le texte lu', async () => {
      mockClipboard({ readText: vi.fn().mockResolvedValue('collé') });
      const { result } = renderHook(() => useClipboard());

      await expect(result.current.paste()).resolves.toEqual({ success: true, text: 'collé' });
    });

    it('signale une API absente', async () => {
      mockClipboard(undefined);
      const { result } = renderHook(() => useClipboard());

      await expect(result.current.paste()).resolves.toEqual({ success: false, error: 'unsupported' });
    });

    it('signale un refus de permission', async () => {
      mockClipboard({
        readText: vi.fn().mockRejectedValue(new DOMException('refus', 'NotAllowedError')),
      });
      const { result } = renderHook(() => useClipboard());

      await expect(result.current.paste()).resolves.toEqual({ success: false, error: 'permission-denied' });
    });
  });
});
