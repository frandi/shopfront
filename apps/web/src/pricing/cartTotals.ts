import { applyDiscount } from '@shopfront/shared';
import type { Product } from '../api/products';

export interface CartLine {
  product: Product;
  quantity: number;
}

/**
 * The discounted unit price for a product, in integer cents — used for the per-line column in
 * the cart table. Order totals (subtotal, discount, tax, shipping, grand total) are computed by
 * the API via `POST /api/checkout`; see `api/checkout.ts`.
 */
export function lineUnitPriceCents(product: Product): number {
  if (product.discountPercent <= 0) {
    return product.priceCents;
  }
  return applyDiscount(product.priceCents, product.discountPercent);
}
