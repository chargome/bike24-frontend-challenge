import { describe, expect, it, vi } from 'vitest';
import * as hooks from '../../hooks';
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
});
