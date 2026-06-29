export interface AppConfig {
  port: number;
}

/** Build the application config from environment variables, with sensible defaults. */
export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const port = Number.parseInt(env.PORT ?? '', 10);
  return {
    port: Number.isFinite(port) && port > 0 ? port : 4000,
  };
}
