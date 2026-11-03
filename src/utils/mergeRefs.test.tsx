import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { mergeRefs } from './mergeRefs';

describe('mergeRefs', () => {
  it('affecte le nœud à une ref objet et à une ref callback, puis les libère', () => {
    const objectRef = createRef<HTMLDivElement>();
    const callbackRef = vi.fn();

    const { unmount } = render(<div ref={mergeRefs(objectRef, callbackRef, undefined)} />);

    expect(objectRef.current).toBeInstanceOf(HTMLDivElement);
    expect(callbackRef).toHaveBeenCalledWith(objectRef.current);

    unmount();
    expect(objectRef.current).toBeNull();
    expect(callbackRef).toHaveBeenLastCalledWith(null);
  });

  it('appelle le cleanup retourné par une ref callback React 19', () => {
    const cleanup = vi.fn();
    const callbackRef = vi.fn(() => cleanup);

    const { unmount } = render(<div ref={mergeRefs(callbackRef)} />);
    unmount();

    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(callbackRef).toHaveBeenCalledTimes(1);
  });
});
