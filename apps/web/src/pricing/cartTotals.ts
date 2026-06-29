import { applyDiscount } from '@shopfront/shared';
import type { Product } from '../api/products';

export interface CartLine {
  product: Product;
  quantity: number;
}

export interface CartTotals {
  lines: CartLine[];
  subtotalCents: number;
  discountCents: number;
  totalCents: number;
}

/** The discounted unit price for a product, in integer cents. */
export function lineUnitPriceCents(product: Product): number {
  if (product.discountPercent <= 0) {
    return product.priceCents;
  }
  return applyDiscount(product.priceCents, product.discountPercent);
}

/** Compute cart totals from the given lines. */
export function computeTotals(lines: CartLine[]): CartTotals {
  let subtotalCents = 0;
  let totalCents = 0;

  for (const line of lines) {
    subtotalCents += line.product.priceCents * line.quantity;
    totalCents += lineUnitPriceCents(line.product) * line.quantity;
  }

  return {
    lines,
    subtotalCents,
    discountCents: subtotalCents - totalCents,
    totalCents,
  };
}
