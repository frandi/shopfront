import { describe, expect, it } from 'vitest';
import { lineUnitPriceCents } from './cartTotals';
import type { Product } from '../api/products';

function product(overrides: Partial<Product> = {}): Product {
  return {
    id: 'item',
    name: 'Item',
    description: '',
    priceCents: 1000,
    discountPercent: 0,
    taxRateBps: 0,
    ...overrides,
  };
}

describe('lineUnitPriceCents', () => {
  it('returns the list price when there is no discount', () => {
    expect(lineUnitPriceCents(product({ priceCents: 1599 }))).toBe(1599);
  });

  // Order totals (subtotal, discount, tax, shipping, grand total) are computed by the API via
  // POST /api/checkout; this helper only feeds the per-line column in the cart table.
});
