import { describe, expect, it } from 'vitest';
import { catalog, getProduct } from './catalog';

describe('catalog', () => {
  it('contains products', () => {
    expect(catalog.length).toBeGreaterThan(0);
  });

  it('finds a product by id', () => {
    const first = catalog[0];
    expect(getProduct(first.id)).toEqual(first);
  });

  it('returns undefined for an unknown id', () => {
    expect(getProduct('does-not-exist')).toBeUndefined();
  });
});
