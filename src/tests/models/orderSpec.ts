import { Order, OrderStore } from "../../database/models/Order";
import { OrderStatus } from "../../types/OrderStatus";

describe("Test Order model", () => {
  let order: Order;

  it("Should create an order", async () => {
    const orderData: Order = { userId: 1, status: OrderStatus.Active };

    order = await OrderStore.create(orderData.userId, orderData.status);

    expect(order.id).toBeDefined();
    expect(order.userId).toBe(orderData.userId);
    expect(order.status).toBe(orderData.status);
  });

  it("Should find an order by id", async () => {
    expect(await OrderStore.find(order.id as number)).toEqual(order);
  });

  it("Should find the active order by userId", async () => {
    const foundOrder = await OrderStore.findByUserId(order.userId);
    expect(foundOrder?.userId).toEqual(order.userId);
    expect(foundOrder?.status).toEqual(order.status);
  });
});
