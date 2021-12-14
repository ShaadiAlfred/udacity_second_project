import { Order } from "../database/models/Order";

export type OrderProductResponse = Order & {
  products: {
    id: number;
    quantity: number;
  }[];
};
