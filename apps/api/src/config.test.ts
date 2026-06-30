import { describe, expect, it } from 'vitest';
import { loadConfig } from './config';

const defaults = { port: 4000, freeShippingThresholdCents: 5000, shippingFlatCents: 599 };

describe('loadConfig', () => {
  it('uses sensible defaults when nothing is set', () => {
    expect(loadConfig({})).toEqual(defaults);
  });

  it('reads the port from the environment', () => {
    expect(loadConfig({ PORT: '8080' })).toEqual({ ...defaults, port: 8080 });
  });

  it('falls back to the default for an invalid port', () => {
    expect(loadConfig({ PORT: 'not-a-number' })).toEqual(defaults);
  });

  it('reads the free-shipping threshold and flat shipping fee from the environment', () => {
    expect(
      loadConfig({ FREE_SHIPPING_THRESHOLD_CENTS: '7500', SHIPPING_FLAT_CENTS: '799' }),
    ).toEqual({ ...defaults, freeShippingThresholdCents: 7500, shippingFlatCents: 799 });
  });
});
