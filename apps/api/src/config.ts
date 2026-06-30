export interface AppConfig {
  port: number;
  /** Order total (post-discount, pre-tax) at or above which shipping is free, in integer cents. */
  freeShippingThresholdCents: number;
  /** Flat shipping fee charged when an order does not qualify for free shipping, in integer cents. */
  shippingFlatCents: number;
}

/** Parse a positive integer from the environment, falling back to a default. */
function positiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

/** Build the application config from environment variables, with sensible defaults. */
export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  return {
    port: positiveInt(env.PORT, 4000),
    freeShippingThresholdCents: positiveInt(env.FREE_SHIPPING_THRESHOLD_CENTS, 5000),
    shippingFlatCents: positiveInt(env.SHIPPING_FLAT_CENTS, 599),
  };
}
