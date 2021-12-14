import express, { Request, Response } from "express";
import { OrderStore } from "../../../database/models/Order";
import { OrderProduct, OrderProductRelationship } from "../../../database/services/OrderProduct";
import { hasValidToken } from "../../../middlewares";
import { OrderStatus } from "../../../types/OrderStatus";
import { Cart } from "../../../types/CreateOrderRequest";

const router = express.Router();

router.post("/", hasValidToken, async (req: Request<{}, { user: number }, Cart>, res: Response) => {
  const order = await OrderStore.create(req.user?.id ?? 0, OrderStatus.Active);

  req.body.products.forEach(async (product) => {
    const orderProduct: OrderProduct = {
      productId: product.id,
      quantity: product.quantity,
      orderId: order.id as number,
    };

    await OrderProductRelationship.create(orderProduct);
  });

  return res.status(200).json(order);
});

export default router;
