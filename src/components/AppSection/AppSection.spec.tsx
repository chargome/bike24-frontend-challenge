import { describe, expect, it } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { AppSection } from './AppSection';

describe('AppSection', () => {
  it('should display children', () => {
    render(
      <AppSection>
        <div>BIKE24</div>
      </AppSection>,
    );
    expect(screen.getByText(/BIKE24/)).toBeDefined();
  });
});
