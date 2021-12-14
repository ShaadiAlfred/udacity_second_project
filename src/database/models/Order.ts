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
}
