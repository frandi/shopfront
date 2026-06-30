import express from 'express';
import { productsRouter } from './routes/products';
import { createCheckoutRouter } from './routes/checkout';
import { loadConfig, type AppConfig } from './config';

/** Create the Express application with all routes registered. */
export function createApp(config: AppConfig = loadConfig()) {
  const app = express();
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/products', productsRouter);
  app.use('/api/checkout', createCheckoutRouter(config));

  return app;
}
