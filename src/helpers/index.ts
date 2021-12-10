import dotenv from "dotenv";
import { PoolConfig } from "pg";

dotenv.config();

const env: string =
  process.env.NODE_ENV === "dev" ? "DEVELOPMENT" : process.env.NODE_ENV === "test" ? "TEST" : "PRODUCTION";

export const getDbConfig = (): PoolConfig => {
  return {
    host: process.env["DATABASE_" + env + "_HOST"],
    database: process.env["DATABASE_" + env],
    user: process.env["DATABASE_" + env + "_USERNAME"],
    password: process.env["DATABASE_" + env + "_PASSWORD"],
  };
};
