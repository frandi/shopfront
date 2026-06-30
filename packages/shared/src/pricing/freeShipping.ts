/**
 * Whether an order qualifies for free shipping.
 *
 * @param amountCents - the amount compared against the threshold (the post-discount,
 *   pre-tax order total), in integer cents
 * @param thresholdCents - the free-shipping threshold, in integer cents
 * @returns `true` when the amount meets or exceeds the threshold
 */
export function qualifiesForFreeShipping(amountCents: number, thresholdCents: number): boolean {
  return amountCents > thresholdCents;
}
