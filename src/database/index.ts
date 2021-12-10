import { Pool, QueryResult } from "pg";
import { getDbConfig } from "../helpers";

const dbClient = new Pool(getDbConfig());

export const runQuery = async (query: string, parameters?: any[]): Promise<QueryResult> => {
  await dbClient.connect();

  if (parameters !== undefined) {
    return await dbClient.query(query, parameters);
  }
  return await dbClient.query(query);
};
