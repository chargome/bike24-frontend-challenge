import { describe, expect, it } from 'vitest';
import { Product } from '../../model';
import { render, screen } from '../../test/test-utils';
import { ProductDropdown } from './ProductDropdown';

describe('ProductDropdown', () => {
  it('should display title', () => {
    render(<ProductDropdown data={[]} setSelectedProduct={() => null} />);
    expect(screen.getByText(/Product:/)).toBeDefined();
  });

  it('should display default value', () => {
    render(<ProductDropdown data={[]} setSelectedProduct={() => null} />);
    expect(screen.getByText(/Select a product/)).toBeDefined();
  });

  it('should display values', () => {
    const products: Partial<Product>[] = [
      { id: '1', productName: 'Product1' },
      { id: '2', productName: 'Product2' },
    ];
    render(
      <ProductDropdown
        data={products as Product[]}
        setSelectedProduct={() => null}
      />,
    );

    screen.getByText(/Select a product/).click();
    expect(screen.getByText(/Product1/)).toBeVisible();
    expect(screen.getByText(/Product2/)).toBeVisible();
  });

  it('should display selected value', () => {
    const products: Partial<Product>[] = [{ id: '1', productName: 'Product1' }];
    render(
      <ProductDropdown
        data={products as Product[]}
        selectedProduct={products[0] as Product}
        setSelectedProduct={() => null}
      />,
    );
    expect(screen.getByText(/Product1/)).toBeDefined();
  });
});
