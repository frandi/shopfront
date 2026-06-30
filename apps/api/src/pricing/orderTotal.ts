import { applyDiscount, applyTaxRate } from '@shopfront/shared';
import type { AppConfig } from '../config';
import type { Product } from '../data/catalog';
import { shippingCents } from '../checkout/freeShipping';

export interface OrderLineInput {
  product: Product;
  quantity: number;
}

export interface OrderLine {
  id: string;
  name: string;
  quantity: number;
  /** List unit price, integer cents. */
  unitPriceCents: number;
  /** Discounted unit price actually charged, integer cents. */
  discountedUnitPriceCents: number;
  discountPercent: number;
  /** discountedUnitPriceCents * quantity */
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

type OrderConfig = Pick<AppConfig, 'freeShippingThresholdCents' | 'shippingFlatCents'>;

/** The discounted unit price for a product, in integer cents. */
function discountedUnitPrice(product: Product): number {
  if (product.discountPercent <= 0) {
    return product.priceCents;
  }
  return applyDiscount(product.priceCents, product.discountPercent);
}

/**
 * Assemble an order summary from cart lines: per-line breakdown plus the order totals
 * (subtotal, discount, tax, shipping, grand total). Tax is applied per line on the
 * discounted line amount; the free-shipping threshold is checked against the post-discount,
 * pre-tax total.
 */
export function computeOrderTotal(inputs: OrderLineInput[], config: OrderConfig): OrderSummary {
  let subtotalCents = 0;
  let postDiscountCents = 0;
  let taxCents = 0;

  const lines: OrderLine[] = inputs.map(({ product, quantity }) => {
    const discountedUnitPriceCents = discountedUnitPrice(product);
    const lineTotalCents = discountedUnitPriceCents * quantity;

    subtotalCents += product.priceCents * quantity;
    postDiscountCents += lineTotalCents;
    taxCents += applyTaxRate(discountedUnitPriceCents, product.taxRateBps) * quantity;

    return {
      id: product.id,
      name: product.name,
      quantity,
      unitPriceCents: product.priceCents,
      discountedUnitPriceCents,
      discountPercent: product.discountPercent,
      lineTotalCents,
    };
  });

  const shipping = shippingCents(postDiscountCents, config);

  return {
    lines,
    totals: {
      subtotalCents,
      discountCents: subtotalCents - postDiscountCents,
      taxCents,
      shippingCents: shipping,
      grandTotalCents: postDiscountCents + taxCents + shipping,
    },
  };
}
