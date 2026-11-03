import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { formatDuration, useCountdown } from './useCountdown';

describe('formatDuration', () => {
  it.each([
    [0, '0:00'],
    [5, '0:05'],
    [60, '1:00'],
    [125, '2:05'],
  ])('%i s → %s', (seconds, expected) => {
    expect(formatDuration(seconds)).toBe(expected);
  });
});

describe('useCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
  });
  afterEach(() => vi.useRealTimers());

  it('est inactif au départ', () => {
    const { result } = renderHook(() => useCountdown());

    expect(result.current).toMatchObject({
      secondsLeft: 0,
      isActive: false,
      isRunning: false,
      isExpired: false,
    });
  });

  it('décompte les secondes puis appelle onComplete une seule fois', () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() => useCountdown({ onComplete }));

    act(() => result.current.start(3));
    expect(result.current).toMatchObject({ secondsLeft: 3, isActive: true, isRunning: true });

    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.secondsLeft).toBe(2);

    act(() => vi.advanceTimersByTime(2000));
    expect(result.current).toMatchObject({
      secondsLeft: 0,
      isActive: true,
      isRunning: false,
      isExpired: true,
    });
    expect(onComplete).toHaveBeenCalledTimes(1);

    // L'intervalle est arrêté une fois l'échéance atteinte.
    expect(vi.getTimerCount()).toBe(0);
    act(() => vi.advanceTimersByTime(5000));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('stop réinitialise le compte à rebours', () => {
    const { result } = renderHook(() => useCountdown());

    act(() => result.current.start(10));
    act(() => result.current.stop());

    expect(result.current).toMatchObject({ secondsLeft: 0, isActive: false });
    expect(vi.getTimerCount()).toBe(0);
  });

  it('startUntil vise un horodatage absolu', () => {
    const { result } = renderHook(() => useCountdown());

    act(() => result.current.startUntil(Date.now() + 90_000));
    expect(result.current.secondsLeft).toBe(90);
  });

  it('peut être redémarré après expiration et rappelle onComplete', () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() => useCountdown({ onComplete }));

    act(() => result.current.start(1));
    act(() => vi.advanceTimersByTime(1000));
    act(() => result.current.start(1));
    act(() => vi.advanceTimersByTime(1000));

    expect(onComplete).toHaveBeenCalledTimes(2);
  });
});
