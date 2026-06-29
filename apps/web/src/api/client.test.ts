import { describe, expect, it } from 'vitest';
import { apiUrl } from './client';

describe('apiUrl', () => {
  it('prefixes the API base', () => {
    expect(apiUrl('/health')).toBe('/api/health');
  });

  it('tolerates a path without a leading slash', () => {
    expect(apiUrl('health')).toBe('/api/health');
  });
});
