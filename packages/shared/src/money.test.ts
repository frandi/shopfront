import { describe, expect, it } from 'vitest';
import { applyTaxRate, formatMoney, sumCents } from './money';

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

describe('applyTaxRate', () => {
  it('applies a basis-point rate to an amount', () => {
    expect(applyTaxRate(4000, 825)).toBe(330);
  });

  it('rounds to the nearest cent', () => {
    // 2799 * 825 / 10000 = 230.9175 -> 231
    expect(applyTaxRate(2799, 825)).toBe(231);
  });

  it('is zero for a zero rate or zero amount', () => {
    expect(applyTaxRate(1000, 0)).toBe(0);
    expect(applyTaxRate(0, 825)).toBe(0);
  });
});
