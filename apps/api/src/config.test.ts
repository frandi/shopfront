import { describe, expect, it } from 'vitest';
import { loadConfig } from './config';

describe('loadConfig', () => {
  it('defaults the port to 4000', () => {
    expect(loadConfig({})).toEqual({ port: 4000 });
  });

  it('reads the port from the environment', () => {
    expect(loadConfig({ PORT: '8080' })).toEqual({ port: 8080 });
  });

  it('falls back to the default for an invalid port', () => {
    expect(loadConfig({ PORT: 'not-a-number' })).toEqual({ port: 4000 });
  });
});
