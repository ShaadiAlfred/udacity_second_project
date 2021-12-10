declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;

    DATABASE_DEVELOPMENT: string;
    DATABASE_DEVELOPMENT_HOST: string;
    DATABASE_DEVELOPMENT_USERNAME: string;
    DATABASE_DEVELOPMENT_PASSWORD: string;

    DATABASE_TEST: string;
    DATABASE_TEST_HOST: string;
    DATABASE_TEST_USERNAME: string;
    DATABASE_TEST_PASSWORD: string;

    DATABASE_PRODUCTION: string;
    DATABASE_PRODUCTION_HOST: string;
    DATABASE_PRODUCTION_USERNAME: string;
    DATABASE_PRODUCTION_PASSWORD: string;

    BCRYPT_PASSWORD: string;
    SALT_ROUNDS: string;

    TOKEN_SECRET: string;
  }
}
