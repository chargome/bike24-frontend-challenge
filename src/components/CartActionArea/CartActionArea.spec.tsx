import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import * as store from '../../store';
import { render, screen } from '../../test/test-utils';
import { CartActionArea } from './CartActionArea';
import { act } from 'react-dom/test-utils';

describe('CartProductTable', () => {
  const mockClearCart = vi.fn();
  vi.spyOn(store, 'useShoppingCartStore').mockImplementation(() => [
    1,
    mockClearCart,
  ]);

  it('should display clear cart button', () => {
    render(<CartActionArea />);
    expect(screen.getByText(/clear entire cart/i)).toBeInTheDocument();
  });

  it('should display buy button', () => {
    render(<CartActionArea />);
    expect(screen.getByText(/buy/i)).toBeInTheDocument();
  });

  it('should disable buttons when cart is empty', () => {
    vi.spyOn(store, 'useShoppingCartStore').mockImplementation(() => [
      0,
      mockClearCart,
    ]);
    render(<CartActionArea />);
    expect(screen.getByText(/buy/i)).toBeDisabled();
    expect(screen.getByText(/clear entire cart/i)).toBeDisabled();
  });

  it('should not disable buttons when cart has items', () => {
    vi.spyOn(store, 'useShoppingCartStore').mockImplementation(() => [
      1,
      mockClearCart,
    ]);
    render(<CartActionArea />);
    expect(screen.getByText(/buy/i)).not.toBeDisabled();
    expect(screen.getByText(/clear entire cart/i)).not.toBeDisabled();
  });

  it('should call clear cart when button is clicked', async () => {
    vi.spyOn(store, 'useShoppingCartStore').mockImplementation(() => [
      1,
      mockClearCart,
    ]);
    render(<CartActionArea />);
    await act(() => {
      screen.getByText(/clear entire cart/i).click();
    });
    expect(mockClearCart).toHaveBeenCalledOnce();
  });
});
