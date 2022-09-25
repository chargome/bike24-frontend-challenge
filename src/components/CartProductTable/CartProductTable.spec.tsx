import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import * as store from '../../store';
import { ShoppingCartProduct } from '../../model';
import { render, screen } from '../../test/test-utils';
import { CartProductTable } from './CartProductTable';
import { act } from 'react-dom/test-utils';

const mockProduct1: ShoppingCartProduct = {
  id: '1',
  productName: 'EBIKE',
  price: 3,
  taxRate: 10,
  quantity: 4,
  maxAmount: 100,
};

describe('CartProductTable', () => {
  const mockRemoveItem = vi.fn();
  vi.spyOn(store, 'useShoppingCartStore').mockImplementation(() => [
    [mockProduct1],
    mockRemoveItem,
  ]);

  it('should display product name header', () => {
    render(<CartProductTable />);
    expect(screen.getByText(/Product/i)).toBeInTheDocument();
  });

  it('should display quantity header', () => {
    render(<CartProductTable />);
    expect(screen.getByText(/Quantity/i)).toBeInTheDocument();
  });

  it('should display price per unit header', () => {
    render(<CartProductTable />);
    expect(screen.getByText(/Price per unit/i)).toBeInTheDocument();
  });

  it('should display price header', () => {
    render(<CartProductTable />);
    expect(screen.getAllByText(/Price/i)[1]).toBeInTheDocument();
  });

  it('should display product name', () => {
    render(<CartProductTable />);
    expect(screen.getByText(/EBIKE/i)).toBeInTheDocument();
  });

  it('should display product quantity', () => {
    render(<CartProductTable />);
    expect(screen.getByText(/4/i)).toBeInTheDocument();
  });

  it('should display product price', () => {
    render(<CartProductTable />);
    expect(screen.getByText(/3/i)).toBeInTheDocument();
  });

  it('should display summed and total price', () => {
    render(<CartProductTable />);
    expect(screen.getAllByText(/12/i)).toHaveLength(2);
  });

  it('should display total header', () => {
    render(<CartProductTable />);
    expect(screen.getByText(/Total/i)).toBeInTheDocument();
  });

  it('should display delete icon', () => {
    render(<CartProductTable />);
    expect(
      screen.getByTestId(`delete-icon-${mockProduct1.id}`),
    ).toBeInTheDocument();
  });

  it('should call remove fn when clicking on icon', async () => {
    render(<CartProductTable />);
    await act(() => {
      screen.getByTestId(`delete-icon-${mockProduct1.id}`).click();
    });
    expect(mockRemoveItem).toHaveBeenCalledOnce();
  });
});
