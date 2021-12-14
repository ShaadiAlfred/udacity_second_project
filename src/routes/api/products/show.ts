import express, { NextFunction, Request, Response } from "express";
import { ProductStore } from "../../../database/models/Product";

const router = express.Router();

router.get("/:id", async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
  if (req.params.id === undefined) {
    return res.status(200).json({ message: "Missing parameter" });
  }

  try {
    return res.json(await ProductStore.find(req.params.id));
  } catch (error) {
    return next(error);
  }
});

export default router;
