import { describe, expect, it } from 'vitest';
import { computeTotals, type CartLine } from './cartTotals';
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

describe('computeTotals', () => {
  it('sums line items with no discount', () => {
    const lines: CartLine[] = [
      { product: product({ id: 'a', priceCents: 1200 }), quantity: 2 },
      { product: product({ id: 'b', priceCents: 1599 }), quantity: 1 },
    ];
    const totals = computeTotals(lines);
    expect(totals.subtotalCents).toBe(3999);
    expect(totals.discountCents).toBe(0);
    expect(totals.totalCents).toBe(3999);
  });

  it('uses the list price for the subtotal regardless of promotions', () => {
    const lines: CartLine[] = [
      { product: product({ id: 'c', priceCents: 5000, discountPercent: 20 }), quantity: 1 },
    ];
    expect(computeTotals(lines).subtotalCents).toBe(5000);
  });
});
