import { runQuery } from "..";

export type OrderProduct = {
  id?: number;
  productId: number;
  quantity: number;
  orderId: number;
};

export class OrderProductRelationship {
  static async create(orderProduct: OrderProduct): Promise<OrderProduct> {
    const result = await runQuery(
      `INSERT INTO "ordersproducts" (productId, quantity, orderId)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [orderProduct.productId, orderProduct.quantity, orderProduct.orderId],
    );

    return result.rows[0];
  }

  static async findByOrderId(orderId: number): Promise<OrderProduct[] | null> {
    const result = await runQuery(`SELECT * from "ordersproducts" WHERE "orderId" = $1`, [orderId]);

    if (result.rowCount !== 0) {
      return result.rows;
    }

    return null;
  }
}
