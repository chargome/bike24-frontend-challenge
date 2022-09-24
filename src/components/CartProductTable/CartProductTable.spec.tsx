import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import * as store from '../../store';
import { ShoppingCartProduct } from '../../model';
import { render, screen } from '../../test/test-utils';
import { CartProductTable } from './CartProductTable';

const mockProduct1: ShoppingCartProduct = {
  id: '1',
  productName: 'EBIKE',
  price: 10,
  taxRate: 10,
  quantity: 10,
  maxAmount: 100,
};

describe('CartProductTable', () => {
  vi.spyOn(store, 'useShoppingCartStore').mockImplementation(() => [
    mockProduct1,
  ]);

  it('should display product name header', () => {
    render(<CartProductTable />);
    expect(screen.getByText(/Product/i)).toBeInTheDocument();
  });

  it('should display quantity header', () => {
    render(<CartProductTable />);
    expect(screen.getByText(/Quantity/i)).toBeInTheDocument();
  });

  it('should display product name', () => {
    render(<CartProductTable />);
    expect(screen.getByText(/EBIKE/i)).toBeInTheDocument();
  });

  it('should display product quantity', () => {
    render(<CartProductTable />);
    expect(screen.getByText(/10/i)).toBeInTheDocument();
  });
});
