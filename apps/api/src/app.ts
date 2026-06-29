import express from 'express';
import { productsRouter } from './routes/products';

/** Create the Express application with all routes registered. */
export function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/products', productsRouter);

  return app;
}
