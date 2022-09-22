import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useProductData } from './useProductData';

describe('useProduct hook', () => {
  it('should return data', () => {
    const { result } = renderHook(() => useProductData());
    expect(result.current.products).toBeDefined();
    expect(result.current.products.length).toBeGreaterThan(1);
  });
});
