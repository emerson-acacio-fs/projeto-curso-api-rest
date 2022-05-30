export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_SECRET: string;
      APP_API_URL: string;
      APP_WEB_URL: string;
      APP_DATABASE_PASSWORD: string;
      APP_DATABASE_USERNAME: string;
      REDIS_HOST: string;
      REDIS_PORT: number;
      REDIS_PASS: string;
    }
  }
}
