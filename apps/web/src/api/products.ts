import { fetchJson } from './client';

export interface Product {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  discountPercent: number;
  taxRateBps: number;
}

/** Fetch the full product catalog. */
export async function fetchProducts(): Promise<Product[]> {
  const data = await fetchJson<{ products: Product[] }>('/products');
  return data.products;
}

/** Fetch a single product by id. */
export async function fetchProduct(id: string): Promise<Product> {
  const data = await fetchJson<{ product: Product }>(`/products/${id}`);
  return data.product;
}
