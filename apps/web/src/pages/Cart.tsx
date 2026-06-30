import { useEffect, useState } from 'react';
import { formatMoney } from '@shopfront/shared';
import { fetchProducts, type Product } from '../api/products';
import { fetchOrderSummary, type OrderSummary } from '../api/checkout';
import { useCart } from '../cart/CartContext';
import { lineUnitPriceCents, type CartLine } from '../pricing/cartTotals';
import { DiscountBadge } from '../components/DiscountBadge';
import { TotalsPanel } from '../components/TotalsPanel';

export function CartPage() {
  const { items, setQuantity, remove } = useCart();
  const [catalog, setCatalog] = useState<Product[]>([]);
  const [summary, setSummary] = useState<OrderSummary | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(setCatalog)
      .catch(() => setCatalog([]));
  }, [items]);

  useEffect(() => {
    const checkoutItems = Object.entries(items).map(([id, quantity]) => ({ id, quantity }));
    if (checkoutItems.length === 0) {
      setSummary(null);
      return;
    }
    let cancelled = false;
    fetchOrderSummary(checkoutItems)
      .then((result) => {
        if (!cancelled) setSummary(result);
      })
      .catch(() => {
        if (!cancelled) setSummary(null);
      });
    return () => {
      cancelled = true;
    };
  }, [items]);

  const lines: CartLine[] = Object.entries(items).flatMap(([id, quantity]) => {
    const product = catalog.find((candidate) => candidate.id === id);
    return product ? [{ product, quantity }] : [];
  });

  if (lines.length === 0) {
    return <p className="notice">Your cart is empty.</p>;
  }

  return (
    <section className="cart">
      <h1>Your cart</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Line total</th>
            <th aria-label="Actions" />
          </tr>
        </thead>
        <tbody>
          {lines.map(({ product, quantity }) => (
            <tr key={product.id}>
              <td>
                {product.name}{' '}
                {product.discountPercent > 0 && <DiscountBadge percent={product.discountPercent} />}
              </td>
              <td>{formatMoney(product.priceCents)}</td>
              <td>
                <input
                  className="qty"
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(event) => setQuantity(product.id, Number(event.target.value))}
                />
              </td>
              <td>{formatMoney(lineUnitPriceCents(product) * quantity)}</td>
              <td>
                <button className="link" type="button" onClick={() => remove(product.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {summary ? <TotalsPanel totals={summary.totals} /> : <p className="notice">Calculating totals…</p>}
    </section>
  );
}
