import { describe, expect, it } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { ProductQuantityInput } from './ProductQuantityInput';

describe('ProductQuantityInput', () => {
  it('should display title', () => {
    render(
      <ProductQuantityInput
        value={0}
        setValue={() => null}
        maxAmount={1}
        disabled={false}
      />,
    );
    expect(screen.getByText(/Amount:/)).toBeDefined();
  });

  it('should display range slider', () => {
    render(
      <ProductQuantityInput
        value={1}
        setValue={() => null}
        maxAmount={10}
        disabled={false}
      />,
    );
    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveValue('1');
  });

  it('should display number input', () => {
    render(
      <ProductQuantityInput
        value={1}
        setValue={() => null}
        maxAmount={10}
        disabled={false}
      />,
    );
    const numberInput = screen.getByRole('spinbutton');
    expect(numberInput).toBeInTheDocument();
    expect(numberInput).toHaveValue(1);
  });
});
