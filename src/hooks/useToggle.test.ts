import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useToggle } from './useToggle';

describe('useToggle', () => {
  it('vaut false par défaut et respecte la valeur initiale', () => {
    expect(renderHook(() => useToggle()).result.current[0]).toBe(false);
    expect(renderHook(() => useToggle(true)).result.current[0]).toBe(true);
  });

  it('inverse la valeur sans argument', () => {
    const { result } = renderHook(() => useToggle());

    act(() => result.current[1]());
    expect(result.current[0]).toBe(true);

    act(() => result.current[1]());
    expect(result.current[0]).toBe(false);
  });

  it('force la valeur avec un booléen', () => {
    const { result } = renderHook(() => useToggle());

    act(() => result.current[1](true));
    act(() => result.current[1](true));
    expect(result.current[0]).toBe(true);

    act(() => result.current[1](false));
    expect(result.current[0]).toBe(false);
  });

  it('ignore un argument non booléen (événement) et inverse la valeur', () => {
    const { result } = renderHook(() => useToggle());

    act(() => result.current[1]({ type: 'click' }));
    expect(result.current[0]).toBe(true);
  });

  it('garde une identité stable pour toggle', () => {
    const { result, rerender } = renderHook(() => useToggle());
    const first = result.current[1];

    act(() => result.current[1]());
    rerender();

    expect(result.current[1]).toBe(first);
  });
});
