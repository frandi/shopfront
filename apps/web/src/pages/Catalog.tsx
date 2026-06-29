import { useEffect, useState } from 'react';
import { fetchProducts, type Product } from '../api/products';
import { ProductCard } from '../components/ProductCard';

export function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => setError(true));
  }, []);

  if (error) {
    return <p className="notice">Unable to load products.</p>;
  }

  return (
    <section>
      <h1>Shop</h1>
      <div className="grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
