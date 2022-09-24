import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import * as hooks from '../../hooks';
import { Product } from '../../model';
import { render, screen } from '../../test/test-utils';
import { AddProductForm } from './AddProductForm';
describe('AddProductForm', () => {
  vi.spyOn(hooks, 'useProductData').mockImplementation(() => ({
    products: [],
  }));

  it('should display select', () => {
    render(<AddProductForm />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should display quantity slider', () => {
    render(<AddProductForm />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('should display add button', () => {
    render(<AddProductForm />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should not display total when no product is selected', () => {
    render(<AddProductForm />);
    expect(screen.queryByText(/Total:/i)).toBeNull();
  });

  it('should display total when product is selected', () => {
    const mockProduct: Partial<Product> = {
      price: 123,
      taxRate: 10,
    };
    const setStateMock = vi.fn();
    vi.spyOn(React, 'useState').mockImplementation(() => [
      mockProduct,
      setStateMock,
    ]);
    render(<AddProductForm />);
    expect(screen.getByText(/Total:/i)).toBeInTheDocument();
  });
});
