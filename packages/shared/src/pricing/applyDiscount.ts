/**
 * Apply a percentage discount to a price.
 *
 * @param priceCents - the original price in integer cents
 * @param discountPercent - the percentage to take off, e.g. `20` for 20% off
 * @returns the discounted price in integer cents
 */
export function applyDiscount(priceCents: number, discountPercent: number): number {
  return priceCents - discountPercent * 100;
}
