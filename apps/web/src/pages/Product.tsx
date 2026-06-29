import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatMoney } from '@shopfront/shared';
import { fetchProduct, type Product } from '../api/products';
import { useCart } from '../cart/CartContext';
import { lineUnitPriceCents } from '../pricing/cartTotals';
import { DiscountBadge } from '../components/DiscountBadge';

export function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [missing, setMissing] = useState(false);
  const { add } = useCart();

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchProduct(id)
      .then(setProduct)
      .catch(() => setMissing(true));
  }, [id]);

  if (missing) {
    return <p className="notice">Product not found.</p>;
  }
  if (!product) {
    return <p className="notice">Loading…</p>;
  }

  const hasDiscount = product.discountPercent > 0;

  return (
    <section className="detail">
      <h1>
        {product.name} {hasDiscount && <DiscountBadge percent={product.discountPercent} />}
      </h1>
      <p className="card-desc">{product.description}</p>
      <p className="price">
        {hasDiscount && <span className="price-was">{formatMoney(product.priceCents)}</span>}
        <span className="price-now">{formatMoney(lineUnitPriceCents(product))}</span>
      </p>
      <button className="btn" type="button" onClick={() => add(product.id)}>
        Add to cart
      </button>
    </section>
  );
}
