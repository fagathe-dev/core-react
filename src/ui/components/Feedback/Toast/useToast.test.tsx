import { act, renderHook, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { renderWithTheme } from '../../../../testing/renderWithTheme';
import { ToastContainer } from './ToastContainer';
import { useToast, useToastStore } from './useToast';

describe('useToast', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    act(() =>
      useToastStore.getState().toasts.forEach((toast) => useToastStore.getState().removeToast(toast.id)),
    );
    vi.useRealTimers();
  });

  it('affiche un toast dans le ToastContainer puis le retire après sa durée', () => {
    renderWithTheme(<ToastContainer />);
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.success('Article enregistré', 'Succès');
    });
    expect(screen.getByText('Article enregistré')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(4000));
    expect(screen.queryByText('Article enregistré')).not.toBeInTheDocument();
  });

  it('garde un toast de durée 0 jusqu’à dismiss', () => {
    const { result } = renderHook(() => useToast());
    let id = '';
    act(() => {
      id = result.current.toast({ message: 'Persistant', duration: 0 });
    });

    act(() => vi.advanceTimersByTime(60_000));
    expect(useToastStore.getState().toasts).toHaveLength(1);

    act(() => result.current.dismiss(id));
    expect(useToastStore.getState().toasts).toHaveLength(0);
  });
});
