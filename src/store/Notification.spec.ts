import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { describe, expect, it } from 'vitest';
import { useNotificationStore } from './Notification';

describe('ShoppingCart store', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useNotificationStore());

    // reset state
    act(() => {
      result.current.isOpen = false;
      result.current.msg = '';
    });
  });

  it('should open notification', async () => {
    const { result } = renderHook(() => useNotificationStore());
    const hiMsg = 'Hi there!';
    await act(() => {
      result.current.show(hiMsg);
    });
    expect(result.current.isOpen).toBeDefined();
    expect(result.current.isOpen).toBe(true);
    expect(result.current.msg).toBeDefined();
    expect(result.current.msg).toEqual(hiMsg);
  });

  it('should close notification', async () => {
    const { result } = renderHook(() => useNotificationStore());
    const hiMsg = 'Hi there!';
    await act(() => {
      result.current.show(hiMsg);
    });
    expect(result.current.isOpen).toBe(true);
    await act(() => {
      result.current.close();
    });
    expect(result.current.isOpen).toBe(false);
  });
});
