import { renderHook } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { useIsClient } from './useIsClient';

const Probe = () => <span>{useIsClient() ? 'client' : 'server'}</span>;

describe('useIsClient', () => {
  it('vaut false au rendu serveur', () => {
    expect(renderToString(<Probe />)).toContain('server');
  });

  it('vaut true côté client', () => {
    expect(renderHook(() => useIsClient()).result.current).toBe(true);
  });
});
