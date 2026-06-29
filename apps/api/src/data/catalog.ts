export interface Product {
  id: string;
  name: string;
  description: string;
  /** List price in integer cents. */
  priceCents: number;
  /** Active promotional discount as a percentage (0 when not on sale). */
  discountPercent: number;
  /** Sales-tax rate in basis points (e.g. 825 = 8.25%). */
  taxRateBps: number;
}

export const catalog: Product[] = [
  {
    id: 'aurora-lamp',
    name: 'Aurora Desk Lamp',
    description: 'Warm dimmable LED desk lamp with a brushed-aluminium arm.',
    priceCents: 5000,
    discountPercent: 20,
    taxRateBps: 825,
  },
  {
    id: 'ceramic-mug',
    name: 'Ceramic Mug',
    description: 'Stoneware mug, 350ml, dishwasher safe.',
    priceCents: 1200,
    discountPercent: 0,
    taxRateBps: 825,
  },
  {
    id: 'dot-grid-notebook',
    name: 'Dot-Grid Notebook',
    description: 'A5 hardcover notebook, 160 dot-grid pages.',
    priceCents: 1599,
    discountPercent: 0,
    taxRateBps: 825,
  },
  {
    id: 'canvas-tote',
    name: 'Canvas Tote Bag',
    description: 'Heavyweight cotton tote with reinforced handles.',
    priceCents: 2400,
    discountPercent: 0,
    taxRateBps: 825,
  },
  {
    id: 'water-bottle',
    name: 'Stainless Water Bottle',
    description: 'Vacuum-insulated 750ml bottle, keeps drinks cold for 24h.',
    priceCents: 2800,
    discountPercent: 0,
    taxRateBps: 825,
  },
];

/** Look up a product by its id. */
export function getProduct(id: string): Product | undefined {
  return catalog.find((product) => product.id === id);
}
