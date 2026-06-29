import { Link } from 'react-router-dom';
import { formatMoney } from '@shopfront/shared';
import { useCart } from '../cart/CartContext';
import { lineUnitPriceCents } from '../pricing/cartTotals';
import { DiscountBadge } from './DiscountBadge';
import type { Product } from '../api/products';

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const hasDiscount = product.discountPercent > 0;
  const priceCents = lineUnitPriceCents(product);

  return (
    <div className="card">
      {hasDiscount && <DiscountBadge percent={product.discountPercent} />}
      <Link to={`/product/${product.id}`} className="card-title">
        {product.name}
      </Link>
      <p className="card-desc">{product.description}</p>
      <p className="price">
        {hasDiscount && <span className="price-was">{formatMoney(product.priceCents)}</span>}
        <span className="price-now">${(priceCents / 100).toFixed(2)}</span>
      </p>
      <button className="btn" type="button" onClick={() => add(product.id)}>
        Add to cart
      </button>
    </div>
  );
}
