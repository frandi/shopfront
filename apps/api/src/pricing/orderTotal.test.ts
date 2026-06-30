import { describe, expect, it } from 'vitest';
import { computeOrderTotal, type OrderLineInput } from './orderTotal';
import type { Product } from '../data/catalog';

const config = { freeShippingThresholdCents: 5000, shippingFlatCents: 599 };

function product(overrides: Partial<Product> = {}): Product {
  return {
    id: 'item',
    name: 'Item',
    description: '',
    priceCents: 1000,
    discountPercent: 0,
    taxRateBps: 825,
    ...overrides,
  };
}

describe('computeOrderTotal', () => {
  it('prices a non-discounted cart below the free-shipping threshold', () => {
    const lines: OrderLineInput[] = [
      { product: product({ id: 'mug', priceCents: 1200 }), quantity: 2 },
      { product: product({ id: 'notebook', priceCents: 1599 }), quantity: 1 },
    ];
    // subtotal 3999; tax = round(2400*8.25%) + round(1599*8.25%) = 198 + 132 = 330; shipping 599.
    expect(computeOrderTotal(lines, config).totals).toEqual({
      subtotalCents: 3999,
      discountCents: 0,
      taxCents: 330,
      shippingCents: 599,
      grandTotalCents: 4928,
    });
  });

  it('gives free shipping at or above the threshold', () => {
    const lines: OrderLineInput[] = [
      { product: product({ id: 'bottle', priceCents: 2800 }), quantity: 2 },
    ];
    // postDiscount 5600 >= 5000 -> free shipping; tax = round(5600*8.25%) = 462.
    expect(computeOrderTotal(lines, config).totals).toEqual({
      subtotalCents: 5600,
      discountCents: 0,
      taxCents: 462,
      shippingCents: 0,
      grandTotalCents: 6062,
    });
  });

  it('applies a percentage discount to an on-sale line', () => {
    const lines: OrderLineInput[] = [
      { product: product({ id: 'lamp', priceCents: 5000, discountPercent: 20 }), quantity: 1 },
    ];
    expect(computeOrderTotal(lines, config).totals).toEqual({
      subtotalCents: 5000,
      discountCents: 2000,
      taxCents: 248,
      shippingCents: 599,
      grandTotalCents: 3847,
    });
  });
});
