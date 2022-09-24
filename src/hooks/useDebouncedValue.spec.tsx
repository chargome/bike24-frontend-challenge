import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useDebouncedValue } from './useDebouncedValue';

describe('useDebounceValue hook', () => {
  it('should return inital value', () => {
    const { result } = renderHook(() => useDebouncedValue('123'));
    expect(result.current).toBeDefined();
    expect(result.current).toEqual('123');
  });

  it('should return debounced value', async () => {
    let initialValue = '123';
    const { result, rerender } = renderHook(() =>
      useDebouncedValue(initialValue),
    );
    initialValue = '234';
    rerender();
    expect(result.current).toEqual('123');
    await waitFor(() => expect(result.current).toEqual('234'));
  });
});
