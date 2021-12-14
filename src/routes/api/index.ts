import express, { Request, Response } from "express";
import usersRoutes from "./users";
import productsRoutes from "./products";
import ordersRoutes from "./orders";

const router = express.Router();

router.get("/", (_: Request, res: Response): Response => {
  return res.send("Select a service");
});

router.use("/users", usersRoutes);
router.use("/products", productsRoutes);
router.use("/orders", ordersRoutes);

export default router;
