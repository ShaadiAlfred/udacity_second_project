import { QueryResult } from "pg";
import { runQuery } from "..";
import { OrderStatus } from "../../types/OrderStatus";

export type Order = {
  id?: number;
  userId: number;
  status: OrderStatus;
};

export class OrderStore {
  static async create(userId: number, status: string): Promise<Order> {
    const result = await runQuery(
      `INSERT INTO "orders" (userId, status)
      VALUES ($1, $2)
      RETURNING *`,
      [userId, status],
    );

    return result.rows[0];
  }

  static async find(id: number): Promise<Order | null> {
    const result = await runQuery(`SELECT * from "orders" WHERE "id" = $1`, [id]);

    if (result.rowCount !== 0) {
      return result.rows[0];
    }

    return null;
  }

  static async findByUserId(userId: number, isActive = true): Promise<Order | null> {
    let result: QueryResult<Order>;

    if (isActive) {
      result = await runQuery(
        `SELECT id, userid as "userId", status from "orders" WHERE "userid" = $1 AND "status" = 'active'`,
        [userId],
      );
    } else {
      result = await runQuery(`SELECT id, userid as "userId", status from "orders" WHERE "userid" = $1`, [userId]);
    }

    if (result.rowCount !== 0) {
      result.rows[0].userId = parseInt(result.rows[0].userId as unknown as string);

      return result.rows[0];
    }

    return null;
  }
}
