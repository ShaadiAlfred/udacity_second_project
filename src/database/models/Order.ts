import { QueryResult } from "pg";
import { runQuery } from "..";
import { OrderStatus } from "../../types/OrderStatus";

export type Order = {
  id?: number;
  userId: number;
  status: OrderStatus;
};

export class OrderStore {
  private static castUserIdAsInt(result: QueryResult<any>): void {
    for (let i = 0; i < result.rows.length; i++) {
      result.rows[i].userId = parseInt(result.rows[i].userId);
    }
  }

  static async create(userId: number, status: string): Promise<Order> {
    const result = await runQuery(
      `INSERT INTO "orders" ("userId", "status")
      VALUES ($1, $2)
      RETURNING *`,
      [userId, status],
    );

    this.castUserIdAsInt(result);

    return result.rows[0];
  }

  static async find(id: number): Promise<Order | null> {
    const result = await runQuery(`SELECT * from "orders" WHERE "id" = $1`, [id]);

    if (result.rowCount !== 0) {
      this.castUserIdAsInt(result);
      return result.rows[0];
    }

    return null;
  }

  static async findByUserId(userId: number, isActive = true): Promise<Order | null> {
    let result: QueryResult<Order>;

    if (isActive) {
      result = await runQuery(`SELECT * from "orders" WHERE "userId" = $1 AND "status" = 'active'`, [userId]);
    } else {
      result = await runQuery(`SELECT * from "orders" WHERE "userId" = $1`, [userId]);
    }

    if (result.rowCount !== 0) {
      this.castUserIdAsInt(result);
      return result.rows[0];
    }

    return null;
  }
}
