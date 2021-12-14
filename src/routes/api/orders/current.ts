import express, { Request, Response } from "express";
import { getCurrentOrder } from "../../../database/services/GetCurrentOrder";
import { hasValidToken } from "../../../middlewares";

const router = express.Router();

router.get("/current/:userId", hasValidToken, async (req: Request<{ userId: "number" }>, res: Response) => {
  const order = await getCurrentOrder(parseInt(req.params.userId));

  if (order === null) {
    return res.status(400).json({ message: "No active order found for current user" });
  }

  return res.json(order);
});

export default router;
