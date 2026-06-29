import { describe, expect, it } from 'vitest';
import { formatMoney, sumCents } from './money';

describe('formatMoney', () => {
  it('formats whole and fractional dollars', () => {
    expect(formatMoney(1999)).toBe('$19.99');
    expect(formatMoney(500)).toBe('$5.00');
    expect(formatMoney(5)).toBe('$0.05');
  });

  it('handles negative amounts', () => {
    expect(formatMoney(-250)).toBe('-$2.50');
  });
});

describe('sumCents', () => {
  it('adds integer-cent amounts', () => {
    expect(sumCents([100, 250, 5])).toBe(355);
    expect(sumCents([])).toBe(0);
  });
});
