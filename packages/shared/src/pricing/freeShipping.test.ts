import { describe, expect, it } from 'vitest';
import { qualifiesForFreeShipping } from './freeShipping';

describe('qualifiesForFreeShipping', () => {
  it('is false below the threshold', () => {
    expect(qualifiesForFreeShipping(4999, 5000)).toBe(false);
  });

  it('is true above the threshold', () => {
    expect(qualifiesForFreeShipping(7500, 5000)).toBe(true);
  });
});
