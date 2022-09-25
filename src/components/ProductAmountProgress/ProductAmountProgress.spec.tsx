import { describe, expect, it } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { ProductAmountProgress } from './ProductAmountProgress';

describe('ProductAmountProgress', () => {
  it('should display progress', () => {
    render(<ProductAmountProgress current={1} max={10} />);
    expect(screen.getByText('1 / 10')).toBeInTheDocument();
  });

  it('should full progress', () => {
    render(<ProductAmountProgress current={10} max={10} />);
    expect(screen.getByText('10 / 10')).toBeInTheDocument();
  });
});
