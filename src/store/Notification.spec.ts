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
      result.current.show(hiMsg, 'success');
    });
    expect(result.current.isOpen).toBeDefined();
    expect(result.current.isOpen).toBe(true);
    expect(result.current.msg).toBeDefined();
    expect(result.current.msg).toEqual(hiMsg);
    expect(result.current.variant).toEqual('success');
  });

  it('should show error notification', async () => {
    const { result } = renderHook(() => useNotificationStore());
    const errorMsg = 'some error!';
    await act(() => {
      result.current.show(errorMsg, 'error');
    });
    expect(result.current.isOpen).toBe(true);
    expect(result.current.msg).toEqual(errorMsg);
    expect(result.current.variant).toEqual('error');
  });

  it('should close notification', async () => {
    const { result } = renderHook(() => useNotificationStore());
    const hiMsg = 'Hi there!';
    await act(() => {
      result.current.show(hiMsg, 'success');
    });
    expect(result.current.isOpen).toBe(true);
    await act(() => {
      result.current.close();
    });
    expect(result.current.isOpen).toBe(false);
  });
});
