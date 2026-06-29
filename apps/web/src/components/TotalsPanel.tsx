import { formatMoney } from '@shopfront/shared';
import type { CartTotals } from '../pricing/cartTotals';

export function TotalsPanel({ totals }: { totals: CartTotals }) {
  return (
    <div className="totals">
      <div className="totals-row">
        <span>Subtotal</span>
        <span>{formatMoney(totals.subtotalCents)}</span>
      </div>
      <div className="totals-row">
        <span>Discount</span>
        <span>-{formatMoney(totals.discountCents)}</span>
      </div>
      <div className="totals-row totals-grand">
        <span>Total</span>
        <span>{formatMoney(totals.totalCents)}</span>
      </div>
    </div>
  );
}
