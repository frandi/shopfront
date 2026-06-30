import express from 'express';
import { getProduct } from '../data/catalog';
import { computeOrderTotal, type OrderLineInput } from '../pricing/orderTotal';
import type { AppConfig } from '../config';

/** Build the checkout router, bound to the order-total configuration (threshold, shipping fee). */
export function createCheckoutRouter(config: AppConfig) {
  const router = express.Router();

  router.post('/', (req, res) => {
    const items = (req.body as { items?: unknown } | undefined)?.items;
    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: 'Request body must include a non-empty "items" array.' });
      return;
    }

    const lines: OrderLineInput[] = [];
    for (const item of items) {
      const { id, quantity } = (item ?? {}) as { id?: unknown; quantity?: unknown };
      if (typeof id !== 'string') {
        res.status(400).json({ error: 'Each item requires a string "id".' });
        return;
      }
      if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity <= 0) {
        res.status(400).json({ error: `Item "${id}" requires a positive integer "quantity".` });
        return;
      }
      const product = getProduct(id);
      if (!product) {
        res.status(404).json({ error: `Unknown product: ${id}` });
        return;
      }
      lines.push({ product, quantity });
    }

    res.json(computeOrderTotal(lines, config));
  });

  return router;
}
