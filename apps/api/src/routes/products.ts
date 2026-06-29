import express from 'express';
import { catalog, getProduct } from '../data/catalog';

export const productsRouter = express.Router();

productsRouter.get('/', (_req, res) => {
  res.json({ products: catalog });
});

productsRouter.get('/:id', (req, res) => {
  const product = getProduct(req.params.id);
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  res.json({ product });
});
