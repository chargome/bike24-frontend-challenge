import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import * as store from '../../store';
import { render, screen } from '../../test/test-utils';
import { CartActionArea } from './CartActionArea';
import { act } from 'react-dom/test-utils';
import { mockProduct1 } from '../../test/mock-products';

describe('CartProductTable', () => {
  let mockClearCart = vi.fn();
  beforeEach(() => {
    mockClearCart = vi.fn();
    vi.spyOn(store, 'useShoppingCartStore').mockImplementation(() => [
      [mockProduct1],
      10,
      mockClearCart,
    ]);
  });

  it('should display clear cart button', () => {
    render(<CartActionArea />);
    expect(screen.getByText(/clear entire cart/i)).toBeInTheDocument();
  });

  it('should display buy button', () => {
    render(<CartActionArea />);
    expect(screen.getByText(/buy/i)).toBeInTheDocument();
  });

  it('should show message when cart is empty', () => {
    vi.spyOn(store, 'useShoppingCartStore').mockImplementation(() => [
      [],
      10,
      mockClearCart,
    ]);
    render(<CartActionArea />);
    expect(
      screen.getByText(/Add some products to your cart!/i),
    ).toBeInTheDocument();
  });

  it('should not disable buttons when cart has items', () => {
    render(<CartActionArea />);
    expect(screen.getByText(/buy/i)).not.toBeDisabled();
    expect(screen.getByText(/clear entire cart/i)).not.toBeDisabled();
  });

  it('should call clear cart when button is clicked', async () => {
    render(<CartActionArea />);
    await act(() => {
      screen.getByText(/clear entire cart/i).click();
    });
    expect(mockClearCart).toHaveBeenCalledOnce();
  });

  it('should display total cart header', () => {
    render(<CartActionArea />);
    expect(screen.getByText(/Total cart value/i)).toBeInTheDocument();
  });

  it('should display products in cart header', async () => {
    render(<CartActionArea />);
    expect(screen.getByText(/Products in cart/i)).toBeInTheDocument();
  });

  it('should display products in cart amount', async () => {
    render(<CartActionArea />);
    expect(screen.getByText('1 / 10')).toBeInTheDocument();
  });
});
