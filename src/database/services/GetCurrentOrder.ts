import { runQuery } from "..";
import { OrderProductResponse } from "../../types/OrderProductResponse";
import { Order, OrderStore } from "../models/Order";
import { OrderProduct } from "./OrderProduct";

export const getCurrentOrder = async (userId: number) => {
  const order = await OrderStore.findByUserId(userId);

  if (order === null) {
    return null;
  }

  let result: OrderProductResponse = { ...order, products: [] };

  const orderProducts: OrderProduct[] = (
    await runQuery(`SELECT * FROM "ordersproducts" WHERE "orderid" = $1`, [order.id])
  ).rows;

  orderProducts.forEach((orderProduct) => {
    result.products.push({ id: orderProduct.id as number, quantity: orderProduct.quantity });
  });

  return result;
};
