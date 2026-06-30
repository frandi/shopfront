import { formatMoney } from '@shopfront/shared';
import type { OrderTotals } from '../api/checkout';

export function TotalsPanel({ totals }: { totals: OrderTotals }) {
  return (
    <div className="totals">
      <div className="totals-row">
        <span>Subtotal</span>
        <span>{formatMoney(totals.subtotalCents)}</span>
      </div>
      {totals.discountCents > 0 && (
        <div className="totals-row">
          <span>Discount</span>
          <span>-{formatMoney(totals.discountCents)}</span>
        </div>
      )}
      <div className="totals-row">
        <span>Tax</span>
        <span>{formatMoney(totals.taxCents)}</span>
      </div>
      <div className="totals-row">
        <span>Shipping</span>
        <span>{totals.shippingCents === 0 ? 'FREE' : formatMoney(totals.shippingCents)}</span>
      </div>
      <div className="totals-row totals-grand">
        <span>Total</span>
        <span>{formatMoney(totals.grandTotalCents)}</span>
      </div>
    </div>
  );
}
