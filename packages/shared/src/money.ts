/**
 * Monetary values are represented as integer cents throughout the codebase.
 * The helpers here are the single source of truth for formatting and combining
 * money, so display and arithmetic stay consistent across the web app and API.
 */

/** Format an integer-cents amount as a USD string, e.g. `1999` -> `"$19.99"`. */
export function formatMoney(cents: number): string {
  const sign = cents < 0 ? '-' : '';
  const abs = Math.abs(cents);
  const dollars = Math.floor(abs / 100);
  const remainder = (abs % 100).toString().padStart(2, '0');
  return `${sign}$${dollars}.${remainder}`;
}

/** Sum a list of integer-cents amounts. */
export function sumCents(amounts: number[]): number {
  return amounts.reduce((total, amount) => total + amount, 0);
}

/**
 * Tax on an integer-cents amount at a rate given in basis points.
 * Rounds to the nearest cent (e.g. `applyTaxRate(4000, 825)` -> `330`).
 *
 * @param cents - the amount to tax, in integer cents
 * @param taxRateBps - the tax rate in basis points (e.g. `825` = 8.25%)
 * @returns the tax owed, in integer cents
 */
export function applyTaxRate(cents: number, taxRateBps: number): number {
  return Math.round((cents * taxRateBps) / 10000);
}
