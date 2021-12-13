import express, { Request, Response, NextFunction } from "express";
import { Product, ProductStore } from "../../../database/models/Product";
import { hasValidToken } from "../../../middlewares";

const router = express.Router();

router.post("/", hasValidToken, async (req: Request<{}, {}, { name: string; price: number }>, res: Response, next) => {
  let product: Product = {
    name: req.body.name,
    price: req.body.price,
  };

  try {
    product = await ProductStore.create(product);
  } catch (error) {
    return next(error);
  }

  return res.json(product);
});

export default router;
