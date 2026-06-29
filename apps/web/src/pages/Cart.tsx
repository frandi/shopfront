import { useEffect, useState } from 'react';
import { formatMoney } from '@shopfront/shared';
import { fetchProducts, type Product } from '../api/products';
import { useCart } from '../cart/CartContext';
import { computeTotals, lineUnitPriceCents, type CartLine } from '../pricing/cartTotals';
import { DiscountBadge } from '../components/DiscountBadge';
import { TotalsPanel } from '../components/TotalsPanel';

export function CartPage() {
  const { items, setQuantity, remove } = useCart();
  const [catalog, setCatalog] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts()
      .then(setCatalog)
      .catch(() => setCatalog([]));
  }, []);

  const lines: CartLine[] = Object.entries(items).flatMap(([id, quantity]) => {
    const product = catalog.find((candidate) => candidate.id === id);
    return product ? [{ product, quantity }] : [];
  });

  if (lines.length === 0) {
    return <p className="notice">Your cart is empty.</p>;
  }

  const totals = computeTotals(lines);

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
          {totals.lines.map(({ product, quantity }) => (
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
      <TotalsPanel totals={totals} />
    </section>
  );
}
