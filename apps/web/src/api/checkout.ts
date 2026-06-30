import { postJson } from './client';

export interface OrderLine {
  id: string;
  name: string;
  quantity: number;
  unitPriceCents: number;
  discountedUnitPriceCents: number;
  discountPercent: number;
  lineTotalCents: number;
}

export interface OrderTotals {
  subtotalCents: number;
  discountCents: number;
  taxCents: number;
  shippingCents: number;
  grandTotalCents: number;
}

export interface OrderSummary {
  lines: OrderLine[];
  totals: OrderTotals;
}

export interface CheckoutItem {
  id: string;
  quantity: number;
}

/** Ask the API to price a cart: returns the per-line breakdown and order totals. */
export async function fetchOrderSummary(items: CheckoutItem[]): Promise<OrderSummary> {
  return postJson<OrderSummary>('/checkout', { items });
}
