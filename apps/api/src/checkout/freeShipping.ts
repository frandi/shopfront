import { qualifiesForFreeShipping } from '@shopfront/shared';
import type { AppConfig } from '../config';

type ShippingConfig = Pick<AppConfig, 'freeShippingThresholdCents' | 'shippingFlatCents'>;

/**
 * The shipping charge for an order, in integer cents: free when the post-discount, pre-tax
 * total meets the configured threshold, otherwise the flat shipping fee.
 */
export function shippingCents(postDiscountCents: number, config: ShippingConfig): number {
  if (qualifiesForFreeShipping(postDiscountCents, config.freeShippingThresholdCents)) {
    return 0;
  }
  return config.shippingFlatCents;
}
